export const getToken = () => {
  return localStorage.getItem('token');
}

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export const getUserName = () => {
  const user = getUser();
  return user ? user.name : null;
};

export const getUserEmail = () => {
  const user = getUser();
  return user ? user.email : null;
};

export const getInitials = () => {
  const user = getUser();
  return user ? `${user.name.split(' ')[0][0]}${user.name.split(' ')[1][0]}` : null;
};

export const getDay = () => {
  const today = new Date();
  return today.toLocaleDateString();
};

export const capitalizeFirst = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
