import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-md transition-shadow">
      <Link to={`/p/${product.id}`} className="block aspect-square bg-gray-50 overflow-hidden">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <div className="w-full h-full grid place-items-center text-gray-400">No Image</div>
        )}
      </Link>
      <div className="p-3">
        <div className="flex items-center gap-1 text-amber-500 text-sm">
          <Star size={14} fill="currentColor" />
          <span>{product.rating?.toFixed?.(1) ?? product.rating ?? '4.5'}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500 text-xs">{product.category}</span>
        </div>
        <Link to={`/p/${product.id}`} className="block font-medium line-clamp-2 mt-1">
          {product.title}
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-orange-600">Rp{Number(product.price).toLocaleString('id-ID')}</span>
          <button onClick={() => onAdd(product)} className="text-xs bg-orange-500 text-white px-3 py-1.5 rounded-full hover:bg-orange-600">Tambah</button>
        </div>
      </div>
    </div>
  )
}
