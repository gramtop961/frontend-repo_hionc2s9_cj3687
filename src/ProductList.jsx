import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ProductList({ query, category, onAdd }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (query) params.set('q', query)
        if (category && category !== 'all') params.set('category', category)
        const res = await fetch(`${BASE_URL}/products?${params.toString()}`, { signal: controller.signal })
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => controller.abort()
  }, [query, category])

  if (loading) return <div className="py-10 text-center text-gray-500">Memuat produk...</div>

  if (!products.length) return <div className="py-10 text-center text-gray-500">Tidak ada produk</div>

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(p => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />)
      )}
    </div>
  )
}
