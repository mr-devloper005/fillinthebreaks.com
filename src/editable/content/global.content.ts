import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Useful local classifieds',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Useful local classifieds',
    primaryLinks: [
      { label: 'Classified', href: '/classified' },
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Search', href: '/search' },
    ],
    actions: {
      primary: { label: 'Start exploring', href: '/' },
      secondary: { label: 'Submit', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Find it. Offer it. Connect.',
    description: 'A practical community marketplace for classifieds, services, jobs, rentals, and opportunities.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Classified', href: '/classified' },
          { label: 'Home', href: '/' },
          { label: 'Search', href: '/search' },
          { label: 'Create', href: '/create' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for useful local connections.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
