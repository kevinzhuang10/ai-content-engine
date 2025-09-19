# Plan: Build AI Content Engine Home Page

## Overview
Transform the current authentication-focused application into an AI content engine with a clean interface for uploading audio transcription files and generating social media content.

## Current State
- Authentication (sign-in/sign-up) working with Supabase
- Next.js 15.5.3 with App Router, TypeScript, TailwindCSS v4, and shadcn/ui components
- Main page is currently a sign-in form
- Dashboard shows user authentication info (needs to be replaced)

## Tasks

### 1. Transform Main Page
- [ ] Replace current sign-in page with the content generation interface shown in design
- [ ] Create a clean layout with left sidebar for projects navigation and main content area
- [ ] Move authentication to separate routes (keep existing auth functionality intact)

### 2. Core Components to Build
- [ ] **Project Sidebar**: List of projects with "+ New Project" button
- [ ] **File Upload Area**: Large upload zone with "Upload file" button and drag-drop support
- [ ] **Content Type Selection**: Checkbox interface for X/Twitter and LinkedIn with post quantity
- [ ] **Generate Button**: Primary action button to process content (UI only for now)

### 3. Additional UI Components Needed
- [ ] Add Checkbox component to shadcn/ui collection for content type selection
- [ ] Create custom file upload component with proper styling and drag-drop
- [ ] Build project list component with navigation
- [ ] Add proper spacing and layout components

### 4. Layout Structure
- [ ] Left sidebar (250-300px): Projects navigation with clean styling
- [ ] Main content area: New Project workflow with upload and generation
- [ ] Follow design principles from style guide (clean, minimal, consistent spacing)
- [ ] Ensure proper responsive behavior for mobile/tablet

### 5. State Management (UI Only)
- [ ] Add React state for file upload display (no actual upload processing yet)
- [ ] Handle content type selection state
- [ ] Add form validation and user feedback (visual only)
- [ ] Mock project list state for UI demonstration

### 6. Visual Verification
- [ ] Navigate to the new home page and capture screenshot
- [ ] Verify design matches the provided mockup
- [ ] Ensure responsive behavior and accessibility compliance
- [ ] Check all interactive elements work properly (hover states, focus, etc.)

## Notes
- Focus on UX/UI only - no backend functionality needed yet
- Keep existing authentication system intact but move to separate routes
- Follow existing design system and component patterns
- Ensure clean, professional appearance matching the mockup design