"use client";
import React, { useState } from "react";
import { Modal, Select, Checkbox, Button, Space, Typography } from "antd";
import { FilterState } from "@/types";
import { COURT_OPTIONS, PRODUCT_OPTIONS } from "@/lib/mockData";

const { Text } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
}

export default function FilterUsersModal({ open, onClose, onApply, initialFilters }: Props) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleReset = () => {
    setFilters({});
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Modal
      title="Filter Users"
      open={open}
      onCancel={onClose}
      footer={null}
      width={400}
    >
      <Space orientation="vertical" style={{ width: "100%" }} size={16}>
        <div>
          <Text type="secondary" style={{ fontSize: 12 }}>Court Establishment</Text>
          <Select
            placeholder="Choose Court Establishment"
            style={{ width: "100%", marginTop: 4 }}
            options={COURT_OPTIONS}
            value={filters.court}
            onChange={(v) => setFilters((f) => ({ ...f, court: v }))}
            allowClear
          />
        </div>

        <div>
          <Text type="secondary" style={{ fontSize: 12 }}>Product</Text>
          <Select
            placeholder="All"
            style={{ width: "100%", marginTop: 4 }}
            options={PRODUCT_OPTIONS}
            value={filters.product}
            onChange={(v) => setFilters((f) => ({ ...f, product: v }))}
            allowClear
          />
        </div>

        <Checkbox
          checked={filters.testUsers}
          onChange={(e) => setFilters((f) => ({ ...f, testUsers: e.target.checked }))}
        >
          Test Users
        </Checkbox>

        <Space style={{ justifyContent: "flex-end", width: "100%" }}>
          <Button onClick={handleReset}>Reset Filter</Button>
          <Button type="primary" onClick={handleApply} style={{ background: "#7c3aed" }}>
            Apply Filter
          </Button>
        </Space>
      </Space>
    </Modal>
  );
}