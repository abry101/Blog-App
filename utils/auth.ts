import { User as GoogleUser } from "firebase/auth";
import { User as DBUser } from "@prisma/client";
type StateType = {
  user: DBUser | null;
  gUser: GoogleUser | null;
  loading: boolean;
  error: Error | null;
};
type PayloadType = {
  user?: DBUser | null;
  gUser?: GoogleUser | null;
  loading?: boolean;
  error?: Error | null;
};
type ActionType = {
  payload: PayloadType;
};
export default function authReducer(current: StateType, action: ActionType) {
  return {
    ...current,
    ...action.payload,
  };
}
// export default function authReducer(current: StateType, action: ActionType) {
//   switch (action.type) {
//     case "signin": {
//       return {
//         ...current,
//         ...action.payload,
//       };
//     }
//     case "signup": {
//       return {
//         ...current,
//         ...action.payload,
//       };
//     }
//     case "verify": {
//       return {
//         ...current,
//         ...action.payload,
//       };
//     }
//     case "signout": {
//       return {
//         user: null,
//         gUser: null,
//         loading: false,
//         error: null,
//       };
//     }
//   }
// }

// export function isUserVerified(params:type) {
//   auth.onAuthStateChanged(async (_gUser) => {
//     if (_gUser && _gUser.emailVerified) {
//       const { uid, emailVerified } = _gUser;
//       const token = await _gUser.getIdToken();
//       const _dUser = await httpUpdateUser(
//         { uid, emailVerified },
//         uid,
//         token
//       );
//       clearInterval(interval);
//       dispatch({
//         type: "verify",
//         payload: {
//           user: _dUser,
//           gUser: _gUser,
//           loading: false,
//         },
//       });
//     }
//   });
// }
