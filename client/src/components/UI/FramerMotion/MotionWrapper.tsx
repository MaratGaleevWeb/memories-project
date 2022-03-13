import { FC } from 'react';
import { motion } from 'framer-motion';

export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.3 },
  },
  exit: {
    opacity: 0,
  },
};

interface MotionWrapperProps {
  className?: string;
}

const MotionWrapper: FC<MotionWrapperProps> = ({ className, children }) => (
  <motion.div
    className={className}
    variants={containerVariants}
    initial='hidden'
    animate='visible'
    exit='exit'
  >
    {children}
  </motion.div>
);

export default MotionWrapper;
