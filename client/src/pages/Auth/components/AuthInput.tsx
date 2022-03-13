import { FC, ChangeEvent, RefObject } from 'react';
import { observer } from 'mobx-react-lite';

import classes from './AuthInput.module.scss';

import Visibility from '../../../images/icons/Visibility';
import VisibilityOff from '../../../images/icons/VisibilityOff';

import type { TUserInputTitle } from '../../../stores/usersStore/user.model';

interface AuthInputProps {
  title: TUserInputTitle;
  value: string;
  innerRef?: RefObject<HTMLInputElement>;
  type?: string;
  error?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleShowPassword?: () => void;
}

const AuthInput: FC<AuthInputProps> = ({
  title,
  value,
  innerRef,
  type,
  error,
  handleChange,
  handleShowPassword,
}) => (
  <div className={classes.inputWrap}>
    <input
      className={classes.input}
      placeholder=' '
      required
      id={title}
      name={title}
      value={value}
      ref={innerRef}
      type={type || 'text'}
      onChange={handleChange}
    />
    <label className={classes.label} htmlFor={title}>
      {title[0].toUpperCase() + title.slice(1)}
    </label>
    {title === 'password' && (
      <button type='button' onClick={handleShowPassword}>
        {type === 'password' ? <Visibility /> : <VisibilityOff />}
      </button>
    )}
    {error && <p className={classes.error}>{error}</p>}
  </div>
);

export default observer(AuthInput);
