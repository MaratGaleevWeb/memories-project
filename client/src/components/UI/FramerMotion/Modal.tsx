import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import classes from './Modal.module.scss';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: '-100vh', opacity: 0 },
  visible: {
    y: '200px',
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

interface ModalProps {
  showModal: boolean;
  handleClick: () => void;
}

const Modal: FC<ModalProps> = ({ showModal, handleClick }) => (
  <AnimatePresence exitBeforeEnter>
    {showModal && (
      <motion.div
        className={classes.backdrop}
        variants={backdrop}
        initial='hidden'
        animate='visible'
        exit='hidden'
      >
        <motion.div className={classes.modal} variants={modal}>
          <p>We have sent a confirmation link to your email address</p>
          <p>If you did not receive a confirmation email, please check your spam folder</p>
          <button className={classes.button} onClick={handleClick}>
            Got It!
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;
