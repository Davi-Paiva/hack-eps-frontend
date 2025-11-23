import React from "react";

// Content Block Component
const ContentBlock: React.FC<{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bgColor?: string;
}> = ({ title, subtitle, children, bgColor = "bg-slate-900/40" }) => {
  return (
    <section className={`border-t border-slate-800 ${bgColor}`}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-3 text-orange-400">{title}</h2>
          {subtitle && (
            <p className="text-slate-400 text-lg max-w-3xl">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-6 hover:border-orange-500/50 transition-all duration-300">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-3 text-slate-100">{title}</h3>
      <p className="text-slate-300 leading-relaxed">{description}</p>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 overflow-y-auto">
      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-orange-300">
              🐷🚛 Logistics Optimization · HackEPS
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">
              Intelligent{" "}
              <span className="text-orange-400">Logistics Simulator</span> for
              Farms & Slaughterhouses
            </h1>

            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              Evaluate routes, purchases, and profits in a simulated 2-week
              environment. Our system combines pig weights, prices, penalties,
              distances, and daily slaughter capacity to recommend optimal
              logistics decisions.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-xl bg-orange-500 px-6 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-orange-500/30 hover:bg-orange-400 transition-all duration-300 hover:scale-105">
                Start Simulation
              </button>
              <button className="rounded-xl border border-slate-600 px-6 py-4 text-base font-semibold text-slate-100 hover:bg-slate-800/60 transition-all duration-300">
                View Example Results
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="mt-8 lg:mt-0 lg:max-w-md">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">
                Simulation Summary
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-800/80 p-4">
                  <p className="text-slate-400 text-xs">Net Profit</p>
                  <p className="mt-2 text-2xl font-bold text-emerald-300">
                    €124.3K
                  </p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4">
                  <p className="text-slate-400 text-xs">CO₂ per kg</p>
                  <p className="mt-2 text-2xl font-bold text-sky-300">
                    0.42 kg
                  </p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4">
                  <p className="text-slate-400 text-xs">Truck Usage</p>
                  <p className="mt-2 text-2xl font-bold text-orange-300">87%</p>
                </div>
                <div className="rounded-xl bg-slate-800/80 p-4">
                  <p className="text-slate-400 text-xs">Farms Served</p>
                  <p className="mt-2 text-2xl font-bold text-violet-300">32</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* What is this platform */}
      <ContentBlock
        title="What is this Platform?"
        subtitle="A logistics simulation tool designed for the pork supply chain: farms, slaughterhouses, and transporters."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon="🐷"
            title="Farm Production"
            description="Control pig sales, weight ranges, and penalties based on whether animals are underweight, ideal, or overweight."
          />
          <FeatureCard
            icon="🏭"
            title="Slaughter Capacity"
            description="Plan pickups within daily slaughter limits while maximizing profit considering sale price, penalties, and transport costs."
          />
          <FeatureCard
            icon="🚛"
            title="Routes & Trucks"
            description="Each truck visits up to 3 farms per route. The system optimizes which farms to visit, in what order, and with which truck type (10T or 20T)."
          />
        </div>
      </ContentBlock>

      {/* How it Works */}
      <ContentBlock
        title="How Does it Work?"
        subtitle="The simulation engine evaluates all possible farm-slaughterhouse combinations day by day, building routes that maximize profit."
        bgColor="bg-slate-950/40"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Layer 1 */}
          <div className="rounded-2xl bg-slate-950/70 border border-slate-700 p-6 hover:border-orange-500/30 transition-all duration-300">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-400 mb-2">
              Layer 1
            </p>
            <h3 className="text-xl font-bold mb-4 text-slate-100">
              Trip Economics
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Calculate available pigs and remaining inventory</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>
                  Analyze weight distribution and apply penalties per range
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Estimate revenue: kg × sale price × (1 − penalty)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Calculate transport costs: km × cost/km</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Compute trip profit: revenue − purchases − transport</span>
              </li>
            </ul>
          </div>

          {/* Layer 2 */}
          <div className="rounded-2xl bg-slate-950/70 border border-slate-700 p-6 hover:border-orange-500/30 transition-all duration-300">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-400 mb-2">
              Layer 2
            </p>
            <h3 className="text-xl font-bold mb-4 text-slate-100">
              Timing & Scoring
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>
                  Calculate timing score based on daily growth and days to
                  optimal weight (105-115 kg)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Filter out farms with negative profit or poor timing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>
                  Compute global score combining distance, timing, profit per
                  kg, and urgency
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Rank farms by global score (highest to lowest)</span>
              </li>
            </ul>
          </div>

          {/* Layer 3 */}
          <div className="rounded-2xl bg-slate-950/70 border border-slate-700 p-6 hover:border-orange-500/30 transition-all duration-300">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-400 mb-2">
              Layer 3
            </p>
            <h3 className="text-xl font-bold mb-4 text-slate-100">
              Route Building
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>
                  Build routes with up to 3 farms per truck respecting daily
                  slaughter capacity
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Select truck type (10T or 20T) based on total load</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>
                  Update metrics per trip: revenue, purchases, transport costs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>
                  Aggregate final results: gross/net profit, truck occupancy,
                  total km, and other KPIs
                </span>
              </li>
            </ul>
          </div>
        </div>
      </ContentBlock>

      {/* Benefits */}
      <ContentBlock
        title="Key Benefits"
        subtitle="Concrete advantages for each stakeholder in the supply chain."
        bgColor="bg-slate-900/40"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {/* Slaughterhouse */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-6 hover:border-orange-500/50 transition-all duration-300">
            <div className="text-3xl mb-4">🏭</div>
            <h3 className="text-xl font-semibold mb-4 text-slate-100">
              For Slaughterhouses
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-400">✓</span>
                <span>Maximize profit per kg and per day</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">✓</span>
                <span>Avoid capacity saturation with advance planning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">✓</span>
                <span>Reduce weight penalties by optimal purchase timing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">✓</span>
                <span>Simulate "what if" scenarios</span>
              </li>
            </ul>
          </div>

          {/* Farms */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-6 hover:border-orange-500/50 transition-all duration-300">
            <div className="text-3xl mb-4">🐷</div>
            <h3 className="text-xl font-semibold mb-4 text-slate-100">
              For Farms
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-400">✓</span>
                <span>Visibility on pickup probability based on weight</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">✓</span>
                <span>Understand economic impact of average weight</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">✓</span>
                <span>Better feeding and batch planning decisions</span>
              </li>
            </ul>
          </div>

          {/* Transporters */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-6 hover:border-orange-500/50 transition-all duration-300">
            <div className="text-3xl mb-4">🚛</div>
            <h3 className="text-xl font-semibold mb-4 text-slate-100">
              For Transporters
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-400">✓</span>
                <span>Fuller routes with fewer empty kilometers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">✓</span>
                <span>Better truck utilization (average occupancy)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">✓</span>
                <span>Cost estimation per km and carbon footprint analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">✓</span>
                <span>Clear map visualization of daily farm visits</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-3 text-slate-100">
                Ready to Optimize Your Supply Chain?
              </h3>
              <p className="text-slate-300 max-w-2xl leading-relaxed">
                Transform operational data (weights, distances, capacities) into
                clear economic decisions: what to buy, when, where, and how to
                transport it to maximize system-wide profit.
              </p>
            </div>
            <button className="rounded-xl bg-orange-500 px-8 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-orange-500/30 hover:bg-orange-400 transition-all duration-300 hover:scale-105 whitespace-nowrap">
              Try Example Simulation
            </button>
          </div>
        </div>
      </ContentBlock>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center">
        <p className="text-sm text-slate-500">
          HackEPS · Pork Logistics Simulator · Demo
        </p>
      </footer>
    </div>
  );
};

export default HomePage;