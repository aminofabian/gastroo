import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Initialize Apollo Client
export const client = new ApolloClient({
  uri: 'https://blog.gastro.or.ke/graphql',
  cache: new InMemoryCache(),
});

// Query to fetch blog posts
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
        id
        title
        date
        slug
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

// Query to fetch site settings
export const GET_SITE_SETTINGS = gql`
  query GetSiteSettings {
    allSettings {
      generalSettingsTitle
      generalSettingsDescription
    }
  }
`; 