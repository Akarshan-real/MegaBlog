import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../store/uxSlice";

const ThemeButton = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: any) => state.ux.theme);

    const themeChange = () => {
        if (theme === "dark") {
            dispatch(setTheme("light"));
        }
        else {
            dispatch(setTheme("dark"));
        };
    };

    return (
        <button
            onClick={themeChange}
            className="px-5 py-2 cursor-pointer rounded-full transition bg-(--primary) text-white hover:bg-(--primary-hover)"
        >
            {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>
    );
}

export default ThemeButton
