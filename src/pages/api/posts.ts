import type { NextApiRequest, NextApiResponse } from 'next';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET':
      const data = readPosts();
      return res.json({ info: data });
    default:
      return res.status(404).send('Not Found');
  }
}

function readPosts() {
  const dirRead = path.join(process.cwd(), 'posts');
  const dirs = fs.readdirSync(dirRead);
  const data = dirs.map((filename) => {
    const filePathRead = path.join(process.cwd(), 'posts/' + filename);
    const fileContent = fs.readFileSync(filePathRead, {
      encoding: 'utf-8',
    });
    return matter(fileContent).data;
  });
  return data;
}
