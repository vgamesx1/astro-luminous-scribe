export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
  coverImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "getting-started-with-astro",
    title: "Getting Started with Astro: A Modern Static Site Generator",
    excerpt: "Discover how Astro revolutionizes static site generation with its island architecture and zero-JavaScript approach by default.",
    content: `# Getting Started with Astro

Astro is a modern static site generator that delivers lightning-fast websites with a focus on content. What makes Astro special is its unique approach to JavaScript hydration and component islands.

## Key Features

- **Zero JavaScript by default**: Astro ships zero JavaScript to the client by default
- **Component Islands**: Hydrate interactive components only when needed
- **Framework Agnostic**: Use React, Vue, Svelte, or any framework you prefer
- **Fast Builds**: Optimized build process for rapid development

## Why Choose Astro?

Astro is perfect for content-focused websites like blogs, marketing sites, and documentation. It combines the developer experience of modern frameworks with the performance of static sites.

## Getting Started

\`\`\`bash
npm create astro@latest
cd my-astro-site
npm run dev
\`\`\`

Start building your next project with Astro today!`,
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b002?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-15",
    readingTime: 5,
    tags: ["Astro", "Static Sites", "Performance", "JavaScript"],
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop"
  },
  {
    id: "modern-css-techniques",
    title: "Modern CSS Techniques for Better User Interfaces",
    excerpt: "Explore cutting-edge CSS features like container queries, cascade layers, and subgrid to create responsive and maintainable interfaces.",
    content: `# Modern CSS Techniques for Better User Interfaces

CSS has evolved dramatically in recent years. Let's explore some of the most powerful modern features that can enhance your user interfaces.

## Container Queries

Container queries allow you to style elements based on their container's size rather than the viewport:

\`\`\`css
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
\`\`\`

## Cascade Layers

Organize your CSS with cascade layers for better maintainability:

\`\`\`css
@layer reset, base, components, utilities;

@layer components {
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
}
\`\`\`

## CSS Subgrid

Create more flexible grid layouts with subgrid:

\`\`\`css
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.child {
  display: grid;
  grid-template-columns: subgrid;
}
\`\`\`

These features represent the future of CSS and are available in modern browsers today.`,
    author: {
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-10",
    readingTime: 7,
    tags: ["CSS", "Frontend", "Design", "Web Development"],
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&h=400&fit=crop"
  },
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for Large Applications",
    excerpt: "Learn essential TypeScript patterns and practices that will make your large-scale applications more maintainable and type-safe.",
    content: `# TypeScript Best Practices for Large Applications

TypeScript has become the de facto standard for large JavaScript applications. Here are essential practices for success.

## Strict Configuration

Always enable strict mode in your \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

## Type Organization

Structure your types effectively:

\`\`\`typescript
// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserRole = 'admin' | 'user' | 'moderator';
\`\`\`

## Utility Types

Leverage TypeScript's built-in utility types:

\`\`\`typescript
type PartialUser = Partial<User>;
type UserEmail = Pick<User, 'email'>;
type UserWithoutId = Omit<User, 'id'>;
\`\`\`

Following these practices will improve your development experience and code quality.`,
    author: {
      name: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-08",
    readingTime: 6,
    tags: ["TypeScript", "JavaScript", "Best Practices", "Development"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&h=400&fit=crop"
  },
  {
    id: "react-performance-optimization",
    title: "React Performance Optimization: Beyond the Basics",
    excerpt: "Deep dive into advanced React performance optimization techniques including memoization, code splitting, and virtual scrolling.",
    content: `# React Performance Optimization: Beyond the Basics

Performance optimization in React goes beyond basic memoization. Let's explore advanced techniques for building fast applications.

## Smart Memoization

Use React.memo strategically:

\`\`\`jsx
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  // Component logic
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.data.id === nextProps.data.id;
});
\`\`\`

## Code Splitting

Implement route-based code splitting:

\`\`\`jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

## Virtual Scrolling

For large lists, implement virtual scrolling:

\`\`\`jsx
import { FixedSizeList as List } from 'react-window';

const VirtualList = ({ items }) => (
  <List
    height={600}
    itemCount={items.length}
    itemSize={50}
  >
    {({ index, style }) => (
      <div style={style}>
        {items[index]}
      </div>
    )}
  </List>
);
\`\`\`

These techniques will help you build performant React applications at scale.`,
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-05",
    readingTime: 8,
    tags: ["React", "Performance", "JavaScript", "Optimization"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
  },
  {
    id: "building-accessible-web-apps",
    title: "Building Accessible Web Applications: A Complete Guide",
    excerpt: "Learn how to create web applications that are accessible to all users, including those using assistive technologies.",
    content: `# Building Accessible Web Applications: A Complete Guide

Web accessibility ensures that your applications can be used by everyone, regardless of their abilities or the technologies they use.

## Semantic HTML

Start with proper semantic markup:

\`\`\`html
<article>
  <header>
    <h1>Article Title</h1>
    <time datetime="2024-01-15">January 15, 2024</time>
  </header>
  <main>
    <p>Article content...</p>
  </main>
</article>
\`\`\`

## ARIA Labels

Use ARIA attributes to enhance accessibility:

\`\`\`html
<button aria-label="Close dialog" aria-expanded="false">
  ×
</button>

<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="menuitem"><a href="/">Home</a></li>
  </ul>
</nav>
\`\`\`

## Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

\`\`\`css
button:focus,
a:focus {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}
\`\`\`

## Screen Reader Testing

Test your applications with screen readers like NVDA, JAWS, or VoiceOver.

Building accessible applications is not just about compliance—it's about creating inclusive experiences for all users.`,
    author: {
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face"
    },
    publishedAt: "2024-01-03",
    readingTime: 9,
    tags: ["Accessibility", "Web Development", "UX", "Inclusive Design"],
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=400&fit=crop"
  }
];

export const tags = [
  "Astro",
  "Static Sites", 
  "Performance",
  "JavaScript",
  "CSS",
  "Frontend",
  "Design",
  "Web Development",
  "TypeScript",
  "Best Practices",
  "Development",
  "React",
  "Optimization",
  "Accessibility",
  "UX",
  "Inclusive Design"
];