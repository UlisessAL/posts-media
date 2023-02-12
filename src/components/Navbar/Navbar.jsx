import { useAuthContext } from "../context/authContext";

const Navbar = () => {
  const { logout } = useAuthContext();
  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};
export default Navbar;
