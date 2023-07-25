export default function ConfirmationModal({
  showModal,
  ops_name,
  ops_message,
  onProceed,
}: {
  showModal: boolean;
  ops_name: string;
  ops_message?: string;
  onProceed: (v: boolean) => void;
}) {
  if (!showModal) {
    return <></>;
  }
  return (
    <>
      <input
        type="checkbox"
        id="my-modal-6"
        className="modal-toggle"
        checked={showModal}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {ops_name || 'The Operation Name'}
          </h3>
          <p className="py-4">
            {ops_message || 'Are you sure do you want to proceed?'}
          </p>
          <div className="modal-action">
            <label
              htmlFor="my-modal-6"
              className="btn"
              onClick={() => onProceed(false)}
            >
              No
            </label>
            <label
              htmlFor="my-modal-6"
              className="btn"
              onClick={() => onProceed(true)}
            >
              Yes
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
