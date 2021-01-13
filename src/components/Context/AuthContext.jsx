import React, { createContext, useEffect, useState } from "react";
import firebase, { db, auth } from "../../firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [favoritesRecipeId, setFavoritesRecipeId] = useState([]);

  // console.log("Current User Id In Context:", currentUserId);
  // console.log("Current User In Context:", currentUser);
  // console.log("Favorites Recipes Id:", favoritesRecipeId);

  //Firebase Sign Up
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

  //Firebase LogIn
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  //Firebase Reset Password
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  //Firebase Sign Out
  const signOut = () => {
    return auth.signOut();
  };

  //GET USER
  //When there is a Current User Id, Fire the Function Bellow (getCurrentUser)
  useEffect(() => {
    if (currentUserId) {
      getCurrentUser();
    }
  }, [currentUserId]);
  //Get The Current User
  const getCurrentUser = () => {
    if (currentUserId) {
      db.collection("users")
        .doc(currentUserId)
        .get()
        .then((doc) => {
          let data = doc.data();
          setCurrentUser(data);
        });
    }
  };

  //FAVORITE RECIPES IDS
  //When there is a Current User, Fire the Function Bellow (getFavoritesRecipesIdFromUser)
  useEffect(() => {
    if (currentUser) {
      getFavoritesRecipesIdFromUser();
    }
  }, [currentUser]);

  //Access Current User's Favorites Recipes And Set It
  const getFavoritesRecipesIdFromUser = () => {
    if (currentUser) {
      let stringId;
      if (currentUser.favorites.length === 1) {
        stringId = currentUser.favorites[0].toString();
        setFavoritesRecipeId(stringId);
        console.log("Favorites Recipes", favoritesRecipeId);
      } else {
        stringId = currentUser.favorites.join();
        setFavoritesRecipeId(stringId);
        console.log("Favorites Recipes", favoritesRecipeId);
      }
    }
  };

  //Add Recipe Id to Favorites when the OnClick is Fire
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
        favoritesRecipeId,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
