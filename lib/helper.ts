import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { PostAPi } from 'type/types';

export function readPosts(): PostAPi {
  const dirRead = path.join(process.cwd(), 'posts');
  const dirs = fs.readdirSync(dirRead);
  const data = dirs.map((filename) => {
    const filePathRead = path.join(process.cwd(), 'posts/' + filename);
    const fileContent = fs.readFileSync(filePathRead, {
      encoding: 'utf-8',
    });
    return matter(fileContent).data;
  });
  return data as PostAPi;
}
