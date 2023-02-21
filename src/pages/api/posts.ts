import type { NextApiRequest, NextApiResponse } from 'next';
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
  return fs.readdirSync(dirRead);
}
