# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a stylized portfolio website built as a retro CRT terminal interface with Next.js 15.5.4, React 19, and Tailwind CSS 4. The portfolio features a split-view design with a persistent file tree on the left and content viewer on the right - no typing required, just click to navigate.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

The dev server runs on http://localhost:3000 and supports hot reloading.

## Architecture

### Design Theme: CRT Visual Terminal

The portfolio uses an authentic CRT terminal aesthetic with modern functionality:

**Visual Effects:**
- **Color scheme**: Black background (`#000000`) with phosphor green text (`#00ff00`), amber headers (`#ffb000`), and cyan accents (`#00ffff`)
- **Typography**: VT323 monospace font loaded from Google Fonts
- **CRT Effects**:
  - Curved screen with rounded border and green glow
  - Animated scanlines (2px repeating pattern)
  - Subtle screen flicker animation
  - Vignette darkening at edges
  - Radial background gradient
  - Phosphor glow on all text elements
- **Full color support**: Images display in full RGB color within CRT-styled containers
- All CSS effects are defined in `src/app/globals.css`

### Application Structure

**Single Page Application**: Everything happens on the home page (`src/app/page.tsx`) - there are no route navigations.

**Split-View Layout** (No Typing Required):
```
┌─────────────────────────────────────────────────┐
│           HEADER (Title + Subtitle)             │
├──────────────┬──────────────────────────────────┤
│  FILE TREE   │      CONTENT VIEWER              │
│  (320px)     │      (Flex-1)                    │
│              │                                  │
│  • about     │   [Text content or images        │
│  • education │    displayed here based on       │
│  ▼ projects  │    selected file]                │
│    • proj001 │                                  │
│    • proj002 │                                  │
│  • contact   │                                  │
│  • skills    │                                  │
│              │                                  │
├──────────────┴──────────────────────────────────┤
│           FOOTER (Status bar)                   │
└─────────────────────────────────────────────────┘
```

**Navigation:**
- Click folders to expand/collapse
- Click files to view content in right panel
- No keyboard input required
- Selected items highlighted with amber border
- Hover effects on all interactive elements

### File System Implementation

The file system is a TypeScript object structure with nested children:

```typescript
interface FileNode {
  type: 'file' | 'folder';
  name: string;
  path: string;
  children?: FileNode[];
  icon?: LucideIcon;
}
```

**File Structure:**
```
root/
├── about.txt           (Personal bio and education summary)
├── education.txt       (Detailed education history)
├── projects/           (Folder with 3 projects)
│   ├── project_001.txt (Dynatrace - with image)
│   ├── project_002.txt (Evolv - with image)
│   └── project_003.txt (Gaming Hub - with image)
├── contact.sys         (Contact information)
├── skills.dat          (Technical skills with ASCII progress bars)
└── experience.log      (Work experience timeline)
```

**Content Format:**
- **Simple text files**: Plain string content rendered in `<pre>` tags
- **Rich project files**: Objects with `title`, `content`, and optional `image` path
- Text content uses ASCII-art style headers and formatting
- Skills file includes ASCII progress bars (█ characters)

### Icons

Uses `lucide-react` for consistent iconography:
- `Folder` - Directory/folder icon
- `FileText` - Text file (.txt)
- `Database` - Data file (.dat)
- `ScrollText` - Log file (.log)
- `Mail` - Contact/system file (.sys)
- `ChevronDown` / `ChevronRight` - Folder expand/collapse

### State Management

Key React state variables:
- `selectedFile` - Currently selected/displayed file path (string)
- `expandedFolders` - Set of expanded folder paths (Set<string>)

### Key Implementation Details

1. **CRT Screen Container**:
   - Outer container with radial gradient background
   - Inner screen with rounded corners and green glow
   - Scanlines and flicker applied as pseudo-elements
   - Vignette overlay for edge darkening

2. **File Tree Rendering**:
   - Recursive `renderFileTree()` function
   - Supports nested folders with indentation
   - Click handlers for expand/collapse and file selection
   - Visual feedback for hover and selected states

3. **Content Viewer**:
   - Renders different content types dynamically
   - Text files: `<pre>` tags with phosphor-text styling
   - Project files: Title (h1) + content + optional image
   - Images: Wrapped in `.crt-image-container` with green border and glow
   - Full scrolling support with custom green scrollbar

4. **Image Support**:
   - Images stored in `public/projects/` folder
   - Referenced by path in file content objects
   - Displayed with CRT-style border and subtle filter effects
   - Currently shows placeholders - add actual images to `/public/projects/`:
     - `dynatrace.png`
     - `evolv.png`
     - `gaming-hub.png`

5. **CSS Classes**:
   - `.crt-container` - Outer viewport with gradient
   - `.crt-screen` - Main screen with all CRT effects
   - `.crt-vignette` - Edge darkening overlay
   - `.phosphor-text` - Green glowing text
   - `.phosphor-amber` - Amber glowing headers
   - `.phosphor-cyan` - Cyan glowing accents
   - `.file-tree-item` - Interactive file/folder item
   - `.content-viewer` - Content display area
   - `.crt-image-container` - Image wrapper with CRT styling
   - `.custom-scroll` - Custom green glowing scrollbar

6. **Turbopack**: The project uses Next.js Turbopack bundler for both dev and build commands.

## Customization Guide

**To add new files/directories**:
1. Add entry to `fileStructure` object in `page.tsx`
2. For directories, add to parent's `children` array with `type: 'folder'`
3. For files, add appropriate icon from lucide-react
4. Add corresponding content to `fileContents` object

**To modify content**:
- For text files: Edit the string in `fileContents`
- For project files with images: Use object format with `title`, `content`, and `image` fields
- Use template literals for multi-line content with ASCII art

**To add images**:
1. Place image files in `public/projects/` folder
2. Reference with path like `/projects/your-image.png`
3. Images automatically display in CRT-styled containers

**To adjust CRT effects**:
- Modify CSS variables in `globals.css` (`:root` section)
- Adjust scanline density, flicker speed, or glow intensity
- All visual effects use CSS only - no JavaScript animations

## Design Philosophy

**Content First**: The entire UI exists to showcase portfolio content. Every design decision prioritizes readability and content accessibility.

**No Unnecessary Features**: Removed abstract system utilities (network testing, system info, etc.) that distracted from the core purpose.

**Interactive, Not Complex**: Simple click navigation - no bash command memorization required.

**Retro Aesthetic, Modern Function**: CRT effects provide unique visual style while maintaining full functionality including color images and responsive design.
