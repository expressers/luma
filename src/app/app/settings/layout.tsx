import { PageHeader } from "@/components/page-header";
import { SettingsNav } from "@/components/settings-nav";

export default function SettingsLayout({
  children,
}: LayoutProps<"/app/settings">) {
  return (
    <>
      <PageHeader
        title="Definições"
        description="A tua conta, a tua segurança e a configuração deste espaço."
      />
      <div className="flex flex-col gap-6 lg:flex-row">
        <SettingsNav />
        <div className="min-w-0 flex-1 space-y-4">{children}</div>
      </div>
    </>
  );
}
