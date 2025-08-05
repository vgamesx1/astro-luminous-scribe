import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Header } from "@/components/blog/header";
import { Footer } from "@/components/blog/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, Calendar, Copy, Check, X } from "lucide-react";
import { blogPosts } from "@/data/blog-data";
import { useState, useMemo } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from "@/hooks/use-toast";
import { ArticleCard } from "@/components/blog/article-card";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string>("");
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter posts based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return blogPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query)) ||
      post.category.toLowerCase().includes(query) ||
      post.author.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  
  const post = blogPosts.find(p => p.slug === slug);
  
  const handleTagClick = (tag: string) => {
    navigate(`/?tag=${encodeURIComponent(tag)}`);
  };

  const handleCopyCode = async (code: string, codeId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(codeId);
      toast({
        title: "Code copied!",
        description: "Code has been copied to your clipboard.",
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedCode("");
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy code to clipboard.",
        variant: "destructive",
      });
    }
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
        const codeId = `code-${index}`;
        const isCopied = copiedCode === codeId;
        
        return (
          <div key={index} className="my-6 relative group">
            <div className="relative">
              <SyntaxHighlighter
                language={language}
                style={oneDark}
                className="rounded-lg"
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  paddingRight: '3rem',
                }}
              >
                {section}
              </SyntaxHighlighter>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
                onClick={() => handleCopyCode(section, codeId)}
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
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
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      
      {/* Search Results Overlay */}
      {searchQuery && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-background border rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[70vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                Search Results for "{searchQuery}" ({searchResults.length} found)
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(70vh-80px)]">
              {searchResults.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No articles found. Try different search terms.
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {searchResults.map(result => (
                    <div key={result.id} onClick={() => setSearchQuery("")}>
                      <ArticleCard post={result} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
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