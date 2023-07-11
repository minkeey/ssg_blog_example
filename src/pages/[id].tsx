import Layout from '../components/Layout';
import { getAllBlog, getBlogSlug } from '../lib/blog';
import { GetStaticPropsContext } from 'next';

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  categories: string[];
  tags: string[];
  content: string;
};

export type PostProps = {
  post: Post;
};

const PostPage = ({ post }: PostProps) => {
  return (
    <Layout>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>{post.date}</p>
      <ul>
        {post.categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
      <ul>
        {post.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const posts = getAllBlog();
  const paths = posts.map((post) => ({
    params: {
      id: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const slug = params?.id as string;
  const post = await getBlogSlug(slug);
  return {
    props: {
      post,
    },
  };
};

export default PostPage;
