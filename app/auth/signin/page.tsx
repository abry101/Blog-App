"use client";
import Link from "next/link";
import Loader from "@/components/widgets/Loader";
import GoogleButton from "@/components/widgets/GoogleButton";
import GithubButton from "@/components/widgets/GithubButton";
import SigninForm from "./form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth as _auth } from "@/libs/firebase/firebase";
import AlertMessage from "@/components/widgets/AlertMessage";
import { useAuth } from "@/libs/providers/auth";

export const metadata = {
  title: "Sign In: MMA!",
};

export default function Signin() {
  const navigate = useRouter();
  const { gUser, error, signin, loading } = useAuth();

  useEffect(() => {
    if (gUser) {
      if (gUser.emailVerified) {
        console.log("replace >> Signin ---> Dashboard :>> ");
        navigate.replace("/me/dashboard");
      } else {
        console.log("replace >> Signin ---> Verify :>> ");
        navigate.replace("/auth/verify");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gUser]);

  return (
    <>
      {loading && <Loader message="SignIn page loading . . ." />}
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-4xl font-bold py-4">Sign In</h1>
          <p className="w-3/4 mx-auto text-base-content/75">
            Lorem ipsum dolor sit Quasi iste odit, dolore amet quia quam et quae
            deserunt officiis maiores quisquam perspiciatis omnis!
          </p>
        </div>

        {error && (
          <AlertMessage
            type={"error"}
            error={error}
            // onClose={() => set({ ...data, error: undefined })}
          />
        )}

        <SigninForm
          onSignin={(v) => {
            // console.log("SigninForm Data :>> ", v);
            // setData({ ...data, isLoading: true });
            signin(v);
          }}
        />

        <GoogleButton />

        <GithubButton />

        <p className="text-center">
          Don&apos;t have an account yet?&nbsp;
          <Link href={"/auth/signup"}>
            <span className="link link-primary link-hover text-lg">
              Sign Up
            </span>
          </Link>
        </p>
      </section>
    </>
  );
}
