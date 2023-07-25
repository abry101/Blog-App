interface OptionType {
  label?: string;
  value: string | number;
}
interface IProps {
  label?: string;
  labelAlt?: string;
  error?: string;
  leadingIClass?: string;
  trailingIClass?: string;
  groupClass?: string;
  inputClass?: string;
  leadingIcon?: any;
  trailingIcon?: any;
  isTouched?: boolean;
  isDirty?: boolean;
  props?: any;
  options: OptionType[];
}

export default function DropdownField({
  label,
  labelAlt,
  error,
  isTouched,
  isDirty,
  leadingIClass,
  trailingIClass,
  groupClass,
  inputClass,
  leadingIcon,
  trailingIcon,
  props,
  options,
}: IProps) {
  const onIconClick = () => {};

  return (
    <div className="form-control w-full">
      {(label || labelAlt) && (
        <label className="label">
          {label && <span className="label-text text-base">{label}</span>}
          {labelAlt && <span className="label-text-alt">{labelAlt}</span>}
        </label>
      )}
      <div
        className={` input-group bg-base-content/10 rounded-lg items-center ${
          groupClass ? groupClass : ""
        } ${error ? " border border-error" : ""}`}
      >
        {leadingIcon && (
          <span
            className={leadingIClass ? leadingIClass : "btn btn-ghost"}
            onClick={onIconClick}
          >
            {leadingIcon}
          </span>
        )}

        <select
          aria-invalid={error ? "true" : "false"}
          className={
            "select select-lg bg-base-content/10 rounded-none flex-1 focus:outline-none border-none" +
            (inputClass ? inputClass : "")
          }
          {...props}
        >
          <option disabled value="none" key={0} className="bg-base-100">
            Select {label}
          </option>
          {options.map((opt, i) => (
            <option value={opt.value} key={i + 1} className="bg-base-100">
              {opt.label || opt.value}
            </option>
          ))}
        </select>

        {trailingIcon && (
          <span
            className={trailingIClass ? trailingIClass : "btn btn-ghost"}
            onClick={onIconClick}
          >
            {trailingIcon}
          </span>
        )}
      </div>
      {error && isTouched ? (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
          <span className="label-text-alt"></span>
        </label>
      ) : null}
    </div>
  );
}
