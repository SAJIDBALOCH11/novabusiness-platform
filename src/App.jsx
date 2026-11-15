import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CirclePlay,
  Contact,
  CreditCard,
  FileText,
  Gauge,
  Globe,
  Laptop2,
  Lock,
  Mail,
  Menu,
  MessageSquareText,
  Monitor,
  PencilRuler,
  Phone,
  Search,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap
} from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Auth', to: '/auth' }
];

const processSteps = [
  'Discovery & strategy alignment',
  'UI/UX and motion design sprints',
  'Build, QA, and launch pipeline',
  'Growth optimization & reporting'
];

const pricingPlans = [
  {
    name: 'Launch',
    price: 'Custom scope',
    description: 'Ideal for startups that want a sharper web presence and lead capture system.',
    features: ['Multi-page marketing site', 'Lead form & CRM integration', 'SEO setup', 'Monthly reporting'],
    accent: 'neutral'
  },
  {
    name: 'Growth',
    price: 'Custom scope',
    description: 'Best for scaling businesses that need content, sales, and booking workflow support.',
    features: ['Everything in Launch', 'Client portal access', 'CMS + blog engine', 'Advanced analytics'],
    accent: 'primary',
    featured: true
  },
  {
    name: 'Scale',
    price: 'Custom scope',
    description: 'Built for multi-team operations needing dashboards, permissions, and automation.',
    features: ['Unlimited admin seats', 'Custom workflows', 'Priority support', 'Backup & security suite'],
    accent: 'teal'
  }
];

