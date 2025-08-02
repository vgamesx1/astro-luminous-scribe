import { ArticleCard } from "./article-card";
import { BlogPost } from "@/data/blog-data";

interface FeaturedPostsProps {
  posts: BlogPost[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const featuredPosts = posts.filter(post => post.featured);

  if (featuredPosts.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured Articles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked articles covering the latest trends and best practices in web development.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {featuredPosts.map((post) => (
            <div key={post.id} className="animate-slide-up">
              <ArticleCard post={post} featured />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}