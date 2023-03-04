import "./App.css";
import Login from "./pages/signIn/Login";
import SignUp from "./pages/signUp/SignUp";
import Account from "./pages/Account/Account";
import { Routes, Route } from "react-router-dom";
import { Authenticated, RequireToken } from "./Authentication";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import TrackOrder from "./pages/TrackOrder/TrackOrder";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        {/* protected from visiting when authenticated */}
        <Route element={<Authenticated />}>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
        {/* protected route */}
        <Route element={<RequireToken />}>
              <Route path="/profile" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/track-order" element={<TrackOrder />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
