import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Loading() {
  const [count, setCount] = React.useState(5)
  const navigate = useNavigate();
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount(count - 1)
    }, 1000);
    if (count === 0) navigate("/login")
    return () => clearInterval(timer);
  }, [count]);
  return (
    <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <div>
        <h2 style={{ color: "white" }}>hey there, you need to log in to visit here!!</h2>
        <h3 style={{ color: "red" }}>{`i am taking you to the login page in,${count} second`}</h3>
      </div>
    </div>
  )
}
