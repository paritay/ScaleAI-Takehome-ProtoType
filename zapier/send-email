// Parse inputs safely
const parts = (inputData.parts || "").split(",").map(p => p.trim()).filter(Boolean);
const severities = (inputData.severity || "").split(",").map(s => s.trim());
const confidenceScore = parseFloat(inputData.confidence || "0");
const claimNumber = inputData.claim_numb || "Unknown";

// Base cost lookup
const baseCosts = {
  dent: 200,
  scratch: 150,
  broken_glass: 300,
  bumper: 400
};

// Severity multiplier lookup
const severityMultipliers = {
  minor: 1,
  moderate: 2.0,
  severe: 3.0
};

// Confidence label
let confidenceLabel = "Medium";
if (confidenceScore < 0.5) {
  confidenceLabel = "Low";
} else if (confidenceScore > 0.85) {
  confidenceLabel = "High";
}

// Loop through each part to calculate cost
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

// Format the report
const summary = 
`🧾 Claim Estimate Summary  
--------------------------
Claim Number: ${claimNumber}

🔧 Damaged Parts:
${breakdownLines.join("\n")}

💰 Total Estimate: $${totalCost}

📊 Confidence Score: ${confidenceScore.toFixed(2)} (${confidenceLabel})`;

return { summary };

