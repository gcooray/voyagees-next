import ContactPageContent from "./ContactPageContent";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/contact", {
  title: "Contact Us – Private Drivers & Tours in Sri Lanka",
  description:
    "Have questions or need help planning your Sri Lanka tour? Contact voyaGees for support with bookings, private drivers, and travel inquiries.",
});

export default function ContactPage() {
  return <ContactPageContent locale="en" />;
}
