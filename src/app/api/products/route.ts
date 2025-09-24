import { NextResponse } from 'next/server'
import { getAllProducts, searchProducts, getAllCategories, getAllBrands } from '@/lib/productApi'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  const query = searchParams.get('q')

  try {
    switch (action) {
      case 'search':
        if (!query) {
          return NextResponse.json({ error: 'Search query is required' }, { status: 400 })
        }
        const searchResults = searchProducts(query)
        return NextResponse.json(searchResults)
      
      case 'categories':
        const categories = getAllCategories()
        return NextResponse.json(categories)
      
      case 'brands':
        const brands = getAllBrands()
        return NextResponse.json(brands)
      
      case 'all':
      default:
        const allProducts = getAllProducts()
        return NextResponse.json(allProducts)
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}