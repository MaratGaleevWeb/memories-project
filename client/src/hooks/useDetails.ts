import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

type TUseDetails = <T extends { _id: string; tags: string[] }>(
  post: T,
  getByIdFunc: (postId: string) => Promise<void>,
  getBySearchFunc: (query: string, tags: string, page: number) => Promise<void>,
  cleanUpFunc: () => void,
) => void;

const useDetails: TUseDetails = ({ _id, tags }, getByIdFunc, getBySearchFunc, cleanUpFunc) => {
  const { id: postId } = useParams<{ id: string }>();

  useEffect(() => {
    getByIdFunc(postId!);

    return cleanUpFunc;
  }, [postId]);

  useEffect(() => {
    _id && getBySearchFunc('none', tags ? tags.join(',') : '', 1);
  }, [_id]);
};
export default useDetails;
