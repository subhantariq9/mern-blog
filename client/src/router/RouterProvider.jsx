import React, { useEffect, useState, createContext } from 'react';
import { matchPath } from './fileMatcher';

export const RouterContext = createContext();

export default function RouterProvider({ children }) {
  const [Component, setComponent] = useState(null);

  const loadRoute = async () => {
    const path = window.location.pathname;
    const route = matchPath(path);
    if (!route) return setComponent(() => () => <div>404</div>);
    const module = await import(`../pages/${route}.jsx`);
    setComponent(() => module.default);
  };

  useEffect(() => {
    loadRoute();
    window.onpopstate = loadRoute;
  }, []);

  return (
    <RouterContext.Provider value={{ navigate: (to) => {
      window.history.pushState({}, '', to);
      loadRoute();
    }}}>
      {Component ? <Component /> : <div>Loading...</div>}
    </RouterContext.Provider>
  );
}
