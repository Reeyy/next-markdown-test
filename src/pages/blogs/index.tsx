import Blogcard from 'components/blogcard';
import { readPosts } from 'lib/helper';
import { InferGetStaticPropsType, NextPage } from 'next';
import { useState } from 'react';
import { PostAPi } from 'type/types';

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const BlogsPages: NextPage<Props> = ({ posts }) => {
  return (
    <div className='max-w-3xl mx-auto p-5 space-y-2'>
      {posts.map((post) => (
        <Blogcard
          key={post.slug}
          slug={post.slug}
          title={post.title}
          desc={post.meta}
        />
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const postinfo: PostAPi = readPosts();

  return {
    props: { posts: postinfo },
  };
};

export default BlogsPages;
