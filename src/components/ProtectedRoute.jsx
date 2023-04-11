import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./Loading";
function ProtectedRoute() {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(true);
    }

  }, []);
  return user ? <Outlet /> : <Loading />;
}

export default ProtectedRoute;