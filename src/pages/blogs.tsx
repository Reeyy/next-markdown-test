import Blogcard from 'components/blogcard';
import { InferGetStaticPropsType, NextPage } from 'next';
import { useState } from 'react';

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
interface PostAPi {
  info: {
    title: string;
    slug: string;
    meta: string;
  }[];
}
export const getStaticProps = async () => {
  const { info }: PostAPi = await fetch('http://localhost:3000/api/posts').then(
    (data) => data.json()
  );

  return {
    props: { posts: info },
  };
};

export default BlogsPages;
