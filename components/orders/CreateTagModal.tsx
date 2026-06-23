"use client";
import React, { useState } from "react";
import { Modal, Input, Space, Button, Typography, message } from "antd";
import { Tag } from "@/types";

const { Text } = Typography;

const COLOR_PALETTE = [
  "#ef4444","#f97316","#f59e0b","#84cc16","#22c55e",
  "#14b8a6","#3b82f6","#6366f1","#a855f7","#ec4899",
  "#6b7280","#1e293b",
];

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (tag: Tag) => void;
}

export default function CreateTagModal({ open, onClose, onCreated }: Props) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLOR_PALETTE[0]);

  const handleAdd = () => {
    if (!name.trim()) {
      message.error("Please enter a tag name");
      return;
    }
    onCreated({ id: Date.now().toString(), name: name.trim(), color });
    setName("");
    setColor(COLOR_PALETTE[0]);
    onClose();
  };

  return (
    <Modal title="Create New Tag" open={open} onCancel={onClose} footer={null} width={360}>
      <Space direction="vertical" style={{ width: "100%" }} size={12}>
        <div>
          <Text type="secondary" style={{ fontSize: 12 }}>New Tag Name</Text>
          <Input
            placeholder="Enter Tag Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginTop: 4 }}
          />
        </div>
        <div>
          <Text type="secondary" style={{ fontSize: 12 }}>Choose Tag Color</Text>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            {COLOR_PALETTE.map((c) => (
              <div
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: c, cursor: "pointer",
                  border: color === c ? "3px solid #000" : "2px solid transparent",
                }}
              />
            ))}
          </div>
        </div>
        <div>
          <Text type="secondary" style={{ fontSize: 12 }}>Preview</Text>
          <div style={{ marginTop: 6 }}>
            {name && (
              <span style={{
                background: color + "22", borderColor: color,
                color, border: `1px solid ${color}`,
                borderRadius: 12, padding: "2px 10px", fontSize: 12,
              }}>
                {name}
              </span>
            )}
          </div>
        </div>
        <Space style={{ justifyContent: "flex-end", width: "100%" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={handleAdd} style={{ background: "#7c3aed" }}>
            Add Tag
          </Button>
        </Space>
      </Space>
    </Modal>
  );
}
