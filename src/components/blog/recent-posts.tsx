import { ArticleCard } from "./article-card";
import { BlogPost } from "@/data/blog-data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface RecentPostsProps {
  posts: BlogPost[];
}

export function RecentPosts({ posts }: RecentPostsProps) {
  const recentPosts = posts
    .filter(post => !post.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Recent Articles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay up to date with the latest insights and tutorials from our development team.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post, index) => (
            <div 
              key={post.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ArticleCard post={post} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="group border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}