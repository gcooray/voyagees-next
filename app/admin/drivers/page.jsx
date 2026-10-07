import AdminDrivers from "@/components/admin/AdminDrivers";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo(
  "/admin/drivers",
  { title: "Drivers admin" },
  { translated: false, noindex: true }
);

export default function AdminDriversPage() {
  return <AdminDrivers />;
}
