export const stringifyCatchAllDynamicRoute = (
  route: string | string[] | undefined
): string => {
  if (!route) return '';
  if (Array.isArray(route)) return route.join('/');
  return route;
};
