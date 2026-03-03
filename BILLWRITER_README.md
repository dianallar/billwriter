# Federal Legislation Bill Writer

A modern, interactive web application for drafting federal legislation with professional formatting, PDF export, and collaboration features.

## Features

### 📝 Bill Editor
- Create bills following standard federal legislation format
- Fill in bill information (Congress number, session, bill number, title, sponsor)
- Multiple interactive sections with customizable titles and content
- Clean, intuitive form interface

### 🎨 Rich Text Formatting
- **Bold** (`**text**`) - Emphasize important terms
- *Italic* (`*text*`) - Add emphasis or citations
- <u>Underline</u> (`__text__`) - Highlight key sections
- [Links](url) - Reference external documents or legislation
- Real-time markdown preview

### 📄 PDF Export
- Download your bill as a professional PDF document
- Automatically formatted with proper legislative structure
- Includes metadata (Congress, session, date generated)
- Print-ready output

### 🔗 Share Bills
- Generate shareable links to bills
- Share with colleagues and stakeholders
- Read-only access for shared bills
- Copy link to clipboard with one click

### 👁️ Live Preview
- Toggle between edit and preview modes
- See how your bill will look when rendered
- Real-time markdown rendering

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating a Bill

1. **Enter Bill Information**
   - Congress number (e.g., 118)
   - Session number (e.g., 1)
   - Bill number (e.g., H.R. 1234)
   - Official title
   - Primary sponsor name

2. **Add Introduction/Preamble**
   - Use the standard legislative opening
   - Add any prefatory statements

3. **Create Sections**
   - Add a title for each section
   - Write the section content with formatting
   - Use markdown syntax for text formatting
   - Add more sections as needed with the "+ Add Section" button

### Formatting Text

Use markdown syntax in any text field:
- `**text**` for **bold**
- `*text*` for *italic*
- `__text__` for <u>underline</u>
- `[text](url)` for links

### Exporting Your Bill

**Download as PDF:**
- Click "Download PDF" button
- Bill is automatically formatted as a professional document
- Saves to your Downloads folder

**Share Your Bill:**
- Click "Share" button
- A unique share link is generated
- Click the copy icon to copy link to clipboard
- Share the link with others to view your bill

### Preview Mode

- Click "Preview" tab to see bill rendering
- Shows how the bill will appear when finalized
- Displays all formatting correctly
- Perfect for reviewing before sharing or exporting

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main home page
│   ├── bill/[shareId]/       # Shared bill view page
│   ├── api/
│   │   ├── export-pdf/       # PDF export API
│   │   └── share/            # Share link generation API
│   └── globals.css           # Global styles
├── components/
│   ├── BillEditor.tsx        # Main editor component
│   ├── BillForm.tsx          # Bill form component
│   ├── BillPreview.tsx       # Preview component
│   ├── TextEditor.tsx        # Rich text editor with toolbar
│   └── ExportBar.tsx         # Top bar with export options
├── types/
│   └── bill.ts               # TypeScript type definitions
└── utils/
    └── billUtils.ts          # Utility functions
```

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **jsPDF** - PDF generation
- **Lucide React** - Icon library
- **React** - UI library

## API Routes

### POST /api/export-pdf
Export bill as PDF
- Request: Bill object
- Response: PDF file stream

### POST /api/share
Generate share link
- Request: Bill object
- Response: Shareable URL and share ID

### GET /api/share/[shareId]
Retrieve shared bill
- Request: Share ID in URL
- Response: Bill object

## Deployment

### Deploy to Vercel

```bash
# Push to GitHub
git push

# Deploy via Vercel CLI
npm i -g vercel
vercel
```

### Environment Setup for Production

1. Replace in-memory storage with a database (PostgreSQL, MongoDB, etc.)
2. Implement proper session management
3. Add authentication if needed
4. Set up proper domain for share links

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Features Roadmap

- [ ] User authentication and accounts
- [ ] Bill templates library
- [ ] Version history and revisions
- [ ] Collaboration/commenting
- [ ] Legislative reference database
- [ ] Bill comparison tool
- [ ] Export to Word/Google Docs
- [ ] Mobile-responsive improvements
- [ ] Dark mode toggle
- [ ] Multi-language support

## License

MIT

## Contributing

Contributions welcome! Please feel free to submit pull requests.
