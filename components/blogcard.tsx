import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

interface Props {
  title: string;
  desc: string;
  slug: string;
}

const Blogcard: NextPage<Props> = ({ title, desc, slug }) => {
  return (
    <Link className='block' href={'/blogs/' + slug}>
      <div className='bg-gray-200 p-2 rounded '>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <p className='text-gray-600'>{desc}</p>
      </div>
    </Link>
  );
};

export default Blogcard;
