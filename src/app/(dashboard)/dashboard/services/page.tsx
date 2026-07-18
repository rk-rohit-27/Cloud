import { auth } from "@/lib/auth";
import { listServicesForUser } from "@/lib/services";
import ServicesList from "@/components/dashboard/ServicesList";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const services = userId ? await listServicesForUser(userId) : [];
  return <ServicesList services={services} />;
}
