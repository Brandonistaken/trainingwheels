"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Play, CheckCircle2, Clock, BookOpen, GraduationCap, ChevronRight } from "lucide-react";

interface Tour { id: string; title: string; description: string; steps: number; completed: number; createdAt: string; }

export default function EmployeePage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, { stepIndex: number; completedAt: string | null }>>({});
  useEffect(() => {
    const raw = localStorage.getItem("trainingwheels_tours");
    const allTours: Tour[] = raw ? JSON.parse(raw) : [];
    setTours(allTours);
    const prog: Record<string, { stepIndex: number; completedAt: string | null }> = {};
    allTours.forEach(t => { const p = localStorage.getItem(`trainingwheels_progress_${t.id}`); if (p) prog[t.id] = JSON.parse(p); });
    setProgressMap(prog);
  }, []);
  const inProgress = tours.filter(t => progressMap[t.id] && !progressMap[t.id].completedAt);
  const done = tours.filter(t => progressMap[t.id] && progressMap[t.id].completedAt);
  const notStarted = tours.filter(t => !progressMap[t.id]);
  return (
    <main className="min-h-dvh bg-atmosphere">
      <header className="sticky top-4 z-10 mx-4" style={{ paddingTop: "16px" }}><div className="clay-card max-w-4xl mx-auto px-6 py-4 flex items-center gap-3"><Link href="/" className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer" style={{ background: "#F1F5F9", border: "2px solid #E2E8F0" }}><ArrowLeft className="w-4 h-4" style={{ color: "#64748B" }} /></Link><div><h1 className="text-lg font-bold" style={{ color: "#1E293B" }}>My Training</h1><p className="text-xs" style={{ color: "#94A3B8" }}>{done.length} completed, {inProgress.length} in progress</p></div></div></header>
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
        {tours.length === 0 ? (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20"><GraduationCap className="w-12 h-12 mx-auto mb-4" style={{ color: "#CBD5E1" }} /><h2 className="text-xl font-bold mb-2" style={{ color: "#1E293B" }}>No training assigned yet</h2><p style={{ color: "#94A3B8" }}>Your manager will assign training tours for you here.</p></motion.div>) : (<div className="space-y-8">
          {inProgress.length > 0 && <section><h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#F97316" }}>Continue Learning</h2><div className="space-y-3">{inProgress.map((tour, i) => { const prog = progressMap[tour.id]; const pct = prog ? Math.round(((prog.stepIndex + 1) / tour.steps) * 100) : 0; return (<motion.div key={tour.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}><Link href={`/tours/${tour.id}`} className="clay-card p-5 flex items-center justify-between cursor-pointer block"><div className="flex-1 min-w-0"><h3 className="font-bold mb-1" style={{ color: "#1E293B" }}>{tour.title}</h3><p className="text-sm truncate mb-3" style={{ color: "#64748B" }}>{tour.description || "No description"}</p><div className="clay-progress max-w-xs"><div className="clay-progress-fill" style={{ width: `${pct}%` }} /></div><div className="text-xs mt-1 font-semibold" style={{ color: "#F97316" }}>{pct}% complete</div></div><div className="ml-4"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#FEF3C7", border: "2px solid #FCD34D" }}><Play className="w-5 h-5" style={{ color: "#F97316" }} /></div></div></Link></motion.div>); })}</div></section>}
          {done.length > 0 && <section><h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#10B981" }}>Completed</h2><div className="space-y-3">{done.map((tour, i) => (<motion.div key={tour.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="clay-card p-5 flex items-center justify-between opacity-70"><div><h3 className="font-bold mb-1" style={{ color: "#1E293B" }}>{tour.title}</h3><div className="flex items-center gap-1 text-xs" style={{ color: "#10B981" }}><CheckCircle2 className="w-3.5 h-3.5" />Completed</div></div><Link href={`/tours/${tour.id}`} className="text-xs font-semibold cursor-pointer" style={{ color: "#2563EB" }}>Review</Link></motion.div>))}</div></section>}
          {notStarted.length > 0 && <section><h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#94A3B8" }}>Available Training</h2><div className="space-y-3">{notStarted.map((tour, i) => (<motion.div key={tour.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}><Link href={`/tours/${tour.id}`} className="clay-card p-5 flex items-center justify-between cursor-pointer block"><div className="flex-1 min-w-0"><h3 className="font-bold mb-1" style={{ color: "#1E293B" }}>{tour.title}</h3><p className="text-sm truncate" style={{ color: "#64748B" }}>{tour.description || "No description"}</p><div className="flex items-center gap-3 mt-2 text-xs" style={{ color: "#94A3B8" }}><span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{tour.steps} steps</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />~{tour.steps * 2} min</span></div></div><ChevronRight className="w-5 h-5 ml-4" style={{ color: "#CBD5E1" }} /></Link></motion.div>))}</div></section>}
        </div>)}
      </div>
    </main>
  );
}
