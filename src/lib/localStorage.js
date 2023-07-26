export const fetchFromStorage = (type) => {
  if (typeof window === 'undefined') return;

  const list = window.localStorage.getItem(type);

  return list ? JSON.parse(list) : [];
};

export const persistToStorage = (type, data) => {
  if (typeof window === 'undefined') return;

  const stringified = JSON.stringify(data);

  window.localStorage.setItem(type, stringified);
};

export const removeFromStorage = (type) => {
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(type);
};
