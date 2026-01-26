# Books Archive

A personal PDF book library built with Next.js.

## Features

- Upload and store PDF books
- Search by title or author
- View PDFs in browser
- Download books
- Delete books from library
- Responsive design

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

## Deployment with Nginx

1. Build the application:
   ```bash
   npm run build
   ```

2. Copy `nginx.conf` to `/etc/nginx/sites-available/books-archive`

3. Update the config:
   - Replace `your-domain.com` with your domain
   - Update `/path/to/books-archive/public/books/` with the actual path

4. Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/books-archive /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. Start the Next.js server:
   ```bash
   npm start
   ```

   For production, use PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name "books-archive" -- start
   pm2 save
   pm2 startup
   ```

## Project Structure

```
├── data/               # Book metadata storage (books.json)
├── public/books/       # Uploaded PDF files
├── src/
│   ├── app/
│   │   ├── api/books/  # API routes
│   │   └── page.tsx    # Main page
│   ├── components/     # React components
│   └── lib/            # Utilities and types
└── nginx.conf          # Nginx configuration
```
