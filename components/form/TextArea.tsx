import { IconType } from "react-icons/lib";

interface IProps {
  label?: string;
  error?: string;
  placeholder?: string;
  leadingIClass?: string;
  trailingIClass?: string;
  groupClass?: string;
  inputClass?: string;
  LeadingIcon?: IconType;
  TrailingIcon?: IconType;
  isTouched?: boolean;
  isDirty?: boolean;
  props?: any;
}

export default function TextArea({
  label,
  error,
  isTouched,
  isDirty,
  placeholder = "",
  leadingIClass,
  trailingIClass,
  groupClass,
  inputClass,
  LeadingIcon,
  TrailingIcon,
  props,
}: IProps) {
  const onIconClick = () => {};

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <div
        className={`input-group bg-base-content/10 rounded-lg ${
          groupClass ? groupClass : ""
        } ${error ? " border border-error" : ""}`}
      >
        {LeadingIcon && (
          <span
            className={
              leadingIClass ? leadingIClass : "btn btn-ghost normal-case"
            }
            onClick={onIconClick}
          >
            <LeadingIcon size={25} />
          </span>
        )}
        <textarea
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          className={
            "textarea textarea-lg bg-base-content/10 flex-1 focus:outline-none border-none " +
            (inputClass ? inputClass : "")
          }
          {...props}
        />

        {TrailingIcon && (
          <span
            className={
              trailingIClass ? trailingIClass : "btn btn-ghost normal-case"
            }
            onClick={onIconClick}
          >
            <TrailingIcon size={25} />
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
