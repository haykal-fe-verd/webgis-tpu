import React, { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import { ThemeColors, ThemeColorStateParams } from "@/types/theme-types";
import setGlobalColorTheme from "@/lib/theme-colors";

const ThemeContext = createContext<ThemeColorStateParams>(
    {} as ThemeColorStateParams
);

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
    const getSavedThemeColor = () => {
        try {
            return (
                (localStorage.getItem("themeColor") as ThemeColors) || "Slate"
            );
        } catch (error) {
            "Slate" as ThemeColors;
        }
    };

    const [themeColor, setThemeColor] = useState<ThemeColors>(
        getSavedThemeColor() as ThemeColors
    );
    const [isMounted, setIsMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        localStorage.setItem("themeColor", themeColor);
        setGlobalColorTheme(theme as "light" | "dark", themeColor);

        if (!isMounted) {
            setIsMounted(true);
        }
    }, [themeColor, theme, isMounted]);

    if (!isMounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    return useContext(ThemeContext);
}
