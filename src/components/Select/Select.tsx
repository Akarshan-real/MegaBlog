import { useId, forwardRef, type SelectHTMLAttributes } from 'react'

type SelectProps = {
    options: string[];
    label?: string;
    className?: string;
    classNameOfOptions?: string,
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    options,
    label,
    className = "",
    classNameOfOptions = "",
    ...props
}, ref) => {
    const id = useId();

    return (
        <div className='w-full relative'>
            {
                label &&
                <label className='block mb-1 text-(--text-muted) text-sm' htmlFor={id}>
                    {label}
                </label>
            }
            <select
                ref={ref}
                {...props}
                className={`w-full px-3 py-2 rounded-lg border bg-(--surface) text-(--text) border-(--border) transition-all duration-200 cursor-pointer focus:outline-none focus:border-(--primary) focus:ring-1 focus:ring-(--primary) ${className}`}
                id={id}
            >
                {options?.map((option) => (
                    <option
                        key={option}
                        value={option}
                        className={`bg-(--card) text-(--text) hover:bg-(--surface) ${classNameOfOptions}`}
                    >
                        {option}
                    </option>
                ))}

            </select>
            <div className="pointer-events-none absolute right-3 top-[55%] -translate-y-1/2 text-(--text-muted)">
                ▼
            </div>
        </div>
    )
}
);

export default Select;
