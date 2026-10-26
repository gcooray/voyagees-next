import Link from "next/link";
import Image from "next/image";
import { getPosts, formatPostDate } from "@/lib/blog";
import { withSeo } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";
import "./blog.css";

// The English and French blogs have different articles, so no hreflang pair.
export const metadata = withSeo(
  "/blog",
  {
    title: "Blog: Sri Lanka Travel Tips",
    description:
      "Itineraries, seasons, drive times and practical advice for planning your Sri Lanka trip, from a team based on the island.",
  },
  { translated: false }
);

export default function BlogIndex() {
  const posts = getPosts("en");

  return (
    <div className="blog-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <div className="blog-inner">
        <p className="blog-eyebrow">The Voyagees blog</p>
        <h1>Sri Lanka travel tips</h1>
        <p className="blog-intro">
          Itineraries, seasons, drive times and practical advice: the answers we give travellers every day,
          gathered here to help you plan your trip.
        </p>

        {posts.length === 0 ? (
          <p className="blog-empty">Our first articles are coming soon.</p>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-image">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 700px) 100vw, 330px"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="blog-card-body">
                  <span className="blog-meta">
                    {formatPostDate(post.date, "en")} · {post.readingMinutes} min read
                  </span>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
