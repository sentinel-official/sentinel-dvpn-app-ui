import React from "react";
import { motion } from "framer-motion";

const defaultVariants = {
  hidden: { opacity: 0, x: 0, y: 24 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

const AnimatedLayout = ({
  children,
  variants = defaultVariants,
  className = "",
  duration = 0.5,
  transition = { type: "easeInOut" },
  ...rest
}) => {
  return (
    <motion.div
      initial={variants.hidden || defaultVariants.hidden}
      animate={variants.enter || defaultVariants.enter}
      exit={variants.exit || defaultVariants.exit}
      transition={{ ...transition, duration }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedLayout;
