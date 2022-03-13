import { FC } from 'react';
import { motion } from 'framer-motion';

const loaderVariants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.5,
      },
      y: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.25,
        ease: 'easeOut',
      },
    },
  },
};

const Loader: FC = () => (
  <motion.div
    style={{
      width: '10px',
      height: '10px',
      margin: '40px auto',
      borderRadius: '50%',
      background: '#303f9f',
    }}
    variants={loaderVariants}
    animate='animationOne'
  />
);

export default Loader;
