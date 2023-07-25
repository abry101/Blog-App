import { useForm } from "react-hook-form";
import { HiFingerPrint, HiMail } from "react-icons/hi";
import PrimaryButton from "@/components/widgets/PrimaryButton";
import TextField from "@/components/form/TextField";
import { SigninFormData } from "@/types";

export default function SigninForm({
  onSignin,
}: {
  onSignin: (v: SigninFormData) => void;
}) {
  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSignin)}>
      <TextField
        error={errors?.email?.message}
        isTouched={touchedFields.email}
        trailingIcon={<HiMail size={25} />}
        type={"email"}
        placeholder={"Email Address"}
        props={register("email")}
      />
      <TextField
        error={errors?.password?.message}
        isTouched={touchedFields.password}
        trailingIcon={<HiFingerPrint size={25} />}
        type={"password"}
        placeholder={"Password"}
        props={register("password")}
      />
      <PrimaryButton type="submit" name="Sign In" />
    </form>
  );
}
