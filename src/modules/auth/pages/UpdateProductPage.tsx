import React, { useEffect } from "react";
import { Button, Cascader, DatePicker, Form, Input, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import {
  useAddProductMutation,
  useGetProductByIdQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../../api/product";
import { IProduct } from "../../../interfaces/Product";
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

type FieldType = {
  status: string;
  client: string;
  currency: string;
  total: number;
  order: string;
  invoice: string;
  fundingMethod: string;
};

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { idProduct } = useParams<{ idProduct: string }>();
  const { refetch } = useGetProductsQuery();

  const { data: productData } = useGetProductByIdQuery(idProduct || "");

  const [updateProduct, { isLoading: isUpdateLoading }] =
    useUpdateProductMutation();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        status: productData.status,
        client: productData.client,
        currency: productData.currency,
        total: productData.total,
        order: productData.order,
        invoice: productData.invoice,
        fundingMethod: productData.fundingMethod,
      });
    }
  }, [productData]);

  const onFinish = async (values: IProduct) => {
    try {
      await updateProduct({ ...values, id: Number(idProduct) }).unwrap();
      form.resetFields();
      await refetch();
      Swal.fire({
        icon: "success",
        title: "Update product successfully!",
      });
      await navigate("/list-data");
    } catch (error) {
      console.error("Error updating product:", error);
      messageApi.error("Failed to update product. Please try again later.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Update Product</h1>
      {contextHolder}
      {isUpdateLoading}
      <Form
        form={form}
        onFinish={onFinish}
        {...formItemLayout}
        variant="filled"
        style={{ maxWidth: 600, margin: "auto" }}
      >
        <Form.Item<FieldType>
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please status!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Client"
          name="client"
          rules={[{ required: true, message: "Please client!" }]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Currency"
          name="currency"
          rules={[{ required: true, message: "Please Currency!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Total"
          name="total"
          rules={[{ required: true, message: "Please Total!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Order"
          name="order"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Funding Method"
          name="fundingMethod"
          rules={[{ required: true, message: "Please Funding Method!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Invoice"
          name="invoice"
          rules={[{ required: true, message: "Please Invoice!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button>
            <Link to="/list-data">Cancel</Link>
          </Button>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProduct;
