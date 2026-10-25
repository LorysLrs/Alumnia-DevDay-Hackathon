import { redirect } from "next/navigation";

const views: Record<string, string> = {
  login: "login",
  questionnaire: "questionnaire",
  "questionnaire/analyse": "gen",
  profil: "profil",
  hub: "hub",
  chemin: "roadmap",
  metier: "metier",
  pros: "alumni",
  "echanges/preparer": "prep",
  "echanges/rendez-vous": "rdv",
  echanges: "echanges",
  visio: "visio",
  pro: "alumni-vue",
  entreprises: "entreprise",
  partenaire: "partenaire",
  "partenaire/rapport": "rapport",
  classe: "classe",
  "comment-ca-marche": "comment",
  ia: "ia",
};

export default async function ScreenPage({ params }: { params: Promise<{ screen: string[] }> }) {
  const { screen } = await params;
  const path = screen.join("/");
  const view = views[path] ?? (screen[0] === "metiers" ? "metier" : screen[0] === "echanges" && screen.length === 2 ? "rdv" : screen[0] === "echanges" && screen[2] === "visio" ? "visio" : screen[0] === "pro" && screen[1] === "echanges" ? "alumni-vue" : "login");
  redirect(`/alumnia-demo.html#${view}`);
}