export function matchPath(path) {
  // Remove trailing slashes and normalize
  const normalizedPath = path.replace(/\/+$/, '');
  
  if (normalizedPath === '' || normalizedPath === '/') return 'index';

  const segments = normalizedPath.split('/').filter(Boolean);
  
  // Explicit route matching
  if (segments[0] === 'posts') {
    if (segments[1] === 'new') return 'posts/new';
    if (segments[1] && segments.length === 2) return 'posts/[id]';
  }

  return null;
}
