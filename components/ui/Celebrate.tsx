"use client";

// Paillettes d'Alumnia : 16 étoiles et points jaillissent d'un point, un anneau jaune s'élargit,
// puis un toast Sonner s'affiche. À utiliser seulement pour les 4 moments prévus (DESIGN.md, « Mouvement ») :
// profil prêt (size="lg"), étape cochée (size="md"), échange demandé et compte rendu généré (size="sm").
//
// Usage :
//   const [burst, setBurst] = useState(0);
//   <div style={{ position: "relative" }}>
//     <StepNode … />
//     <Celebrate trigger={burst} size="md" toast={{ title: "Bien joué, ta formation est choisie", badge: "+1 étape" }} />
//   </div>
//   onCheck={() => setBurst((n) => n + 1)}

import { useEffect, useState, type CSSProperties } from "react";
import { toast as sonner } from "sonner";

const COLORS = ["#FFC93C", "#F07A3E", "#1C8247", "#4C8FE0", "#FFC93C", "#F07A3E"];
const RADIUS = { sm: [34, 46], md: [48, 66], lg: [66, 88] } as const;

type Props = {
  /** Incrémenter ce nombre déclenche une célébration. 0 = rien. */
  trigger: number;
  size?: keyof typeof RADIUS;
  toast?: { title: string; badge?: string };
};

export function Celebrate({ trigger, size = "md", toast }: Props) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    setKey((k) => k + 1);
    if (toast) sonner(toast.title, { description: toast.badge, duration: 4000 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  if (!key) return null;
  const [r1, r2] = RADIUS[size];

  return (
    <span key={key} aria-hidden className="celebrate">
      <span className="celebrate__ring" />
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2 + (i % 2 ? 0.2 : 0);
        const dist = (i % 2 ? r1 : r2) + (i % 3) * 6;
        const style = {
          "--dx": `${Math.cos(angle) * dist}px`,
          "--dy": `${Math.sin(angle) * dist}px`,
          "--r": `${(i * 37) % 180}deg`,
          animationDelay: `${(i % 4) * 25}ms`,
        } as CSSProperties;
        const color = COLORS[i % COLORS.length];
        return (
          <span key={i} className="celebrate__bit" style={style}>
            {i % 3 === 0 ? (
              <svg width="11" height="11" viewBox="0 0 10 10">
                <circle cx="5" cy="5" r="5" fill={color} />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill={color} />
              </svg>
            )}
          </span>
        );
      })}
      <style>{`
        .celebrate{position:absolute;left:50%;top:50%;width:0;height:0;pointer-events:none;z-index:5}
        .celebrate__ring{position:absolute;left:-28px;top:-28px;width:56px;height:56px;border-radius:50%;border:4px solid var(--sun);opacity:0;animation:celebrate-ring 800ms var(--ease-out)}
        .celebrate__bit{position:absolute;left:0;top:0;opacity:0;animation:celebrate-pop 900ms cubic-bezier(.2,.8,.3,1) both}
        @keyframes celebrate-ring{0%{transform:scale(.8);opacity:.9}100%{transform:scale(2.3);opacity:0}}
        @keyframes celebrate-pop{
          0%{transform:translate(-50%,-50%) scale(.6);opacity:0}
          25%{opacity:1}
          70%{transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(1.1) rotate(var(--r));opacity:1}
          100%{transform:translate(calc(-50% + var(--dx)*1.2),calc(-50% + var(--dy)*1.2)) scale(.7) rotate(var(--r));opacity:0}
        }
        @media (prefers-reduced-motion: reduce){.celebrate{display:none}}
      `}</style>
    </span>
  );
}
