import React, { createContext, useContext, useEffect, useState } from 'react';
import { oneOfType, object, array } from 'prop-types';
import { useLocation } from 'react-router-dom';

export interface DisplayProp {
  isHomepage: boolean;
  setIsHomepage;
}
export const DisplayModeContext = createContext({} as DisplayProp);

export const DisplayModeProvider = props => {
  const enrichedDisplayMode = useDisplayModeProvider();
  return <DisplayModeContext.Provider value={enrichedDisplayMode}>{props.children}</DisplayModeContext.Provider>;
};

DisplayModeProvider.propTypes = {
  children: oneOfType([object, array]).isRequired,
};

export const useDisplayMode = () => useContext(DisplayModeContext);

const useDisplayModeProvider = () => {
  const location = useLocation();

  const [isHomepage, setIsHomepage] = useState(false);

  useEffect(() => {
    if (location.pathname === '/' && !isHomepage) {
      setIsHomepage(true);
    }
  }, [location.pathname]);

  return { isHomepage, setIsHomepage };
};
