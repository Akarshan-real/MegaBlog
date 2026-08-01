const Logo = ({ className = "w-8" }: { className?: string }) => {
    return (
        <div className={`${className}`}>
            <img src="/favicon.png" alt="logo" />
        </div>
    )
}

export default Logo;
