import Blogcard from 'components/blogcard';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

interface Props {}

const BlogsPages: NextPage<Props> = () => {
  const [posts, setPosts] = useState<
    { title: string; slug: string; meta: string }[]
  >([]);
  const fetchPost = async () => {
    const res = await fetch('api/posts');
    const data = await res.json();
    setPosts(data.info);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className='max-w-3xl mx-auto p-5 space-y-2'>
      {posts.map((post) => (
        <Blogcard key={post.slug} title={post.title} desc={post.meta} />
      ))}
    </div>
  );
};

export default BlogsPages;
