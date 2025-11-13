import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // redirect if no token
        return;
      }

      try {
        const res = await fetch("http://localhost:5279/api/Auth/validate", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          navigate("/login"); // redirect if token invalid
        }
      } catch {
        navigate("/login"); // redirect if server error
      }
    };

    validateToken();
  }, [navigate]);
};

export default useAuth;
