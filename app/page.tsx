"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { GraduationCap, UserCog, ArrowRight, Sparkles, BookOpen, MousePointerClick, BarChart3 } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [role, setRole] = useState("manager" | "employee" | null);
  const handleContinue = () => { if (role === "manager") router.push("/dashboard"); else router.push("/employee"); };
  return (
    <main className="min-h-dvh bg-atmosphere flex flex-col items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-12">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }} className="inline-flex items-center gap-2 clay-card px-5 py-2 mb-6" style={{ borderRadius: "40px" }}>
          <Sparkles className="w-4 h-4" style={{ color: "#F97316" }} /><span className="text-sm font-semibold" style={{ color: "#2563EB" }}>AI-Powered Onboarding</span>
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4" style={{ color: "#1E293B" }}>Training<span style={{ color: "#2563EB" }}>Wheels</span></h1>
        <p className="text-lg md:text-xl leading-relaxed max-w-lg mx-auto" style={{ color: "#475569" }}>Turn your training manuals into interactive guided walkthroughs. New hires learn by doing — not just reading.</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full max-w-lg">
        <p className="text-center text-sm font-semibold mb-4" style={{ color: "#64748B" }}>I am a...</p>
        <div className="grid grid-cols-2 gap-4">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => setRole("manager")} className="clay-card p-6 text-left cursor-pointer" style={role === "manager" ? { borderColor: "#2563EB" } : {}}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "linear-gradient(135deg, #DBEAFE, #BFDBFE)", border: "2px solid #93C5FD" }}><UserCog className="w-6 h-6" style={{ color: "#2563EB" }} /></div>
            <h3 className="font-bold text-lg mb-1" style={{ color: "#1E293B" }}>Manager</h3><p className="text-sm" style={{ color: "#64748B" }}>Create & assign training tours for your team</p>
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => setRole("employee")} className="clay-card p-6 text-left cursor-pointer" style={role === "employee" ? { borderColor: "#F97316" } : {}}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "linear-gradient(135deg, #FEF3C7, #FDE68A)", border: "2px solid #FCD34D" }}><GraduationCap className="w-6 h-6" style={{ color: "#F97316" }} /></div>
            <h3 className="font-bold text-lg mb-1" style={{ color: "#1E293B" }}>Employee</h3><p className="text-sm" style={{ color: "#64748B" }}>Take guided tours to learn your new role</p>
          </motion.button>
        </div>
        <AnimatePresence>{role && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6"><button onClick={handleContinue} className="clay-button w-full py-4 text-lg flex items-center justify-center gap-2"><>Continue as {role === "manager" ? "Manager" : "Employee"} <ArrowRight className="w-5 h-5" /></></button></motion.div>}</AnimatePresence>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-16 grid grid-cols-3 gap-6 max-w-lg w-full">
        {[{ icon: BookOpen, label: "Upload Manuals", color: "#2563EB" }, { icon: MousePointerClick, label: "Interactive Tours", color: "#F97316" }, { icon: BarChart3, label: "Track Progress", color: "#10B981" }].map(({ icon: Icon, label, color }) => (<div key={label} className="text-center"><Icon className="w-5 h-5 mx-auto mb-2" style={{ color }} /><span className="text-xs font-semibold" style={{ color: "#64748B" }}>{label}</span></div>))}
      </motion.div>
    </main>
  );
}
