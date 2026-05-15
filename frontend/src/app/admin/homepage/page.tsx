"use client";

import { useCallback, useEffect, useState } from "react";
import { Sparkles, Layout, Plus, PenTool, Trash2, X } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";

type EventRow = {
  _id: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  image?: string;
  category?: string;
  capacity?: number;
  featured?: boolean;
  active?: boolean;
};

const emptyForm = {
  title: "",
  description: "",
  date: "",
  location: "",
  image: "",
  category: "",
  capacity: "",
  featured: false,
};

export default function AdminHomepagePage() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<EventRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await apiFetch<{ events: EventRow[] }>("/events?page=1&limit=100");
      setEvents(res.events);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(ev: EventRow) {
    setEditing(ev);
    const d = new Date(ev.date);
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setForm({
      title: ev.title,
      description: ev.description || "",
      date: local,
      location: ev.location || "",
      image: ev.image || "",
      category: ev.category || "",
      capacity: ev.capacity != null ? String(ev.capacity) : "",
      featured: !!ev.featured,
    });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.date) return;
    setSaving(true);
    setError(null);
    try {
      const capacity =
        form.capacity.trim() === "" ? undefined : Math.max(0, Math.floor(Number(form.capacity)));
      if (form.capacity.trim() !== "" && Number.isNaN(capacity!)) throw new Error("Invalid capacity");
      const body: Record<string, unknown> = {
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        date: new Date(form.date).toISOString(),
        location: form.location.trim() || undefined,
        image: form.image.trim() || undefined,
        category: form.category.trim() || undefined,
        featured: form.featured,
        active: true,
      };
      if (capacity != null) body.capacity = capacity;
      if (editing) {
        await apiFetch(`/events/${editing._id}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        await apiFetch("/events", { method: "POST", body: JSON.stringify(body) });
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(ev: EventRow) {
    if (!confirm(`Delete event “${ev.title}”?`)) return;
    setError(null);
    try {
      await apiFetch(`/events/${ev._id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <div className="p-8 space-y-8">
      {error && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      )}

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Homepage & events</h2>
            <p className="text-xs text-gray-500 mt-1">
              Hero copy on the public site still comes from the Next.js homepage. Listed events sync with the{" "}
              <code className="text-[10px] bg-gray-100 px-1 rounded">/events</code> API (featured items can be highlighted on
              the storefront when wired).
            </p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="flex items-center gap-2 px-6 py-3 bg-brand-orange text-brand-white font-bold rounded-xl hover:bg-brand-orange-light transition-all shadow-lg shadow-brand-orange/20 shrink-0"
          >
            <Plus size={18} /> New event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
            <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
              <Sparkles size={20} />
            </div>
            <h3 className="font-bold text-gray-900">Hero section</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            To change the landing hero headline and imagery, edit{" "}
            <code className="text-xs bg-gray-100 px-1 rounded">frontend/src/app/page.tsx</code> (or your CMS) — there is no
            hero payload in the API yet.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
            <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
              <Layout size={20} />
            </div>
            <h3 className="font-bold text-gray-900">Modules</h3>
          </div>
          <p className="text-sm text-gray-600">
            Section visibility on the marketing site is controlled in frontend code. Use events below for dated showcases the
            API can serve to any client.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Events</h3>
          {loading && <span className="text-xs text-gray-500">Loading…</span>}
        </div>
        <div className="divide-y divide-gray-50">
          {events.length === 0 && !loading ? (
            <p className="px-8 py-12 text-sm text-gray-500 text-center">No events yet. Create one to get started.</p>
          ) : (
            events.map((ev) => (
              <div key={ev._id} className="px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                <div>
                  <p className="font-bold text-gray-900">{ev.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(ev.date)}
                    {ev.location ? ` · ${ev.location}` : ""}
                    {ev.featured ? (
                      <span className="ml-2 text-brand-orange font-bold uppercase tracking-wider">Featured</span>
                    ) : null}
                  </p>
                </div>
                <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => openEdit(ev)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    aria-label="Edit"
                  >
                    <PenTool size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(ev)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{editing ? "Edit event" : "New event"}</h2>
              <button type="button" onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-gray-50">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
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
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Date & time</label>
                <input
                  required
                  type="datetime-local"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Location</label>
                  <input
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Capacity</label>
                  <input
                    type="number"
                    min={0}
                    value={form.capacity}
                    onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Category</label>
                <input
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                />
              </div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
                />
                Featured
              </label>
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
