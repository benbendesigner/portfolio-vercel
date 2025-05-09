import { notFound } from 'next/navigation';
import { getAllWeeklyUpdates, getWeeklyUpdateBySlug } from '@/lib/blog';
import FloatingNav from '@/components/FloatingNav';
import { MDXRemote } from 'next-mdx-remote/rsc';
import styles from './page.module.css';

export async function generateStaticParams() {
  const posts = await getAllWeeklyUpdates();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function WeeklyUpdatePage({ params }: { params: { slug: string } }) {
  const post = await getWeeklyUpdateBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNav variant="dark" currentPage="writing" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-8 py-8">
        <div className="h-24"></div>

        <article className={styles.content}>
          <div className="max-w-3xl mx-auto mb-8">
            <a href="/writing" className="border border-gray-700 text-white px-6 py-2 rounded-full text-xs italic font-body hover:bg-white/10 hover:border-white transition-colors">
              ← Back to Writing
            </a>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-[1.1] tracking-tight">
            {post.title}
          </h1>
          <div className="text-sm text-gray-400 mb-12">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <MDXRemote source={post.content} />
        </article>
      </div>
    </div>
  );
} 