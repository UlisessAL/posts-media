import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import "../scss/navbar.scss"

const Navbar = () => {
  const { logout, currentUser } = useAuthContext();
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    setPhoto(currentUser.photoURL)
  }, [currentUser])
  return (
    <div className="nav-wrapper">
      <div className="user">
        <img src={photo} alt={photo} />
        <span>{currentUser.displayName}</span>
      </div>
      <div className="logout-btn">
      <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
};
export default Navbar;
