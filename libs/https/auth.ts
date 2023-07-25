import { SignupFormData } from "@/types";
import { User } from "@prisma/client";
import { hashSync, genSaltSync } from "bcryptjs";

export async function httpSignup(v: SignupFormData): Promise<User> {
  try {
    const pass = hashSync(v.password, genSaltSync(11));
    const res = await fetch("http://localhost:3000/api/adduser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...v, password: pass }),
    });
    const result = await res.json();
    if (result?.ok) {
      return result.data as User;
    } else {
      console.log("httpSignup >> Error :>> ", result.error || result?.message);
      if (result?.error) throw result.error as Error;
      throw new Error(result?.message);
    }
  } catch (error) {
    console.log("httpSignup >> catch >>Error :>> ", error);
    throw error;
  }
}

export async function httpUpdateUser(
  v: Record<string, any>,
  uid: string,
  token: string
): Promise<User> {
  try {
    // const pass = hashSync(v.password, genSaltSync(11));
    const res = await fetch(`http://localhost:3000/api/auth/users/${uid}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...v }),
    });
    const result = await res.json();
    if (result?.ok) {
      return result.data as User;
    } else {
      console.log(
        "httpUpdateUser >> Error :>> ",
        result.error || result?.message
      );
      if (result?.error) throw result.error as Error;
      throw new Error(result?.message);
    }
  } catch (error) {
    console.log("httpUpdateUser >> catch >>Error :>> ", error);
    throw error;
  }
}

export async function httpGetUser(uid: string, token: string): Promise<User> {
  try {
    const res = await fetch(`http://localhost:3000/api/auth/users/${uid}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    if (result?.ok) {
      return result.data as User;
    } else {
      console.log("httpGetUser >> Error :>> ", result.error || result?.message);
      if (result?.error) throw result.error as Error;
      throw new Error(result?.message);
    }
  } catch (error) {
    console.log("httpGetUser >> catch >>Error :>> ", error);
    throw error;
  }
}
