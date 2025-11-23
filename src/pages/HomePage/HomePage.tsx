import React from "react";
import { useNavigate } from "react-router-dom";
import './HomePage.css';

// ============= COMPONENT: ContentBlock =============

interface ContentBlockProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bgColor?: "dark" | "light";
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  subtitle,
  children,
  bgColor = "light",
}) => {
  const bgClass = bgColor === "dark" ? "bg-dark" : "bg-light";

  return (
    <section className={`home-content-block ${bgClass}`}>
      <div className="home-content-inner">
        <div className="home-content-header">
          <h2 className="home-section-title">{title}</h2>
          {subtitle && (
            <p className="home-section-subtitle">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

// ============= COMPONENT: FeatureCard =============

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="home-feature-card">
      <div className="home-feature-icon">{icon}</div>
      <h3 className="home-feature-title">{title}</h3>
      <p className="home-feature-description">{description}</p>
    </div>
  );
};

// ============= COMPONENT: LayerCard =============

interface LayerCardProps {
  label: string;
  title: string;
  items: string[];
}

const LayerCard: React.FC<LayerCardProps> = ({ label, title, items }) => {
  return (
    <div className="home-layer-card">
      <p className="home-layer-label">{label}</p>
      <h3 className="home-layer-title">{title}</h3>
      <ul className="home-layer-list">
        {items.map((item, idx) => (
          <li key={idx} className="home-layer-item">
            <span className="home-layer-bullet">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ============= COMPONENT: BenefitCard =============

interface BenefitCardProps {
  icon: string;
  title: string;
  items: string[];
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, items }) => {
  return (
    <div className="home-benefit-card">
      <div className="home-benefit-icon">{icon}</div>
      <h3 className="home-benefit-title">{title}</h3>
      <ul className="home-benefit-list">
        {items.map((item, idx) => (
          <li key={idx} className="home-benefit-item">
            <span className="home-benefit-checkmark">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ============= COMPONENT: HomePage =============

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      {/* ============= HERO SECTION ============= */}
      <header className="home-hero">
        <div className="home-hero-container">
          <div className="home-hero-content">
            <span className="home-badge">
              🐷🚛 Logistics Optimization · HackEPS
            </span>

            <h1 className="home-title">
              Intelligent{" "}
              <span className="home-title-highlight">Logistics Simulator</span> for
              Farms & Slaughterhouses
            </h1>

            <p className="home-subtitle">
              Evaluate routes, purchases, and profits in a simulated 2-week
              environment. Our system combines pig weights, prices, penalties,
              distances, and daily slaughter capacity to recommend optimal
              logistics decisions.
            </p>
          </div>

          {/* Stats Card */}
          <div className="home-stats-card">
            <p className="home-stats-label">Simulation Summary</p>
            <div className="home-stats-grid">
              <div className="home-stat-item">
                <p className="home-stat-label">Net Profit</p>
                <p className="home-stat-value home-stat-value-green">
                  €124.3K
                </p>
              </div>
              <div className="home-stat-item">
                <p className="home-stat-label">CO₂ per kg</p>
                <p className="home-stat-value home-stat-value-blue">
                  0.42 kg
                </p>
              </div>
              <div className="home-stat-item">
                <p className="home-stat-label">Truck Usage</p>
                <p className="home-stat-value home-stat-value-orange">87%</p>
              </div>
              <div className="home-stat-item">
                <p className="home-stat-label">Farms Served</p>
                <p className="home-stat-value home-stat-value-purple">32</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============= WHAT IS THIS PLATFORM ============= */}
      <ContentBlock
        title="What is this Platform?"
        subtitle="A logistics simulation tool designed for the pork supply chain: farms, slaughterhouses, and transporters."
        bgColor="light"
      >
        <div className="home-features-grid">
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

      {/* ============= HOW IT WORKS ============= */}
      <ContentBlock
        title="How Does it Work?"
        subtitle="The simulation engine evaluates all possible farm-slaughterhouse combinations day by day, building routes that maximize profit."
        bgColor="dark"
      >
        <div className="home-layers-grid">
          <LayerCard
            label="Layer 1"
            title="Trip Economics"
            items={[
              "Calculate available pigs and remaining inventory",
              "Analyze weight distribution and apply penalties per range",
              "Estimate revenue: kg × sale price × (1 − penalty)",
              "Calculate transport costs: km × cost/km",
              "Compute trip profit: revenue − purchases − transport"
            ]}
          />

          <LayerCard
            label="Layer 2"
            title="Timing & Scoring"
            items={[
              "Calculate timing score based on daily growth and days to optimal weight (105-115 kg)",
              "Filter out farms with negative profit or poor timing",
              "Compute global score combining distance, timing, profit per kg, and urgency",
              "Rank farms by global score (highest to lowest)"
            ]}
          />

          <LayerCard
            label="Layer 3"
            title="Route Building"
            items={[
              "Build routes with up to 3 farms per truck respecting daily slaughter capacity",
              "Select truck type (10T or 20T) based on total load",
              "Update metrics per trip: revenue, purchases, transport costs",
              "Aggregate final results: gross/net profit, truck occupancy, total km, and other KPIs"
            ]}
          />
        </div>
      </ContentBlock>

      {/* ============= BENEFITS ============= */}
      <ContentBlock
        title="Key Benefits"
        subtitle="Concrete advantages for each stakeholder in the supply chain."
        bgColor="light"
      >
        <div className="home-benefits-grid">
          <BenefitCard
            icon="🏭"
            title="For Slaughterhouses"
            items={[
              "Maximize profit per kg and per day",
              "Avoid capacity saturation with advance planning",
              "Reduce weight penalties by optimal purchase timing",
              "Simulate \"what if\" scenarios"
            ]}
          />

          <BenefitCard
            icon="🐷"
            title="For Farms"
            items={[
              "Visibility on pickup probability based on weight",
              "Understand economic impact of average weight",
              "Better feeding and batch planning decisions"
            ]}
          />

          <BenefitCard
            icon="🚛"
            title="For Transporters"
            items={[
              "Fuller routes with fewer empty kilometers",
              "Better truck utilization (average occupancy)",
              "Cost estimation per km and carbon footprint analysis",
              "Clear map visualization of daily farm visits"
            ]}
          />
        </div>

        {/* ============= CTA SECTION ============= */}
        <div className="home-cta-section">
          <div className="home-cta-content">
            <div className="home-cta-text-wrapper">
              <h3 className="home-cta-title">
                Ready to Optimize Your Supply Chain?
              </h3>
              <p className="home-cta-description">
                Transform operational data (weights, distances, capacities) into
                clear economic decisions: what to buy, when, where, and how to
                transport it to maximize system-wide profit.
              </p>
            </div>
            <button className="home-btn-cta" onClick={() => navigate('/start-simulation')}>
              Try Example Simulation
            </button>
          </div>
        </div>
      </ContentBlock>

      {/* ============= FOOTER ============= */}
      <footer className="home-footer">
        <p className="home-footer-text">
          HackEPS · Pork Logistics Simulator · Demo
        </p>
      </footer>
    </div>
  );
};

export default HomePage;