import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonType = {
  children?: ReactNode | string;
  type?: "button" | "submit" | "reset";
  bgColor?: string;
  textColor?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  type = "button",
  bgColor,
  textColor,
  className = "",
  ...props
}: ButtonType) => {

  const finalBg = bgColor
    ? bgColor
    : "bg-blue-600 hover:bg-blue-800";

  const finalText = textColor
    ? textColor
    : "text-white";

  return (
    <button
      type={type}
      className={`px-4 py-2 cursor-pointer rounded-lg transition-colors duration-150 ease-in-out ${finalBg} ${finalText} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;