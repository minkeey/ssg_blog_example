import fs from 'fs';
import path from 'path';
import matter, { GrayMatterFile } from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import hljs from 'highlight.js';
import { Post } from '../pages/[id]';
import { Plugin } from 'unified';
const postsDirectory = path.join(process.cwd(), '__posts');

export const getAllBlog = (): Post[] => {
  const filenames = fs.readdirSync(postsDirectory);

  const posts: Post[] = filenames.map((filename) => {
    const slug = filename.replace('.md', '');
    const fileContent = fs.readFileSync(
      path.join(postsDirectory, filename),
      'utf8'
    );
    const { data, content } = matter(fileContent) as GrayMatterFile<string>;

    const htmlContent = markdownToHtml(content);

    return {
      slug,
      date: data.date,
      description: data.description,
      categories: data.categories,
      tags: data.tags,
      title: data.title,
      content: String(htmlContent),
    };
  });

  return posts;
};

export const getBlogSlug = async (slug: string): Promise<Post> => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(fileContent) as GrayMatterFile<string>;
  const htmlContent = await markdownToHtml(content);

  return {
    slug,
    date: data.date,
    description: data.description,
    categories: data.categories,
    tags: data.tags,
    title: data.title,
    content: htmlContent,
  };
};
export const highlightCode = (code: string, language: string): string => {
  const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
  return hljs.highlight(validLanguage, code).value;
};

export const markdownToHtml = async (markdown: string) => {
  const { value } = await remark()
    .use(remarkHtml as Plugin)
    .process(markdown);

  return value.toString();
};
