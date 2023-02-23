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
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote/dist';
type Post = {
  post: {
    title: string;
    content: MDXRemoteSerializeResult;
  };
};
type Props = InferGetStaticPropsType<typeof getStaticProps>;
const BlogPage: NextPage<Props> = ({ post }) => {
  const { slug } = useRouter().query;
  const { title, content } = post;
  return (
    <div className='max-w-3xl mx-auto'>
      <h1>{title}</h1>
      <div className='prose'>
        <MDXRemote {...content} />
      </div>
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
  // Remove the frontmatter from the content and use the mdx compiler
  const source: any = await serialize(fileContent, {
    parseFrontmatter: true,
  });
  return {
    props: {
      post: {
        content: source,
        title: source.frontmatter!.title,
      },
    },
  };
};
