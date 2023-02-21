import Blogcard from 'components/blogcard';
import { NextPage } from 'next';

interface Props {}

const BlogsPages: NextPage<Props> = () => {
  return (
    <div className='max-w-3xl mx-auto p-5 space-y-2'>
      <Blogcard
        title='Test'
        desc=' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur sapiente necessitatibus incidunt voluptate saepe facilis, quod totam ut neque adipisci magnam dolorem delectus beatae sequi ratione accusantium reprehenderit similique laborum repellat natus quo. Architecto esse sapiente necessitatibus nulla. Illum, qui!'
      />
      <Blogcard title='Test' desc='Test' />
      <Blogcard
        title='Test'
        desc=' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur sapiente necessitatibus incidunt voluptate saepe facilis, quod totam ut neque adipisci magnam dolorem delectus beatae sequi ratione accusantium reprehenderit similique laborum repellat natus quo. Architecto esse sapiente necessitatibus nulla. Illum, qui!'
      />
    </div>
  );
};

export default BlogsPages;
