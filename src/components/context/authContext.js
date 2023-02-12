import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../services/firebase";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

export const useAuthContext = () => {
  const context = useContext(authContext);
  return context;
};


export const AuthProvider = ({children}) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(currentUser);
    });

    return () => {
      unsub()
    }
  },[currentUser]);

  const register = async (email, password) => {
    try{
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigate("/");
      return response;
    }
    catch{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error has ocurred while creating the user, check out if your email is valid and if your password is long enough',
        
    });
    }
  };

  const login = async (email, password) => {
    try{
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigate("/");
      return response;
    }
    catch{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email or/and password invalid',
    })
    }
  };

  const logout = async () => {
    const response = await signOut(auth);
    console.log(response);
    return response;
  }


  return <authContext.Provider value={{currentUser, register, login, logout}}>
    {children}
  </authContext.Provider>


}
