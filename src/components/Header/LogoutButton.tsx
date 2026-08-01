import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { setLoading } from "../../store/uxSlice";

const LogoutButton = () => {
    const dispatch = useDispatch();

    const logOutHandler = async () => {
        try {
            dispatch(setLoading(true));

            await authService.logout();

            dispatch(logout());
            window.location.replace("/");
        }
        catch (error) {
            console.log("Error : ", error);
            dispatch(setLoading(false));
        }
    };

    return (
        <button
            className="px-6 py-2 rounded-full border transition-all duration-300 cursor-pointer text-(--danger) border-(--danger) hover:bg-(--danger) hover:text-white"
            onClick={logOutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutButton;
