"use client"

import type { Theme, ThemeOptions } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"

export const novaDarkVariant: ThemeOptions = {
  palette: {
    mode: "dark",
    text: {
      primary: "rgba(255, 255, 255, 1)",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.38)",
    },
    primary: {
      main: "rgba(142, 86, 252, 1)",
      dark: "rgba(136, 58, 255, 1)",
      light: "rgba(220, 215, 251, 1)",
      contrastText: "rgba(255, 255, 255, 0.87)",
    },
    secondary: {
      main: "rgba(100, 255, 218, 1)",
      dark: "rgba(38, 166, 154, 1)",
      light: "rgba(167, 255, 235, 1)",
      contrastText: "rgba(0, 0, 0, 1)",
    },
    error: {
      main: "rgba(239, 83, 80, 1)",
      dark: "rgba(229, 57, 53, 1)",
      light: "rgba(239, 154, 154, 1)",
      contrastText: "rgba(0, 0, 0, 1)",
    },
    background: {
      default: "rgba(2, 6, 23, 1)",
      paper: "rgba(17, 19, 31, 1)",
    },
  },
  typography: {
    allVariants: {
      color: "rgba(255, 255, 255, 0.87)",
    },
  },
}

/**
 * Create the default Wandelbots Nova Material UI theme, overriding
 * any defaults with the provided theme options.
 */
export function createNovaMuiTheme(opts: ThemeOptions): Theme {
  // Currently we only support the dark theme
  const isDark = true
  // let isDark = true
  // if (opts.palette?.mode === "light") {
  //   isDark = false
  // } else if (opts.palette?.mode !== "dark") {
  //   const browserPrefersLight =
  //     typeof window !== "undefined" &&
  //     window.matchMedia?.("(prefers-color-scheme: light)")?.matches
  //   isDark = !browserPrefersLight
  // }

  const variant = novaDarkVariant

  const theme = createTheme({
    ...variant,
    components: {
      MuiSelect: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(!ownerState.label && {
              backgroundColor: isDark ? "#505968" : undefined,
              borderRadius: "10px",
              color: "currentColor",
              "& > div": {
                padding: "4px 16px",
              },
              "& fieldset": {
                border: isDark ? "none" : undefined,
              },
            }),
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#505968" : undefined,
            borderRadius: "10px",
          },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            "& > button": {
              borderRadius: "8px",
              textTransform: "none",
              paddingTop: "4px",
              paddingBottom: "4px",
              width: "100%",
              borderWidth: 0,
              backgroundColor: isDark ? "#3d4455" : undefined,
              color: isDark ? "rgba(255, 255, 255, 0.8)" : undefined,

              "&.Mui-selected": isDark
                ? {
                    color: "white",
                    backgroundColor: "#505968",
                  }
                : undefined,
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#101629" : undefined,
            minHeight: "42px",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minHeight: "42px",
            textTransform: "none",
            "&.Mui-selected": isDark
              ? {
                  color: "white",
                  backgroundColor: "#404554",
                }
              : undefined,
          },
        },
      },
    },
  })

  if (opts) {
    return createTheme(theme, opts)
  } else {
    return theme
  }
}
