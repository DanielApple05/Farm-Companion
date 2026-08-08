import { useNavigate } from "react-router-dom";

export const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 15) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

export const useLogout = (navigate) => {
  localStorage.clear();
   navigate('/auth');
};