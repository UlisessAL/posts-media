import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { useAuthContext } from "./components/context/authContext";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const { currentUser } = useAuthContext();

  const ProtectedRoot = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <>
      {currentUser && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoot>
              <Home />
            </ProtectedRoot>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
