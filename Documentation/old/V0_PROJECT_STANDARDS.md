# V0 Project Standards & Development Guidelines

**Version:** 1.0.0  
**Last Updated:** December 26, 2024  
**Project:** STR Calculator  

---

## Table of Contents

1. [Code Organization](#code-organization)
2. [Component Architecture](#component-architecture)
3. [File Naming Conventions](#file-naming-conventions)
4. [Design System Standards](#design-system-standards)
5. [Documentation Requirements](#documentation-requirements)
6. [Development Workflow](#development-workflow)
7. [Quality Assurance](#quality-assurance)
8. [Performance Guidelines](#performance-guidelines)

---

## Code Organization

### Directory Structure
\`\`\`
/
├── app/                    # Next.js App Router pages
├── components/             # Reusable React components
│   ├── ui/                # Base UI components (shadcn/ui)
│   ├── calculator/        # Calculator-specific components
│   └── shared/            # Shared utility components
├── lib/                   # Utility functions and configurations
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── Documentation/         # Project documentation
│   └── old/              # Archived documentation
└── public/               # Static assets
\`\`\`

### Component Organization Rules

1. **Single Responsibility**: Each component should have one clear purpose
2. **Composition Over Inheritance**: Use component composition patterns
3. **Input/Output Separation**: Keep input components separate from output/display components
4. **Logical Grouping**: Group related components in feature-specific folders

### Import Standards

\`\`\`typescript
// 1. React and Next.js imports first
import React from 'react'
import { useState, useEffect } from 'react'

// 2. Third-party library imports
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// 3. Internal imports (components, hooks, utils)
import { calculateROI } from '@/lib/calculations'
import { useCalculator } from '@/hooks/use-calculator'

// 4. Type imports last
import type { CalculatorData } from '@/types/calculator'
\`\`\`

---

## Component Architecture

### Input Components Standards

1. **Controlled Components**: All form inputs must be controlled components
2. **Validation**: Include proper validation with clear error messages
3. **Accessibility**: Include proper ARIA labels and descriptions
4. **Tooltips**: Provide help tooltips for complex fields using `?` icons
5. **Default Values**: Always provide sensible default values

### Output Components Standards

1. **KPI Components**: Use consistent badge styling for performance indicators
   - **Excellent**: `bg-green-100 text-green-800 border-green-200`
   - **Good**: `bg-blue-100 text-blue-800 border-blue-200`
   - **Fair**: `bg-yellow-100 text-yellow-800 border-yellow-200`
   - **Poor**: `bg-red-100 text-red-800 border-red-200`

2. **Formatting Standards**:
   - Currency: Use `$` prefix with comma separators
   - Percentages: Show 1-2 decimal places with `%` suffix
   - Large numbers: Use comma separators (e.g., `1,234,567`)

3. **Loading States**: Include skeleton loaders for calculated values

### State Management

1. **Local State**: Use `useState` for component-specific state
2. **Shared State**: Lift state up to nearest common parent
3. **Complex State**: Use `useReducer` for complex state logic
4. **Derived State**: Calculate derived values in render, don't store them

---

## File Naming Conventions

### Components
- **Format**: `kebab-case.tsx`
- **Examples**: `revenue-section.tsx`, `tax-benefits-output.tsx`
- **Folders**: Use `kebab-case` for folder names

### Utilities and Hooks
- **Format**: `kebab-case.ts`
- **Examples**: `use-calculator.ts`, `format-currency.ts`

### Types
- **Format**: `kebab-case.ts`
- **Examples**: `calculator-types.ts`, `api-responses.ts`

### Documentation
- **Format**: `SCREAMING_SNAKE_CASE.md`
- **Examples**: `PROJECT_STANDARDS.md`, `API_DOCUMENTATION.md`

---

## Design System Standards

### Color Palette
- **Primary**: Use project-defined primary colors consistently
- **Neutrals**: Stick to defined gray scale (gray-50 to gray-900)
- **Status Colors**: 
  - Success: `green-*`
  - Warning: `yellow-*`
  - Error: `red-*`
  - Info: `blue-*`

### Typography
- **Headings**: Use semantic heading hierarchy (h1, h2, h3)
- **Body Text**: Consistent text sizing with `text-sm`, `text-base`, `text-lg`
- **Font Weights**: Use `font-medium` for emphasis, `font-semibold` for headings

### Spacing
- **Consistent Scale**: Use Tailwind spacing scale (4, 6, 8, 12, 16, 24)
- **Component Padding**: Standard `p-6` for card content
- **Element Gaps**: Use `gap-4` or `gap-6` for consistent spacing

### Layout
1. **Mobile First**: Design for mobile, enhance for desktop
2. **Responsive Grid**: Use CSS Grid for complex layouts
3. **Flexbox**: Use for simple alignment and distribution
4. **Container Widths**: Use `max-w-7xl mx-auto` for page containers

---

## Documentation Requirements

### Component Documentation
Each component should include:
1. **Purpose**: What the component does
2. **Props Interface**: TypeScript interface with descriptions
3. **Usage Examples**: Basic implementation examples
4. **Dependencies**: Required props and context

### Code Comments
\`\`\`typescript
// TODO: Future improvements needed
// NOTE: Important implementation details
// HACK: Temporary solutions that need refactoring
\`\`\`

### Changelog Management
1. **Version Tracking**: Use semantic versioning (MAJOR.MINOR.PATCH)
2. **Change Documentation**: Document all changes in relevant MD files
3. **Breaking Changes**: Clearly mark and explain breaking changes

---

## Development Workflow

### Before Making Changes
1. **Read Existing Code**: Always examine current implementation
2. **Understand Context**: Check parent components and related files
3. **Search for Patterns**: Look for existing similar implementations
4. **Plan Changes**: Think through the full impact of changes

### Code Review Checklist
- [ ] Follows naming conventions
- [ ] Includes proper TypeScript types
- [ ] Has appropriate error handling
- [ ] Includes accessibility features
- [ ] Follows design system standards
- [ ] Updates relevant documentation

### Testing Standards
1. **Manual Testing**: Test all user interactions
2. **Edge Cases**: Test with extreme values and empty states
3. **Responsive Testing**: Verify mobile and desktop layouts
4. **Accessibility Testing**: Check keyboard navigation and screen readers

---

## Quality Assurance

### Code Quality
1. **TypeScript**: Use strict typing, avoid `any`
2. **Error Handling**: Implement proper error boundaries and validation
3. **Performance**: Avoid unnecessary re-renders and calculations
4. **Security**: Validate all user inputs and sanitize outputs

### UI/UX Standards
1. **Consistency**: Maintain visual and interaction consistency
2. **Feedback**: Provide clear feedback for user actions
3. **Loading States**: Show loading indicators for async operations
4. **Error States**: Display helpful error messages

### Accessibility Requirements
1. **ARIA Labels**: Include descriptive labels for screen readers
2. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
3. **Color Contrast**: Maintain WCAG AA contrast ratios
4. **Focus Management**: Provide clear focus indicators

---

## Performance Guidelines

### Component Optimization
1. **Memoization**: Use `React.memo` for expensive components
2. **Lazy Loading**: Implement code splitting for large components
3. **Efficient Updates**: Minimize state updates and re-renders

### Asset Optimization
1. **Images**: Use Next.js Image component with proper sizing
2. **Fonts**: Preload critical fonts and use font-display: swap
3. **Bundle Size**: Monitor and optimize bundle size

### Calculation Performance
1. **Debouncing**: Debounce expensive calculations
2. **Caching**: Cache calculation results when appropriate
3. **Async Operations**: Use proper loading states for async calculations

---

## Enforcement

### Required Tools
- **TypeScript**: Strict mode enabled
- **ESLint**: Follow Next.js recommended rules
- **Prettier**: Consistent code formatting

### Review Process
1. All changes must follow these standards
2. Documentation must be updated for significant changes
3. Breaking changes require explicit approval
4. Performance impact must be considered

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-12-26 | Initial project standards document |

---

*This document should be referenced for all development work on the STR Calculator project. Updates to these standards should be versioned and communicated to all team members.*
