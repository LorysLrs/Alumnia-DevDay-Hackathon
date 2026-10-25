const assert = require("node:assert/strict");
const { inferSector, rankedRoles } = require("../public/alumnia-sector.js");

const cases = [
  ["cybersecurity", "cybersecurity"],
  ["summer internships in cybersecurity", "cybersecurity"],
  ["data science, maybe finance", "dataFinance"],
  ["app design", "digitalProduct"],
  ["something practical, perhaps IT", "technology"],
  ["software engineering and AI", "softwareAI"],
  ["I like helping people solve problems", "technology"],
  ["network administration", "networks"],
  ["financial control", "finance"],
];
for (const [direction, expected] of cases) assert.equal(inferSector(direction), expected, direction);
assert.equal(inferSector("a broad interest", ["Analyste en cybersécurité"]), "cybersecurity");
assert.deepEqual(
  rankedRoles("dataFinance", ["Data analyst", "Contrôleur de gestion"]),
  ["Data analyst", "Contrôleur de gestion", "Gestionnaire de paie"],
);
assert.deepEqual(
  rankedRoles("digitalProduct", ["Motion designer", "UX/UI designer"]),
  ["Motion designer", "UX/UI designer", "Game designer"],
);
const fs = require("node:fs");
const html = fs.readFileSync(require("node:path").join(__dirname, "../public/alumnia-demo.html"), "utf8");
assert.match(html, /<script src="\/alumnia-sector\.js"><\/script>/);
assert.match(html, /data-testid="sector-focus"/);
assert.match(html, /Your sector focus/);
assert.match(html, /My route through the sector/);
assert.match(html, /data-sector-job/);
console.log(`OK — ${cases.length + 5} sector-first business rules passed.`);
