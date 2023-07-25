"use client";
import Loader from "@/components/widgets/Loader";
import SignupForm from "./form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AlertMessage from "@/components/widgets/AlertMessage";
import { useAuth } from "@/libs/providers/auth";

export const metadata = {
  title: "Sign Up: MMA!",
};
export default function Signup() {
  const navigate = useRouter();
  const { gUser, error, loading, signup } = useAuth();

  useEffect(() => {
    if (gUser) {
      if (gUser.emailVerified) {
        console.log("replace >> Signup ---> Dashboard :>> ");
        navigate.replace("/me/dashboard");
      } else {
        console.log("replace >> Signup ---> Verify :>> ");
        navigate.replace("/auth/verify");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gUser]);

  return (
    <>
      {loading && <Loader message="SignUp page loading . . ." />}
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-4xl font-bold py-4">Sign Up</h1>
          <p className="w-3/4 mx-auto text-base-content/75">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. dolore
            amet quia quam et quae deserunt officiis maiores quisquam!
          </p>
        </div>

        {error && (
          <AlertMessage
            type={"error"}
            error={error}
            // onClose={() => setData({ ...data, error: undefined })}
          />
        )}

        <SignupForm
          onSignup={(v) => {
            // console.log("SignupForm >> v :>> ", v);
            // setData({ ...data, isLoading: true });
            signup(v);
          }}
        />
      </section>
    </>
  );
}
