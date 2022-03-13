import { FC, useState, useEffect, useRef, useContext, KeyboardEvent, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { Context } from '../..';

import classes from './Home.module.scss';
import useObserver from '../../hooks/useObserver';

import Form from '../../components/Form/Form';
import Posts from '../../components/Posts/Posts';
import MyInput from '../../components/UI/MyInput';
import ChipInput from '../../components/UI/ChipInput';
import MotionWrapper from '../../components/UI/FramerMotion/MotionWrapper';

const Home: FC = () => {
  const { postsStore } = useContext(Context);

  const { numberOfPages, isLoading, sortedPosts } = postsStore;
  const { setPosts, setErrors, getBySearch, getByPage } = postsStore;

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const ref = useRef<HTMLLIElement>(null);

  useObserver(ref, page < numberOfPages, isLoading, () => setPage(page + 1));

  useEffect(() => {
    search.trim() || tags.length
      ? getBySearch(search || 'none', tags.join(','), page)
      : getByPage(page);
  }, [page]);

  useEffect(() => {
    return () => {
      setPosts([]);
      setErrors({});
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value);

  const handleKeyPress = async ({ key }: KeyboardEvent<HTMLInputElement>): Promise<void> => {
    key === 'Enter' && (await handleSearch());
  };

  const handleSearch = async (): Promise<void> => {
    if (search.trim() || tags.length) {
      setPosts([]);
      page === 1 ? await getBySearch(search || 'none', tags.join(','), page) : setPage(1);
    }
  };

  return (
    <MotionWrapper className={classes.container}>
      <Posts posts={sortedPosts} isLoading={isLoading} innerRef={ref} />
      <aside className={classes.aside}>
        <div className={classes.appBarSearch}>
          <MyInput
            title='Search Memories'
            value={search}
            handleChange={handleChange}
            handleKeyPress={handleKeyPress}
          />

          <ChipInput title='Search tags' tags={tags} setTags={setTags} />

          <motion.button
            className={classes.searchButton}
            type='button'
            onClick={handleSearch}
            whileHover={{ backgroundColor: '#303f9f' }}
            whileTap={{ scale: 0.8 }}
          >
            Search
          </motion.button>
        </div>
        <Form />
      </aside>
    </MotionWrapper>
  );
};

export default observer(Home);
