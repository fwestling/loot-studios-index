import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import React from "react";

interface IColorModeContext {
  toggleColorMode: () => void;
}

export const ColorModeContext = React.createContext<IColorModeContext>({
  toggleColorMode: () => {
    console.warn("Color mode context not implemented!");
  },
});

interface ColoredThemeProviderProps {
  children: React.ReactNode;
}

export default function ColoredThemeProvider({
  children,
}: ColoredThemeProviderProps) {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  // useEffect(
  //   () => setMode(prefersDarkMode ? "dark" : "light"),
  //   [prefersDarkMode]
  // );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "light" ? "#fff" : "#1C1C1C",
            paper: mode === "light" ? "#fff" : "#black",
          },
          primary: {
            main: "#CD2D1E",
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
