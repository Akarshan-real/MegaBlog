import React, { useId } from "react";

type InputPropsType = {
    label?: string;
    type?: React.HTMLInputTypeAttribute;
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputPropsType>(function Input_({
    label,
    type = "text",
    className = "",
    ...props }, ref) {

    const id = useId();

    return (
        <div className="w-full">
            {
                label &&
                <label className="block mb-1 text-(--text-muted) text-sm">
                    {label}
                </label>
            }
            <input
                id={id}
                ref={ref}
                type={type}
                className={`px-3 py-2 rounded-lg bg-(--surface) text-(--text) border border-(--border) outline-none transition-all duration-200 w-full focus:border-(--primary) focus:ring-1 focus:ring-(--primary) ${className}`}
                {...props}
            />
        </div>
    )
});

export default Input;
