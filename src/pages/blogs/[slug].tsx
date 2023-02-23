import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
interface Props {}

const BlogPage: NextPage<Props> = () => {
  const { slug } = useRouter().query;
  return <div>{slug}</div>;
};

export default BlogPage;
export const getStaticPaths: GetStaticPaths = async () => {
  //!get all the markdown files
  const dirRead = path.join(process.cwd(), 'posts');
  const dirs = fs.readdirSync(dirRead);
  const paths = dirs.map((filename) => {
    const filePathRead = path.join(process.cwd(), 'posts/' + filename);
    const fileContent = fs.readFileSync(filePathRead, {
      encoding: 'utf-8',
    });
    return { params: { slug: matter(fileContent).data.slug } };
  });
  //!end of getting all the markdown files
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context);
  return {
    props: {},
  };
};
