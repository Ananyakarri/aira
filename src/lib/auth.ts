export const setToken = (token: string) => {
  localStorage.setItem("aira_token", token);
};

export const getToken = () => {
  return localStorage.getItem("aira_token");
};

export const removeToken = () => {
  localStorage.removeItem("aira_token");
};

export const isAuthenticated = () => {
    console.log(localStorage.getItem("aira_token"));
  return !!localStorage.getItem("aira_token");
};
