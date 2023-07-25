import MeLayout from "@/components/layouts/MeLayout";
export default function GroupLayout2({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <MeLayout>{children}</MeLayout>;
}
