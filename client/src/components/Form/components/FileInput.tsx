import { FC, MouseEvent as ReactMouseEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';

import classes from './FileInput.module.scss';

interface FileInputProps {
  image: Blob | string;
  handleFile: (selectedFile: Blob) => void;
}

const FileInput: FC<FileInputProps> = ({ image, handleFile }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: ([acceptedFile]) => handleFile(acceptedFile),
  });

  const imageSrc =
    typeof image === 'object'
      ? URL.createObjectURL(image)
      : `${process.env.REACT_APP_API_URL}/images/${image}`;

  const stopPropagation = (e: ReactMouseEvent<HTMLLabelElement, MouseEvent>) => e.stopPropagation();

  return (
    <>
      {/*// @ts-expect-error: Combining motion.div with rootProps might result in an error */}
      <motion.div
        className={classes.container}
        animate={isDragActive ? { scale: 1.1, borderColor: '#f50057' } : {}}
        {...getRootProps()}
      >
        <input id='fileInput' {...getInputProps()} />
        <label className={classes.label} htmlFor='fileInput' onClick={stopPropagation}>
          Drag and drop a picture here, or click to select one
        </label>
        {image && <img className={classes.img} src={imageSrc} />}
      </motion.div>
    </>
  );
};

export default observer(FileInput);
