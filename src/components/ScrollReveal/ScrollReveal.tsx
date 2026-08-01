import { motion } from "motion/react";
import type { ReactNode } from "react";

const ScrollReveal = ({ children, delay = 0, className = "" , element = "div" }: { children: ReactNode, delay?: number, className?: string , element ?: "div" | "span" }) => {

    if (element === "span") {
        return (
            <motion.span
            className={className}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeOut", delay }}
        >
            {children}
        </motion.span>
        )
    };

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.5, ease: "easeIn", delay }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
