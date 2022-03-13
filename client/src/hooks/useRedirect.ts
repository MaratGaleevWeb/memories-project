import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type TUseRedirect = () => void;

const useRedirect: TUseRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeOut = setTimeout(() => navigate('/posts'), 4000);
    return () => clearTimeout(timeOut);
  }, []);
};

export default useRedirect;
