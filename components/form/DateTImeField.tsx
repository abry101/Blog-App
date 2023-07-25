interface IProps {
  type: "date" | "time" | "datetime-local";
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

export default function DateTimeField({
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
        {leadingIcon && (
          <span
            className={leadingIClass ? leadingIClass : ""}
            onClick={onIconClick}
          >
            {leadingIcon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          className={
            "input input-lg bg-base-content/10 flex-1 rounded-none focus:outline-none border-none" +
            (inputClass ? inputClass : "")
          }
          {...props}
        />
        {trailingIcon && (
          <span
            className={trailingIClass ? trailingIClass : ""}
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
