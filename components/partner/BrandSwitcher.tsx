"use client";

import { useState, useRef } from "react";
import { ChevronDown, Upload, Check, Palette, X } from "lucide-react";
import { PARTNERS, usePartner, setActivePartner, setCustomPartner } from "@/lib/partner-brand";
import { PartnerMark } from "./CoBrand";

export default function BrandSwitcher() {
  const partner = usePartner();
  const [open, setOpen] = useState(false);
  const [logo, setLogo] = useState<string | undefined>(partner.id === "custom" ? partner.logo : undefined);
  const [name, setName] = useState(partner.id === "custom" ? partner.name : "");
  const [color, setColor] = useState(partner.id === "custom" ? partner.color : "#2D7FF0");
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (f?: File) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(f);
  };

  const applyCustom = () => {
    setCustomPartner({ name: name || "Your Brand", color, logo });
    setOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold bg-white transition-all hover:shadow-sm"
        style={{ borderColor: "#E5E7EB", color: "#00111B" }}>
        <Palette className="h-3.5 w-3.5" style={{ color: partner.color }} />
        Brand: <PartnerMark partner={partner} size={13} />
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: "#9aa3a0" }} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-40 mt-2 w-72 rounded-2xl border bg-white p-3 shadow-xl animate-fade-in" style={{ borderColor: "#E5E7EB" }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6b7280" }}>Co-brand partner</p>
              <button onClick={() => setOpen(false)}><X className="h-3.5 w-3.5" style={{ color: "#9aa3a0" }} /></button>
            </div>

            {/* preset partners */}
            <div className="space-y-1">
              {PARTNERS.map((p) => (
                <button key={p.id} onClick={() => { setActivePartner(p.id); setOpen(false); }}
                  className="w-full flex items-center justify-between rounded-xl border px-3 py-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: partner.id === p.id ? p.color : "#EEF0F2" }}>
                  <PartnerMark partner={p} size={15} />
                  {partner.id === p.id && <Check className="h-4 w-4" style={{ color: p.color }} />}
                </button>
              ))}
            </div>

            {/* custom logo */}
            <div className="mt-3 pt-3 border-t" style={{ borderColor: "#EEF0F2" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#6b7280" }}>Or drop a logo</p>
              <div className="flex items-center gap-2">
                <button onClick={() => fileRef.current?.click()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-all hover:bg-gray-50"
                  style={{ borderColor: "#E5E7EB", color: "#00111B" }}>
                  <Upload className="h-3.5 w-3.5" /> {logo ? "Change logo" : "Upload logo"}
                </button>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-9 w-9 rounded-lg border cursor-pointer" style={{ borderColor: "#E5E7EB" }} title="Brand colour" />
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
              {logo && <img src={logo} alt="logo preview" className="mt-2 h-8 w-auto object-contain" />}
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Brand name (if no logo)"
                className="mt-2 w-full rounded-lg border px-3 py-2 text-xs outline-none" style={{ borderColor: "#E5E7EB" }} />
              <button onClick={applyCustom} disabled={!logo && !name}
                className="mt-2 w-full rounded-lg px-3 py-2 text-xs font-bold text-white disabled:opacity-40" style={{ background: color }}>
                Apply this brand
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
