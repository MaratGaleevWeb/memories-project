import { FC, useState, useContext, FormEvent, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { Context } from '../..';

import classes from './Auth.module.scss';
import useFocus from '../../hooks/useFocus';
import validateUser from '../../utils/validateUser';

import LockOutlined from '../../images/icons/LockOutlined';

import AuthInput from './components/AuthInput';
import GoogleAuth from './components/GoogleAuth';
import MotionWrapper from '../../components/UI/FramerMotion/MotionWrapper';
import Modal from '../../components/UI/FramerMotion/Modal';

import type { TUser } from '../../stores/usersStore/user.model';

const Auth: FC = () => {
  const { userStore } = useContext(Context);

  const { errors, setErrors, registration, login, googleLogin } = userStore;

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [user, setUser] = useState<TUser>({} as TUser);
  const { firstName, lastName, email, password, confirmPassword } = user;

  const ref = useFocus(() => setErrors({}));

  const handleSubmit = (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    return isSignUp ? handleSignUp() : handleSignIn();
  };

  const handleSignUp = async (): Promise<void> => {
    const validationErrors = validateUser(user);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return setUser({ ...user, password: '', confirmPassword: '' });
    }

    await registration(user);
    if (Object.keys(userStore.errors).length) {
      return setUser({ ...user, password: '', confirmPassword: '' });
    }

    setIsSignUp(false);
    setShowModal(true);
    setUser({} as TUser);
  };

  const handleSignIn = async (): Promise<void> => {
    await login(user);

    setUser({ ...user, password: '' });
  };

  const switchMode = (): void => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
    ref.current?.focus();
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void =>
    setUser({ ...user, [target.name]: target.value });

  const handleShowPassword = (): void => setShowPassword((prev) => !prev);

  const closeModal = (): void => setShowModal(false);

  return (
    <MotionWrapper className={classes.container}>
      <Modal showModal={showModal} handleClick={closeModal} />

      <div className={classes.avatar}>
        <LockOutlined />
      </div>

      <h1 className={classes.title}>{isSignUp ? 'Sign up' : 'Sign in'}</h1>

      <form onSubmit={handleSubmit}>
        <div className={classes.inputs}>
          {isSignUp && (
            <>
              <AuthInput
                title='firstName'
                value={firstName || ''}
                error={errors.firstName}
                handleChange={handleChange}
              />
              <AuthInput
                title='lastName'
                value={lastName || ''}
                error={errors.lastName}
                handleChange={handleChange}
              />
            </>
          )}

          <AuthInput
            innerRef={ref}
            title='email'
            value={email || ''}
            error={errors.email}
            handleChange={handleChange}
          />

          <AuthInput
            title='password'
            value={password || ''}
            error={errors.password}
            handleChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            handleShowPassword={handleShowPassword}
          />

          {isSignUp && (
            <AuthInput
              title='confirmPassword'
              value={confirmPassword || ''}
              error={errors.confirmPassword}
              handleChange={handleChange}
              type='password'
            />
          )}
        </div>

        <motion.button
          className={classes.submit}
          type='submit'
          whileTap={{ scale: 0.8 }}
          whileHover={{ backgroundColor: '#303f9f' }}
        >
          {isSignUp ? 'Sign Up' : 'Sign in'}
        </motion.button>

        <GoogleAuth googleLogin={googleLogin} />

        <motion.button
          className={classes.switcher}
          type='button'
          onClick={switchMode}
          whileTap={{ scale: 0.8 }}
          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
        >
          {isSignUp ? 'Already have an account? Sign in' : 'Do not have an account? Sign Up'}
        </motion.button>
      </form>
    </MotionWrapper>
  );
};

export default observer(Auth);
