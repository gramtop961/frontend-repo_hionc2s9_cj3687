import { Search, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ onSearch, cartCount = 0 }) {
  const [term, setTerm] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    onSearch(term)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Market<span className="text-orange-500">X</span>
        </Link>
        <form onSubmit={submit} className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <Search size={18} className="text-gray-500" />
          <input
            className="bg-transparent outline-none flex-1 text-sm"
            placeholder="Cari produk..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button className="text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-1.5">
            Cari
          </button>
        </form>
        <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
          <ShoppingCart />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1.5 py-0.5">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
