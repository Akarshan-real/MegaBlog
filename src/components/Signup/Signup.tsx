import { useEffect, useState } from "react";
import authService from "../../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from '../index';
import { useForm } from "react-hook-form";
import type { SignUpCredentials } from "../../Types/Signup.type";
import { setLoading } from "../../store/uxSlice";


const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const hehe = async () => {
            try {
                dispatch(setLoading(true));
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                };
                
            } catch (error) {
                console.log(error);
            }
            finally {
                dispatch(setLoading(false));
            }
        };
        hehe();
    }, []);

    const [error, setError] = useState('');

    const { register, handleSubmit } = useForm<SignUpCredentials>();

    const create = async (data: SignUpCredentials) => {
        setError("");
        try {
            dispatch(setLoading(true));

            const response = await authService.createAccount(data);

            if (response) {
                await authService.login({
                    email: data.email,
                    password: data.password
                });

                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error: any) {
            setError(error.message);
        }
        finally {
            dispatch(setLoading(false));
        };
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-(--bg) text-(--text)">
            <div className="mx-auto w-full max-w-lg bg-(--card) text-(--text) rounded-xl p-10 border border-(--border)">
                <div className="mb-2 flex justify-center p-2 rounded-lg bg-(--surface)">
                    <span className="inline-block w-full max-w-25">
                        <Logo className="w-full" />
                    </span>
                </div>
                <h2 className="text-center text-2xl mt-4 font-bold leading-tight">Sign up to create account</h2>
                <p className="my-4 text-center text-base text-(--text-muted)">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium cursor-pointer text-(--primary) transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-(--danger) my-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name : "
                            type="text"
                            autoComplete="name"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Input
                            label="Email : "
                            placeholder="Enter your email"
                            type="email"
                            autoComplete="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || "Email address must be a valid one"
                                }
                            })}
                        />
                        <Input
                            label="Password : "
                            type="password"
                            autoComplete="new-password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                                maxLength: { value: 16, message: "Password must be at most 16 characters" }

                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Create account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;

