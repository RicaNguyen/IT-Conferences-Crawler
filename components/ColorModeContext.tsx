"use client";
import {
  CssBaseline,
  IconButton,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ThemeModeContext = createContext<{
  mode: string;
  toggleThemeMode: (mode: string) => void;
}>({ mode: "light", toggleThemeMode: () => {} });

export const useThemeContext = () => useContext(ThemeModeContext);

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  //Check system preference for dark mode
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState("light");

  //Check local storage for theme preference on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMode(window.localStorage.getItem("theme") || "light");
    }
  }, []);

  //Toggle theme mode function
  const toggleThemeMode = (newMode: string) => {
    window.localStorage.setItem("theme", newMode);
    setMode(newMode);
  };

  //Create theme based on color mode state
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode:
            mode === "dark" || (mode === "auto" && isDarkMode)
              ? "dark"
              : "light",
        },
      }),
    [mode, isDarkMode]
  );

  //Value for the ThemeModeContext.Provider
  const themeModeValue = useMemo(
    () => ({ mode, toggleThemeMode }),
    [mode, toggleThemeMode]
  );

  return (
    <ThemeModeContext.Provider value={themeModeValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            margin: 0,
            backgroundImage:
              mode === "light"
                ? `url(images/LightBackground.png)`
                : "url(images/DarkBackground.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
          }}
        >
          {children}
        </div>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const ThemeSelector = () => {
  const { mode, toggleThemeMode } = useThemeContext();

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={() => toggleThemeMode(mode === "dark" ? "light" : "dark")}
      color="inherit"
    >
      {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
