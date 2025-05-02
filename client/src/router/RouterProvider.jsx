import React, { useEffect, useState, createContext } from 'react';
import { matchPath } from './fileMatcher';

export const RouterContext = createContext();

export default function RouterProvider({ children }) {
  const [Component, setComponent] = useState(null);
  const [error, setError] = useState(null);

  const loadRoute = async () => {
    const path = window.location.pathname;
    const route = matchPath(path);
    console.log('Current path:', path);
    console.log('Matched route:', route);
    
    if (!route) {
      console.log('No route matched, showing 404');
      setComponent(() => () => <div>404 - Page Not Found</div>);
      return;
    }

    try {
      const modulePath = `../pages/${route}.jsx`;
      console.log('Attempting to load module:', modulePath);
      const module = await import(modulePath);
      
      if (!module.default) {
        throw new Error(`No default export in ${modulePath}`);
      }
      
      setComponent(() => module.default);
      setError(null);
    } catch (error) {
      console.error('Failed to load route:', error);
      setError(error.message);
      setComponent(() => () => (
        <div style={{ color: 'red', padding: '20px' }}>
          <h2>Error Loading Page</h2>
          <pre>{error.message}</pre>
        </div>
      ));
    }
  };

  useEffect(() => {
    loadRoute();
    window.onpopstate = loadRoute;
    return () => {
      window.onpopstate = null;
    };
  }, []);

  return (
    <RouterContext.Provider value={{ 
      navigate: (to) => {
        window.history.pushState({}, '', to);
        loadRoute();
      },
      error 
    }}>
      {Component ? <Component /> : <div>Loading...</div>}
    </RouterContext.Provider>
  );
}
