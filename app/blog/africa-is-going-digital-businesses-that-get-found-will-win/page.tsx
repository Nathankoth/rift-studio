import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { getPost } from "@/lib/blog";

const slug = "africa-is-going-digital-businesses-that-get-found-will-win";

export const metadata: Metadata = {
  title: "Africa Is Going Digital. The Businesses That Get Found Will Win.",
  description:
    "More people come online every year through a phone in their pocket. Before they buy, they search and the business that shows up first is the one that gets the money.",
  openGraph: {
    title: "Africa Is Going Digital. The Businesses That Get Found Will Win.",
    description:
      "More people come online every year through a phone in their pocket. Before they buy, they search and the business that shows up first is the one that gets the money.",
    type: "article",
    url: `https://riftdigitalsolution.com/blog/${slug}`,
  },
};

export default function AfricaDigitalArticlePage() {
  const post = getPost(slug);

  if (!post) return null;

  return (
    <main>
      <Nav />
      <article className="container-rift py-28 md:py-36">
        <div className="max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors mb-8"
          >
            ← Back to Insights
          </Link>

          <p className="text-xs uppercase tracking-widest text-muted mb-6">
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight mb-10 text-balance">
            {post.title}
          </h1>

          <div className="article-prose space-y-6 text-base md:text-lg text-muted leading-relaxed">
            <p>
              Something is changing across Africa, and it is changing fast. More people come
              online every year, almost all of them through a phone in their pocket. Before
              they buy lunch, book a salon, or choose a plumber, they search. The business
              that shows up first, looks trustworthy, and is easy to reach is the one that
              gets the money. The rest stay invisible, even when their product is better.
            </p>
            <p>
              This is true from Nairobi to Accra to Johannesburg. It is especially true in
              Nigeria, home to one of the largest and youngest online populations on the
              continent. Millions of small businesses power the Nigerian economy, yet most
              are hard to find the moment a customer reaches for their phone. They lean on
              word of mouth and foot traffic while the searching customer, the one ready to
              spend right now, quietly goes elsewhere.
            </p>
            <p>
              Zoom into the big cities and the gap gets sharper. In places like Abuja, Port
              Harcourt, and Lagos, there are several good options for almost anything a
              customer wants. Choice is high, patience is low, and the decision happens on a
              screen in a few seconds. Being good is no longer enough. You have to be
              findable.
            </p>
            <p>
              Take Lagos. Picture a hungry customer in Lekki at 7pm. They type &quot;jollof
              near me.&quot; Three restaurants come up with photos, reviews, and a button to
              call or get directions. Yours is not one of them, even though your food is
              better and you are closer. That customer was ready to spend. They simply could
              not find you. This happens hundreds of times a week to good businesses across
              the city, and most owners never notice, because you do not see the customers
              who never arrived.
            </p>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-primary pt-4">
              Where the money leaks out
            </h2>
            <p>
              Look closely at a typical small business and the same three gaps show up again
              and again.
            </p>
            <p>
              The first is being hard to find. When people search on Google or Google Maps,
              you do not appear, or you appear with no photos, wrong hours, and no clear way
              to act. So the click goes to someone else. This is the biggest and most common
              leak, and it is quietly expensive.
            </p>
            <p>
              The second is paying the middlemen. Delivery and listing apps bring reach, but
              they take a real cut of every order. If every sale runs through them, you are
              renting your own customers. A channel of your own, a proper website where
              people can see what you offer and order or book directly, keeps more of that
              money with you.
            </p>
            <p>
              The third is missed enquiries. During a busy rush, calls and messages go
              unanswered, and a customer who cannot reach you moves to the next option.
              Every missed enquiry is a sale you already earned and then lost at the final
              step.
            </p>
            <p>
              None of these are about working harder. They are about being reachable at the
              exact moment someone wants to buy.
            </p>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-primary pt-4">
              What a strong presence looks like
            </h2>
            <p>
              You do not need to be everywhere. You need a few basics done well.
            </p>
            <p>
              You need a fast website that works on a phone, because that is where your
              customers are. It should load quickly, show what you offer, and make the next
              step obvious, whether that is a call, an order, or a booking.
            </p>
            <p>
              You need to show up on Google, with a complete Business Profile: correct
              hours, location, photos, and reviews. So when someone nearby searches, you are
              there with everything they need to choose you.
            </p>
            <p>
              And you need that presence to keep improving. Search is not a one-time setup.
              The businesses that win stay active, keep their details fresh, gather reviews,
              and add content over time.
            </p>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-primary pt-4">
              How we help at RIFT
            </h2>
            <p>
              RIFT Digital Solution exists to give everyday businesses that kind of presence
              without the big-agency price or the long wait.
            </p>
            <p>
              We start with a free check. Before building anything, we score your current
              online presence and show you where customers are slipping away, and what each
              gap is likely costing you.
            </p>
            <p>
              Then we build. Most websites are ready in five working days once we have your
              details, designed around your business and built for mobile. Alongside the
              site we set up your Google Business Profile and Google Analytics, so you start
              showing up and can see what is happening from day one.
            </p>
            <p>
              After that, the work is steady improvement. Through a monthly plan we keep
              sharpening your search visibility, manage your profile, publish content, and
              send you a simple report so you can see what is working. We also build AI
              tools that help you capture more of the enquiries that used to slip past you.
            </p>
            <p>
              The goal is simple. When a customer is ready to buy, you are the business
              they find, trust, and reach.
            </p>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-primary pt-4">
              Start with a look under the hood
            </h2>
            <p>
              Wherever you are on the continent, the shift is the same. Your customers are
              searching first. The good news is that getting found is one of the most
              affordable forms of growth available to a small business, and the first step
              costs nothing.
            </p>
            <p>
              Your competitors are not always better than you. They are just easier to find.
              That is a gap you can close, starting today.
            </p>
            <p className="italic font-serif text-primary/90">
              RIFT Digital Solution helps businesses get found, look credible, and win more
              customers. Reach out for a free check.
            </p>
          </div>

          <div className="mt-14 pt-10 border-t border-border">
            <p className="text-sm text-muted mb-6">
              Want to see where you stand right now?
            </p>
            <Link
              href="/#check"
              className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-accent text-background rounded-full font-medium uppercase tracking-widest text-xs sm:text-sm hover:bg-primary transition-colors"
            >
              Get my free score
              <span>→</span>
            </Link>
            <Link
              href="/blog"
              className="mt-6 inline-block text-sm text-muted transition-colors hover:text-accent"
            >
              Browse Insights
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
