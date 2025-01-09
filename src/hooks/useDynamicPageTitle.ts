import { useEffect } from 'react';
import { useActiveSection } from './useActiveSection';

const useDynamicPageTitle = () => {
  const activeSection = useActiveSection();

  useEffect(() => {
    const baseTitle = '$BALD - A Memecoin Revolution';
    const titles: Record<string, string> = {
      'home': baseTitle,
      'public-good': `${baseTitle} | Public Good`,
      'distribution': `${baseTitle} | Distribution`,
      'progress': `${baseTitle} | Progress Tracker`,
    };

    document.title = titles[activeSection] || baseTitle;

    return () => {
      document.title = baseTitle;
    };
  }, [activeSection]);
};

export default useDynamicPageTitle; 