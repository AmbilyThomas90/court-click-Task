"use client";
import React from "react";
import { Menu, Typography } from "antd";
import {
  DashboardOutlined, FileTextOutlined, UserOutlined,
  SettingOutlined, BellOutlined, TeamOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const items = [
  { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "orders", icon: <FileTextOutlined />, label: "Orders" },
  { key: "users", icon: <UserOutlined />, label: "Users" },
  { key: "clerks", icon: <TeamOutlined />, label: "Clerks" },
  { key: "notifications", icon: <BellOutlined />, label: "Notifications" },
  { key: "settings", icon: <SettingOutlined />, label: "Settings" },
];

export default function Sidebar() {
  return (
    <div style={{
      width: 56, background: "#1a0533", height: "100vh",
      display: "flex", flexDirection: "column", alignItems: "center",
      paddingTop: 16, position: "fixed", left: 0, top: 0, zIndex: 100,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8, background: "#7c3aed",
        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24,
      }}>
        <Text style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>C</Text>
      </div>
      {items.map((item) => (
        <div
          key={item.key}
          title={item.label}
          style={{
            width: 40, height: 40, display: "flex", alignItems: "center",
            justifyContent: "center", borderRadius: 8, marginBottom: 4,
            color: item.key === "orders" ? "#a78bfa" : "#6b7280", cursor: "pointer",
            background: item.key === "orders" ? "rgba(124,58,237,0.2)" : "transparent",
            fontSize: 18,
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
