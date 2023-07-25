"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import Loader from "@/components/widgets/Loader";
import AlertMessage from "@/components/widgets/AlertMessage";
import { useAuth } from "@/libs/providers/auth";
import Link from "next/link";

export const metadata = {
  title: "Verification Page",
};
export default function VerifyPage() {
  const navigate = useRouter();
  const { gUser, verify, error, loading, clear, signout } = useAuth();

  useEffect(() => {
    console.log(
      "VerifyPage >> gUser?.emailVerified :>> ",
      gUser?.emailVerified
    );
    console.log("VerifyPage >> loading is :>> ", loading);
    if (gUser) {
      if (gUser.emailVerified) {
        console.log("replace >> Verify ---> Dashboard :>> ");
        navigate.replace("/me/dashboard");
      }
    } else if (!loading) {
      console.log("replace >> Verify ---> Signin :>> ");
      navigate.replace("/auth/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gUser]);

  return (
    <>
      {!gUser && <Loader message="Verification page loading . . ." />}
      {loading && gUser && (
        <Loader message="Waiting on your verification . . ." />
      )}
      <section className="w-3/4 mx-auto flex flex-col gap-y-4">
        {error && <AlertMessage type="error" error={error} onClose={clear} />}
        <div className="title">
          <h1 className="text-3xl font-bold py-4">
            {gUser?.emailVerified ? "Congratulation!" : "Verify your email"}
          </h1>
          <p className="text-center text-base-content/75">
            <strong>
              <em>
                {gUser?.emailVerified
                  ? "Your email has been verified successfully"
                  : "Your email address is not verified yet."}
              </em>
            </strong>
            <br />
            {gUser?.emailVerified ? (
              <span>
                Please click the &quot;<strong>Go to MyProfile</strong>&quot;
                button to proceed to your account.
              </span>
            ) : (
              <>
                <span>
                  Please check your inbox and click the verification link to
                  verify your email.
                </span>
                <br />
                <br />
                <span>
                  If you haven&apos;t received the verification email, click the
                  button below to send it again.
                </span>
              </>
            )}
          </p>
        </div>
        {gUser?.emailVerified ? (
          <PrimaryButton
            type="button"
            name="Go to MyProfile"
            onClick={() => {
              navigate.replace("/me/dashboard");
            }}
          />
        ) : (
          <>
            <PrimaryButton
              type="button"
              name="Send Verification Email"
              onClick={() => {
                if (gUser) verify(gUser);
              }}
            />
            <Link
              href="#"
              className="btn btn-ghost link link-primary"
              onClick={signout}
            >
              Cancel Verification
            </Link>
          </>
        )}
      </section>
    </>
  );
}
