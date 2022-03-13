import { FC } from 'react';
import { motion } from 'framer-motion';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import classes from './GoogleAuth.module.scss';

import GoogleIcon from '../../../images/icons/GoogleIcon';

interface GoogleAuthProps {
  googleLogin: (accessToken: string) => Promise<void>;
}

const GoogleAuth: FC<GoogleAuthProps> = ({ googleLogin }) => {
  const onRender = ({ onClick }: { onClick: () => void }): JSX.Element => (
    <motion.button
      className={classes.googleButton}
      type='button'
      onClick={onClick}
      whileTap={{ scale: 0.8 }}
      whileHover={{ backgroundColor: '#303f9f' }}
    >
      <GoogleIcon /> &nbsp; Google Sign In
    </motion.button>
  );

  const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) =>
    googleLogin((res as GoogleLoginResponse).accessToken);

  return (
    <GoogleLogin
      clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      render={onRender}
      onSuccess={onSuccess}
      cookiePolicy='single_host_origin'
    />
  );
};

export default GoogleAuth;
