import React, { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth/react-native";
import { auth } from "../firebase";
import { chatkitty } from "../chatkitty";
import { Alert } from "react-native";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        login: async (email, password) => {
          setLoading(true);

          if (email == "" || password == "") {
            Alert.alert("Please provide email and password");
            setLoading(false);
          } else {
            try {
              const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
              );

              // Signed-in Firebase user
              const currentUser = userCredential.user;

              const result = await chatkitty.startSession({
                username: currentUser.uid,
                authParams: {
                  idToken: await currentUser.getIdToken(),
                },
              });

              if (result.failed) {
                Alert.alert("could not login");
              }
            } catch (error) {
              Alert.alert(error);
            } finally {
              setLoading(false);
            }
          }
        },

        register: async (displayName, email, password) => {
          setLoading(true);

          if (displayName == "" || email == "" || password == "") {
            Alert.alert("Please provide email, password and name");
            setLoading(false);
          } else {
            try {
              const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
              );

              await updateProfile(auth.currentUser, {
                displayName: displayName,
              });

              // Signed-in Firebase user
              const currentUser = userCredential.user;

              const startSessionResult = await chatkitty.startSession({
                username: currentUser.uid,
                authParams: {
                  idToken: await currentUser.getIdToken(),
                },
              });

              if (startSessionResult.failed) {
                Alert.alert("Could not sign up");
              }
            } catch (error) {
              Alert.alert(error);
              console.error(error);
            } finally {
              setLoading(false);
            }
          }
        },
        logout: async () => {
          try {
            await chatkitty.endSession();
          } catch (error) {
            console.error(error);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
