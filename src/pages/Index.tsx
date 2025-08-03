import { useState, useMemo } from "react";
import { Header } from "@/components/blog/header";
import { HeroSection } from "@/components/blog/hero-section";
import { FeaturedPosts } from "@/components/blog/featured-posts";
import { RecentPosts } from "@/components/blog/recent-posts";
import { NewsletterSignup } from "@/components/blog/newsletter-signup";
import { Footer } from "@/components/blog/footer";
import { ArticleCard } from "@/components/blog/article-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { blogPosts, tags } from "@/data/blog-data";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    let posts = blogPosts;
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query)
      );
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      posts = posts.filter(post =>
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }
    
    return posts;
  }, [searchQuery, selectedTags]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => [...prev, tag]);
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const handleClearAllTags = () => {
    setSelectedTags([]);
  };

  const isFiltering = searchQuery.trim() || selectedTags.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      {/* Tags Filter Section */}
      <div className="container mx-auto px-4 py-8 border-b border-border">
        <TagFilter
          tags={tags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
          onTagRemove={handleTagRemove}
          onClearAll={handleClearAllTags}
        />
      </div>
      
      {!isFiltering && (
        <>
          <HeroSection />
          <FeaturedPosts posts={filteredPosts} />
          <RecentPosts posts={filteredPosts} />
          <NewsletterSignup />
        </>
      )}
      
      {isFiltering && (
        <div className="container mx-auto px-4 py-16">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {searchQuery ? 'Search Results' : 'Filtered Articles'}
            </h1>
            <p className="text-muted-foreground">
              Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} 
              {searchQuery && ` for "${searchQuery}"`}
              {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
            </p>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No articles found. Try adjusting your search terms or selected tags.
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
