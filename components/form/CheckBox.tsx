import { IconBase, IconType } from "react-icons/lib";

interface IProps {
  leadingLabel?: any;
  trailingLabel?: any;
  error?: string;
  inputClass?: string;
  isTouched?: boolean;
  isDirty?: boolean;
  props?: any;
}

export default function CheckBox({
  leadingLabel,
  trailingLabel,
  error,
  isTouched,
  isDirty,
  inputClass,
  props,
}: IProps) {
  return (
    <div className="form-control w-full py-2">
      <label className="label cursor-pointer justify-start">
        {leadingLabel && (
          <span className="label-text mr-4 text-base">{leadingLabel}</span>
        )}
        <input
          type="checkbox"
          aria-invalid={error ? "true" : "false"}
          className={
            "checkbox bg-base-content/10 rounded-none focus:outline-none " +
            (inputClass ? inputClass : "") +
            (error ? " checkbox-error" : "")
          }
          {...props}
        />
        {trailingLabel && (
          <span className="label-text ml-4">{trailingLabel}</span>
        )}
      </label>
      {error && isTouched && (
        <label className="text-left">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}
