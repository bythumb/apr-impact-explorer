// APR Records — Impact Explorer
// All figures are calibrated to publicly reported industry data from 2005–2009.
// Sources noted per metric. The "YouTube-Native Artist" projection is internal modeling.

export const METRICS = [
  {
    id: "01",
    slug: "total-revenue",
    name: "Total Revenue",
    section: "problem",
    chart: "line",
    direction: "down",
    unit: "$ billions, US recorded music",
    source: "RIAA year-end shipment reports",
    headline: "$12.27B → $7.69B in 4 years",
    delta: "−37.3%",
    series: [
      { x: 2005, y: 12.27 },
      { x: 2006, y: 11.49 },
      { x: 2007, y: 10.37 },
      { x: 2008, y: 8.48 },
      { x: 2009, y: 7.69 },
    ],
    takeaway:
      "The US recorded music industry has lost roughly $4.6 billion in annual revenue since 2005. The decline is accelerating: 2008 alone gave back more than the previous two years combined.",
  },
  {
    id: "02",
    slug: "cd-album-sales",
    name: "CD Album Sales",
    section: "problem",
    chart: "bar",
    direction: "down",
    unit: "Millions of units sold, US",
    source: "Nielsen SoundScan annual recap",
    headline: "619M → 296M units",
    delta: "−52.2%",
    series: [
      { x: 2005, y: 619 },
      { x: 2006, y: 553 },
      { x: 2007, y: 449 },
      { x: 2008, y: 360 },
      { x: 2009, y: 296 },
    ],
    takeaway:
      "CDs were 90% of label revenue in 2000. By 2009 they have collapsed by more than half in unit volume — and at ~$15 retail per album, this is the single largest line item driving the revenue chart.",
  },
  {
    id: "03",
    slug: "digital-track-sales",
    name: "Digital Track Sales",
    section: "problem",
    chart: "area",
    direction: "down",
    unit: "Annual growth rate of paid digital downloads",
    source: "Nielsen SoundScan / Apple iTunes disclosures",
    headline: "Growth rate: +65% → +7%",
    delta: "−58 pts",
    // y = YoY % growth in paid digital track downloads
    series: [
      { x: 2006, y: 65 },
      { x: 2007, y: 45 },
      { x: 2008, y: 27 },
      { x: 2009, y: 7 },
    ],
    takeaway:
      "Even our fastest-growing format is decelerating. iTunes saved us in 2006; by 2009 each $0.99 download is replacing a fraction of one $15 CD, and the engine is sputtering.",
  },
  {
    id: "04",
    slug: "radio-promo-reach",
    name: "Radio Promo Reach",
    section: "problem",
    chart: "pie",
    direction: "down",
    unit: "Share of how 16–24 year olds discover new music, 2009",
    source: "NPD MusicWatch / Edison Research, Infinite Dial 2009",
    headline: "Radio share: 65% → 35%",
    delta: "−30 pts vs 2000",
    series: [
      { label: "Terrestrial Radio", y: 35 },
      { label: "Friends / Word of Mouth", y: 24 },
      { label: "YouTube / Online Video", y: 18 },
      { label: "MySpace / Online Social", y: 11 },
      { label: "TV / MTV", y: 7 },
      { label: "Other", y: 5 },
    ],
    takeaway:
      "We spend roughly 60% of our promo budget on terrestrial radio. Among the listeners who actually buy our records, radio drives barely a third of discovery — and the share is in free fall.",
  },
  {
    id: "05",
    slug: "industry-layoffs",
    name: "Industry Layoffs",
    section: "problem",
    chart: "barh",
    direction: "down",
    unit: "Cumulative announced layoffs, 2007–2009",
    source: "Billboard, Variety, NYT industry desk",
    headline: "~6,000 jobs cut",
    delta: "−~22% of label workforce",
    series: [
      { label: "EMI Group", y: 2000 },
      { label: "Sony BMG / Sony Music", y: 1800 },
      { label: "Universal Music", y: 1100 },
      { label: "Warner Music Group", y: 600 },
      { label: "Independent labels", y: 500 },
    ],
    takeaway:
      "Every major has cut between 15% and 30% of headcount in 24 months. This isn't a downturn — it's a structural reset of what a label is.",
  },
  {
    id: "06",
    slug: "youtube-monthly-views",
    name: "YouTube Monthly Views",
    section: "opportunity",
    chart: "area",
    direction: "up",
    unit: "Billions of monthly video views, global",
    source: "Google quarterly disclosures, comScore",
    headline: "1B → 25B monthly views",
    delta: "+25× in 3 years",
    series: [
      { x: 2006, y: 1.0 },
      { x: 2007, y: 4.0 },
      { x: 2008, y: 12.0 },
      { x: 2009, y: 25.0 },
    ],
    takeaway:
      "YouTube went from a curiosity to the largest video distribution surface ever assembled — and it has zero gatekeepers. An unsigned 16-year-old in a bedroom can reach more listeners than a major-label radio campaign.",
  },
  {
    id: "07",
    slug: "youtube-native-artist",
    name: "YouTube-Native Artist [Proposed]",
    section: "opportunity",
    chart: "line",
    direction: "up",
    unit: "Modeled annual revenue, $ thousands, per artist",
    source: "APR Records internal projection — unaudited",
    headline: "Year 0: $5K → Year 4: $500K+",
    delta: "100× in 4 years",
    // Projection: ad rev + sync + tour + merch combined
    series: [
      { x: "Y0 '09", y: 5 },
      { x: "Y1 '10", y: 40 },
      { x: "Y2 '11", y: 125 },
      { x: "Y3 '12", y: 300 },
      { x: "Y4 '13", y: 510 },
    ],
    takeaway:
      "A YouTube-first signing — develop in public, monetize ads day one, layer sync + touring + merch — projects to $500K/yr by year 4 at roughly 1/10th the marketing spend of a traditional radio rollout. We propose APR sign three of these in FY09.",
  },
];

export const PROBLEM_METRICS = METRICS.filter((m) => m.section === "problem");
export const OPPORTUNITY_METRICS = METRICS.filter(
  (m) => m.section === "opportunity"
);

export function getMetric(slug) {
  return METRICS.find((m) => m.slug === slug);
}
