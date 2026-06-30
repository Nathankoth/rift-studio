export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "africa-is-going-digital-businesses-that-get-found-will-win",
    title: "Africa Is Going Digital. The Businesses That Get Found Will Win.",
    description:
      "More people come online every year through a phone in their pocket. Before they buy, they search and the business that shows up first is the one that gets the money.",
    date: "2026-06-17",
  },
];

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
