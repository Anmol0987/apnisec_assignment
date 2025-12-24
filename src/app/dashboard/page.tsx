import DashboardClient from "@/component/DashboardClient";
import Protected from "@/component/protected";

export default function DashboardPage() {
  return (
    <Protected>
      <DashboardClient />
    </Protected>
  );
}
