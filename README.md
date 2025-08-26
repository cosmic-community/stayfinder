# StayFinder - Premium Property Rental Platform

![App Preview](https://imgix.cosmicjs.com/5698b830-8227-11f0-a561-cd0208bbad0c-photo-1441974231531-c6227db76b6e-1756176591561.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A sophisticated property rental platform built with Next.js and Cosmic CMS that connects travelers with unique accommodations. Features advanced search, detailed property listings, host profiles, and location pages.

## ✨ Features

- **Property Discovery** - Browse properties with advanced filtering by location, type, and amenities
- **Detailed Listings** - Rich property descriptions with photo galleries and pricing
- **Host Profiles** - Complete host information with photos, bios, and response times
- **Location Pages** - Dedicated destination pages with neighborhood information
- **Responsive Design** - Optimized for all device sizes and screen resolutions
- **Search Functionality** - Hero search bar with location, dates, and guest filters
- **Property Types** - Support for apartments, houses, condos, cabins, and villas
- **Amenity Filtering** - Filter by WiFi, kitchen, parking, pool, and other amenities

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68ad204f04ea77b1e31e577b&clone_repository=68ad2c2c04ea77b1e31e57a8)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create an airbnb clone"

### Code Generation Prompt

> "Build an Airbnb clone using Next.js"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Content Management**: Cosmic CMS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Image Optimization**: Imgix (via Cosmic)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Cosmic account with bucket access

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables in `.env.local`:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Properties
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all properties with host and location data
const response = await cosmic.objects
  .find({ type: 'properties' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const properties = response.objects
```

### Filtering by Location
```typescript
// Get properties in a specific location
const response = await cosmic.objects
  .find({ 
    type: 'properties',
    'metadata.location': locationId 
  })
  .depth(1)
```

### Getting Property Details
```typescript
// Get single property with all related data
const response = await cosmic.objects
  .findOne({
    type: 'properties',
    slug: propertySlug
  })
  .depth(1)

const property = response.object
```

## 🎯 Cosmic CMS Integration

This application leverages three main content types from your Cosmic bucket:

### Properties
- Property title and description
- Property type (apartment, house, condo, cabin, villa)
- Pricing and guest capacity
- Photos and amenities
- Connected to hosts and locations

### Hosts
- Host profiles with photos and bios
- Contact information and response times
- Superhost status
- Multiple properties per host

### Locations
- City and location information
- Neighborhood descriptions
- Regional details
- Connected properties

All content is fetched dynamically using the Cosmic SDK with proper error handling and loading states.

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push to GitHub repository
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

### Netlify
1. Build the application: `bun run build`
2. Deploy the `out` folder
3. Configure environment variables

### Other Platforms
The application is compatible with any platform supporting Node.js applications.

Remember to configure your environment variables in your deployment platform's settings.

<!-- README_END -->