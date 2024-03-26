import React from "react";
import { Button, Cascader, DatePicker, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useAddProductMutation } from "../../../api/product";
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

const AddProductPage = () => {
  const navigate = useNavigate();
  const [addProduct, { isLoading: isAddLoading }] = useAddProductMutation();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    try {
      await addProduct(values).unwrap();
      form.resetFields();
      Swal.fire({
        icon: "success",
        title: "Add product successfully!",
      });
      await navigate("/list-data");
    } catch (error) {
      console.error("Error adding product:", error);
      messageApi.error("Failed to add product. Please try again later.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Add Product</h1>
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductPage;
