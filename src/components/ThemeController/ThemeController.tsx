import { useSelector } from "react-redux";
import { useEffect } from "react";

const ThemeController = () => {
    const theme = useSelector((state: any) => state.ux.theme);

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        }
        else {
            root.classList.remove("dark");
        };

        localStorage.setItem("theme", theme);
    }, [theme]);

    return null;
};

export default ThemeController;