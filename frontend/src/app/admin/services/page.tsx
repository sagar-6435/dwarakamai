"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Search, Briefcase, Edit2, Trash2, Star, X } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatInr } from "@/lib/format";

type Service = {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  duration?: string;
  category?: string;
  featured?: boolean;
  active?: boolean;
};

const emptyForm = {
  name: "",
  description: "",
  price: "",
  duration: "",
  category: "",
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<{ service?: { _id?: string } | string }[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [svcRes, bookRes] = await Promise.all([
        apiFetch<{ services: Service[] }>("/services?page=1&limit=200"),
        apiFetch<{ bookings: typeof bookings }>("/service-bookings?page=1&limit=500"),
      ]);
      setServices(svcRes.services);
      setBookings(bookRes.bookings);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const bookingCount = useMemo(() => {
    const map = new Map<string, number>();
    for (const b of bookings) {
      const sid =
        b.service && typeof b.service === "object" && "_id" in b.service
          ? String((b.service as { _id: string })._id)
          : String(b.service || "");
      if (!sid) continue;
      map.set(sid, (map.get(sid) || 0) + 1);
    }
    return map;
  }, [bookings]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(s: Service) {
    setEditing(s);
    setForm({
      name: s.name,
      description: s.description || "",
      price: s.price != null ? String(s.price) : "",
      duration: s.duration || "",
      category: s.category || "",
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const price = form.price.trim() === "" ? undefined : Number(form.price);
      if (form.price.trim() !== "" && (Number.isNaN(price) || price! < 0)) {
        throw new Error("Invalid price");
      }
      const body: Record<string, unknown> = {
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        duration: form.duration.trim() || undefined,
        category: form.category.trim() || undefined,
      };
      if (price != null) body.price = price;
      if (editing) {
        await apiFetch(`/services/${editing._id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } else {
        await apiFetch("/services", { method: "POST", body: JSON.stringify(body) });
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(s: Service) {
    if (!confirm(`Delete service “${s.name}”?`)) return;
    setError(null);
    try {
      await apiFetch(`/services/${s._id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  const filtered = services.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8 space-y-6">
      {error && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange transition-all"
          />
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 px-6 py-2.5 bg-brand-orange text-brand-white font-bold rounded-xl hover:bg-brand-orange-light transition-all shadow-lg shadow-brand-orange/20"
        >
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[640px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Service Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Pricing</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Bookings</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Rating</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">
                  Loading…
                </td>
              </tr>
            ) : (
              filtered.map((service) => (
                <tr key={service._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange">
                        <Briefcase size={20} />
                      </div>
                      <span className="font-bold text-gray-900">{service.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {service.price != null ? formatInr(service.price) : "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {bookingCount.get(service._id) || 0} Total
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-brand-orange">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-bold">—</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => openEdit(service)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(service)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{editing ? "Edit service" : "New service"}</h2>
              <button type="button" onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-gray-50">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Duration</label>
                  <input
                    value={form.duration}
                    onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                    placeholder="e.g. 4 hours"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Category</label>
                <input
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-brand-orange text-brand-white text-sm font-bold disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
