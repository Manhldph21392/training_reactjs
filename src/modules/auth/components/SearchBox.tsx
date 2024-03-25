import React, { useState } from "react";
import { Button, DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const SearchBox = ({ onSearch }: { onSearch: any }) => {
  const [status, setStatus] = useState("");
  const [client, setClient] = useState("");
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(null);
  const [toDate, setToDate] = useState<dayjs.Dayjs | null>(null);
  const [invoice, setInvoice] = useState("");

  const handleSearch = () => {
    onSearch({ status, client, fromDate, toDate, invoice });
  };

  const handleClear = () => {
    setStatus("");
    setClient("");
    setFromDate(null);
    setToDate(null);
    setInvoice("");
    onSearch({ status: "", client: "", fromDate: null, toDate: null, invoice: "" });
  };

  return (
    <div style={{ display: "flex" , justifyContent: "space-between"}}>
      <Select
        value={status}
        onChange={(value) => setStatus(value)}
        style={{ width: "10%", marginRight: 10 }}
      >
        <Option value="">Status</Option>
        <Option value="success">Success</Option>
        <Option value="error">Error</Option>
      </Select>

      <Select
        value={client}
        onChange={(value) => setClient(value)}
        style={{ width: "10%", marginRight: 10 }}
      >
        <Option value="">Client</Option>
        <Option value="client1">Client 1</Option>
        <Option value="client2">Client 2</Option>
      </Select>

      <DatePicker.RangePicker
        style={{ marginRight: 10, width: "20%" }}
        value={[fromDate, toDate]}
        onChange={(dates) => {
          setFromDate(dates[0]);
          setToDate(dates[1]);
        }}
      />

      <Input
        value={invoice}
        onChange={(e) => setInvoice(e.target.value)}
        placeholder="Invoice#"
        style={{ width: "20%", marginRight: 10 }}
      />

      <div className="actions" style={{ width: "20%" }}>
        <Button type="primary" onClick={handleSearch} style={{ marginRight: 10 }}>
          Apply
        </Button>

        <Button onClick={handleClear}>Clear</Button>
      </div>
    </div>
  );
};

export default SearchBox;
