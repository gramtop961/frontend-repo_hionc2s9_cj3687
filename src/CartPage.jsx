import { useMemo } from 'react'

export default function CartPage({ cart, onInc, onDec, onRemove, onCheckout }) {
  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Keranjang</h1>
      {cart.length === 0 ? (
        <p>Keranjang kosong.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex gap-3 items-center border rounded-lg p-3">
                {item.image_url ? (
                  <img src={item.image_url} className="w-20 h-20 object-cover rounded" />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 rounded grid place-items-center text-gray-400">No Image</div>
                )}
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-500">Rp{Number(item.price).toLocaleString('id-ID')}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => onDec(item.id)} className="px-2 py-1 border rounded">-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => onInc(item.id)} className="px-2 py-1 border rounded">+</button>
                    <button onClick={() => onRemove(item.id)} className="ml-3 text-red-600 text-sm">Hapus</button>
                  </div>
                </div>
                <div className="font-semibold">Rp{Number(item.price * item.qty).toLocaleString('id-ID')}</div>
              </div>
            ))}
          </div>
          <div className="border rounded-lg p-4 h-fit">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="font-semibold">Rp{Number(subtotal).toLocaleString('id-ID')}</span>
            </div>
            <button onClick={onCheckout} className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 mt-3">Checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}
