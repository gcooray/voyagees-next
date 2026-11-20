import DriverDashboard from "@/components/drivers/DriverDashboard";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo(
  "/driver/dashboard",
  { title: "Driver dashboard" },
  { translated: false, noindex: true }
);

export default function DriverDashboardPage() {
  return <DriverDashboard />;
}
