export const setLocalStorage = (name: string, content: any) => {
  localStorage.setItem(name, JSON.stringify(content));
};
export const getLocalStorage = (name: string) => {
  return JSON.parse(localStorage.getItem(name)!);
};
