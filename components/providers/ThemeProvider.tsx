"use client";

import { ConfigProvider, theme } from "antd";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode: () => setDarkMode(!darkMode),
      }}
    >
<ConfigProvider
  theme={{
    algorithm: darkMode
      ? theme.darkAlgorithm
      : theme.defaultAlgorithm,

    token: {
      colorPrimary: "#1677ff", // Blue
      colorText: darkMode ? "#1677ff" : "#000000",
      colorBgBase: darkMode ? "#000000" : "#ffffff",
    },
  }}
>
  {children}
</ConfigProvider>
    </ThemeContext.Provider>
  );
}