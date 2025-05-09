import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const weeklyUpdatesDirectory = path.join(process.cwd(), 'src/app/content/weekly-updates');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: any;
  excerpt: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title,
          date: data.date,
          content,
          excerpt: data.excerpt || '',
        };
      })
  );

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllWeeklyUpdates(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(weeklyUpdatesDirectory);
  const allUpdatesData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(weeklyUpdatesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title,
          date: data.date,
          content,
          excerpt: data.excerpt || '',
        };
      })
  );

  return allUpdatesData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      content,
      excerpt: data.excerpt || '',
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export async function getWeeklyUpdateBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(weeklyUpdatesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      content,
      excerpt: data.excerpt || '',
    };
  } catch (error) {
    console.error(`Error loading weekly update ${slug}:`, error);
    return null;
  }
} 