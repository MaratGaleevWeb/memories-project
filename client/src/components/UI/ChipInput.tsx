import { FC, useState, useRef, KeyboardEvent, Dispatch, SetStateAction, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';

import classes from './ChipInput.module.scss';

import CrossIcon from '../../images/icons/CrossIcon';

interface ChipInputProps {
  title: string;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

const ChipInput: FC<ChipInputProps> = ({ title, tags, setTags }) => {
  const [input, setInput] = useState('');
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const deleteTag = (index: number): void =>
    setTags((prevState) => prevState.filter((_, i) => i !== index));

  const handleKeyUp = (): void => setIsKeyReleased(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>): void => {
    const trimmedInput = input.trim();

    const isInputValid = (): boolean =>
      (key === ',' || key === 'Enter' || key === ' ') &&
      !!trimmedInput.length &&
      !tags.includes(trimmedInput);

    if (isInputValid()) {
      setTags((prev) => [...prev, trimmedInput]);
      setInput('');
    }

    if (key === 'Backspace' && !input.length && tags.length && isKeyReleased) {
      const lastTag = tags.length - 1;

      setInput(tags[lastTag]);
      setTags(tags.slice(0, lastTag));
    }
    setIsKeyReleased(false);
  };

  const focus = () => ref?.current?.focus();

  return (
    <div className={classes.inputWrap} onClick={focus}>
      {tags.map((tag, index) => (
        <motion.span
          className={classes.tag}
          key={tag}
          whileTap={{ scale: 0.8 }}
          whileHover={{ backgroundColor: 'rgb(206, 206, 206)' }}
        >
          {tag}
          <motion.button onClick={() => deleteTag(index)} whileHover={{ color: '#474747' }}>
            <CrossIcon />
          </motion.button>
        </motion.span>
      ))}
      <input
        className={classes.input}
        name={title}
        id={title}
        value={input}
        ref={ref}
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type='text'
      />
      <label className={classes.label} htmlFor={title}>
        {title[0].toUpperCase() + title.slice(1)}
      </label>
    </div>
  );
};

export default observer(ChipInput);
