"use client";

// Page /kit : la boîte à outils visuelle d'Alumnia, pour vérifier les composants de référence.
// Ce n'est pas un écran du produit ; on peut la retirer avant la mise en ligne.

import { useState } from "react";
import { AiBadge, AiOrb } from "@/components/ui/AiOrb";
import { Celebrate } from "@/components/ui/Celebrate";
import { Logo } from "@/components/ui/Logo";
import { Crowd, DEMO_PEOPLE, Face, PEOPLE_SETS } from "@/components/ui/Person";

export default function KitPage() {
  const [burst, setBurst] = useState(0);
  const [choice, setChoice] = useState<number | null>(3);
  const options = ["Pas du tout", "Plutôt pas", "Je ne sais pas", "Plutôt oui", "J'adorerais"];

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 64px", display: "grid", gap: 28 }}>
      <Logo height={40} />
      <h1 style={{ fontSize: 46 }}>Boîte à outils Alumnia</h1>

      <section className="card" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <button className="btn">Voir ma roadmap</button>
        <button className="btn btn--alt">Refaire le questionnaire</button>
        <span className="who who--human">Disponible jeudi</span>
        <span className="who who--partner">Partenaire : Nexora</span>
        <span className="who who--done">Confirmé</span>
        <AiBadge />
      </section>

      <section className="card">
        <h2 style={{ fontSize: 26, marginBottom: 14 }}>Réparer un vélo ou monter un meuble</h2>
        <div role="radiogroup" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
          {options.map((o, i) => (
            <button key={o} role="radio" aria-checked={choice === i} className="choice" style={{ padding: "18px 8px", font: "inherit", fontWeight: 700 }} onClick={() => setChoice(i)}>
              {o}
            </button>
          ))}
        </div>
      </section>

      <section className="soft" style={{ background: "var(--ai-wash)", display: "flex", gap: 28, alignItems: "center" }}>
        <AiOrb state="composing" />
        <AiOrb state="searching" />
        <AiOrb state="weaving" />
        <AiOrb state="listening" />
        <AiOrb state="breathing" />
      </section>

      <section className="card" style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <div style={{ position: "relative", width: 56, height: 56 }}>
          <button
            aria-label="Cocher l'étape"
            onClick={() => setBurst((n) => n + 1)}
            style={{ width: 56, height: 56, borderRadius: "50%", border: 0, background: "var(--green)", borderBottom: "5px solid var(--green-edge)", cursor: "pointer" }}
          />
          <Celebrate trigger={burst} size="md" toast={{ title: "Bien joué, ta formation est choisie", badge: "+1 étape" }} />
        </div>
        <span>Clique sur la pastille : paillettes et toast.</span>
        <Face id={DEMO_PEOPLE.lorys} size={56} background="var(--human-wash)" />
        <Face id={DEMO_PEOPLE.yanis} size={56} />
      </section>

      <section className="soft" style={{ overflow: "hidden", height: 260, position: "relative", background: "var(--green-wash)" }}>
        <Crowd ids={PEOPLE_SETS.profil} width={138} style={{ right: 28 }} />
      </section>
    </main>
  );
}
