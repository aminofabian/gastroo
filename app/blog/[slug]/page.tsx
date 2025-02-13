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
    <main className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {post.featuredImage && (
            <div className="relative h-[400px] w-full">
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 font-merriweather">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-10 text-gray-600 border-b border-gray-100 pb-6">
              {post.author?.node && (
                <div className="flex items-center gap-2">
                  {post.author.node.avatar?.url && (
                    <img
                      src={post.author.node.avatar.url}
                      alt={post.author.node.name}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    />
                  )}
                  <span className="font-medium">{post.author.node.name}</span>
                </div>
              )}
              <span className="text-gray-300">•</span>
              <time dateTime={post.date} className="text-gray-500">
                {formatDistance(new Date(post.date), new Date(), { addSuffix: true })}
              </time>
              
              {post.categories?.nodes.length > 0 && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.nodes.map((category: Category) => (
                      <span
                        key={category.slug}
                        className="px-3 py-1 rounded-full text-sm bg-[#0f5a5e]/5 text-[#0f5a5e] font-medium"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div 
              className="prose prose-lg max-w-none prose-headings:font-merriweather prose-p:text-gray-600 prose-a:text-[#0f5a5e] prose-a:no-underline hover:prose-a:text-[#c22f61]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>
    </main>
  );
} 