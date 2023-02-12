import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import "../scss/log.scss";

const Login = () => {
  const {login} = useAuthContext();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try{
      await login(email, password);
    } 
    catch{  
      setError(true);
    }
  }

  return (
    <>
      <div className="form-container">
        <div className="form-wrapper">
          <span className="logo">Toastity</span>
          <span className="title">Login</span>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="example@email.com" />
            <input type="password" placeholder="Password"/>
            <button>Sign in</button>
            {error && <span>Something went wrong</span>}
          </form>
          <p>You do not have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </>
  )
}
export default Login