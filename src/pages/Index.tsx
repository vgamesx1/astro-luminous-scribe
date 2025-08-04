import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/blog/header";
import { HeroSection } from "@/components/blog/hero-section";
import { FeaturedPosts } from "@/components/blog/featured-posts";
import { RecentPosts } from "@/components/blog/recent-posts";
import { NewsletterSignup } from "@/components/blog/newsletter-signup";
import { Footer } from "@/components/blog/footer";
import { ArticleCard } from "@/components/blog/article-card";
import { TagsDropdown } from "@/components/blog/tags-dropdown";
import { CategoriesDropdown } from "@/components/blog/categories-dropdown";
import { blogPosts } from "@/data/blog-data";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle URL parameters
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    const searchParam = searchParams.get('search');
    
    if (tagParam && !selectedTags.includes(tagParam)) {
      setSelectedTags([tagParam]);
    }
    
    if (searchParam && searchQuery !== searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Filter posts based on search query, selected tags, and categories
  const filteredPosts = useMemo(() => {
    let posts = blogPosts;
    
    // Filter by tags first
    if (selectedTags.length > 0) {
      posts = posts.filter(post =>
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      posts = posts.filter(post =>
        selectedCategories.includes(post.category)
      );
    }
    
    // Then filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query)
      );
    }
    
    return posts;
  }, [searchQuery, selectedTags, selectedCategories]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => [...prev, tag]);
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const handleClearAllTags = () => {
    setSelectedTags([]);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategories(prev => [...prev, category]);
  };

  const handleCategoryRemove = (category: string) => {
    setSelectedCategories(prev => prev.filter(c => c !== category));
  };

  const handleClearAllCategories = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      {/* Tags and Categories dropdowns - always visible */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <TagsDropdown
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
            onTagRemove={handleTagRemove}
            onClearAll={handleClearAllTags}
          />
          <CategoriesDropdown
            selectedCategories={selectedCategories}
            onCategorySelect={handleCategorySelect}
            onCategoryRemove={handleCategoryRemove}
            onClearAll={handleClearAllCategories}
          />
        </div>
      </div>
      
      {!searchQuery && selectedTags.length === 0 && selectedCategories.length === 0 && (
        <>
          <FeaturedPosts posts={filteredPosts} />
          <RecentPosts posts={filteredPosts} />
          <NewsletterSignup />
        </>
      )}
      
      {(searchQuery || selectedTags.length > 0 || selectedCategories.length > 0) && (
        <div className="container mx-auto px-4 py-16">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {searchQuery ? 'Search Results' : 'Filtered Articles'}
            </h1>
            <p className="text-muted-foreground">
              Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
              {selectedCategories.length > 0 && ` in categories: ${selectedCategories.join(', ')}`}
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
