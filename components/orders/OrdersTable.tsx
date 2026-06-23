"use client";
import React, { useState, useMemo, useCallback } from "react";
import {
  Table, Button, Space, Input, Typography, Tooltip,
  Popover, Badge, Dropdown, message, Tag as AntTag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  FilterOutlined, UploadOutlined, UserOutlined,
  TagsOutlined, CopyOutlined, EyeOutlined, AppstoreOutlined,
} from "@ant-design/icons";
import { Order, FilterState } from "@/types";
import { MOCK_ORDERS, AVAILABLE_TAGS } from "@/lib/mockData";
import StatusBadge from "@/components/ui/StatusBadge";
import TagBadge from "@/components/ui/TagBadge";
import FilterUsersModal from "./FilterUsersModal";
import OrderDetailsModal from "./OrderDetailsModal";
import CreateTagModal from "./CreateTagModal";
import TagFilterPanel from "./TagFilterPanel";

const { Text, Title } = Typography;

const STATUS_TABS = [
  { key: "all", label: "Orders", count: 125 },
  { key: "clerks", label: "Clerks", count: 46 },
  { key: "courts", label: "Courts", count: 32 },
  { key: "districts", label: "Districts", count: 14 },
  { key: "eligible", label: "Eligible Users", count: 11 },
];

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [availableTags, setAvailableTags] = useState(AVAILABLE_TAGS);
  const [activeTab, setActiveTab] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [tagPanelOpen, setTagPanelOpen] = useState(false);
  const [createTagOpen, setCreateTagOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: MOCK_ORDERS.length });

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (searchText && !o.userInfo.name.toLowerCase().includes(searchText.toLowerCase()) &&
        !o.userId.includes(searchText)) return false;
      if (selectedTagIds.length > 0 && !o.tags.some((t) => selectedTagIds.includes(t.id))) return false;
      if (selectedProducts.length > 0 && !selectedProducts.includes(o.products)) return false;
      if (appliedFilters.court && appliedFilters.court !== "all" &&
        !o.courtComplex.toLowerCase().includes(appliedFilters.court.replace(/_/g, " "))) return false;
      if (appliedFilters.product && appliedFilters.product !== "all" &&
        o.products !== appliedFilters.product) return false;
      return true;
    });
  }, [orders, searchText, selectedTagIds, selectedProducts, appliedFilters]);

  const handleCopyAddress = useCallback((order: Order) => {
    navigator.clipboard.writeText(order.userInfo.address);
    message.success("Address copied!");
  }, []);

  const handleAssignTag = useCallback((orderId: string, tag: (typeof AVAILABLE_TAGS)[0]) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && !o.tags.find((t) => t.id === tag.id)
          ? { ...o, tags: [...o.tags, tag] }
          : o
      )
    );
  }, []);

  const columns: ColumnsType<Order> = [
    {
      title: "USER INFO",
      key: "userInfo",
      width: 180,
      render: (_, r) => (
        <div>
          <Text strong style={{ fontSize: 12 }}>{r.userInfo.name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 11 }}>{r.userId}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 10 }}>{r.orderDate}</Text>
          <br />
          <Button
            size="small"
            icon={<CopyOutlined />}
            style={{ fontSize: 10, height: 20, marginTop: 4 }}
            onClick={() => handleCopyAddress(r)}
          >
            Copy Address
          </Button>
        </div>
      ),
    },
    {
      title: "COURT COMPLEX",
      dataIndex: "courtComplex",
      key: "courtComplex",
      width: 160,
      render: (v) => <Text style={{ fontSize: 12 }}>{v}</Text>,
    },
    {
      title: "PRODUCTS",
      dataIndex: "products",
      key: "products",
      width: 110,
      render: (v) => <AntTag style={{ fontSize: 11 }}>{v}</AntTag>,
    },
    {
      title: "ORDER DATE",
      dataIndex: "orderDate",
      key: "orderDate",
      width: 100,
      render: (v) => <Text style={{ fontSize: 12 }}>{v}</Text>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (v) => <StatusBadge status={v} />,
    },
    {
      title: "ORDER DETAILS",
      key: "orderDetails",
      width: 140,
      render: (_, r) => (
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => setSelectedOrder(r)}
            style={{ fontSize: 11 }}
          >
            View
          </Button>
          <Button
            size="small"
            icon={<AppstoreOutlined />}
            style={{ fontSize: 11 }}
          >
            Choose
          </Button>
        </Space>
      ),
    },
    {
      title: "TAGS / NOTES",
      key: "tags",
      width: 200,
      render: (_, r) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
          {r.tags.map((tag) => <TagBadge key={tag.id} tag={tag} />)}
          <Dropdown
            menu={{
              items: availableTags.map((t) => ({
                key: t.id,
                label: <TagBadge tag={t} />,
                onClick: () => handleAssignTag(r.id, t),
              })),
            }}
            trigger={["click"]}
          >
            <Button size="small" icon={<TagsOutlined />} style={{ fontSize: 10, height: 20 }} />
          </Dropdown>
        </div>
      ),
    },
    {
      title: "COPY",
      key: "copy",
      width: 60,
      render: (_, r) => (
        <Tooltip title="E-sign">
          <Button
            size="small"
            type={r.isESign ? "primary" : "default"}
            style={{ fontSize: 10, background: r.isESign ? "#7c3aed" : undefined }}
          >
            E-sign
          </Button>
        </Tooltip>
      ),
    },
    {
      title: "ASSIGN",
      key: "assign",
      width: 80,
      render: (_, r) => (
        <Space orientation="vertical" size={2}>
          <Button size="small" type="primary" style={{ fontSize: 10, background: "#7c3aed" }}>
            Assign
          </Button>
          {r.isUploaded && (
            <Button size="small" icon={<UploadOutlined />} style={{ fontSize: 10 }}>
              Upload
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", background: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ background: "#7c3aed", borderRadius: 8, padding: "8px 12px" }}>
          <Text style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>CTC</Text>
        </div>
        <div>
          <Title level={4} style={{ margin: 0 }}>Certified True Copy (47834)</Title>
          <Text type="secondary" style={{ fontSize: 12 }}>Manage Your CTC Orders Here</Text>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {STATUS_TABS.map((tab) => (
          <Button
            key={tab.key}
            type={activeTab === tab.key ? "primary" : "default"}
            onClick={() => setActiveTab(tab.key)}
            size="small"
            style={{
              background: activeTab === tab.key ? "#7c3aed" : undefined,
              borderColor: activeTab === tab.key ? "#7c3aed" : undefined,
            }}
          >
            {tab.label} ({tab.count})
          </Button>
        ))}
        <div style={{ marginLeft: "auto" }}>
          <Button type="primary" style={{ background: "#7c3aed" }}>+ ORDERS</Button>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        background: "#fff", padding: 12, borderRadius: 8,
        display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center"
      }}>
        <Input.Search
          placeholder="Search by name or phone"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 220 }}
          size="small"
        />
        <Button
          icon={<UserOutlined />}
          size="small"
          onClick={() => setFilterOpen(true)}
        >
          Filter Users
        </Button>
        <Popover
          open={tagPanelOpen}
          onOpenChange={setTagPanelOpen}
          trigger="click"
          content={
            <TagFilterPanel
              availableTags={availableTags}
              selectedTagIds={selectedTagIds}
              selectedProducts={selectedProducts}
              onTagChange={setSelectedTagIds}
              onProductChange={setSelectedProducts}
              onReset={() => { setSelectedTagIds([]); setSelectedProducts([]); }}
              onApply={() => setTagPanelOpen(false)}
              onCreateTag={() => { setTagPanelOpen(false); setCreateTagOpen(true); }}
            />
          }
        >
          <Badge count={selectedTagIds.length + selectedProducts.length} size="small">
            <Button icon={<TagsOutlined />} size="small">Tags</Button>
          </Badge>
        </Popover>
        <Button icon={<FilterOutlined />} size="small" onClick={() => setCreateTagOpen(true)}>
          Create Tag
        </Button>
        {(selectedTagIds.length > 0 || selectedProducts.length > 0 || Object.keys(appliedFilters).length > 0) && (
          <Button
            size="small"
            danger
            onClick={() => { setSelectedTagIds([]); setSelectedProducts([]); setAppliedFilters({}); }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 8 }}>
        <Table<Order>
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          size="small"
          scroll={{ x: 1100 }}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          pagination={{
            ...pagination,
            total: filtered.length,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} orders`,
            onChange: (page, size) => setPagination((p) => ({ ...p, current: page, pageSize: size })),
          }}
          locale={{
            emptyText: (
              <div style={{ padding: 40, textAlign: "center" }}>
                <Text type="secondary">No orders found. Adjust your filters.</Text>
              </div>
            ),
          }}
        />
      </div>

      {/* Modals */}
      <FilterUsersModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={setAppliedFilters}
        initialFilters={appliedFilters}
      />
      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      <CreateTagModal
        open={createTagOpen}
        onClose={() => setCreateTagOpen(false)}
        onCreated={(tag) => setAvailableTags((prev) => [...prev, tag])}
      />
    </div>
  );
}
