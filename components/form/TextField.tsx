import { useState } from "react";

interface IProps {
  type: "text" | "password" | "latlng" | "email";
  label?: string;
  error?: string;
  placeholder?: string;
  leadingIClass?: string;
  trailingIClass?: string;
  groupClass?: string;
  inputClass?: string;
  leadingIcon?: any;
  trailingIcon?: any;
  isTouched?: boolean;
  isDirty?: boolean;
  props?: any;
}

export default function TextField({
  type,
  label,
  error,
  isTouched,
  isDirty,
  placeholder = "",
  leadingIClass,
  trailingIClass,
  groupClass,
  inputClass,
  leadingIcon,
  trailingIcon,
  props,
}: IProps) {
  const [showPassword, setShowPassword] = useState(false);

  const onIconClick = () => {
    if (type === "password") {
      setShowPassword(!showPassword);
    }
  };

  const getInputType = () => {
    switch (type) {
      case "password":
        return showPassword ? "text" : "password";
      case "latlng":
        return "number";
      case "email":
      case "text":
        return type;
      default:
        return "text";
    }
  };

  const renderInput = () => {
    const inputType = getInputType();

    return (
      <input
        type={inputType}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        className={
          "input input-lg bg-base-content/10 flex-1 rounded-none focus:outline-none border-none " +
          (inputClass ? inputClass : "")
        }
        {...props}
      />
    );
  };

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <div
        className={`input-group bg-base-content/10 rounded-lg items-center ${
          groupClass ? groupClass : ""
        } ${error ? " border border-error" : ""}`}
      >
        {leadingIcon && (
          <span
            className={
              leadingIClass ? leadingIClass : "btn btn-ghost normal-case"
            }
            onClick={onIconClick}
          >
            {leadingIcon}
          </span>
        )}
        {renderInput()}
        {trailingIcon && (
          <span
            className={
              trailingIClass ? trailingIClass : "btn btn-ghost normal-case"
            }
            onClick={onIconClick}
          >
            {trailingIcon}
          </span>
        )}
      </div>
      {error && isTouched ? (
        <label className="text-left">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      ) : null}
    </div>
  );
}
