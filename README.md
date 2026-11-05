# VidSnap

A responsive, premium dark-and-blue static website for authorized direct media downloads.

## Included
- Responsive homepage and downloader interface
- Direct HTTP/HTTPS media URL handling
- Permission confirmation and YouTube URL guardrail
- MP4, WebM, MP3, WAV filename choices (no transcoding)
- About, Privacy, Terms, Contact, and 404 pages
- SEO metadata, favicon, accessible status messages
- GitHub Pages deployment workflow

## Important technical limitation
GitHub Pages serves static files only. It cannot run a backend to fetch, process, convert, or proxy video files. This project does **not** extract YouTube streams or bypass platform restrictions. It only asks the visitor's browser to download a direct media URL they are authorized to access. The remote host may block cross-origin downloads or require authentication. Selecting a file extension does not convert the file.

For your own YouTube videos, use YouTube Studio or Google Takeout. For YouTube offline viewing, use YouTube's official features where available.

## Test locally
Open `index.html` in a browser, or run a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages (free)
1. Sign in to GitHub and create a **public** repository named `vidsnap` (or another name).
2. Upload all files and folders from this project. `index.html` must be in the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for the Pages deployment to finish. Your site will appear at:
   `https://YOUR-USERNAME.github.io/vidsnap/`
7. If your repository is named `YOUR-USERNAME.github.io`, the URL will be:
   `https://YOUR-USERNAME.github.io/`

You can also use the included GitHub Actions workflow. In repository settings, set Pages source to **GitHub Actions**.

## Before publishing
- Replace the placeholder contact email in `contact.html`.
- Review and adapt legal pages to your jurisdiction and actual practices.
- If you add analytics, ads, cookies, or backend services, update the privacy policy and obtain any required consent.
- Test downloads using files you own or have permission to download.

## Customization
- Brand colors and layout: `styles.css`
- Download validation and browser action: `script.js`
- Page content and SEO: `index.html` and the other HTML pages
