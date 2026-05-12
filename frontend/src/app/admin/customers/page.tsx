"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, Mail, Phone } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatInr } from "@/lib/format";

type CustomerRef = { _id: string; name?: string; email?: string; phone?: string };

type Order = {
  _id: string;
  totalAmount: number;
  customer?: CustomerRef;
};

export default function AdminCustomersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await apiFetch<{ orders: Order[] }>("/orders?page=1&limit=500");
      setOrders(res.orders);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const rows = useMemo(() => {
    const map = new Map<
      string,
      { customer: CustomerRef; orders: number; spent: number }
    >();
    for (const o of orders) {
      const c = o.customer;
      if (!c || !c._id) continue;
      const id = c._id;
      const prev = map.get(id);
      if (prev) {
        prev.orders += 1;
        prev.spent += o.totalAmount || 0;
      } else {
        map.set(id, { customer: c, orders: 1, spent: o.totalAmount || 0 });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.spent - a.spent);
  }, [orders]);

  const filtered = rows.filter((r) => {
    const q = search.toLowerCase();
    const name = (r.customer.name || "").toLowerCase();
    const email = (r.customer.email || "").toLowerCase();
    return !q || name.includes(q) || email.includes(q);
  });

  function exportCsv() {
    const header = ["Name", "Email", "Phone", "Orders", "Total spent"];
    const lines = [
      header.join(","),
      ...filtered.map((r) =>
        [
          JSON.stringify(r.customer.name || ""),
          JSON.stringify(r.customer.email || ""),
          JSON.stringify(r.customer.phone || ""),
          r.orders,
          r.spent,
        ].join(","),
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-8 space-y-6">
      {error && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="px-6 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all disabled:opacity-40"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[720px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Customer Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Contact Info</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest text-center">Orders</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest text-center">Total Spent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm">
                  Loading…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm">
                  No customers with orders yet.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.customer._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold uppercase text-xs">
                        {(row.customer.name || row.customer.email || "?").substring(0, 2)}
                      </div>
                      <span className="font-bold text-gray-900">{row.customer.name || "—"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Mail size={12} /> {row.customer.email || "—"}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Phone size={12} /> {row.customer.phone || "—"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-gray-700">{row.orders}</td>
                  <td className="px-6 py-4 text-center font-bold text-gray-900">{formatInr(row.spent)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
