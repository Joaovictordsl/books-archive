import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getBooks, addBook, saveBookFile } from '@/lib/storage';
import { Book } from '@/lib/types';

export async function GET() {
  try {
    const books = await getBooks();
    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    const filename = await saveBookFile(file);

    const book: Book = {
      id: uuidv4(),
      title: title || file.name.replace('.pdf', ''),
      author: author || 'Unknown',
      description: description || '',
      filename,
      originalName: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    };

    await addBook(book);

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error('Error uploading book:', error);
    return NextResponse.json({ error: 'Failed to upload book' }, { status: 500 });
  }
}
