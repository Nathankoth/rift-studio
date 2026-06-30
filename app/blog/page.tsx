import Link from "next/link";
import Nav from "@/components/Nav";
import { blogPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description:
    "Practical guides for Lagos businesses on getting found online, building credibility, and winning more customers.",
};

export default function BlogIndexPage() {
  return (
    <main>
      <Nav />
      <div className="container-rift py-28 md:py-36">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 md:w-12 h-px bg-accent" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted">
              Blog
            </span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[0.92] tracking-tight mb-6">
            Guides for getting found online
          </h1>
          <p className="text-base md:text-lg text-muted leading-relaxed">
            Practical writing for Lagos business owners on visibility, credibility, and
            winning customers who are already searching.
          </p>
        </div>

        <div className="mt-16 border-t border-border">
          {blogPosts.map((post) => (
            <article key={post.slug} className="border-b border-border py-10 md:py-12">
              <p className="text-xs uppercase tracking-widest text-muted mb-4">
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight mb-4 max-w-3xl">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-accent transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-muted leading-relaxed max-w-3xl mb-6">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-accent"
              >
                Read article
                <span>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
