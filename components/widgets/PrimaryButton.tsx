export default function PrimaryButton({
  type = "button",
  onClick,
  disabled = false,
  name,
}: {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  name: string;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="w-full bg-gradient-to-r from-primary to-secondary py-3 rounded-md text-2xl text-white"
    >
      {name}
    </button>
  );
}
