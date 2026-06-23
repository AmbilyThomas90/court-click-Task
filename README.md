# Court Click — CTC Orders Dashboard

Pixel-perfect Next.js + Ant Design implementation of the Figma design for Certified True Copy order management.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Ant Design** (UI components)
- **@ant-design/nextjs-registry** (SSR-safe AntD)

## Features Implemented

| Feature | Status |
|---|---|
| Orders table with all columns | ✅ |
| Filter Users modal | ✅ |
| Tag quick filter panel | ✅ |
| Create New Tag modal | ✅ |
| Order Details modal | ✅ |
| Status badges | ✅ |
| Tag badges with colors | ✅ |
| Copy address to clipboard | ✅ |
| Assign tags to orders | ✅ |
| Search by name/phone | ✅ |
| Pagination | ✅ |
| Row selection | ✅ |
| Responsive sidebar | ✅ |
| Loading/empty states | ✅ |

## Project Structure

```
app/
  layout.tsx          # Root layout with AntD registry
  page.tsx            # Main page
  globals.css         # Global styles

components/
  layout/
    Sidebar.tsx       # Icon sidebar nav
  orders/
    OrdersTable.tsx   # Main data table + controls
    FilterUsersModal.tsx
    OrderDetailsModal.tsx
    CreateTagModal.tsx
    TagFilterPanel.tsx
  ui/
    StatusBadge.tsx   # Order status colored badge
    TagBadge.tsx      # Colored tag pill

types/
  index.ts            # All TypeScript interfaces

lib/
  mockData.ts         # Mock orders, tags, filter options
```

## Setup

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

## Deployment

Deploy instantly on Vercel:

```bash
npx vercel --prod
```

Or Netlify:
```bash
npm run build
# Upload the .next folder
```

## Bonus Checklist

- [ ] Unit tests (add with `jest` + `@testing-library/react`)
- [ ] Dark mode (AntD ConfigProvider theme)
- [ ] Optimistic UI updates (tag assignment is already optimistic)
- [ ] Additional perf: React.memo on table cells, virtualization for 1000+ rows
