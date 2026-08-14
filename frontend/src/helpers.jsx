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

  if (!user?.name) return null;

  const names = user.name.trim().split(/\s+/);

  if (names.length === 1) {
    return names[0][0].toUpperCase();
  }

  return `${names[0][0]}${names[1][0]}`.toUpperCase();
};

export const getDay = () => {
  const today = new Date();
  return today.toLocaleDateString();
};

export const capitalizeFirst = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
