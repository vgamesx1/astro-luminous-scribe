import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/blog/header";
import { Footer } from "@/components/blog/footer";
import { ArticleCard } from "@/components/blog/article-card";
import { TagsDropdown } from "@/components/blog/tags-dropdown";
import { blogPosts } from "@/data/blog-data";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const POSTS_PER_PAGE = 9;

const AllArticles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Filter posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    let posts = blogPosts;
    
    // Filter by tags first
    if (selectedTags.length > 0) {
      posts = posts.filter(post =>
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }
    
    // Then filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query)
      );
    }
    
    return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [searchQuery, selectedTags]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => [...prev, tag]);
    setSearchParams({ page: '1' });
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
    setSearchParams({ page: '1' });
  };

  const handleClearAllTags = () => {
    setSelectedTags([]);
    setSearchParams({ page: '1' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchParams({ page: '1' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-text bg-clip-text text-transparent">
            All Articles
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our complete collection of articles, tutorials, and insights from our development team.
          </p>
        </div>

        {/* Tags Filter */}
        <div className="mb-8">
          <TagsDropdown
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
            onTagRemove={handleTagRemove}
            onClearAll={handleClearAllTags}
          />
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} articles
            {searchQuery && ` for "${searchQuery}"`}
            {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
          </p>
        </div>

        {/* Articles Grid */}
        {currentPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No articles found. Try adjusting your search terms or filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {currentPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ArticleCard post={post} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                          }}
                        />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                          }}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AllArticles;