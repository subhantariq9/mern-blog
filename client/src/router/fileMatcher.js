export function matchPath(path) {
    if (path === '/') return 'index';
    const segments = path.split('/').filter(Boolean);
    if (segments[0] === 'posts' && segments[1]) return 'posts/[id]';
    if (segments[0] === 'posts' && segments[1] === 'new') return 'posts/new';
    return null;
  }
  