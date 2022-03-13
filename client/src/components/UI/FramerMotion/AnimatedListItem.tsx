import { FC } from 'react';
import { motion } from 'framer-motion';

const opacityAnimation = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.1 },
  }),
  exit: { opacity: 0 },
};

interface AnimatedListItemProps {
  index: number;
  className?: string;
  onClick?: () => void;
}

const AnimatedListItem: FC<AnimatedListItemProps> = ({ index, className, onClick, children }) => (
  <motion.li
    className={className}
    onClick={onClick}
    variants={opacityAnimation}
    custom={index}
    initial='hidden'
    animate='visible'
    exit='exit'
  >
    {children}
  </motion.li>
);

export default AnimatedListItem;
