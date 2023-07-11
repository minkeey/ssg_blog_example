import React from 'react';
import Link from 'next/link';
import { Post } from '../pages/[id]';

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <>
          <li key={post.slug}>
            <Link href={`/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
          <p>{post.description}</p>
        </>
      ))}
    </ul>
  );
};

export default PostList;
