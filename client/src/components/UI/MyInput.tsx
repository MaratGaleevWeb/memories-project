import { FC, ChangeEvent, KeyboardEvent } from 'react';

import classes from './MyInput.module.scss';

interface MyInputProps {
  title: string;
  value: string | string[];
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const MyInput: FC<MyInputProps> = ({ title, value, handleChange, handleKeyPress }) => (
  <div className={classes.inputWrap}>
    <input
      className={classes.input}
      name={title}
      id={title}
      placeholder=' '
      value={value}
      type='text'
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
    <label className={classes.label} htmlFor={title}>
      {title[0].toUpperCase() + title.slice(1)}
    </label>
  </div>
);

export default MyInput;
