import React, {useState, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            const response = await auth().signInWithEmailAndPassword(email, password);
            return response
          } catch (err) {
            return err;
          }
        },
        register: async (email, password) => {
          try {
           const response = await auth().createUserWithEmailAndPassword(email, password);
           return response
          } catch (err) {
            return err;
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (err) {
            console.log(err);
            return err;
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
