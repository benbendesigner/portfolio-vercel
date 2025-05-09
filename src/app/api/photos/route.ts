import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const photosDirectory = path.join(process.cwd(), 'public', 'images', 'Photos');
    const files = await readdir(photosDirectory);
    
    // Filter for image files and sort them
    const photos = files
      .filter(file => /\.(jpeg|jpg|png|gif)$/i.test(file))
      .sort((a, b) => {
        // Extract numbers from filenames for sorting
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numB - numA; // Sort in descending order (newest first)
      });

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error reading photos directory:', error);
    return NextResponse.json({ error: 'Failed to load photos' }, { status: 500 });
  }
} 