import { client, GET_POST_BY_SLUG } from '@/lib/apollo-client';
import { formatDistance } from 'date-fns';

interface PostProps {
  params: {
    slug: string;
  };
}

interface Category {
  name: string;
  slug: string;
}

async function getPost(slug: string) {
  try {
    // Clean the slug by removing any URL parts and leading/trailing slashes
    const cleanSlug = slug.split('/').pop()?.replace(/^\/+|\/+$/g, '') || slug;
    
    const { data } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: { slug: cleanSlug }
    });
    return data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function BlogPost({ params }: PostProps) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {post.featuredImage && (
        <img
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
      )}
      
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      
      <div className="flex items-center gap-4 mb-8 text-gray-600">
        {post.author?.node && (
          <div className="flex items-center gap-2">
            {post.author.node.avatar?.url && (
              <img
                src={post.author.node.avatar.url}
                alt={post.author.node.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <span>{post.author.node.name}</span>
          </div>
        )}
        <span>•</span>
        <time dateTime={post.date}>
          {formatDistance(new Date(post.date), new Date(), { addSuffix: true })}
        </time>
        
        {post.categories?.nodes.length > 0 && (
          <>
            <span>•</span>
            <div className="flex gap-2">
              {post.categories.nodes.map((category: Category) => (
                <span
                  key={category.slug}
                  className="bg-gray-100 px-2 py-1 rounded-full text-sm"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
} 