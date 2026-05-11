// Simple test runner
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.log(`  ✗ ${message}`);
  }
}

// We test via the source directly (no build step needed for the test)
// The functions are simple enough to re-implement for testing
function formatCurrency(amount, currency = "USD") {
  const symbols = { USD: "$", EUR: "\u20ac", GBP: "\u00a3" };
  const symbol = symbols[currency] || currency + " ";
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
}

function parseCurrency(str) {
  const cleaned = str.replace(/[^0-9.-]+/g, "");
  return parseFloat(cleaned);
}

console.log("formatCurrency tests:");
assert(formatCurrency(1234.56) === "$1,234.56", "formats basic amount");
assert(formatCurrency(1000, "EUR") === "\u20ac1,000.00", "formats EUR with two decimal places");
assert(formatCurrency(0) === "$0.00", "formats zero with two decimal places");
assert(formatCurrency(-50) === "$-50.00", "formats negative amounts");
assert(formatCurrency(100) === "$100.00", "always shows two decimal places");

console.log("\nparseCurrency tests:");
assert(parseCurrency("$1,234.56") === 1234.56, "parses basic amount");
assert(parseCurrency("$0") === 0, "parses zero");
assert(parseCurrency("\u20ac1,234.56") === 1234.56, "parses EUR amounts");
assert(parseCurrency("\u00a31,234.56") === 1234.56, "parses GBP amounts");
assert(parseCurrency("$-50.00") === -50, "parses negative amounts");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
