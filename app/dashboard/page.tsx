"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, BookOpen, Users, Clock, ChevronRight, BarChart3, Trash2, Upload, ArrowLeft } from "lucide-react";

interface Tour { id: string; title: string; description: string; steps: number; assignedTo: number; completed: number; createdAt: string; }
function loadTours(): Tour[] { if (typeof window === "undefined") return []; const raw = localStorage.getItem("trainingwheels_tours"); return raw ? JSON.parse(raw) : []; }
function saveTours(tours: Tour[]) { localStorage.setItem("trainingwheels_tours", JSON.stringify(tours)); }

export default function DashboardPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  useEffect(() => { setTours(loadTours()); }, []);
  const createTour = () => { if (!newTitle.trim()) return; const tour: Tour = { id: Date.now().toString(36), title: newTitle.trim(), description: newDesc.trim(), steps: 0, assignedTo: 0, completed: 0, createdAt: new Date().toISOString() }; const updated = [...tours, tour]; setTours(updated); saveTours(updated); setNewTitle(""); setNewDesc(""); setShowCreate(false); };
  const deleteTour = (id: string) => { const updated = tours.filter(t => t.id !== id); setTours(updated); saveTours(updated); };
  return (
    <main className="min-h-dvh bg-atmosphere">
      <header className="sticky top-4 z-10 mx-4" style={{ paddingTop: "16px" }}>
        <div className="clay-card max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer" style={{ background: "#F1F5F9", border: "2px solid #E2E8F0" }}><ArrowLeft className="w-4 h-4" style={{ color: "#64748B" }} /></Link>
            <div><h1 className="text-lg font-bold" style={{ color: "#1E293B" }}>Manager Dashboard</h1><p className="text-xs" style={{ color: "#94A3B8" }}>{tours.length} tour{tours.length !== 1 ? "s" : ""} created</p></div>
          </div>
          <button onClick={() => setShowCreate(true)} className="clay-button flex items-center gap-2 px-5 py-2.5 text-sm"><Plus className="w-4 h-4" />New Tour</button>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-16">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-4 mb-8">
          {[{ icon: BookOpen, label: "Total Tours", value: tours.length, color: "#2563EB" }, { icon: Users, label: "Assigned", value: tours.reduce((s, t) => s + t.assignedTo, 0), color: "#F97316" }, { icon: BarChart3, label: "Completed", value: tours.reduce((s, t) => s + t.completed, 0), color: "#10B981" }].map(({ icon: Icon, label, value, color }) => (<div key={label} className="clay-card p-4 text-center"><Icon className="w-5 h-5 mx-auto mb-2" style={{ color }} /><div className="text-2xl font-extrabold" style={{ color: "#1E293B" }}>{value}</div><div className="text-xs font-semibold" style={{ color: "#94A3B8" }}>{label}</div></div>))}
        </motion.div>
        {showCreate && (<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="clay-card p-6 mb-8"><h2 className="text-lg font-bold mb-4" style={{ color: "#1E293B" }}>Create New Training Tour</h2><input type="text" placeholder="Tour title" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="clay-input w-full mb-3" /><textarea placeholder="Brief description..." value={newDesc} onChange={e => setNewDesc(e.target.value)} className="clay-input w-full mb-4 resize-none" rows={2} /><div className="flex gap-3"><button onClick={createTour} className="clay-button px-6 py-2.5 text-sm">Create Tour</button><button onClick={() => setShowCreate(false)} className="px-6 py-2.5 text-sm font-semibold cursor-pointer rounded-2xl" style={{ color: "#64748B" }}>Cancel</button></div></motion.div>)}
        {tours.length === 0 && !showCreate ? (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center py-20"><Upload className="w-12 h-12 mx-auto mb-4" style={{ color: "#CBD5E1" }} /><h2 className="text-xl font-bold mb-2" style={{ color: "#1E293B" }}>No tours yet</h2><p className="mb-6" style={{ color: "#94A3B8" }}>Create your first training tour to get started</p><button onClick={() => setShowCreate(true)} className="clay-button px-6 py-3 inline-flex items-center gap-2"><Plus className="w-4 h-4" />Create First Tour</button></motion.div>) : (<div className="space-y-4">{tours.map((tour, i) => (<motion.div key={tour.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="clay-card p-5 flex items-center justify-between"><div className="flex-1 min-w-0"><h3 className="font-bold text-base mb-1" style={{ color: "#1E293B" }}>{tour.title}</h3><p className="text-sm truncate mb-2" style={{ color: "#64748B" }}>{tour.description || "No description"}</p><div className="flex items-center gap-4 text-xs" style={{ color: "#94A3B8" }}><span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{tour.steps} steps</span><span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{tour.assignedTo} assigned</span><span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{new Date(tour.createdAt).toLocaleDateString()}</span></div></div><div className="flex items-center gap-2 ml-4"><Link href={`/tours/${tour.id}/builder`} className="clay-button text-xs px-4 py-2 flex items-center gap-1.5">Edit<ChevronRight className="w-3.5 h-3.5" /></Link><button onClick={() => deleteTour(tour.id)} className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer opacity-40 hover:opacity-100 transition-opacity" style={{ background: "#FEF2F2", border: "2px solid #FECACA" }}><Trash2 className="w-4 h-4" style={{ color: "#EF4444" }} /></button></div></motion.div>))}</div>)}
      </div>
    </main>
  );
}
