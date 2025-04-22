function avg(str) {
  const values = str
    .split(",")
    .map(v => parseFloat(v.trim()))
    .filter(v => !isNaN(v));
  if (values.length === 0) return 0;
  const total = values.reduce((a, b) => a + b, 0);
  return total / values.length;
}

// Inputs: comma-separated confidence values from each model
const conf1 = avg(inputData.confidence1); // Model 1: Damage Detection
const conf2 = avg(inputData.confidence2); // Model 2: Part/Type
const conf3 = avg(inputData.confidence3); // Model 3: Severity

// Fixed weights based on model importance
const w1 = 25;  // Model 1: Detection
const w2 = 50;  // Model 2: Type/Part
const w3 = 25;  // Model 3: Severity

const weightedConfidence = (
  (w1 * conf1 + w2 * conf2 + w3 * conf3) /
  (w1 + w2 + w3)
).toFixed(2);

// Optional: risk level categorization
let riskLevel = "unknown";
const wc = parseFloat(weightedConfidence);
if (wc >= 0.85) riskLevel = "low";
else if (wc >= 0.5) riskLevel = "medium";
else riskLevel = "high";

return {
  weightedConfidence,
  riskLevel,
  model1Avg: conf1.toFixed(2),
  model2Avg: conf2.toFixed(2),
  model3Avg: conf3.toFixed(2)
};
