const parts = (inputData.parts || "").split(",").map(p => p.trim());
const severities = (inputData.severity || "").split(",").map(s => s.trim());

// Base cost per damage type
const baseCosts = {
  dent: 200,
  scratch: 150,
  broken_glass: 300,
  bumper: 400
};

// Severity multipliers
const severityMultipliers = {
  minor: 1,
  moderate: 2.0,
  severe: 3.0
};

let totalCost = 0;
let breakdownLines = [];

for (let i = 0; i < parts.length; i++) {
  const part = parts[i];
  const severity = severities[i] || "moderate";
  const base = baseCosts[part] || 0;
  const multiplier = severityMultipliers[severity] || 1;
  const adjustedCost = Math.round(base * multiplier);

  breakdownLines.push(`• ${part.charAt(0).toUpperCase() + part.slice(1)} – $${adjustedCost}`);
  totalCost += adjustedCost;
}

return {
  totalCost,
  breakdown: breakdownLines.join("\n")
};
