import "antd/dist/antd.css";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AddCar from "./pages/AddCar";
import AdminHome from "./pages/AdminHome";
import BookingCar from "./pages/BookingCar";
import EditCar from "./pages/EditCar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBookings from "./pages/UserBookings";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute />} >
            <Route path="" element={<Home />} />
            <Route path="/booking/:id" element={<BookingCar />} />
            <Route path="/userbookings" element={<UserBookings />} />
            <Route path="/addcar" element={<AddCar />} />
            <Route path="/editcar/:carid" element={<EditCar />} />
            <Route path="/admin" element={<AdminHome />} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


