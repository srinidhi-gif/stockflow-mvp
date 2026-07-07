import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

export default function ProductTable({ products, onEdit, onDelete }) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-400 text-lg">No products found</p>
        <p className="text-slate-400 text-sm mt-1">
          Click "Add Product" to create your first product.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                Quantity
              </th>
              <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                Cost Price
              </th>
              <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                Selling Price
              </th>
              <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">
                Status
              </th>
              <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => {
              const threshold = product.lowStockThreshold ?? 5;
              const isLow = product.quantity <= threshold;
              const isOut = product.quantity === 0;

              return (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">
                      {product.name}
                    </p>
                    {product.description && (
                      <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[200px]">
                        {product.description}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-semibold text-slate-900">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-slate-600">
                    {product.costPrice != null
                      ? `$${Number(product.costPrice).toFixed(2)}`
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-slate-600">
                    {product.sellingPrice != null
                      ? `$${Number(product.sellingPrice).toFixed(2)}`
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {isOut ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        Out of Stock
                      </span>
                    ) : isLow ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        In Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <HiOutlinePencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(product)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <HiOutlineTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}