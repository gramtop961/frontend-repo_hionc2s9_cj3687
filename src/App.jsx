import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import ProductList from './ProductList'
import CartPage from './CartPage'
import ProductDetail from './ProductDetail'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Home({ onAdd }) {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('all')
  const [categories, setCategories] = useState(['all'])

  useEffect(() => {
    fetch(`${BASE_URL}/categories`).then(r => r.json()).then(cats => setCategories(['all', ...cats]))
  }, [])

  return (
    <div>
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-full border ${category===c?'bg-orange-500 text-white border-orange-500':'bg-white hover:bg-gray-50'}`}>
              {c === 'all' ? 'Semua' : c}
            </button>
          ))}
        </div>
        <ProductList query={q} category={category} onAdd={onAdd} />
      </div>
    </div>
  )
}

export default function App() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart])

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id)
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...p, qty: 1 }]
    })
  }
  const inc = (id) => setCart(prev => prev.map(i => i.id===id?{...i, qty: i.qty+1}:i))
  const dec = (id) => setCart(prev => prev.map(i => i.id===id?{...i, qty: Math.max(1, i.qty-1)}:i))
  const removeItem = (id) => setCart(prev => prev.filter(i => i.id!==id))

  const checkout = async () => {
    if (cart.length === 0) return
    const payload = {
      buyer_name: 'Pembeli',
      buyer_email: 'buyer@example.com',
      buyer_address: 'Alamat Pengiriman',
      items: cart.map(i => ({ product_id: i.id, title: i.title, price: i.price, quantity: i.qty, image_url: i.image_url })),
      subtotal: cart.reduce((s,i)=>s+i.price*i.qty,0),
      shipping: 0,
      total: cart.reduce((s,i)=>s+i.price*i.qty,0),
      status: 'pending'
    }
    const res = await fetch(`${BASE_URL}/orders`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) {
      setCart([])
      alert('Pesanan berhasil dibuat!')
      navigate('/')
    } else {
      alert('Gagal membuat pesanan')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navbar onSearch={(term)=>{}} cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home onAdd={addToCart} />} />
        <Route path="/p/:id" element={<ProductDetail onAdd={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} onInc={inc} onDec={dec} onRemove={removeItem} onCheckout={checkout} />} />
      </Routes>
    </div>
  )
}
