import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ProductDetail({ onAdd }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    async function load() {
      const res = await fetch(`${BASE_URL}/products/${id}`)
      const data = await res.json()
      setProduct(data)
    }
    load()
  }, [id])

  if (!product) return <div className="p-6">Memuat...</div>

  return (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-gray-400">No Image</div>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="text-amber-600 mt-2">Rating {product.rating ?? '4.5'}</div>
        <div className="text-2xl font-extrabold text-orange-600 mt-4">Rp{Number(product.price).toLocaleString('id-ID')}</div>
        <p className="text-gray-600 mt-4">{product.description}</p>
        <button onClick={() => onAdd(product)} className="mt-6 bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6 py-3">Tambah ke Keranjang</button>
      </div>
    </div>
  )
}
