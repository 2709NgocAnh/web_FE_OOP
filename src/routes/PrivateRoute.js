import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import * as registerService from "~/admin/services/registerService";
import { useState } from "react";

function PrivateRoutes({ children }) {
  const [role, setRole] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await registerService.getRegister();
      setRole(response.account.role);
    };
    fetchApi();
  }, [role]);
  return role === "admin" ? children : <Navigate to="/sign-in" />;
}

export default PrivateRoutes;
