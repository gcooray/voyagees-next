import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPosts, getPost, formatPostDate } from "@/lib/blog";
import { withSeo } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import BlogMarkdown from "@/components/BlogMarkdown";
import RelatedLinks from "@/components/RelatedLinks";
import { articleSchema, breadcrumbSchema } from "@/lib/structuredData";
import "../blog.css";

// one static page per article file; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts("en").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost("en", slug);
  if (!post) return {};

  return withSeo(
    `/blog/${post.slug}`,
    { title: post.metaTitle || post.title, description: post.description },
    {
      translated: false,
      image: post.shareImage,
      imageAlt: post.imageAlt,
      article: { publishedTime: post.date },
    }
  );
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPost("en", slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;

  return (
    <>
      <div className="blog-page">
        <JsonLd
          data={articleSchema({
            title: post.title,
            description: post.description,
            path,
            image: post.shareImage,
            date: post.date,
            locale: "en",
          })}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path },
          ])}
        />

        <article className="blog-article">
          <Link href="/blog" className="blog-back">
            ← All articles
          </Link>

          <h1>{post.title}</h1>
          <p className="blog-meta blog-article-meta">
            {formatPostDate(post.date, "en")} · {post.readingMinutes} min read · The Voyagees team
          </p>

          {post.image && (
            <div className="blog-hero">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                sizes="(max-width: 760px) 100vw, 720px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}

          <div className="blog-body">
            <BlogMarkdown markdown={post.body} />
          </div>

          <aside className="blog-cta">
            <h2>Ready to plan your own trip?</h2>
            <p>
              Tell us your dates and what you love: our free planner builds a day-by-day itinerary with
              realistic drive times, and you can compare private drivers for your dates.
            </p>
            <div className="blog-cta-buttons">
              <Link href="/plan-trip" className="blog-cta-primary">
                Plan my trip
              </Link>
              <Link href="/search" className="blog-cta-secondary">
                Find a driver
              </Link>
            </div>
          </aside>
        </article>
      </div>

      <RelatedLinks locale="en" current={path} />
    </>
  );
}
