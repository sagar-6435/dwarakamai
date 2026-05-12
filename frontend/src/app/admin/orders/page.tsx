"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, Eye, CheckCircle2, Clock, X } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatDate, formatInr } from "@/lib/format";

type Customer = { name?: string; email?: string };
type OrderItem = {
  quantity: number;
  price: number;
  product?: { name?: string };
};

type Order = {
  _id: string;
  orderNumber: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  paymentStatus?: string;
  createdAt: string;
  customer?: Customer;
  items?: OrderItem[];
  shippingAddress?: { city?: string; phone?: string };
};

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;

function paymentLabel(m: string) {
  const map: Record<string, string> = {
    card: "Card",
    upi: "UPI",
    bank_transfer: "Bank",
    cod: "Cash on delivery",
  };
  return map[m] || m;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<Order | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await apiFetch<{ orders: Order[] }>("/orders?page=1&limit=200");
      setOrders(res.orders);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: string) {
    setError(null);
    try {
      await apiFetch(`/orders/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    }
  }

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      o.orderNumber.toLowerCase().includes(q) ||
      (o.customer?.name || "").toLowerCase().includes(q) ||
      (o.customer?.email || "").toLowerCase().includes(q);
    const matchTab = tab === "All" || o.status === tab.toLowerCase();
    return matchSearch && matchTab;
  });

  const tabs = ["All", "Processing", "Delivered", "Pending", "Shipped", "Cancelled"];

  return (
    <div className="p-8 space-y-6">
      {error && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input
            type="text"
            placeholder="Search orders by ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all ${
                tab === t
                  ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
                  : "border-gray-100 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[720px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Order ID</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">
                  Loading…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">
                  No orders match.
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-brand-orange">{order.orderNumber}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.customer?.name || order.customer?.email || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{formatInr(order.totalAmount)}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        {order.status === "delivered" ? (
                          <CheckCircle2 size={14} className="text-green-500" />
                        ) : (
                          <Clock size={14} className="text-orange-400" />
                        )}
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className="text-[10px] font-bold uppercase border border-gray-200 rounded-lg px-2 py-1 bg-white"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <span className="text-[10px] text-gray-500">{paymentLabel(order.paymentMethod)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setDetail(order)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-white text-black text-[10px] font-bold uppercase rounded-lg hover:bg-brand-orange hover:text-brand-white transition-all border border-gray-100"
                    >
                      <Eye size={14} /> Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{detail.orderNumber}</h2>
                <p className="text-xs text-gray-500">{formatDate(detail.createdAt)}</p>
              </div>
              <button type="button" onClick={() => setDetail(null)} className="p-2 rounded-lg hover:bg-gray-50">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <p>
                <span className="font-bold text-gray-600">Customer: </span>
                {detail.customer?.name || detail.customer?.email || "—"}
              </p>
              <p>
                <span className="font-bold text-gray-600">Total: </span>
                {formatInr(detail.totalAmount)}
              </p>
              <p>
                <span className="font-bold text-gray-600">Payment: </span>
                {paymentLabel(detail.paymentMethod)} ({detail.paymentStatus || "—"})
              </p>
              {detail.shippingAddress && (
                <p>
                  <span className="font-bold text-gray-600">Ship to: </span>
                  {[detail.shippingAddress.city, detail.shippingAddress.phone].filter(Boolean).join(" · ")}
                </p>
              )}
              <div>
                <p className="font-bold text-gray-600 mb-2">Items</p>
                <ul className="space-y-2 border border-gray-100 rounded-xl p-3 bg-gray-50">
                  {(detail.items || []).map((line, i) => (
                    <li key={i} className="flex justify-between gap-2">
                      <span>
                        {line.product?.name || "Product"} × {line.quantity}
                      </span>
                      <span className="font-medium">{formatInr(line.price * line.quantity)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
