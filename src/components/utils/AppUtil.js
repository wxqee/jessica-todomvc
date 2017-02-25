export const isActiveMode = () => {
  return location.hash.indexOf('#/active') === 0;
};

export const isCompletedMode = () => {
  return location.hash.indexOf('#/completed') === 0;
};
