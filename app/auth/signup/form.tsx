"use client";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import { useForm } from "react-hook-form";
import Link from "next/link";
import React from "react";
import { HiOutlineUser, HiMail, HiFingerPrint } from "react-icons/hi";
import CheckBox from "@/components/form/CheckBox";
import TextField from "@/components/form/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { z_email, z_fullName, z_password } from "@/utils/my_zod";
import { SignupFormData } from "@/types";

export default function SignupForm({
  onSignup,
}: {
  onSignup: (v: SignupFormData) => void;
}) {
  const schema = z
    .object({
      name: z_fullName,
      email: z_email,
      password: z_password,
      cpassword: z_password,
      accept_terms: z.boolean().refine((data) => data, {
        message: "To proceed you must accept our terms and conditions!",
      }),
    })
    .refine((data) => data.password === data.cpassword, {
      message: "Your Passwords don't match",
      path: ["cpassword"], // path of error
    });

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
    accept_terms: false,
  };

  const {
    register,
    formState: { errors, touchedFields, isValid },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const tc_label = (
    <span>
      I have read and agree to the &nbsp;{" "}
      <a href="http://google.com" target="_blank" className="link-primary">
        Privacy Policy{" "}
      </a>
    </span>
  );
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(onSignup)}
      noValidate
    >
      <TextField
        error={errors.name?.message}
        isTouched={touchedFields.name}
        trailingIcon={<HiOutlineUser size={25} />}
        type="text"
        placeholder="Full Name"
        props={{
          ...register("name"),
        }}
      />

      <TextField
        error={errors.email?.message}
        isTouched={touchedFields.email}
        trailingIcon={<HiMail size={25} />}
        type="email"
        placeholder="Email Address"
        props={{
          ...register("email"),
        }}
      />

      <TextField
        error={errors.password?.message}
        isTouched={touchedFields.password}
        trailingIcon={<HiFingerPrint size={25} />}
        type="password"
        placeholder="Password"
        props={{
          ...register("password"),
        }}
      />

      <TextField
        error={errors.cpassword?.message}
        isTouched={touchedFields.cpassword}
        trailingIcon={<HiFingerPrint size={25} />}
        type="password"
        placeholder="Confirm Password"
        props={{
          ...register("cpassword"),
        }}
      />

      <CheckBox
        label={tc_label}
        error={errors.accept_terms?.message}
        isTouched={touchedFields.accept_terms}
        props={{ ...register("accept_terms") }}
      />

      <PrimaryButton type="submit" name="Sign up" disabled={false} />

      <p className="text-center">
        Have an account?&nbsp;
        <Link href={"/auth/signin"}>
          <span className="link link-primary link-hover text-lg">Sign In</span>
        </Link>
      </p>
    </form>
  );
}
