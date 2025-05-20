import { useEffect } from "react";

const RedirectUser = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
    }
  }, []);

  return null;
};

export default RedirectUser;
