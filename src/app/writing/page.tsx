import AnimatedSection from "@/components/AnimatedSection";
import { getAllPosts, getAllWeeklyUpdates } from '@/lib/blog';
import FloatingNav from '@/components/FloatingNav';
import Link from 'next/link';

export default async function Writing() {
  const posts = await getAllPosts();
  const weeklyUpdates = await getAllWeeklyUpdates();

  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNav variant="dark" currentPage="writing" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-8 py-8">
        <div className="h-24"></div>
        
        <AnimatedSection title="">
          <div className="py-12 flex flex-col justify-center mb-24">
            <h1 className="font-heading text-6xl md:text-6xl lg:text-[92px] max-w-4xl font-semibold mb-8 leading-[1.1] tracking-tight hero-text">Thoughts & Ideas</h1>
            <p className="text-sm italic max-w-3xl mb-4 font-body text-gray-400">
              Thoughts, ideas, and insights on design, technology, and creativity. I am not a professional writer, but something I have been challenging myself to get better at.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection title="Blog Posts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mx-auto">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/writing/blog/${post.slug}`}
                className="group"
              >
                <article className="border border-gray-800 p-6 rounded-lg hover:border-gray-600 transition-colors h-full">
                  <h2 className="font-heading text-2xl mb-2 group-hover:text-gray-300 transition-colors">
                    {post.title}
                  </h2>
                  <div className="text-sm text-gray-400 mb-4">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <p className="text-gray-400">{post.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection title="Weekly Updates" className="mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mx-auto">
            {weeklyUpdates.map((post) => (
              <Link 
                key={post.slug} 
                href={`/content/weekly-updates/${post.slug}`}
                className="group"
              >
                <article className="border border-gray-800 p-6 rounded-lg hover:border-gray-600 transition-colors h-full">
                  <h2 className="font-heading text-2xl mb-2 group-hover:text-gray-300 transition-colors">
                    {post.title}
                  </h2>
                  <div className="text-sm text-gray-400 mb-4">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <p className="text-gray-400">{post.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
} 