import { useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";

const OverlayLoader = ({ children }: { children: ReactNode }) => {
    const globalLoading = useSelector((state: any) => state.ux.loading);

    useEffect(() => {
        const root = document.documentElement;

        if (globalLoading) {
            root.classList.add("overflow-hidden");
            root.classList.add("touch-none");
        } else {
            root.classList.remove("overflow-hidden");
            root.classList.remove("touch-none");
        }
    }, [globalLoading]);


    return (
        <div className="relative isolate">

            {children}

            {globalLoading && (
                <div
                    className="
                    fixed inset-0 
                    z-999999 
                    flex items-center justify-center
                    bg-(--bg)/70 
                    backdrop-blur-sm
                    transition-opacity
                ">

                    <div
                        className="w-14 h-14 rounded-full 
                        border-4 border-(--primary) 
                        border-t-transparent 
                        animate-spin"
                    />

                </div>
            )}
        </div>
    );
};

export default OverlayLoader;