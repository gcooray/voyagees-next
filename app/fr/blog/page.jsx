import Link from "next/link";
import Image from "next/image";
import { getPosts, formatPostDate } from "@/lib/blog";
import { withSeo } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";
import "../../blog/blog.css";

// French only for now — there is no English blog, so no hreflang pair.
export const metadata = withSeo(
  "/fr/blog",
  {
    title: "Blog : Conseils pour Voyager au Sri Lanka",
    description:
      "Itinéraires, saisons, temps de trajet, conseils pratiques : nos articles pour préparer votre voyage au Sri Lanka, écrits par une équipe qui vit sur place.",
  },
  { translated: false }
);

export default function BlogIndexFr() {
  const posts = getPosts("fr");

  return (
    <div className="blog-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/fr" },
          { name: "Blog", path: "/fr/blog" },
        ])}
      />
      <div className="blog-inner">
        <p className="blog-eyebrow">Le blog Voyagees</p>
        <h1>Conseils pour voyager au Sri Lanka</h1>
        <p className="blog-intro">
          Itinéraires, saisons, temps de trajet, bonnes idées : ce qu&apos;on répond tous les jours aux
          voyageurs, rassemblé ici pour vous aider à préparer votre séjour.
        </p>

        {posts.length === 0 ? (
          <p className="blog-empty">Les premiers articles arrivent très bientôt.</p>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/fr/blog/${post.slug}`} className="blog-card">
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
                    {formatPostDate(post.date, "fr")} · {post.readingMinutes} min de lecture
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