const faqItems = [
  'Can I manage all website content from the admin dashboard?',
  'Do you include appointment booking and reminder emails?',
  'Is the client portal secure and role-based?',
  'Can this be scaled for multiple business brands or departments?'
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="section-header">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function usePublicItems() {
  return { items: [], error: '', loading: false };
}

function FeaturedProjectsSection() {
  const { items, error, loading } = usePublicItems();
  return (
    <section className="shell section-block">
      <SectionHeader eyebrow="Featured work" title="Projects published by the NovaBusiness team" />
      {error ? <p className="dashboard-empty" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading published projects…</p> : null}
      {!loading && !error && !items.length ? <p className="dashboard-empty">No public case studies have been published yet.</p> : null}
      {items.length ? (
        <div className="portfolio-grid">
          {items.map((item) => (
            <article key={item._id} className="card project-card">
              <div className="project-badge">{item.service || 'NovaBusiness project'}</div>
              <h3>{item.title}</h3>
              <p>{item.summary || 'A completed project delivered by the NovaBusiness team.'}</p>
              <Link to={`/portfolio/${item.slug}`}>View project <ArrowRight size={18} /></Link>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function PortfolioPage() {
  const { items, error, loading } = usePublicItems();
  return (
    <div className="shell page-shell">
      <SectionHeader eyebrow="Portfolio" title="Completed projects shared by NovaBusiness" text="Only projects approved for public display appear here." />
      {error ? <p className="form-message" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading published projects…</p> : null}
      {!loading && !error && !items.length ? <p className="dashboard-empty">No public projects have been published yet.</p> : null}
      {items.length ? (
        <div className="portfolio-grid">
          {items.map((item) => (
            <article key={item._id} className="card project-card">
              <div className="project-badge">{item.service || 'NovaBusiness project'}</div>
              <h3>{item.title}</h3>
              <p>{item.summary || 'Completed project delivered by NovaBusiness.'}</p>
              <Link to={`/portfolio/${item.slug}`}>View project <ArrowRight size={18} /></Link>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ProjectDetailsPage() {
  return <div className="shell page-shell"><p className="dashboard-empty" role="status">Project details need a backend content source in this frontend-only version.</p></div>;
}

function FeaturedTestimonialsSection() {
  const { items, error, loading } = usePublicItems();
  return (
    <section className="shell section-block alt-section">
      <SectionHeader eyebrow="Client feedback" title="Feedback shared by our clients" />
      {error ? <p className="dashboard-empty" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading approved reviews…</p> : null}
      {!loading && !error && !items.length ? <p className="dashboard-empty">No approved client reviews have been published yet.</p> : null}
      {items.length ? (
        <div className="testimonial-grid">
          {items.slice(0, 3).map((item) => (
            <article key={item._id} className="card testimonial-card">
              <div className="stars" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }).map((_, index) => <Star key={index} size={14} fill="currentColor" />)}
              </div>
              <p>{`“${item.review}”`}</p>
              <div className="person-row">
                <div className="avatar">{item.customerName.charAt(0)}</div>
                <div><strong>{item.customerName}</strong><span>Verified client</span></div>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function LatestArticlesSection() {
  const { items, error, loading } = usePublicItems();
  return (
    <section className="shell section-block alt-section">
      <SectionHeader eyebrow="Insights" title="Latest articles from the NovaBusiness team" />
      {error ? <p className="dashboard-empty" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading published articles…</p> : null}
      {!loading && !error && !items.length ? <p className="dashboard-empty">No published articles yet.</p> : null}
      {items.length ? (
        <div className="blog-grid">
          {items.slice(0, 3).map((post) => (
            <article key={post._id} className="card blog-card">
              <span>{post.category || 'Insights'}</span>
              <h3>{post.title}</h3>
              <div className="blog-meta">
                <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recently published'}</span>
                <Link to={`/blog/${post.slug}`}>Read article <ArrowRight size={16} /></Link>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function getServiceIcon(title) {
  const name = title.toLowerCase();
  if (name.includes('crm') || name.includes('analytics')) return BarChart3;
  if (name.includes('content') || name.includes('seo')) return FileText;
  if (name.includes('booking') || name.includes('appointment')) return CalendarDays;
  if (name.includes('portal') || name.includes('client')) return Users;
  return Monitor;
}

function ServiceCard({ service }) {
  const Icon = getServiceIcon(service.title);
  return (
    <article className="card service-card">
      {service.image ? <img src={service.image} alt="" className="service-image" loading="lazy" /> : <div className="icon-wrap"><Icon size={22} /></div>}
      <h3>{service.title}</h3>
      <p>{service.shortDescription || service.description}</p>
      {service.category ? <span className="project-badge">{service.category}</span> : null}
      <Link to={`/services/${service.slug}`}>Learn more <ChevronRight size={16} /></Link>
    </article>
  );
}

function FeaturedServicesSection() {
  const { items, error, loading } = usePublicItems();
  return (
    <section className="shell section-block">
      <SectionHeader
        eyebrow="What we deliver"
        title="Digital services configured for your business"
        text="Browse services currently published in the NovaBusiness content workspace."
      />
      {error ? <p className="dashboard-empty" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading published services…</p> : null}
      {!loading && !error && !items.length ? <p className="dashboard-empty">No services have been published yet.</p> : null}
      {items.length ? <div className="service-grid">{items.slice(0, 4).map((service) => <ServiceCard key={service._id} service={service} />)}</div> : null}
    </section>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-topbar">
        <div className="shell topbar-inner">
          <span>Digital systems for growing businesses</span>
          <Link to="/contact">Talk to our team <ArrowRight size={14} /></Link>
        </div>
      </div>
      <div className="shell header-inner">
        <Link to="/" className="brand" aria-label="NovaBusiness home">
          <img className="brand-logo" src="/nova-business-logo.jpg" alt="NovaBusiness" />
        </Link>
        <nav className={`main-nav ${menuOpen ? 'menu-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <Link to="/booking" className="btn btn-ghost">Book a demo</Link>
          <Link to="/auth" className="btn btn-primary">Get started</Link>
        </div>
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link to="/" className="brand footer-brand">
            <img className="brand-logo" src="/nova-business-logo.jpg" alt="NovaBusiness" />
          </Link>
          <p>
            Full-stack business platform for websites, CRM operations, CMS publishing, booking systems and client success.
          </p>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/auth">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacy policy</Link></li>
            <li><Link to="/terms">Terms & conditions</Link></li>
          </ul>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 NovaBusiness. Built for high-velocity teams.</span>
        <Link to="/contact">Contact NovaBusiness</Link>
      </div>
    </footer>
  );
}

function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="shell hero-grid hero-home">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-copy"
          >
            <span className="eyebrow hero-eyebrow">A BETTER WAY TO RUN YOUR BUSINESS</span>
            <h1>
              Your business, <span className="text-highlight">beautifully</span> connected.
            </h1>
            <p>
              Websites, leads, bookings, content and client work—brought together in one clear, modern business platform.
            </p>
            <div className="cta-row">
              <Link to="/contact" className="btn btn-primary">Talk to our team <ArrowRight size={17} /></Link>
              <Link to="/services" className="btn btn-secondary">Explore the platform</Link>
            </div>
            <ul className="trust-list">
              <li><CheckCircle2 size={16} /> One connected workspace</li>
              <li><CheckCircle2 size={16} /> Built around your team</li>
            </ul>
          </motion.div>

          <motion.div
            className="home-art"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <div className="home-art-backdrop" />
            <div className="home-art-window">
              <div className="home-art-toolbar">
                <span /><span /><span />
                <b>NovaBusiness workspace</b>
              </div>
              <div className="home-art-body">
                <div className="home-art-sidebar"><i /><i /><i /><i /></div>
                <div className="home-art-main">
                  <div className="home-art-title"><span>Good morning, team</span><strong>Business overview</strong></div>
                  <div className="home-art-stat-row"><i /><i /><i /></div>
                  <div className="home-art-graph">
                    <span /><span /><span /><span /><span /><span /><span /><span />
                  </div>
                  <div className="home-art-records"><i /><i /><i /></div>
                </div>
              </div>
            </div>
            <div className="home-art-note note-leads"><Users size={17} /><span>Leads organized</span></div>
            <div className="home-art-note note-bookings"><CalendarDays size={17} /><span>Bookings in sync</span></div>
          </motion.div>
        </div>
      </section>

      <section className="shell platform-strip" aria-label="Platform capabilities">
        <span>Website</span>
        <span>CRM</span>
        <span>Content & SEO</span>
        <span>Appointments</span>
        <span>Client portal</span>
      </section>

      <FeaturedServicesSection />

      <section className="shell section-block alt-section">
        <SectionHeader
          eyebrow="How it works"
          title="A simple system for strategy, design and execution"
        />

        <div className="process-grid">
          {processSteps.map((step, index) => (
            <div className="process-step" key={step}>
              <span className="step-index">0{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <FeaturedProjectsSection />
      <FeaturedTestimonialsSection />

      <section className="shell section-block">
        <SectionHeader
          eyebrow="Simple pricing"
          title="Choose the level of support and scale you need"
        />

        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article key={plan.name} className={`card pricing-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured ? <span className="plan-badge">Most popular</span> : null}
              <h3>{plan.name}</h3>
              <div className="price-row"><strong>{plan.price}</strong></div>
              <p>{plan.description}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}><CheckCircle2 size={14} /> {feature}</li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-primary">Get started</Link>
            </article>
          ))}
        </div>
      </section>

      <LatestArticlesSection />

      <section className="shell section-block faq-section">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions teams usually ask before they commit"
        />

        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div key={item} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <span>{item}</span>
                <ChevronRight size={18} />
              </button>
              <div className="faq-answer">
                <p>
                  NovaBusiness includes the full website, modular dashboard system, CRM, booking engines, and automation layers needed for strong operational control and consistent customer experience.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="shell cta-banner">
        <div>
          <span className="eyebrow">Ready to design your next growth engine?</span>
          <h3>Launch a platform that looks premium and performs like a business machine.</h3>
        </div>
        <Link to="/booking" className="btn btn-primary">Book an appointment</Link>
      </section>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-banner">
        <div className="shell about-banner-inner">
          <div>
            <span className="about-kicker">NovaBusiness / Company</span>
            <h1>Company overview</h1>
          </div>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>About us</span>
          </nav>
        </div>
      </section>

      <section className="shell about-content">
        <div className="about-proof">
          <div className="proof-intro">
            <span className="section-label">ABOUT NOVABUSINESS</span>
            <h2>One connected platform for your business to move forward.</h2>
          </div>
          <div className="proof-stat">
            <strong>CRM</strong>
            <span>Lead workflows</span>
          </div>
          <div className="proof-stat">
            <strong>CMS</strong>
            <span>Content management</span>
          </div>
          <div className="proof-stat">
            <strong>Portal</strong>
            <span>Client collaboration</span>
          </div>
        </div>

        <section className="about-overview">
          <div className="about-visual" aria-label="NovaBusiness platform dashboard illustration">
            <div className="about-visual-shape" />
            <div className="about-dashboard-window">
              <div className="window-bar"><span /><span /><span /><b>Business overview</b></div>
              <div className="window-body">
                <div className="window-sidebar"><i /><i /><i /><i /></div>
                <div className="window-content">
                  <div className="window-welcome">Your business, in sync.</div>
                  <div className="window-kpis"><i /><i /><i /></div>
                  <div className="window-chart"><span /><span /><span /><span /><span /><span /><span /></div>
                </div>
              </div>
            </div>
            <div className="about-float-card"><CheckCircle2 size={17} /><span>Everything connected</span></div>
          </div>
          <div className="about-copy">
            <span className="section-label">WHAT WE DO</span>
            <h2>Complete web and digital business solutions.</h2>
            <p>
              NovaBusiness brings your website, leads, content, appointments and client work together in one thoughtfully designed platform. We help teams replace scattered tools with clear workflows and a consistent customer experience.
            </p>
            <p>
              From a first inquiry to a project milestone, every interaction has a place. Your team can focus on doing great work while the platform keeps the details organized.
            </p>
            <Link to="/services" className="about-link">Explore our services <ArrowRight size={17} /></Link>
          </div>
        </section>

        <section className="about-team-strip">
          <div>
            <span className="section-label">BUILT AROUND YOUR TEAM</span>
            <h2>Clear roles. Shared progress. Better work together.</h2>
          </div>
          <p>
            Give administrators, managers, editors, employees and clients the right tools and access for their role—without losing sight of the bigger picture.
          </p>
          <div className="role-list">
            <span><Shield size={16} /> Role-based access</span>
            <span><Users size={16} /> Team workflows</span>
            <span><MessageSquareText size={16} /> Client collaboration</span>
          </div>
        </section>

        <section className="about-capabilities">
          <div className="capabilities-heading">
            <span className="section-label">ONE PLATFORM, CONNECTED</span>
            <h2>Everything your business needs to stay in motion.</h2>
          </div>
          <div className="capabilities-grid">
            {[
              { icon: Monitor, title: 'Web experiences', text: 'Responsive public pages designed to explain your value and turn visits into inquiries.' },
              { icon: Briefcase, title: 'Lead management', text: 'Keep customer details, follow-ups and pipeline activity organized for your team.' },
              { icon: FileText, title: 'Content & SEO', text: 'Manage services, articles and search metadata from a central content workspace.' },
              { icon: CalendarDays, title: 'Appointments & portal', text: 'Coordinate bookings and give clients a clear place to follow project progress.' }
            ].map(({ icon: Icon, title, text }, index) => (
              <article className="capability-item" key={title}>
                <span className="capability-number">0{index + 1}</span>
                <div className="capability-icon"><Icon size={21} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link to="/services" aria-label={`Learn about ${title}`}><ArrowRight size={18} /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="about-cta">
          <div>
            <span className="section-label">LET’S BUILD SOMETHING BETTER</span>
            <h2>Ready to bring your business into one connected workspace?</h2>
          </div>
          <Link to="/contact" className="btn btn-primary">Talk to our team <ArrowRight size={17} /></Link>
        </section>
      </section>
    </main>
  );
}

function ServicesPage() {
  const { items, error, loading } = usePublicItems();
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...new Set(items.map((service) => service.category).filter(Boolean))];
  const filteredServices = useMemo(
    () => activeCategory === 'All' ? items : items.filter((service) => service.category === activeCategory),
    [activeCategory, items]
  );

  return (
    <div className="shell page-shell">
      <SectionHeader
        eyebrow="Services"
        title="Digital services configured for your business"
        text="Browse services currently published in the NovaBusiness content workspace."
      />

      <div className="filter-row">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={category === activeCategory ? 'filter-chip active' : 'filter-chip'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {error ? <p className="form-message" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading published services…</p> : null}
      {!loading && !error && !filteredServices.length ? <p className="dashboard-empty">No services in this category have been published yet.</p> : null}
      {filteredServices.length ? <div className="service-grid large-grid">{filteredServices.map((service) => <ServiceCard key={service._id} service={service} />)}</div> : null}
    </div>
  );
}

function ServiceDetailsPage() {
  return <div className="shell page-shell"><p className="dashboard-empty" role="status">Service details need a backend content source in this frontend-only version.</p></div>;
}

function BlogPage() {
  const { items, error, loading } = usePublicItems();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const categories = ['All', ...new Set(items.map((item) => item.category).filter(Boolean))];
  const filteredItems = items.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const query = search.trim().toLowerCase();
    return matchesCategory && (!query || `${item.title} ${item.excerpt} ${(item.tags || []).join(' ')}`.toLowerCase().includes(query));
  });
  const pageCount = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const pageItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="shell page-shell">
      <SectionHeader
        eyebrow="Insights & ideas"
        title="Ideas and guidance from the NovaBusiness team"
      />
      <label className="blog-search">
        <Search size={18} />
        <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search published articles" />
      </label>
      <div className="filter-row">
        {categories.map((item) => (
          <button type="button" className={`filter-chip ${category === item ? 'active' : ''}`} key={item} onClick={() => { setCategory(item); setPage(1); }}>
            {item}
          </button>
        ))}
      </div>
      {error ? <p className="form-message" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading articles…</p> : null}
      {!loading && !error && !pageItems.length ? <p className="dashboard-empty">No published articles match your search.</p> : null}
      <div className="blog-grid large-grid">
        {pageItems.map((post) => (
          <article className="card blog-card full-size" key={post.title}>
            <span>{post.category || 'Insights'}</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div className="blog-meta">
              <span>{post.authorId?.name || 'NovaBusiness'} · {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</span>
              <Link to={`/blog/${post.slug}`}>Read more <ArrowRight size={16} /></Link>
            </div>
          </article>
        ))}
      </div>
      {pageCount > 1 ? (
        <div className="pagination">
          <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span>Page {page} of {pageCount}</span>
          <button type="button" disabled={page === pageCount} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      ) : null}
    </div>
  );
}

function BlogDetailsPage() {
  return <div className="shell page-shell"><p className="dashboard-empty" role="status">Article details need a backend content source in this frontend-only version.</p></div>;
}

function PricingPage() {
  return (
    <div className="shell page-shell">
      <SectionHeader
        eyebrow="Pricing"
        title="Flexible packages for modern teams"
      />
      <div className="pricing-grid">
        {pricingPlans.map((plan) => (
          <article key={plan.name} className={`card pricing-card ${plan.featured ? 'featured' : ''}`}>
            {plan.featured ? <span className="plan-badge">Most popular</span> : null}
            <h3>{plan.name}</h3>
            <div className="price-row"><strong>{plan.price}</strong></div>
            <p>{plan.description}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}><CheckCircle2 size={14} /> {feature}</li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn-primary">Choose {plan.name}</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('Frontend-only version: this inquiry was not sent. Connect a backend to receive submissions.');
  }

  return (
    <div className="shell page-shell">
      <SectionHeader
        eyebrow="Contact us"
        title="Tell us what you want the next version of your business to look and feel like"
      />
      <div className="contact-grid">
        <div className="card contact-card">
          <div className="contact-item"><Mail size={18} /><div><strong>Send an inquiry</strong><span>Use the secure form to reach our team.</span></div></div>
          <div className="contact-item"><Phone size={18} /><div><strong>Project consultation</strong><span>Request a call through the booking form.</span></div></div>
          <div className="contact-item"><Globe size={18} /><div><strong>Remote-ready</strong><span>Discuss your project from anywhere.</span></div></div>
        </div>
        <form className="card form-card" onSubmit={handleSubmit}>
          <div className="field-row two-up">
            <label>
              <span>Name</span>
              <input type="text" name="name" placeholder="Your name" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
            </label>
          </div>
          <div className="field-row two-up">
            <label>
              <span>Company</span>
              <input type="text" name="company" placeholder="Company name" autoComplete="organization" />
            </label>
            <label>
              <span>Service</span>
              <select name="service" defaultValue="">
                <option value="" disabled>Select service</option>
                <option>Website design</option>
                <option>CRM & dashboards</option>
                <option>Booking portal</option>
                <option>SEO & content</option>
              </select>
            </label>
          </div>
          <label>
            <span>Project details</span>
            <textarea name="message" rows="5" placeholder="Tell us about your requirements, goals and current challenges." required />
          </label>
          <label>
            <span>Phone (optional)</span>
            <input type="tel" name="phone" placeholder="Your phone number" autoComplete="tel" />
          </label>
          {message ? <p className="form-message" role="status">{message}</p> : null}
          <button type="submit" className="btn btn-primary full-width">Send inquiry</button>
        </form>
      </div>
    </div>
  );
}

function BookingPage() {
  const [service, setService] = useState('Website design');
  const [date, setDate] = useState(() => {
    const future = new Date();
    future.setDate(future.getDate() + 2);
    return `${future.getFullYear()}-${String(future.getMonth() + 1).padStart(2, '0')}-${String(future.getDate()).padStart(2, '0')}`;
  });
  const [time, setTime] = useState('10:30 AM');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('Frontend-only version: this booking was not sent. Connect a backend to receive booking requests.');
  }

  return (
    <div className="shell page-shell">
      <SectionHeader
        eyebrow="Book an appointment"
        title="Choose a service and schedule a consultation"
      />
      <div className="booking-grid">
        <form className="card form-card" onSubmit={handleSubmit}>
          <label>
            <span>Your name</span>
            <input type="text" name="name" autoComplete="name" placeholder="Your name" required />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label>
            <span>Phone (optional)</span>
            <input type="tel" name="phone" autoComplete="tel" placeholder="Your phone number" />
          </label>
          <label>
            <span>Service</span>
            <select value={service} onChange={(e) => setService(e.target.value)}>
              <option>Website design</option>
              <option>CRM & dashboards</option>
              <option>Booking portal</option>
              <option>SEO & content</option>
            </select>
          </label>
          <label>
            <span>Preferred date</span>
            <input type="date" min={new Date().toISOString().slice(0, 10)} value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>
          <label>
            <span>Preferred time</span>
            <select value={time} onChange={(e) => setTime(e.target.value)}>
              <option>10:30 AM</option>
              <option>12:00 PM</option>
              <option>2:00 PM</option>
              <option>4:30 PM</option>
            </select>
          </label>
          {message ? <p className="form-message" role="status">{message}</p> : null}
          <button type="submit" className="btn btn-primary full-width">Confirm booking</button>
        </form>

        <div className="card booking-summary">
          <h3>Consultation summary</h3>
          <ul>
            <li><span>Service</span><strong>{service}</strong></li>
            <li><span>Date</span><strong>{date}</strong></li>
            <li><span>Time</span><strong>{time}</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function AuthPage() {
  const [mode, setMode] = useState('login');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('Sign-in is unavailable in this frontend-only version. Connect a backend to authenticate users.');
  }

  return (
    <div className="shell auth-shell">
      <div className="auth-card">
        <div className="auth-panel brand-panel">
          <span className="eyebrow">Welcome</span>
          <h2>Manage your business from one place.</h2>
          <p>This frontend preview does not include user authentication.</p>
          <ul>
            <li><Shield size={18} /> Secure access requires a backend</li>
            <li><Users size={18} /> Team features are preview-only</li>
            <li><MessageSquareText size={18} /> No data is sent from this page</li>
          </ul>
        </div>
        <div className="auth-panel form-panel">
          <div className="auth-toggle">
            <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
            <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Register</button>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'register' ? (
              <label>
                <span>Full name</span>
                <input type="text" name="name" autoComplete="name" placeholder="Jane Doe" required />
              </label>
            ) : null}
            <label>
              <span>Email</span>
              <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                minLength={mode === 'register' ? 12 : 1}
                placeholder={mode === 'register' ? 'At least 12 characters' : 'Your password'}
                required
              />
            </label>
            {mode === 'register' ? <p className="auth-note">New accounts are created with customer access. An administrator can assign staff roles.</p> : null}
            {message ? <p className="form-message" role="alert">{message}</p> : null}
            <button type="submit" className="btn btn-primary full-width">{mode === 'login' ? 'Sign in' : 'Create account'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="shell page-shell dashboard-page">
      <SectionHeader
        eyebrow="Operations dashboard"
        title="One central workspace for leads, content, appointments and growth"
      />
      <div className="card list-card">
        <p className="dashboard-empty" role="status">
          Dashboard, leads, and appointments need a backend. This frontend-only version does not store or display business records.
        </p>
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="shell page-shell legal-page">
      <SectionHeader eyebrow="Privacy information" title="How this frontend-only preview handles data" />
      <div className="card legal-card">
        <p>This frontend-only preview does not send form submissions or store customer records. Connect and configure a backend before collecting or processing personal information.</p>
      </div>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="shell page-shell legal-page">
      <SectionHeader eyebrow="Terms & conditions" title="Service agreement and responsibilities" />
      <div className="card legal-card">
        <p>All deliverables, timelines and communications are governed by the agreed project scope and payment plan. Users are responsible for the information they provide, and NovaBusiness maintains a high standard of professional delivery, performance and support.</p>
      </div>
    </div>
  );
}

function FaqPage() {
  const [query, setQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState(0);
  const filteredQuestions = faqItems.filter((question) => question.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <div className="shell page-shell">
      <SectionHeader eyebrow="FAQ" title="Answers to common questions" text="Find quick guidance about the NovaBusiness platform and its workflows." />
      <label className="blog-search">
        <Search size={18} />
        <input value={query} onChange={(event) => { setQuery(event.target.value); setOpenQuestion(0); }} placeholder="Search questions" />
      </label>
      <div className="faq-list">
        {filteredQuestions.map((question, index) => (
          <div className={`faq-item ${openQuestion === index ? 'open' : ''}`} key={question}>
            <button type="button" onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)}>
              <span>{question}</span><ChevronRight size={18} />
            </button>
            <div className="faq-answer">
              <p>NovaBusiness brings public website content, lead management, appointments and client workflows into a shared platform. Contact our team for details specific to your project and configuration.</p>
            </div>
          </div>
        ))}
        {!filteredQuestions.length ? <p className="dashboard-empty">No questions match your search.</p> : null}
      </div>
    </div>
  );
}

function TestimonialsPage() {
  const { items, error, loading } = usePublicItems();
  return (
    <div className="shell page-shell">
      <SectionHeader eyebrow="Testimonials" title="Reviews from NovaBusiness clients" text="Only client reviews approved for publication are shown." />
      {error ? <p className="form-message" role="status">{error}</p> : null}
      {loading ? <p className="dashboard-empty" role="status">Loading approved reviews…</p> : null}
      {!loading && !error && !items.length ? <p className="dashboard-empty">No approved client reviews have been published yet.</p> : null}
      {items.length ? (
        <div className="testimonial-grid">
          {items.map((item) => (
            <article key={item._id} className="card testimonial-card">
              <div className="stars" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }).map((_, index) => <Star key={index} size={14} fill="currentColor" />)}
              </div>
              <p>{`“${item.review}”`}</p>
              <div className="person-row"><div className="avatar">{item.customerName.charAt(0)}</div><div><strong>{item.customerName}</strong><span>Verified client</span></div></div>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="shell page-shell not-found-page">
      <span className="section-label">404 / PAGE NOT FOUND</span>
      <h1>This page isn’t here.</h1>
      <p>The address may be outdated, or the page may have moved.</p>
      <Link to="/" className="btn btn-primary">Return home <ArrowRight size={17} /></Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="page-shell app-shell">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailsPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:slug" element={<ProjectDetailsPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/blog/:slug" element={<BlogDetailsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
