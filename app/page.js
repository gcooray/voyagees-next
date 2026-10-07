import HomePage from "@/components/home/HomePage";
import en from "@/messages/en";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/");

export default function Home() {
  return <HomePage content={en} locale="en" />;
}
