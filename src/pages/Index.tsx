import { useState, useMemo } from "react";
import { Header } from "@/components/blog/header";
import { HeroSection } from "@/components/blog/hero-section";
import { FeaturedPosts } from "@/components/blog/featured-posts";
import { RecentPosts } from "@/components/blog/recent-posts";
import { NewsletterSignup } from "@/components/blog/newsletter-signup";
import { Footer } from "@/components/blog/footer";
import { ArticleCard } from "@/components/blog/article-card";
import { blogPosts } from "@/data/blog-data";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return blogPosts;
    
    const query = searchQuery.toLowerCase();
    return blogPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query)) ||
      post.author.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      {!searchQuery && (
        <>
          <HeroSection />
          <FeaturedPosts posts={filteredPosts} />
          <RecentPosts posts={filteredPosts} />
          <NewsletterSignup />
        </>
      )}
      
      {searchQuery && (
        <div className="container mx-auto px-4 py-16">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Search Results
            </h1>
            <p className="text-muted-foreground">
              Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No articles found. Try adjusting your search terms.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map(post => (
                <div key={post.id} className="animate-fade-in">
                  <ArticleCard post={post} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
