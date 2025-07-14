"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import ThemeLight from "../../themes/light";
import ThemeDark from "../../themes/dark";

interface ThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData>({
  themeName: "light",
  toggleTheme: () => {},
});

export const useAppThemeContext = () => useContext(ThemeContext);

export const AppThemeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  })
    ? "dark"
    : "light";
  const [themeName, setThemeName] = useState<"light" | "dark">(prefersDarkMode);

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === "light" ? "dark" : "light"
    );
  }, []);

  const theme = useMemo(() => {
    return themeName === "light" ? ThemeLight : ThemeDark;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
