(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.AlumniaSector = api;
})(typeof globalThis === "undefined" ? this : globalThis, function () {
  const SECTORS = Object.freeze({
    cybersecurity: Object.freeze({
      name: "Cybersecurity & digital safety",
      summary: "Start with security, then explore how investigation, networks and helping people shape your possible roles.",
      roles: ["Analyste en cybersécurité", "Administrateur systèmes et réseaux", "Technicien support informatique"],
      events: ["Beginner-friendly cybersecurity CTFs", "Student cybersecurity hackathons", "Security and cloud events near your school"],
      resource: "Build a security project, review your CV against entry-level roles and follow news about digital safety."
    }),
    dataFinance: Object.freeze({
      name: "Data & finance",
      summary: "Your interest in data and finance stays at the centre. Your profile helps compare analytical and business roles within this sector.",
      roles: ["Data analyst", "Contrôleur de gestion", "Gestionnaire de paie"],
      events: ["Student data challenges and datathons", "Finance and analytics career events", "AI and data meetups near your school"],
      resource: "Explore data projects, finance sector news, CV feedback and a clearer LinkedIn profile."
    }),
    data: Object.freeze({
      name: "Data & analytics",
      summary: "Explore how curiosity, analysis and communication connect to different roles in data.",
      roles: ["Data analyst", "Ingénieur logiciel IA", "Contrôleur de gestion"],
      events: ["Student data challenges and datathons", "AI and analytics hackathons", "Data meetups near your school"],
      resource: "Build a small data project, review your CV and follow news about analytics and AI."
    }),
    digitalProduct: Object.freeze({
      name: "Digital product & design",
      summary: "Your interest in app design is the starting point. Your creative and practical interests help rank the roles to explore.",
      roles: ["UX/UI designer", "Game designer", "Motion designer"],
      events: ["UX and product design meetups", "App and game design hackathons", "Portfolio review sessions for students"],
      resource: "Strengthen your portfolio, get feedback on your CV and improve your design-focused LinkedIn profile."
    }),
    networks: Object.freeze({
      name: "IT infrastructure & networks",
      summary: "Explore the teams that keep devices, systems and networks working, with roles shaped by your interests.",
      roles: ["Administrateur systèmes et réseaux", "Technicien support informatique", "Analyste en cybersécurité"],
      events: ["Networking and cloud meetups", "Cybersecurity CTFs and beginner challenges", "Student technology hackathons"],
      resource: "Try a practical network project, improve your technical CV and follow infrastructure news."
    }),
    softwareAI: Object.freeze({
      name: "AI & software engineering",
      summary: "Explore software and AI through different roles, using your interests to decide which work fits best.",
      roles: ["Ingénieur logiciel IA", "Data analyst", "Analyste en cybersécurité"],
      events: ["AI and software engineering hackathons", "Student developer meetups", "Summer software and AI internship events"],
      resource: "Build a small software project, get CV feedback and track news in AI and software."
    }),
    technology: Object.freeze({
      name: "Digital technology",
      summary: "Keep technology as your broad starting point. Your profile brings several possible roles into view before you choose a specialism.",
      roles: ["Ingénieur logiciel IA", "Analyste en cybersécurité", "Administrateur systèmes et réseaux", "Technicien support informatique"],
      events: ["Technology and AI hackathons", "Cybersecurity CTFs for beginners", "Developer and network meetups"],
      resource: "Compare software, security and network projects; then strengthen your CV and LinkedIn profile."
    }),
    finance: Object.freeze({
      name: "Finance & business operations",
      summary: "Explore how numbers, organization and business decisions connect to different roles in this sector.",
      roles: ["Contrôleur de gestion", "Gestionnaire de paie", "Assistant RH", "Data analyst"],
      events: ["Finance and business analytics events", "Student data challenges", "Early-career finance meetups"],
      resource: "Try a simple budgeting project, review your CV and follow finance sector news."
    })
  });

  function normalize(value) {
    return String(value || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function detectSector(text) {
    if (/cyber|security|ctf|securite/.test(text)) return "cybersecurity";
    if (/data|analytics|analyse de donnees/.test(text) && /finance|accounting|comptabilite|gestion/.test(text)) return "dataFinance";
    if (/ux|ui|design|application|app design|interface|game|jeu video/.test(text)) return "digitalProduct";
    if (/data|analytics|machine learning|deep learning|donnee/.test(text)) return "data";
    if (/finance|financial|accounting|comptabilite|controle de gestion/.test(text)) return "finance";
    if (/network|infrastructure|reseau|support informatique|system administrator/.test(text)) return "networks";
    if (/software|programming|coding|artificial intelligence|\bai\b|intelligence artificielle|developpement logiciel/.test(text)) return "softwareAI";
    if (/\bit\b|informatique|technology|technologie|computer/.test(text)) return "technology";
    return null;
  }

  function inferSector(direction, profileJobs) {
    const explicit = detectSector(normalize(direction));
    if (explicit) return explicit;
    const profile = detectSector(normalize((profileJobs || []).join(" ")));
    return profile || "technology";
  }

  function rankedRoles(sectorId, profileJobs) {
    const sector = SECTORS[sectorId] || SECTORS.technology;
    const profile = Array.isArray(profileJobs) ? profileJobs : [];
    const matched = profile.filter((job) => sector.roles.includes(job));
    return [...new Set([...matched, ...sector.roles])].slice(0, 3);
  }

  return Object.freeze({ SECTORS, inferSector, rankedRoles });
});
