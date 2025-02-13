import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://blog.gastro.or.ke/graphql',
  cache: new InMemoryCache(),
});

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

export const GET_SITE_SETTINGS = gql`
  query GetSiteSettings {
    allSettings {
      generalSettingsTitle
      generalSettingsDescription
    }
  }
`; 