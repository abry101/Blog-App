import MainLayout from "@/components/layouts/MainLayout";
import ThemeSwitch from "@/components/widgets/ThemeSwitch";

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <div className="fixed top-1/2 right-4 z-50 hidden xl:block">
        <ThemeSwitch />
      </div>
      {children}
    </MainLayout>
  );
}
