import type { FC } from "react";
import { HiOutlineCheckCircle, HiOutlineXCircle, HiX } from "react-icons/hi";
import { TbAlertTriangle } from "react-icons/tb";

interface AlertMessageProps {
  type: "success" | "warning" | "error";
  name?: string;
  message?: string;
  error?: Error;
  onClose?: () => void;
}

const AlertMessage: FC<AlertMessageProps> = ({
  type,
  name,
  message,
  error,
  onClose,
}) => {
  const _name = error?.name ?? name;
  const _message = error?.message ?? message;
  return (
    <>
      <div
        className={`alert shadow-lg ${
          type == "success"
            ? "alert-success"
            : type == "warning"
            ? "alert-warning"
            : "alert-error"
        }`}
      >
        {type == "success" ? (
          <HiOutlineCheckCircle size={30} />
        ) : type == "warning" ? (
          <TbAlertTriangle size={30} />
        ) : (
          <HiOutlineXCircle size={30} />
        )}
        <div className="text-xs">
          {_name && <h3 className="font-semibold">{_name}</h3>}
          <div>{_message}</div>
        </div>
        <HiX size={25} onClick={onClose} className="cursor-pointer" />
      </div>
    </>
  );
};
export default AlertMessage;
