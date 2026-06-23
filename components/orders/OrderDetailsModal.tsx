"use client";
import React from "react";
import { Modal, Button, Descriptions, Typography, Space, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { Order } from "@/types";

const { Text } = Typography;

interface Props {
  order: Order | null;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, onClose }: Props) {
  if (!order) return null;

  const handleCopy = () => {
    const text = `
APPLICANT: ${order.userInfo.name}
CASE NUMBER: WA 233/2024
CASE NAME: ${order.userInfo.name} vs State Of Kerala & Others
CAR NUMBER: KLHC01092112023
COURT ESTABLISHMENT: ${order.courtComplex}
DOCUMENT TYPE: Certified True Copy - ${order.products}
    `.trim();
    navigator.clipboard.writeText(text);
    message.success("Copied to clipboard");
  };

  return (
    <Modal
      title={
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Text strong>Order Details</Text>
          <Button size="small" icon={<CopyOutlined />} onClick={handleCopy}>
            Copy Details
          </Button>
        </Space>
      }
      open={!!order}
      onCancel={onClose}
      footer={null}
      width={520}
    >
      <Descriptions column={1} size="small" bordered>
        <Descriptions.Item label="APPLICANT">
          {order.userInfo.name} (Petitioner)
        </Descriptions.Item>
        <Descriptions.Item label="CASE NUMBER">WA 233/2024</Descriptions.Item>
        <Descriptions.Item label="CASE NAME">
          {order.userInfo.name} vs State Of Kerala & Others
        </Descriptions.Item>
        <Descriptions.Item label="CAR NUMBER">KLHC01092112023</Descriptions.Item>
        <Descriptions.Item label="COURT ESTABLISHMENT">
          {order.courtComplex}
        </Descriptions.Item>
        <Descriptions.Item label="DOCUMENT TYPE">
          Certified True Copy - {order.products}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
