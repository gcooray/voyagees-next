import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPosts, getPost, formatPostDate } from "@/lib/blog";
import { withSeo } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import BlogMarkdown from "@/components/BlogMarkdown";
import RelatedLinks from "@/components/RelatedLinks";
import { articleSchema, breadcrumbSchema } from "@/lib/structuredData";
import "../../../blog/blog.css";

// one static page per article file; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts("fr").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost("fr", slug);
  if (!post) return {};

  return withSeo(
    `/fr/blog/${post.slug}`,
    { title: post.metaTitle || post.title, description: post.description },
    {
      translated: false,
      image: post.shareImage,
      imageAlt: post.imageAlt,
      article: { publishedTime: post.date },
    }
  );
}

export default async function BlogPostFr({ params }) {
  const { slug } = await params;
  const post = getPost("fr", slug);
  if (!post) notFound();

  const path = `/fr/blog/${post.slug}`;

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
            locale: "fr",
          })}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Accueil", path: "/fr" },
            { name: "Blog", path: "/fr/blog" },
            { name: post.title, path },
          ])}
        />

        <article className="blog-article">
          <Link href="/fr/blog" className="blog-back">
            ← Tous les articles
          </Link>

          <h1>{post.title}</h1>
          <p className="blog-meta blog-article-meta">
            {formatPostDate(post.date, "fr")} · {post.readingMinutes} min de lecture · L&apos;équipe Voyagees
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
            <h2>Envie de préparer votre propre itinéraire ?</h2>
            <p>
              Indiquez vos dates et vos envies : notre outil gratuit vous propose un itinéraire jour par jour,
              avec des temps de route réalistes. Et si vous avez une question, écrivez-nous.
            </p>
            <div className="blog-cta-buttons">
              <Link href="/fr/plan-trip" className="blog-cta-primary">
                Créer mon itinéraire
              </Link>
              <Link href="/fr/contact" className="blog-cta-secondary">
                Nous contacter
              </Link>
            </div>
          </aside>
        </article>
      </div>

      <RelatedLinks locale="fr" current={path} />
    </>
  );
}
