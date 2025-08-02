import { Clock, User, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/data/blog-data";

interface ArticleCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const cardClasses = featured 
    ? "group hover:shadow-blog-lg transition-all duration-300 hover:-translate-y-1 border-primary/10 bg-gradient-surface" 
    : "group hover:shadow-blog-md transition-all duration-300 hover:-translate-y-1";

  return (
    <Card className={cardClasses}>
      {post.coverImage && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-6 w-6 rounded-full"
            />
            <span>{post.author.name}</span>
          </div>
          {featured && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>
        
        <h3 className={`font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors ${
          featured ? 'text-xl lg:text-2xl' : 'text-lg'
        }`}>
          {post.title}
        </h3>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap items-center gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
        </div>
      </CardContent>
    </Card>
  );
}