import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, Dropdown, Menu, Modal } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import SearchBox from "./SearchBox";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../api/product";
import { useNavigate } from "react-router-dom";

type Props = {};

interface Product {
  id: string;
  status: string;
  currency: string;
  total: number;
  order: string;
  client: string;
  invoice: string;
  fundingMethod: string;
}

const TableComponent = (props: Props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery();

  const [deleteProductMutation] = useDeleteProductMutation();
  // Delete
  const handleDelete = async (id: string) => {
    try {
      Modal.confirm({
        title: "Confirm",
        content: "Are you sure you want to delete this product?",
        onOk: async () => {
          await deleteProductMutation(id); // Gọi mutation để xóa sản phẩm
          await refetch(); // Lấy lại danh sách sản phẩm sau khi xóa
          console.log("Product deleted successfully");
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: keyof Product
  ): TableColumnType<Product> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleMenuClick = (key: string) => {
    console.log("Action:", key);
  };

  const actionMenu = (
    <Menu onClick={({ key }) => handleMenuClick(key)}>
      <Menu.Item key="remove">Remove</Menu.Item>
      <Menu.Item key="details">Details</Menu.Item>
    </Menu>
  );

  const columns: TableColumnsType<Product> = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
      render: (text, record) => {
        let color;
        switch (record.status) {
          case "PENDING":
            color = "#D3D3D3"; // Màu xám
            break;
          case "PROCESSING":
            color = "#FFD700"; // Màu vàng
            break;
          case "FULFILLED":
            color = "#008000"; // Màu xanh
            break;
          default:
            color = "inherit";
        }
        return <span style={{ color }}>{text}</span>;
      },
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      ...getColumnSearchProps("client"),
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      ...getColumnSearchProps("currency"),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      ...getColumnSearchProps("total"),
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      ...getColumnSearchProps("order"),
    },
    {
      title: "Funding Method",
      dataIndex: "fundingMethod",
      key: "fundingMethod",
      ...getColumnSearchProps("fundingMethod"),
    },
    {
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
      ...getColumnSearchProps("invoice"),
    },
    {
      title: "Actions",
      key: "actions",
      width: "10%",
      render: (_, record) => (
        <Space>
          <Dropdown overlay={actionMenu}>
            <Button>View Detail</Button>
          </Dropdown>
          <Button danger onClick={() => handleDelete(record.id)}>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="title" style={{ textAlign: "center" }}>
        <h1>List User</h1>
      </div>
      <div
        className="wrap_components_top"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 10px",
        }}
      >
        <div className="box-serach" style={{ width: "90%" }}>
          {" "}
          <SearchBox onSearch={handleSearch} />
        </div>
        <Button
          style={{ width: "10%" }}
          type="primary"
          onClick={() => navigate("/add-product")}
        >
          Add Procudt
        </Button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading data...</div>
      ) : (
        <Table columns={columns} dataSource={products.data} />
      )}
    </div>
  );
};

export default TableComponent;
