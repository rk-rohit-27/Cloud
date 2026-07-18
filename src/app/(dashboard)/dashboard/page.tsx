import { auth } from "@/lib/auth";
import { listServicesForUser } from "@/lib/services";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    return null; // layout will redirect on unauthenticated
  }

  const services = await listServicesForUser(userId);
  const userName = session?.user?.name ?? "User";

  return <DashboardOverview userName={userName} services={services} />;
}
