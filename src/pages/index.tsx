import type { ReactElement } from 'react';
import Layout from '../components/Layout';
import { Post } from './[id]';
import PostList from '../components/PostList';
import { GetStaticProps } from 'next';
import { getAllBlog } from '../lib/blog';

type BlogProps = {
  posts: Post[];
};
const Page = ({ posts }: BlogProps) => {
  return (
    <>
      <h1> Blog</h1>
      <PostList posts={posts} />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = await getAllBlog();
  return {
    props: {
      posts,
    },
  };
};

export default Page;
