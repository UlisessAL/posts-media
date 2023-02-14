import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { Link } from "react-router-dom";
import { db, storage } from "../../services/firebase";
import { useAuthContext } from "../context/authContext";
import "../scss/log.scss";

const Register = () => {
  const {register} = useAuthContext();
  const [error, setError] = useState(false);
  const [fileChange, setFileChange] = useState(false);

  const handleChangeFile = () => {
    setFileChange(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try{
      const res = await register(email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try{
            // Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL:downloadURL,
            });
            // Create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL:downloadURL,
            });
          } 
          catch (err){
            console.log(err);
            setError(true);
          }
        })
      })
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
          <span className="title">Register</span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Display name" required />
            <input type="email" placeholder="example@email.com" required />
            <input type="password" placeholder="Password must have 8 characters at least" required />
            <input type="file" style={{ display: "none" }} id="file" onChange={handleChangeFile}/>
            <label htmlFor="file">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-file-plus"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
              <span>Add an avatar</span>
            </label>
            <button  disabled={!fileChange}>Sign up</button>
            {error && <span>Something went wrong</span>}
          </form>
          <p>
            You do have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Register;
