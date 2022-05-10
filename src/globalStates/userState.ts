import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup as $signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { auth } from "@/lib/firebase";

type UserState = User | null;

const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const sigInInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return $signInWithPopup(auth, provider);
};

export const createUserWithEmailAndPassword = (email: string, password: string) => {
  return _createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const useAuthState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [setUser]);

  return isLoading;
};

export const useUserState = () => {
  return useRecoilValue(userState);
};
