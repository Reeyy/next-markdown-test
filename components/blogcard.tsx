import { NextPage } from 'next';

interface Props {
  title: string;
  desc: string;
}

const Blogcard: NextPage<Props> = ({ title, desc }) => {
  return (
    <div className='bg-gray-200 p-2 rounded'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <p className='text-gray-600'>{desc}</p>
    </div>
  );
};

export default Blogcard;
