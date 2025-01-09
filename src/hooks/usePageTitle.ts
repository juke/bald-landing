import { useEffect } from 'react';

const usePageTitle = (title: string) => {
  useEffect(() => {
    const baseTitle = '$BALD - A Memecoin Revolution';
    document.title = title ? `${baseTitle} | ${title}` : baseTitle;

    return () => {
      document.title = baseTitle;
    };
  }, [title]);
};

export default usePageTitle; 