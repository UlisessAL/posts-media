import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import "../scss/navbar.scss"

const Navbar = () => {
  const { logout, currentUser } = useAuthContext();
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("")

  useEffect(() => {
    setPhoto(currentUser.photoURL)
    setName(currentUser.displayName);
  }, [currentUser])

  return (
    <div className="nav-wrapper">
      <div className="user">
        <img src={photo} alt={photo} />
        <span>{name}</span>
      </div>
      <div className="logout-btn">
      <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
};
export default Navbar;
