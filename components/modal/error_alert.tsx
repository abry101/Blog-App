import { HiOutlineX } from "react-icons/hi";

export default function ErrorAlertModal({
  showModal,
  ops_name,
  ops_message,
  error,
  onProceed,
}: {
  showModal: boolean;
  ops_name?: string;
  ops_message?: string;
  error?: Error;
  onProceed: () => void;
}) {
  // const err_message = error? error.cause? ops_message;
  // const err_message = ops_message?.slice(0, ops_message?.indexOf(': {'));
  // const err_json =
  //   ops_message?.slice(
  //     ops_message?.indexOf(': {') + 2 || 0,
  //     ops_message.length
  //   ) || '{}';

  // var err_body = JSON.stringify(JSON.parse(err_json), null, 2);

  if (!showModal) {
    return <></>;
  }
  return (
    <>
      <input
        type="checkbox"
        id="my-modal-6"
        className="modal-toggle"
        onChange={() => {}}
        checked={showModal}
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl pt-16">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg flex-1">{ops_name}</h3>
            <label
              htmlFor="my-modal-6"
              className="flex-none text-base-content cursor-pointer"
              onClick={onProceed}
            >
              <HiOutlineX size={35} />
            </label>
          </div>
          <pre data-prefix=">" className="text-warning bg-base-300 my-4 p-4">
            {ops_message && <code>Error Message: {ops_message}</code>}
            {error && <code>Error Message: {error?.message}</code>}
          </pre>
          <pre data-prefix=">" className="text-warning bg-base-300 my-4 p-4">
            {error && <code>Error Stack: {error?.stack}</code>}
          </pre>
        </div>
      </div>
    </>
  );
}
