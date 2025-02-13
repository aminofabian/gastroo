import { client, GET_POSTS } from '@/lib/apollo-client';

interface Post {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    }
  }
}

async function getBlogPosts() {
  try {
    const { data } = await client.query({
      query: GET_POSTS
    });
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-center">
          Our Blog
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover our latest thoughts, ideas, and insights about technology and development.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 
                         transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {post.featuredImage ? (
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              ) : (
                <div className="h-56 bg-gradient-to-r from-blue-500 to-purple-600" />
              )}
              
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">
                  {post.title}
                </h2>
                <div 
                  className="text-gray-600 mb-4 line-clamp-3 prose prose-sm"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium
                           transition-colors duration-200"
                >
                  Read article
                  <svg 
                    className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 