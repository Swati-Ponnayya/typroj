import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useContext } from "react";
import { auth } from "./firebase";
import { useState } from "react";

const UserContext = createContext();

export const AuthContextProvider = ({ child }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe()
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user }}>
      {child}
    </UserContext.Provider>
  )
}
export const UserAuth = () => {
  return useContext(UserContext)
}