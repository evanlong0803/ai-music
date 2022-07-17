export const getLocalStorage = (name: string) => {
  const data = localStorage.getItem(name) as string;
  return JSON.parse(data);
};

export const setLocalStorage = (name: string, dataSource: string) => {
  const data = JSON.stringify(dataSource);
  localStorage.setItem(name, data);
};
