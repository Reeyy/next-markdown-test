import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
type Post = {
  post: {
    title: string;
    content: string;
  };
};
type Props = InferGetStaticPropsType<typeof getStaticProps>;
const BlogPage: NextPage<Props> = (props) => {
  const { slug } = useRouter().query;
  return (
    <div>
      <h1>{props.post.title}</h1>
      <h1>{props.post.content}</h1>
    </div>
  );
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
interface ISTaticProps extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Post> = async (context) => {
  const { params } = context;
  const { slug } = params as ISTaticProps;
  const filePathRead = path.join(process.cwd(), 'posts/' + slug + '.md');
  const fileContent = fs.readFileSync(filePathRead, {
    encoding: 'utf-8',
  });
  const { content, data } = matter(fileContent);
  return {
    props: {
      post: {
        content,
        title: data.title,
      },
    },
  };
};
