import React, { createContext, useEffect, useState } from "react";
import firebase, { db, auth } from "../../firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // console.log(currentUserId);

  const signUp = async (email, password, name) => {
    const userCredentials = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await db.collection("users").doc(userCredentials.user.uid).set({
      email: email,
      name: name,
      favorites: [],
    });
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const signOut = () => {
    return auth.signOut();
  };

  const getCurrentUser = () => {
    if (currentUserId) {
      db.collection("users")
        .doc(currentUserId)
        .get()
        .then((doc) => {
          let data = doc.data();
          setCurrentUser(data);
          // console.log(currentUser);
        });
    }
  };

  const addToFavorites = async (id) => {
    if (currentUserId) {
      let favoriteRef = db.collection("users").doc(currentUserId);
      let res = await favoriteRef.update({
        favorites: firebase.firestore.FieldValue.arrayUnion(id),
      });
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(user);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        currentUserId,
        login,
        resetPassword,
        signOut,
        currentUser,
        setCurrentUser,
        getCurrentUser,
        addToFavorites,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
