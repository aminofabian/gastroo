import { GetStaticProps } from 'next';
import { client, GET_POSTS } from '../../lib/wordpress';

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

interface BlogPageProps {
  posts: Post[];
}

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {post.featuredImage && (
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <div 
                className="text-gray-600 mb-4"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
              <a
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800"
              >
                Read more →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await client.query({
      query: GET_POSTS
    });

    return {
      props: {
        posts: data.posts.nodes
      },
      revalidate: 60 // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: []
      }
    };
  }
}; 