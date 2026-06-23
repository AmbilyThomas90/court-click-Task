"use client";
import React from "react";
import { Checkbox, Button, Space, Typography, Divider } from "antd";
import { Tag } from "@/types";
import TagBadge from "@/components/ui/TagBadge";

const { Text } = Typography;

const PRODUCT_FILTER_TAGS = ["All", "Judgement", "Interim Order", "Add Case", "Other"];

interface Props {
  availableTags: Tag[];
  selectedTagIds: string[];
  selectedProducts: string[];
  onTagChange: (ids: string[]) => void;
  onProductChange: (products: string[]) => void;
  onReset: () => void;
  onApply: () => void;
  onCreateTag: () => void;
}

export default function TagFilterPanel({
  availableTags,
  selectedTagIds,
  selectedProducts,
  onTagChange,
  onProductChange,
  onReset,
  onApply,
  onCreateTag,
}: Props) {
  return (
    <div style={{ width: 260, padding: 16, background: "#fff", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Text strong style={{ fontSize: 13 }}>Support Tags</Text>
        <Button size="small" type="link" onClick={onCreateTag} style={{ padding: 0, fontSize: 12 }}>
          + Create New Tag
        </Button>
      </div>

      <Space orientation="vertical" style={{ width: "100%" }} size={6}>
        {availableTags.map((tag) => (
          <div key={tag.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Checkbox
              checked={selectedTagIds.includes(tag.id)}
              onChange={(e) => {
                if (e.target.checked) onTagChange([...selectedTagIds, tag.id]);
                else onTagChange(selectedTagIds.filter((id) => id !== tag.id));
              }}
            >
              <TagBadge tag={tag} />
            </Checkbox>
          </div>
        ))}
      </Space>

      <Divider style={{ margin: "12px 0" }} />

      <Text type="secondary" style={{ fontSize: 11, display: "block", marginBottom: 8 }}>Product Filter</Text>
      <Space orientation="vertical" style={{ width: "100%" }} size={4}>
        {PRODUCT_FILTER_TAGS.map((p) => (
          <Checkbox
            key={p}
            checked={p === "All" ? selectedProducts.length === 0 : selectedProducts.includes(p)}
            onChange={(e) => {
              if (p === "All") { onProductChange([]); return; }
              if (e.target.checked) onProductChange([...selectedProducts, p]);
              else onProductChange(selectedProducts.filter((x) => x !== p));
            }}
          >
            <Text style={{ fontSize: 12 }}>{p}</Text>
          </Checkbox>
        ))}
      </Space>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
        <Button size="small" onClick={onReset}>Reset Filter</Button>
        <Button size="small" type="primary" onClick={onApply} style={{ background: "#7c3aed" }}>Apply</Button>
      </div>
    </div>
  );
}