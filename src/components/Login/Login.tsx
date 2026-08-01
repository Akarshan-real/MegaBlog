import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import { Button, Input, Logo } from '../index';
import { useDispatch, useSelector } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { type CredentialType } from "../../Types/Credentials.type";
import { setLoading } from "../../store/uxSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const hehe = async () => {
            dispatch(setLoading(true));
            try {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                };
            }
            catch (error) {
                console.log(error);
            }
            finally {
                dispatch(setLoading(false));
            };
        }
        hehe();
    }, []);

    const [error, setError] = useState<string>("");
    const loading = useSelector((state: any) => state.ux.loading);

    const { register, handleSubmit } = useForm<CredentialType>();

    const login: SubmitHandler<CredentialType> = async (data) => {
        setError("");
        dispatch(setLoading(true));
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        }
        catch (error: any) {
            setError(error.message);
        }
        finally {
            dispatch(setLoading(false));
        };
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-(--bg) text-(--text)">
            <div className="mx-auto w-full max-w-lg bg-(--card) rounded-xl p-10 border border-(--border)">
                <div className="mb-2 flex justify-center p-2 rounded-lg bg-(--surface)">
                    <span className="inline-block w-full max-w-25">
                        <Logo className="w-full" />
                    </span>
                </div>
                <h2 className="text-center text-2xl mt-4 font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-4 mb-2 text-center text-base text-(--text-muted)">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium cursor-pointer text-(--primary) transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && <p className="text-(--danger) my-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-4">
                    <div className="space-y-5">
                        <Input
                            label="Email : "
                            placeholder="Enter your email"
                            autoComplete="email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || "Email address must be a valid one"
                                }
                            })}
                        />
                        <Input
                            label="Password : "
                            placeholder="Enter your password"
                            type="password"
                            autoComplete="current-password"
                            {...register("password", {
                                required: true,
                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                                maxLength: { value: 16, message: "Password must be at most 16 characters" }

                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full cursor-pointer mt-4"
                            disabled={loading}
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
