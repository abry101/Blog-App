import { User as DBUser } from "@prisma/client";
import { User as GoogleUser } from "firebase/auth";

export type ParamsType = {
  params?: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type AuthStatus =
  | "Authenticated"
  | "PendingVerification"
  | "NotAuthenticated";

export type SignupFormData = {
  uid?: string;
  name: string;
  email: string;
  password: string;
  emailVerified?: boolean;
  photoURL?: string | null;
};
export type SigninFormData = {
  email: string;
  password: string;
};

export interface SignupProps {
  email: string;
  password: string;
}
export interface LoginProps {
  email: string;
  password: string;
}
export interface AuthContextType {
  user: DBUser | null;
  gUser: GoogleUser | null;
  error: Error | null;
  signup: (data: SignupFormData) => void;
  signin: (data: SigninFormData) => void;
  signout: () => void;
  verify: (u: GoogleUser) => void;
  clear: () => void;
  loading: boolean;
}

export type StateType = {
  user: DBUser | null;
  gUser: GoogleUser | null;
  loading: boolean;
  error: Error | null;
  enableAuthOnChange: boolean;
};

export type PayloadType = {
  user?: DBUser | null;
  gUser?: GoogleUser | null;
  loading?: boolean;
  error?: Error | null;
  enableAuthOnChange?: boolean;
};

export type ActionType = {
  payload: PayloadType;
};

export class CustomError extends Error {
  public name: string;
  constructor(message: string, name?: string) {
    super(message);
    this.name = name || this.constructor.name;
  }
}

export interface Post {
  id: number;
  title: string;
  body: string;
  photoUrl?: string;
  authorId: number;
  categoryId: number;
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  tags: Tag[];
  category: Category;
  comments: Comment[];
  author: User;
}

export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
}
export interface Tag {
  id: number;
  name: string;
}
export interface User {
  id: number;
  uid: string;
  name?: string;
  email: string;
  password: string;
  emailVerified: boolean;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

// export interface ServiceAccounts extends ServiceAccount {
//   type?: string;
//   private_key_id?: string;
//   client_id?: string;
//   auth_uri?: string;
//   token_uri?: string;
//   auth_provider_x509_cert_url?: string;
//   client_x509_cert_url?: string;
//   universe_domain?: string;
// }
