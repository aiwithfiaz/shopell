import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shopell.com'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/policies/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/policies/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/policies/refund`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/policies/shipping`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/policies/cookies`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/policies/faq`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ]

  // In production, you would fetch products and categories from your database
  // const products = await fetchProducts()
  // const categories = await fetchCategories()
  
  // const productPages = products.map((product) => ({
  //   url: `${baseUrl}/products/${product.slug}`,
  //   lastModified: new Date(product.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // }))

  // const categoryPages = categories.map((category) => ({
  //   url: `${baseUrl}/products/category/${category.slug}`,
  //   lastModified: new Date(category.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  // }))

  return [...staticPages]
}
