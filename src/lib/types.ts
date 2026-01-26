export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  filename: string;
  originalName: string;
  size: number;
  uploadedAt: string;
  coverUrl?: string;
}

export interface BooksData {
  books: Book[];
}
