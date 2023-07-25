import AuthLayout from "@/components/layouts/AuthLayout";
export default function GroupLayout1({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-base-100">
      <AuthLayout>{children}</AuthLayout>
    </div>
  );
}
