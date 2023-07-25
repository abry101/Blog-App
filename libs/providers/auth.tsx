"use client";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useReducer,
  useRef,
  useMemo,
} from "react";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User as GoogleUser,
} from "firebase/auth";
import {
  ActionType,
  AuthContextType,
  SigninFormData,
  SignupFormData,
  StateType,
} from "@/types";
import { httpGetUser, httpSignup, httpUpdateUser } from "../https/auth";
import {
  ERROR_ALREADY_VERIFIED,
  ERROR_VERIFICATION_TIMEOUT,
} from "@/utils/my_errors";

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  gUser: null,
  error: null,
  signin: () => {},
  signup: () => {},
  signout: () => {},
  verify: () => {},
  clear: () => {},
  loading: false,
});

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const [{ user, gUser, error, loading, enableAuthOnChange }, dispatch] =
    useReducer(authReducer, {
      user: null,
      gUser: null,
      loading: true,
      error: null,
      enableAuthOnChange: true,
    });

  function authReducer(current: StateType, action: ActionType) {
    return {
      ...current,
      ...action.payload,
    };
  }

  // console.log("counter :>> ", counter);

  const startTimer = useCallback((delay: number = 5000) => {
    intervalRef.current = setInterval(() => {
      setCounter((prev) => prev + 5);
    }, delay);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setCounter(0);
    }
  }, []);

  const signin = useCallback((data: SigninFormData) => {
    dispatch({ payload: { loading: true, error: null } });
    signInWithEmailAndPassword(auth, data.email, data.password).catch((err) => {
      dispatch({ payload: { loading: false, error: err } });
    });
  }, []);

  const signup = useCallback(async (data: SignupFormData) => {
    try {
      dispatch({
        payload: { loading: true, error: null, enableAuthOnChange: false },
      });
      const { name, email, password } = data;
      const { user: _gUser } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid, emailVerified, photoURL } = _gUser;
      const _dUser = await httpSignup({
        uid,
        name,
        email,
        password,
        emailVerified,
        photoURL,
      });

      dispatch({
        payload: {
          user: _dUser,
          gUser: _gUser,
          loading: false,
        },
      });
    } catch (err) {
      dispatch({
        payload: {
          loading: false,
          error: err as Error,
        },
      });
    }
  }, []);

  const verify = useCallback(async (_gUser: GoogleUser) => {
    try {
      dispatch({ payload: { error: null, loading: true } });
      if (!_gUser.emailVerified) {
        await sendEmailVerification(_gUser);
        startTimer();
      } else {
        dispatch({
          payload: { error: ERROR_ALREADY_VERIFIED, loading: false },
        });
      }
    } catch (err) {
      stopTimer();
      dispatch({
        payload: { error: err as Error, loading: false },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(async () => {
    try {
      if (counter >= 120) {
        console.log("Verification >> timeout! :>> ");
        stopTimer();
        dispatch({
          payload: { error: ERROR_VERIFICATION_TIMEOUT, loading: false },
        });
      } else if (auth.currentUser?.emailVerified && counter >= 5) {
        console.log("Verification >> user is verified :>> ");
        const _gUser = auth.currentUser;
        const token = await _gUser.getIdToken();
        const _dUser = await httpUpdateUser(
          { uid: _gUser.uid, emailVerified: true },
          _gUser.uid,
          token
        );
        dispatch({
          payload: {
            user: _dUser,
            gUser: _gUser,
            loading: false,
          },
        });
        stopTimer();
      } else if (counter >= 5) {
        console.log("Reload >> at :>> ", `${counter}'s`);
        //Reload every 5 second until 120 seconds
        await auth.currentUser?.reload();
      }
    } catch (err) {
      dispatch({
        payload: { error: err as Error, loading: false },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  const signout = async () => {
    console.log("<<<<<<<::          SIGNOUT CALLED           ::>>>>>>>");
    dispatch({ payload: { error: null, loading: true } });
    await signOut(auth).catch((err) => {
      dispatch({ payload: { error: err, loading: false } });
    });
    dispatch({
      payload: { user: null, gUser: null, loading: false },
    });
  };

  function clearError() {
    console.log("<<<<<<<::          CLEAR CALLED           ::>>>>>>>");
    dispatch({ payload: { error: null, loading: false } });
  }

  useEffect(() => {
    // try {
    console.log("<<<<<<<::     useEffect CALLED     ::>>>>>>>");
    const unsubscribe = onAuthStateChanged(auth, (_gUser) => {
      if (enableAuthOnChange && !user) {
        if (_gUser?.emailVerified) {
          _gUser
            .getIdToken()
            .then((token) => {
              httpGetUser(_gUser.uid, token)
                .then((_dUser) => {
                  dispatch({
                    payload: { user: _dUser, gUser: _gUser, loading: false },
                  });
                })
                .catch((e) => {
                  console.log("useEffect >> httpGetUser >> Error :>> ", e);
                  signout();
                });
            })
            .catch((e) => {
              console.log("useEffect >> getIdToken >> Error :>> ", e);
              signout();
            });
        } else
          dispatch({
            payload: { gUser: _gUser, loading: false },
          });
      }
    });
    return unsubscribe;
    // } catch (err) {
    //   console.log("useEffect >> Error :>> ", err);
    //   dispatch({
    //     payload: { error: err as Error, loading: false },
    //   });
    //   signout();
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableAuthOnChange]);

  const value = {
    user,
    gUser,
    error,
    signin,
    signup,
    signout,
    verify,
    clear: clearError,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
//
