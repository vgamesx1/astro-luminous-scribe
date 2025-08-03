import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Header } from "@/components/blog/header";
import { Footer } from "@/components/blog/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blog-data";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.slug === slug);
  
  const handleTagClick = (tag: string) => {
    navigate(`/?tag=${encodeURIComponent(tag)}`);
  };

  const renderContent = (content: string) => {
    const sections = content.split(/```(\w+)?\n([\s\S]*?)```/);
    
    return sections.map((section, index) => {
      if (index % 3 === 1) {
        // This is the language identifier
        return null;
      }
      
      if (index % 3 === 2) {
        // This is code content
        const language = sections[index - 1] || 'javascript';
        return (
          <div key={index} className="my-6">
            <SyntaxHighlighter
              language={language}
              style={oneDark}
              className="rounded-lg"
              customStyle={{
                margin: 0,
                borderRadius: '0.5rem',
              }}
            >
              {section}
            </SyntaxHighlighter>
          </div>
        );
      }
      
      // Regular text content
      return section.split('\n\n').map((paragraph, pIndex) => (
        paragraph.trim() && (
          <p key={`${index}-${pIndex}`} className="text-lg leading-relaxed mb-6">
            {paragraph}
          </p>
        )
      ));
    });
  };
  
  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-6 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to articles
          </Button>
          
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between py-6 border-y border-border">
              <div className="flex items-center space-x-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {post.coverImage && (
          <div className="mb-12">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 lg:h-96 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="space-y-6 text-foreground leading-relaxed">
            {renderContent(post.content)}
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex items-center space-x-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">{post.author.name}</h3>
              <p className="text-muted-foreground">{post.author.role}</p>
              <p className="text-sm text-muted-foreground mt-1">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default Article;