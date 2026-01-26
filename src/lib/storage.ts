import { promises as fs } from 'fs';
import path from 'path';
import { Book, BooksData } from './types';

const DATA_FILE = path.join(process.cwd(), 'data', 'books.json');
const BOOKS_DIR = path.join(process.cwd(), 'public', 'books');

async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify({ books: [] }, null, 2));
  }
}

async function ensureBooksDir(): Promise<void> {
  try {
    await fs.access(BOOKS_DIR);
  } catch {
    await fs.mkdir(BOOKS_DIR, { recursive: true });
  }
}

export async function getBooks(): Promise<Book[]> {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  const parsed: BooksData = JSON.parse(data);
  return parsed.books;
}

export async function getBookById(id: string): Promise<Book | undefined> {
  const books = await getBooks();
  return books.find((book) => book.id === id);
}

export async function addBook(book: Book): Promise<void> {
  await ensureDataFile();
  const books = await getBooks();
  books.push(book);
  await fs.writeFile(DATA_FILE, JSON.stringify({ books }, null, 2));
}

export async function deleteBook(id: string): Promise<boolean> {
  const books = await getBooks();
  const bookIndex = books.findIndex((book) => book.id === id);
  
  if (bookIndex === -1) {
    return false;
  }
  
  const book = books[bookIndex];
  
  // Delete the PDF file
  try {
    const filePath = path.join(BOOKS_DIR, book.filename);
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
  
  // Remove from data
  books.splice(bookIndex, 1);
  await fs.writeFile(DATA_FILE, JSON.stringify({ books }, null, 2));
  
  return true;
}

export async function updateBook(id: string, updates: Partial<Book>): Promise<Book | null> {
  const books = await getBooks();
  const bookIndex = books.findIndex((book) => book.id === id);
  
  if (bookIndex === -1) {
    return null;
  }
  
  books[bookIndex] = { ...books[bookIndex], ...updates };
  await fs.writeFile(DATA_FILE, JSON.stringify({ books }, null, 2));
  
  return books[bookIndex];
}

export async function saveBookFile(file: File): Promise<string> {
  await ensureBooksDir();
  
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const filePath = path.join(BOOKS_DIR, filename);
  
  await fs.writeFile(filePath, buffer);
  
  return filename;
}

export function getBookFilePath(filename: string): string {
  return path.join(BOOKS_DIR, filename);
}
