import { FirebaseError } from "firebase/app";

export function firebaseErrorMessage(error: FirebaseError | null) {
  switch (error?.code) {
    case "auth/invalid-email":
      return "Sorry, your email is Invalid";
    case "auth/wrong-password":
      return "Oops, wrong password";
    case "auth/user-not-found":
      return "Sorry, your email/password is Incorrect";
    case "auth/email-already-exists":
      return "Sorry, this email already exists";
    case "auth/id-token-expired":
      return "Sorry, your session has Expired!";
    case "auth/id-token-revoked":
      return "Sorry, your access has been revoked, pls contact your admin!";
    default:
      return "Oops sorry, something went wrong. pls try again!";
  }
}
// auth/invalid-email
// auth/wrong-password
// auth/user-not-found
// auth/email-already-exists
// auth/id-token-expired
// auth/id-token-revoked
// database/error
// storage/error
