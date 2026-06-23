"use client";

import { Switch, Avatar } from "antd";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header
      style={{
        width: "100%",
        height: "30px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "1 24px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Switch
        checked={darkMode}
        onChange={toggleDarkMode}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
      />

      <Avatar
  style={{
    marginLeft: 16,
    backgroundColor: "#f8c996",
  }}
>
  AT
</Avatar>
    </header>
  );
}