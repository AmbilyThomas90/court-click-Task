"use client";
import React from "react";
import { Tag } from "antd";
import { OrderStatus } from "@/types";

const STATUS_CONFIG: Record<OrderStatus, { color: string; label: string }> = {
  cancelled: { color: "error", label: "cancelled" },
  "order placed": { color: "blue", label: "order placed" },
  "payment completed": { color: "success", label: "payment completed" },
  processing: { color: "warning", label: "processing" },
  delivered: { color: "cyan", label: "delivered" },
};

interface Props {
  status: OrderStatus;
}

export default function StatusBadge({ status }: Props) {
  const config = STATUS_CONFIG[status];
  return (
    <Tag color={config.color} style={{ borderRadius: 4, textTransform: "lowercase", fontSize: 11 }}>
      {config.label}
    </Tag>
  );
}
