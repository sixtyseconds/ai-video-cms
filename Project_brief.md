Development Brief: Video Management Platform

Core UI Architecture
- Pure React implementation
- TypeScript for type safety
- Dark theme UI matching Frame.io's interface
- shadcn/ui components styled to match Frame.io's aesthetic
- Responsive grid layouts for asset management

Key UI Components

Navigation
- Left sidebar with collapsible sections:
  - Assets (with All Assets as default view)
  - Collections (Videos, Needs Review, Audio, Approved, Images)
  - Shares
  - C2C Connections

Main Content Area
- Header Bar
  - Breadcrumb navigation
  - View controls (Appearance, Fields, Sort options)
  - Search functionality
  - New asset/project creation button

Asset Grid View
- Thumbnail previews with hover states
- Video duration display
- Status indicators
- Multiple selection capability
- Metadata preview (title, creator, date)

Asset List View (Alternative)
- Detailed view with columns
- Sortable headers
- Inline status updates

Right Sidebar
- Asset details panel
  - Video metadata
  - Comments section
  - Share controls
  - Security settings
  - Custom fields

Modal Components
- Asset preview/player
- Share creation
- Upload interface
- Settings panels

Technical Implementation

Authentication Flow
- Implement Supabase auth with email/password
- Protected routes using React Router
- Session management with Supabase client
- Custom AuthProvider context

Routing
- React Router v6 for navigation
- Protected route wrappers
- Nested routes for complex views
- URL parameter handling for direct asset access

Database Schema (Supabase)
```sql
videos {
  id
  user_id
  title
  description
  category
  sub_tags
  hook
  main_points
  video_url
  thumbnail_url
  created_at
  updated_at
  audio_file_url
  status          -- New field for review status
  share_settings  -- New field for visibility control
  version_number  -- New field for version tracking
}
```

Video Processing Pipeline

Local Upload Flow:
- Direct to S3 with progress tracking
- Background processing queue for FFMPEG operations
- Parallel processing for audio extraction and thumbnail generation
- OpenAI processing for transcription and metadata
- Real-time status updates to UI

External Source Flow:
- Apify integration for video download
- Queue management for processing
- Status tracking and error handling
- Metadata extraction and storage

State Management
- React Context for global state
- Custom hooks for shared logic
- Supabase real-time subscriptions
- Client-side caching with React Query
- Local storage for user preferences

UI State Management
- Implement optimistic updates
- Real-time status updates using Supabase subscriptions
- Client-side caching for performance
- Progressive loading for large asset libraries

Additional Features

Version Control
- Track video versions
- Compare different versions
- Maintain version history

Sharing & Collaboration
- Customizable share links
- Permission management
- Comment threads
- Review workflows

Asset Organization
- Collections management
- Custom metadata fields
- Bulk operations
- Advanced search/filter

Performance Optimizations
- Lazy loading for thumbnails
- Virtual scrolling for large lists
- Optimistic UI updates
- Background processing indicators

Development Priorities
1. Core authentication and file management
2. Video processing pipeline
3. Basic sharing functionality
4. Advanced features (versioning, collaboration)
5. Performance optimizations
6. Additional integrations

Technical Stack
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router v6
- React Query
- FFmpeg
- OpenAI API
- AWS S3
- Supabase
- Apify

Component Architecture
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── MainContent.tsx
│   ├── assets/
│   │   ├── AssetGrid.tsx
│   │   ├── AssetCard.tsx
│   │   └── AssetDetails.tsx
│   └── shared/
│       ├── Button.tsx
│       └── Modal.tsx
├── contexts/
│   ├── AuthContext.tsx
│   └── UIContext.tsx
├── hooks/
│   ├── useAssets.ts
│   └── useUpload.ts
├── services/
│   ├── supabase.ts
│   └── openai.ts
└── utils/
    ├── videoProcessing.ts
    └── formatters.ts
```