# Style Guide

This style guide defines the visual design standards for our application, inspired by the clean, minimalistic aesthetics of Next.js, Vercel, and shadcn/ui.

## Design Philosophy

### Core Principles
- **Minimalism**: Clean, uncluttered interfaces with purposeful whitespace
- **Clarity**: Clear visual hierarchy and intuitive user flows
- **Consistency**: Uniform patterns across all components and pages
- **Performance**: Lightweight, fast-loading designs
- **Accessibility**: WCAG 2.1 AA compliant with semantic markup

### Visual Identity
- **Aesthetic**: Modern, professional, and approachable
- **Mood**: Calm, focused, and trustworthy
- **Tone**: Clean, sophisticated, and purposeful

## Typography

### Font Families
- **Primary**: Geist Sans (body text, UI elements)
- **Monospace**: Geist Mono (code, technical content)
- **Fallbacks**: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

### Font Scales
```css
/* Desktop (1024px+) */
text-xs: 12px
text-sm: 14px
text-base: 16px
text-lg: 18px
text-xl: 20px
text-2xl: 24px
text-3xl: 30px
text-4xl: 36px
text-5xl: 48px
text-6xl: 60px

/* Mobile scaling: 0.875x for large text sizes */
```

### Typography Hierarchy
- **H1**: text-4xl (36px) / text-5xl (48px) - Page titles
- **H2**: text-3xl (30px) / text-4xl (36px) - Section headers
- **H3**: text-2xl (24px) / text-3xl (30px) - Subsection headers
- **H4**: text-xl (20px) / text-2xl (24px) - Component headers
- **Body**: text-base (16px) - Primary content
- **Small**: text-sm (14px) - Secondary content, captions
- **Micro**: text-xs (12px) - Labels, metadata

### Font Weights
- **Light**: 300 - Large display text only
- **Regular**: 400 - Body text, most UI elements
- **Medium**: 500 - Emphasized text, button labels
- **Semibold**: 600 - Headings, important UI elements
- **Bold**: 700 - Strong emphasis only

## Color System

### Neutral Scale
```css
/* Light mode */
--background: 0 0% 100%         /* Pure white backgrounds */
--foreground: 0 0% 3.9%         /* Primary text */
--muted: 0 0% 96.1%             /* Subtle backgrounds */
--muted-foreground: 0 0% 45.1%  /* Secondary text */
--border: 0 0% 89.8%            /* Subtle borders */
--input: 0 0% 89.8%             /* Input backgrounds */

/* Dark mode */
--background: 0 0% 3.9%         /* Dark backgrounds */
--foreground: 0 0% 98%          /* Primary text */
--muted: 0 0% 14.9%             /* Subtle backgrounds */
--muted-foreground: 0 0% 63.9%  /* Secondary text */
--border: 0 0% 14.9%            /* Subtle borders */
--input: 0 0% 14.9%             /* Input backgrounds */
```

### Accent Colors
- **Primary**: Uses neutral-900 (dark) / neutral-50 (light)
- **Destructive**: Red for errors and dangerous actions
- **Success**: Green for positive feedback
- **Warning**: Amber for cautions

### Usage Guidelines
- Use maximum 2-3 colors per interface
- Maintain 4.5:1 contrast ratio minimum
- Prefer neutral tones with selective accent usage
- Use color purposefully, not decoratively

## Spacing & Layout

### Spacing Scale
```css
0.5: 2px    /* Micro spacing */
1: 4px      /* Tight spacing */
2: 8px      /* Small spacing */
3: 12px     /* Default spacing */
4: 16px     /* Medium spacing */
5: 20px     /* Large spacing */
6: 24px     /* XL spacing */
8: 32px     /* XXL spacing */
10: 40px    /* XXXL spacing */
12: 48px    /* Section spacing */
16: 64px    /* Large section spacing */
20: 80px    /* Page spacing */
```

### Grid System
- **Container max-width**: 1200px
- **Responsive breakpoints**:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

### Layout Principles
- **Consistent margins**: 16px mobile, 24px desktop minimum
- **Vertical rhythm**: 24px baseline grid
- **Content width**: 65-75 characters for readability
- **Whitespace**: Generous spacing between sections

## Components

### Buttons
```css
/* Primary Button */
background: hsl(var(--foreground))
color: hsl(var(--background))
padding: 8px 16px (sm) | 12px 24px (lg)
border-radius: 6px
font-weight: 500

/* Secondary Button */
background: transparent
color: hsl(var(--foreground))
border: 1px solid hsl(var(--border))

/* Ghost Button */
background: transparent
color: hsl(var(--foreground))
hover: background: hsl(var(--muted))
```

### Cards
```css
background: hsl(var(--background))
border: 1px solid hsl(var(--border))
border-radius: 8px
padding: 24px
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)
```

### Form Elements
```css
/* Input Fields */
background: hsl(var(--background))
border: 1px solid hsl(var(--border))
border-radius: 6px
padding: 8px 12px
font-size: 14px

/* Focus States */
outline: 2px solid hsl(var(--ring))
outline-offset: 2px
```

## Responsive Design

### Mobile-First Approach
- Design for 375px mobile viewport first
- Progressive enhancement for larger screens
- Touch targets minimum 44px
- Thumb-friendly navigation placement

### Breakpoint Strategy
- **Mobile**: Single column, stacked layout
- **Tablet**: Adaptive columns, compact navigation
- **Desktop**: Multi-column, expanded layout
- **Large**: Centered content, maximum widths

### Content Adaptation
- **Text**: Scale headings down 1 size on mobile
- **Images**: Responsive with proper aspect ratios
- **Navigation**: Collapsible menu on mobile
- **Spacing**: Reduced margins/padding on small screens

## Accessibility

### Standards
- WCAG 2.1 AA compliance minimum
- Semantic HTML structure
- Proper heading hierarchy (h1-h6)
- Alt text for all images
- Focus indicators for all interactive elements

### Implementation
- Color contrast minimum 4.5:1
- Touch targets minimum 44x44px
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion preferences

## Animation & Transitions

### Principles
- Subtle and purposeful
- Duration: 150-250ms for micro-interactions
- Easing: ease-out for entrances, ease-in for exits
- Respect `prefers-reduced-motion`

### Common Patterns
```css
/* Hover transitions */
transition: all 150ms ease-out

/* Page transitions */
transition: opacity 200ms ease-out

/* Loading states */
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
```

## Iconography

### Guidelines
- **Library**: Lucide Icons (primary)
- **Style**: Outline style, 1.5px stroke weight
- **Sizes**: 16px (small), 20px (medium), 24px (large)
- **Alignment**: Centered with text baseline
- **Usage**: Functional over decorative

## Content Guidelines

### Writing Style
- **Tone**: Clear, concise, helpful
- **Voice**: Professional yet approachable
- **Length**: Scannable, bite-sized content
- **Hierarchy**: Lead with key information

### Microcopy
- Error messages: Specific and actionable
- Button labels: Action-oriented verbs
- Placeholders: Helpful examples
- Empty states: Encouraging and instructive

## Implementation Notes

### CSS Architecture
- Use CSS custom properties for theming
- Utility-first approach with Tailwind CSS
- Component-specific overrides when needed
- Consistent naming conventions

### Performance
- Optimize images (WebP format preferred)
- Minimize layout shifts
- Progressive loading for large content
- Efficient CSS delivery

### Browser Support
- Modern browsers (last 2 versions)
- Progressive enhancement for older browsers
- Graceful degradation for unsupported features

---

*This style guide should be referenced for all design decisions and updated as the design system evolves.*