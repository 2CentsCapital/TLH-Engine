"use client";

import { VALURA, type Partner } from "@/lib/partner-brand";

/** The partner's mark — uploaded logo image if present, else a styled wordmark. */
export function PartnerMark({ partner, size = 18, className = "" }: { partner: Partner; size?: number; className?: string }) {
  if (partner.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={partner.logo} alt={partner.name} style={{ height: size * 1.5, width: "auto", objectFit: "contain" }} className={className} />;
  }
  return (
    <span className={className} style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontStyle: partner.italic ? "italic" : "normal", color: partner.color, fontSize: size, lineHeight: 1 }}>
      {partner.name}
    </span>
  );
}

/** Partner × Valura lockup. */
export function CoBrand({ partner, size = 18, className = "" }: { partner: Partner; size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <PartnerMark partner={partner} size={size} />
      <span style={{ color: "#cbd5d1", fontSize: size * 0.8 }}>×</span>
      <span style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, color: VALURA.color, fontSize: size, lineHeight: 1 }}>{VALURA.name}</span>
    </span>
  );
}
