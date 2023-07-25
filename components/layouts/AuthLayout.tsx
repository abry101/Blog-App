import "../styles.css";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-auto rounded-md w-5/6 sm:w-4/5 2xl:w-3/4 h-3/4 grid lg:grid-cols-2 relative">
      <div className="imgStyle">
        <div className="cartonImg"></div>
        <div className="cloud_one"></div>
        <div className="cloud_two"></div>
      </div>
      <div className="right flex flex-col justify-evenly bg-base-300">
        <div className="text-center py-10">{children}</div>
      </div>
    </div>
  );
}
