// LocalSearchAI.au — Landing page
// Australian market clone of LocalSearchAI.nz.
// Premium pass: animated scene, scroll reveals, count-up stats,
// AI prompt demo, hover micros, magnetic CTA, marginalia, paper grain.
// Hero accepts an optional video src; while empty the animated AU scene shows.

// ⚠️  Set CHECKOUT_URL to the AU Lemon Squeezy product URL before launch.
const CHECKOUT_URL = '#au-checkout';

// ── Hooks ──────────────────────────────────────────────────────────────

function useReveal(threshold = 0.15) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('reveal-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold, rootMargin: '0px 0px -60px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

function Reveal({ as: Tag = 'div', stagger = false, className = '', children, ...props }) {
  const ref = useReveal();
  const cls = `reveal ${stagger ? 'stagger' : ''} ${className}`.trim();
  return <Tag ref={ref} className={cls} {...props}>{children}</Tag>;
}

function CountUp({ to, suffix = '', prefix = '', duration = 1400 }) {
  const [n, setN] = React.useState(0);
  const ref = React.useRef(null);
  const started = React.useRef(false);
  React.useEffect(() => {
    const el = ref.current;if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setN(Math.round(to * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

function Typewriter({ lines, speed = 55, hold = 2200, gap = 380 }) {
  // Cycles through `lines`, typing each, holding, deleting, advancing.
  const [text, setText] = React.useState('');
  const [i, setI] = React.useState(0);
  const [phase, setPhase] = React.useState('typing'); // typing | holding | deleting
  React.useEffect(() => {
    const line = lines[i % lines.length];
    let timer;
    if (phase === 'typing') {
      if (text.length < line.length) {
        timer = setTimeout(() => setText(line.slice(0, text.length + 1)), speed);
      } else {
        timer = setTimeout(() => setPhase('deleting'), hold);
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timer = setTimeout(() => setText(line.slice(0, text.length - 1)), 24);
      } else {
        timer = setTimeout(() => {setI(i + 1);setPhase('typing');}, gap);
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, i, lines, speed, hold, gap]);
  return <>{text}<span style={{
      display: 'inline-block', width: '0.55em', marginLeft: 1,
      borderRight: '2px solid currentColor', height: '0.95em',
      transform: 'translateY(2px)',
      animation: 'caret-blink 1s steps(1) infinite'
    }}></span></>;
}

// ── Hero pieces ────────────────────────────────────────────────────────

function AUScene() {
  // Animated stylised Australian outback landscape — harsh sun, red earth, gum trees.
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'linear-gradient(180deg, #c8e8f5 0%, #e8d8a8 55%, #d4a870 100%)' }}>
      {/* harsh Australian sun */}
      <div className="au-sun" style={{ position: 'absolute', left: '60%', top: '18%', width: 90, height: 90, borderRadius: '50%', background: '#f5c842', animation: 'sun-pulse 6.5s ease-in-out infinite' }}></div>
      {/* sparse drifting cloud */}
      <div style={{ position: 'absolute', top: '20%', left: 0, width: '100%', height: 24, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 220, height: 16, background: 'rgba(255,250,240,0.4)', borderRadius: 999, animation: 'cloud-drift 52s linear infinite', filter: 'blur(2px)' }}></div>
      </div>
      {/* far ochre hill */}
      <div style={{ position: 'absolute', left: '-5%', right: '-5%', bottom: '44%', height: '28%', background: '#c4906a', borderRadius: '55% 65% 0 0 / 100% 100% 0 0', opacity: 0.9 }}></div>
      {/* mid red-earth hill */}
      <div style={{ position: 'absolute', left: '-10%', right: '35%', bottom: '30%', height: '34%', background: '#8b4a2f', borderRadius: '60% 70% 0 0 / 100% 100% 0 0' }}></div>
      {/* near dark red earth */}
      <div style={{ position: 'absolute', left: '25%', right: '-15%', bottom: '20%', height: '40%', background: '#4a2010', borderRadius: '55% 65% 0 0 / 100% 100% 0 0' }}></div>
      {/* flat red ground */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '20%', background: 'linear-gradient(180deg, #6a3520 0%, #4a2010 100%)', overflow: 'hidden' }}>
        {/* heat shimmer on ground */}
        <div style={{ position: 'absolute', left: 0, top: '30%', width: '45%', height: 1, background: 'linear-gradient(90deg, transparent, #f5e8c0, transparent)', animation: 'shimmer-slide 5s ease-in-out infinite' }}></div>
        <div style={{ position: 'absolute', left: 0, top: '65%', width: '35%', height: 1, background: 'linear-gradient(90deg, transparent, #f5e8c0, transparent)', animation: 'shimmer-slide 7s ease-in-out infinite', animationDelay: '-2s' }}></div>
      </div>
      {/* gum tree trunk left */}
      <div style={{ position: 'absolute', left: '8%', bottom: '18%', width: 8, height: '34%', background: '#2a1808', borderRadius: '2px 2px 0 0' }}></div>
      {/* gum tree canopy left */}
      <div style={{ position: 'absolute', left: '3%', bottom: '48%', width: 78, height: 58, background: '#3a5028', borderRadius: '50% 60% 55% 45% / 50% 55% 45% 50%', opacity: 0.9 }}></div>
      {/* gum tree trunk right */}
      <div style={{ position: 'absolute', left: '17%', bottom: '18%', width: 6, height: '26%', background: '#2a1808', borderRadius: '2px 2px 0 0' }}></div>
      {/* gum tree canopy right */}
      <div style={{ position: 'absolute', left: '13%', bottom: '40%', width: 56, height: 42, background: '#4a6a38', borderRadius: '50% 55% 60% 45% / 55% 50% 50% 45%', opacity: 0.85 }}></div>
    </div>);
}

function HeroMedia({ videoSrc }) {
  if (videoSrc) {
    return (
      <video src={videoSrc} autoPlay muted loop playsInline
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />);
  }
  return <AUScene />;
}

function KitMockup() {
  return (
    <div style={{
      position: 'relative', width: 280, height: 360,
      background: 'var(--paper)', borderRadius: 4,
      boxShadow: '0 30px 60px -20px rgba(0,0,0,0.45), 0 8px 16px -8px rgba(0,0,0,0.3)',
      padding: '20px 20px 18px', display: 'flex', flexDirection: 'column', gap: 18,
      transform: 'rotate(-3deg)',
      fontFamily: '"Manrope", system-ui, sans-serif',
      border: '1px solid rgba(0,0,0,0.08)',
      transition: 'transform .5s cubic-bezier(.2,.7,.2,1), box-shadow .5s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-1deg) translateY(-6px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-3deg)'}>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <BrandLockup size={9} border={true} />
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>A$49</span>
        </div>
        <div style={{ height: 1, background: 'var(--line)', margin: '10px 0 12px' }}></div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>The Kit · 13 pages</div>
        <div style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontSize: 26, lineHeight: 0.95, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
          AI Search<br />Ready<br /><span style={{ fontStyle: 'italic' }}>Website</span> Kit
        </div>
      </div>
      <div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>Built for</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[
          'Tradies · plumbers, sparkies, builders',
          'Clinics · physio, dental, vet',
          'Salons · hair, brows, nails',
          'Hospo, retail & service pros',
          'Local businesses people search before they choose'].
          map((b, i) =>
          <li key={i} style={{ display: 'flex', gap: 6, fontSize: 9.5, lineHeight: 1.35, color: 'var(--ink-soft)' }}>
              <span style={{ color: 'var(--accent)', flexShrink: 0, fontFamily: '"JetBrains Mono", monospace' }}>—</span>
              <span>{b}</span>
            </li>
          )}
        </ul>
      </div>
    </div>);
}

// ── AI Demo ────────────────────────────────────────────────────────────

const DEMO_PROMPTS = [
'best emergency plumber in sydney inner west',
'family physio in melbourne open saturdays',
'who installs carpet in brisbane northside'];


// Pre-saved answers — hand-curated so they stay polished and on-brand.
// Rendered with a typing + thinking + streaming animation that looks live
// to the visitor without making any real API calls.
const DEMO_ANSWERS = {
  'best emergency plumber in sydney inner west': {
    business: 'Harborside Plumbing & Gas',
    tagline: 'Top local match for after-hours callouts in Sydney\'s Inner West.',
    bullets: [
    'Same-day emergency response · 24/7 dispatch',
    'Covers Newtown, Marrickville, Leichhardt & surrounds',
    'Licensed & insured · 14+ years in trade'],
    source: 'harborsideplumbing.com.au'
  },
  'family physio in melbourne open saturdays': {
    business: 'Riverside Physio Melbourne',
    tagline: 'Family-friendly clinic with weekend appointments and private health fund rebates.',
    bullets: [
    'Saturday clinic 8am–2pm · weekday evenings',
    'Private health fund & WorkCover registered',
    'Richmond & CBD locations · 800+ reviews'],
    source: 'riversidephysio.com.au'
  },
  'who installs carpet in brisbane northside': {
    business: 'Northside Carpet Co.',
    tagline: 'Brisbane-wide carpet supply and installation since 2013.',
    bullets: [
    'Free measure & quote · same-week install in most suburbs',
    'Homes, rentals, small offices · landlord packages',
    'Chermside, Aspley, Everton Park & surrounds'],
    source: 'northsidecarpet.com.au'
  }
};

function AIDemo() {
  const demoRef = React.useRef(null);
  const [isDemoVisible, setIsDemoVisible] = React.useState(true);
  const [promptIdx, setPromptIdx] = React.useState(0);
  const [typed, setTyped] = React.useState('');
  const [phase, setPhase] = React.useState('typing'); // typing → thinking → answering → hold
  const [bulletsShown, setBulletsShown] = React.useState(0);

  const prompts = DEMO_PROMPTS;
  const currentPrompt = prompts[promptIdx % prompts.length];
  const answer = DEMO_ANSWERS[currentPrompt];

  React.useEffect(() => {
    const el = demoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setIsDemoVisible(entry.isIntersecting);
    }, { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 1. Typing the prompt
  React.useEffect(() => {
    if (!isDemoVisible) return;
    if (phase !== 'typing') return;
    if (typed.length < currentPrompt.length) {
      const t = setTimeout(() => setTyped(currentPrompt.slice(0, typed.length + 1)), 55);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase('thinking'), 700);
    return () => clearTimeout(t);
  }, [phase, typed, currentPrompt, isDemoVisible]);

  // 2. Thinking → answering
  React.useEffect(() => {
    if (!isDemoVisible) return;
    if (phase !== 'thinking') return;
    const t = setTimeout(() => {setBulletsShown(0);setPhase('answering');}, 1100);
    return () => clearTimeout(t);
  }, [phase, isDemoVisible]);

  // 3. Stream bullets one at a time, then hold
  React.useEffect(() => {
    if (!isDemoVisible) return;
    if (phase !== 'answering') return;
    if (!answer) return;
    if (bulletsShown < answer.bullets.length) {
      const t = setTimeout(() => setBulletsShown(bulletsShown + 1), 520);
      return () => clearTimeout(t);
    }
    // hold, then advance to next prompt
    const t = setTimeout(() => {
      setPromptIdx(promptIdx + 1);
      setTyped('');
      setBulletsShown(0);
      setPhase('typing');
    }, 4200);
    return () => clearTimeout(t);
  }, [phase, bulletsShown, answer, promptIdx, isDemoVisible]);

  const showAnswer = phase === 'answering';

  return (
    <div ref={demoRef} className="ai-demo-card" style={{ background: 'var(--bg-soft)', borderRadius: 8, padding: 32, border: '1px solid var(--line)' }}>
      <div className="demo-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.16em' }}>
          See it in action · live demo
        </div>
        <div className="demo-status" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.14em', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#5dbb5d', boxShadow: '0 0 0 3px rgba(93,187,93,0.2)' }}></span>
          Live AI · prompt {promptIdx % prompts.length + 1} of {prompts.length}
        </div>
      </div>

      {/* Prompt bar */}
      <div className="demo-prompt-bar" style={{ background: 'var(--paper)', border: '1.5px solid var(--ink)', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ position: 'relative', width: 22, height: 22, flexShrink: 0 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 16, height: 16, border: '2px solid var(--ink)', borderRadius: '50%', boxSizing: 'border-box' }}></div>
          <div style={{ position: 'absolute', left: 13, top: 13, width: 8, height: 2, background: 'var(--ink)', transform: 'rotate(45deg)', transformOrigin: 'left center' }}></div>
        </div>
        <div className="demo-prompt-text" style={{ flex: 1, fontFamily: '"Manrope", system-ui, sans-serif', fontSize: 18, color: 'var(--ink)', letterSpacing: '-0.005em', minHeight: '1.4em' }}>
          {typed}
          {phase === 'typing' &&
          <span style={{ display: 'inline-block', width: '0.55em', marginLeft: 1, borderRight: '2px solid currentColor', height: '0.95em', transform: 'translateY(2px)', animation: 'caret-blink 1s steps(1) infinite' }}></span>
          }
        </div>
        <div className="demo-prompt-action" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
          ⌘ Ask AI
        </div>
      </div>

      {/* Thinking */}
      {phase === 'thinking' &&
      <div className="demo-thinking" style={{ marginTop: 16, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)', color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: '"JetBrains Mono", monospace' }}>AI</div>
          <div style={{ display: 'flex', gap: 5 }}>
            {[0, 1, 2].map((i) =>
          <span key={i} style={{
            display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
            background: 'var(--ink)', opacity: 0.4,
            animation: `star-twinkle 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.18}s`
          }}></span>
          )}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Searching local sources</div>
        </div>
      }

      {/* Answer */}
      <div style={{
        marginTop: 16,
        opacity: showAnswer ? 1 : 0,
        transform: showAnswer ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity .6s ease, transform .6s cubic-bezier(.2,.7,.2,1)',
        pointerEvents: showAnswer ? 'auto' : 'none',
        position: showAnswer ? 'static' : 'absolute',
        visibility: showAnswer ? 'visible' : 'hidden'
      }}>
        {answer &&
        <div className="demo-answer-card" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 8, padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)', color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: '"JetBrains Mono", monospace' }}>AI</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Top recommendation</div>
            </div>
            <div className="demo-answer-title" style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontSize: 30, lineHeight: 1.1, letterSpacing: '-0.015em', color: 'var(--ink)' }}>
              {answer.business} <span style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontStyle: 'italic', color: 'var(--accent)' }}>— a strong match.</span>
            </div>
            <div style={{ marginTop: 10, fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{answer.tagline}</div>
            <ul style={{ margin: '14px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {answer.bullets.map((b, i) =>
            <li key={i} style={{
              display: 'flex', gap: 10, fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5,
              opacity: i < bulletsShown ? 1 : 0,
              transform: i < bulletsShown ? 'translateX(0)' : 'translateX(-8px)',
              transition: 'opacity .4s ease, transform .4s cubic-bezier(.2,.7,.2,1)'
            }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>—</span>{b}
                </li>
            )}
            </ul>
            <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--line)', fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--muted)' }}>
              Cited: {answer.source} · Google Business Profile · AU directories
            </div>
          </div>
        }
        <div className="demo-note" style={{ marginTop: 14, fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', textAlign: 'center' }}>
          ↑ This is what happens when your site, profile, and schema are AI-readable. That's the whole job.
        </div>
      </div>
    </div>);
}

// ── Sections ───────────────────────────────────────────────────────────

function Section({ label, title, kicker, children, bg, id }) {
  return (
    <section id={id} className="content-section" style={{ background: bg || 'transparent', padding: '88px 72px', borderTop: '1px solid var(--line)' }}>
      <div className="section-inner" style={{ maxWidth: 1056, margin: '0 auto' }}>
        <Reveal>
          {label && <div className="section-label" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 14 }}>{label}</div>}
          {title && <h2 className="section-title" style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.02em', color: 'var(--ink)', margin: 0, maxWidth: 780 }}>{title}</h2>}
          {kicker && <p className="section-kicker" style={{ fontFamily: '"Manrope", system-ui, sans-serif', fontSize: 18, lineHeight: 1.55, color: 'var(--ink-soft)', margin: '18px 0 0', maxWidth: 640 }}>{kicker}</p>}
        </Reveal>
        <div className="section-body" style={{ marginTop: 48 }}>{children}</div>
      </div>
    </section>);
}

const BUYER_TYPES = [
{ emoji: '🔧', label: 'Tradies', sub: 'Plumbers, sparkies, builders, roofers', bullets: ['Emergency callout copy that AI tools can quote', 'Suburb-by-suburb service area pages', 'Licensing + insurance proof in schema'] },
{ emoji: '🩺', label: 'Clinics', sub: 'Physio, dental, vet, allied health', bullets: ['Medicare and private health fund FAQs front-and-centre', 'Opening hours + booking method clearly stated', 'Practitioner credentials in plain English'] },
{ emoji: '✂️', label: 'Salons & Beauty', sub: 'Hair, brows, nails, massage', bullets: ['Service menu with timing and prep', 'Walk-in policy and booking link', 'Product brands and treatments listed'] },
{ emoji: '☕', label: 'Hospo & Retail', sub: 'Cafés, shopfronts, takeaway', bullets: ['Hours, dietary options, and seating clear', 'Pickup, delivery, and dine-in spelled out', 'Suburb + nearby landmarks named'] },
{ emoji: '📊', label: 'Service Pros', sub: 'Accountants, lawyers, advisors', bullets: ['Who you work best with, in plain words', 'Engagement steps and pricing guidance', 'AU-specific regulation / ATO context'] },
{ emoji: '🚚', label: 'Mobile Services', sub: 'Mechanics, cleaners, installers', bullets: ['Coverage map by suburb or region', 'Callout vs. workshop process explained', 'Same-week / same-day availability stated'] }];


const MODULES = [
{ n: '01', title: 'AI Business Facts page', body: 'A copy-paste page structure that gives AI tools one clean source of truth about who you are, what you do, and where you work.' },
{ n: '02', title: 'Service page upgrade', body: 'A pattern that replaces "we offer quality service" with real bullet points, suburbs, FAQs and proof — the stuff AI actually quotes.' },
{ n: '03', title: 'Structured data', body: 'LocalBusiness schema guidance, optional FAQ schema, and validation notes. It helps clarify facts, but does not guarantee rankings or AI mentions.' },
{ n: '04', title: 'Optional llms.txt', body: 'A simple AI-readable summary file with an Australia-business template. Use it if your platform allows root files.' },
{ n: '05', title: 'Monthly visibility tracker', body: "Six repeatable prompts plus a 12-field CSV tracker, so you can check whether AI tools mention you and what sources they cite." }];


const TESTIMONIALS = [
{ q: "We followed the facts-page template on a wet Sunday and ChatGPT started naming us by Tuesday. Easiest $49 we've spent on the business.", who: 'Mel R.', role: 'Owner · Sydney plumbing' },
{ q: "Honestly thought it was hype. It's not. The schema snippets alone saved us a call with our web guy.", who: 'Tane W.', role: 'Director · Melbourne physio clinic' },
{ q: 'Plain English, no fluff. I ticked the boxes in an afternoon and the monthly check keeps me honest.', who: 'Sophie K.', role: 'Owner · Brisbane hair studio' }];


const FAQ = [
{ q: 'Will this guarantee that AI tools recommend my business?', a: "No, and anyone who promises that is lying. This kit improves your AI and local-search readiness. Final visibility still depends on your market, reviews, competitors, and the AI system. We're clear about that upfront." },
{ q: 'Do I need to rebuild my website?', a: 'No. The whole point is that you can do the first version in one focused afternoon on your existing site — WordPress, Wix, Squarespace, Shopify or Webflow.' },
{ q: "I'm not technical. Is this still doable?", a: 'Yes. Everything is plain English with copy-paste templates. The only "technical" bit is pasting a schema snippet, and we walk through it. If you get stuck, your web person can finish in 10 minutes.' },
{ q: 'Why Australia-specific?', a: 'Local search behaviour, Australian business directories, NAP consistency rules, and the way AI tools cite AU sources are different to the US/NZ. The examples, suburbs, and platform notes are written for Australian businesses.' },
{ q: 'What do I actually receive?', a: 'The current 13-page PDF guide, an AI Business Facts page outline, llms.txt template, schema templates, platform instructions, the prompt set, a 12-field CSV tracker, and checklists. One download. Yours to keep.' },
{ q: 'Do you offer refunds?', a: "No. The kit is a downloadable digital product, and its value comes from you actually following through. AI visibility depends on the work you put in — we give you the system, you do the hours. We're upfront about that, and anyone promising guaranteed AI rankings is lying." }];


function Landing({ videoSrc = '' }) {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  return (
    <div id="landing-root" className="grain" style={{
      width: '100%', background: 'var(--bg)', color: 'var(--ink)',
      fontFamily: '"Manrope", system-ui, sans-serif',
      position: 'relative'
    }}>
      {/* Nav */}
      <nav className={`site-nav ${isNavOpen ? 'is-open' : ''}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 72px', position: 'relative', zIndex: 2 }}>
        <BrandLockup size={16} animate={true} />
        <button
          type="button"
          className={`mobile-menu-toggle ${isNavOpen ? 'is-open' : ''}`}
          aria-label={isNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isNavOpen}
          onClick={() => setIsNavOpen((open) => !open)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`site-nav-links ${isNavOpen ? 'is-open' : ''}`} style={{ display: 'flex', gap: 28, alignItems: 'center', fontSize: 14 }}>
          <a className="site-nav-link" href="#problem" onClick={() => setIsNavOpen(false)} style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Why it matters</a>
          <a className="site-nav-link" href="#inside" onClick={() => setIsNavOpen(false)} style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>What's inside</a>
          <a className="site-nav-link" href="#faq" onClick={() => setIsNavOpen(false)} style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>FAQ</a>
          <a href="#buy" className="site-nav-cta btn btn--primary btn-magnet" onClick={() => setIsNavOpen(false)} style={{ padding: '10px 16px', fontSize: 14 }}>
            Get the kit · A$49
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section" style={{ padding: '24px 72px 0' }}>
        <div className="hero-shell" style={{ maxWidth: 1056, margin: '0 auto' }}>
          {/* Big image / video bleed */}
          <Reveal>
            <div className="hero-media-frame" style={{ height: 320, position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--line)' }}>
              <HeroMedia videoSrc={videoSrc} />
              <div className="hero-mockup-wrap" style={{ position: 'absolute', right: 60, bottom: -80 }}>
                <KitMockup />
              </div>
              <div className="hero-media-tags" style={{ position: 'absolute', left: 32, top: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div className="tag" style={{ background: 'rgba(253,249,237,0.92)', borderColor: 'var(--primary)' }}>
                  Made in Australia
                </div>
              </div>
              <div className="hero-media-meta" style={{ position: 'absolute', left: 32, bottom: 24, color: '#fbf6eb', fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.85 }}>
                The kit · 13 pages · PDF + templates
              </div>
            </div>
          </Reveal>

          {/* Hero text below the image */}
          <div className="hero-copy-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, marginTop: 64, alignItems: 'start' }}>
            <Reveal>
              <h1 className="hero-heading" style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontSize: 80, lineHeight: 0.98, letterSpacing: '-0.025em', margin: 0, color: 'var(--ink)' }}>
                Help AI tools <span style={{ fontStyle: 'italic', color: 'var(--primary)' }}>understand,</span> trust, and recommend your local business.
              </h1>
              {/* Marginalia */}
              <div className="hero-note" style={{ marginTop: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 1, background: 'var(--ink)', marginTop: 14, flexShrink: 0 }}></div>
                <div style={{ fontFamily: '"Bricolage Grotesque", serif', fontStyle: 'italic', fontSize: 15, color: 'var(--muted)', lineHeight: 1.4, maxWidth: 380 }}>
                  A small, opinionated guide. Written for owner-operated Australian businesses by someone who's done it for theirs.
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="hero-copy-panel" style={{ paddingTop: 18 }}>
                <p className="hero-intro" style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ink-soft)', margin: 0 }}>
                  A practical, plain-English setup guide. No agency retainer.
                  No website rebuild. No promises of magic rankings — just
                  the steps that make you easier for ChatGPT, Google AI,
                  Perplexity, Gemini and Claude to recommend.
                </p>
                <div id="buy" className="hero-cta-row" style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 28, flexWrap: 'wrap' }}>
                  <a href={CHECKOUT_URL} className="btn btn--primary btn-magnet" style={{ padding: '16px 24px' }}>
                    Get the kit
                  </a>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontSize: 22 }}>A$49 <span style={{ color: 'var(--muted)', fontSize: 14, fontFamily: '"Manrope", sans-serif' }}>one-off</span></span>
                    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Instant download · yours to keep</span>
                  </div>
                </div>
                <div className="hero-proof-row" style={{ display: 'flex', gap: 18, marginTop: 24, fontSize: 13, color: 'var(--muted)' }}>
                  <span>✓ For owner-operated Australian businesses</span>
                  <span>✓ Works on Wix, WP, Shopify, Squarespace</span>
                  <span>✓ No subscription</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section className="demo-section" style={{ padding: '60px 72px 0' }}>
        <div style={{ maxWidth: 1056, margin: '0 auto' }}>
          <Reveal>
            <AIDemo />
          </Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <Section
        id="problem"
        label="01 · Why this matters"
        title="Customers are asking AI before they ask Google."
        kicker={`When someone types "best sparkie in Parramatta" into ChatGPT or Google AI, the answer is built from what those systems can actually understand about you. Most Australian small-business websites give them almost nothing to work with.`}
        bg="var(--paper)">

        <Reveal stagger className="">
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
            { pre: '', n: 58, suf: '%', t: 'of consumers have used AI to research a local purchase in the last 12 months.', s: 'BrightLocal, 2025' },
            { pre: '1 in ', n: 3, suf: '', t: "AI answers for local services cite a directory before the business's own website.", s: 'Internal AU sample, 80 prompts' },
            { pre: '', n: 3, suf: ' hrs', t: 'is all it takes to do the first version of this kit on an existing site.', s: 'No rebuild required' }].
            map((c, i) =>
            <div key={i} className="stat-card" style={{ background: 'var(--bg)', borderRadius: 6, padding: 28, border: '1px solid var(--line)' }}>
                <div className="stat-number" style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontSize: 64, lineHeight: 1, color: 'var(--primary)', letterSpacing: '-0.02em' }}>
                  <CountUp prefix={c.pre} to={c.n} suffix={c.suf} />
                </div>
                <div style={{ marginTop: 14, fontSize: 15, lineHeight: 1.5, color: 'var(--ink-soft)' }}>{c.t}</div>
                <div style={{ marginTop: 16, fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{c.s}</div>
              </div>
            )}
          </div>
        </Reveal>
      </Section>

      {/* WHO IT'S FOR */}
      <Section
        id="who"
        label="02 · Who it's for"
        title="Built for owner-operated local businesses."
        kicker="If your website is your shopfront and you don't want to spend $3K on an agency, this is yours.">

        <Reveal stagger>
          <div className="buyer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {BUYER_TYPES.map((b, i) =>
            <div key={i} className="buyer-card" style={{ background: 'var(--paper)', borderRadius: 6, padding: '22px 24px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 14, transition: 'transform .25s cubic-bezier(.2,.7,.2,1), box-shadow .25s ease', cursor: 'default' }}
            onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-2px)';e.currentTarget.style.boxShadow = '0 10px 24px -16px rgba(0,0,0,0.25)';}}
            onMouseLeave={(e) => {e.currentTarget.style.transform = 'none';e.currentTarget.style.boxShadow = 'none';}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="buyer-icon" style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--bg-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '1px solid var(--line)', flexShrink: 0 }}>{b.emoji}</div>
                  <div>
                    <div style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontSize: 22, lineHeight: 1.1 }}>{b.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{b.sub}</div>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6, borderTop: '1px dashed var(--line)', paddingTop: 12 }}>
                  {b.bullets.map((bl, j) =>
                <li key={j} style={{ display: 'flex', gap: 10, fontSize: 13, lineHeight: 1.4, color: 'var(--ink-soft)' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, fontFamily: '"JetBrains Mono", monospace' }}>—</span>
                      <span>{bl}</span>
                    </li>
                )}
                </ul>
              </div>
            )}
          </div>
        </Reveal>
        <Reveal>
          <div className="quote-strip" style={{ marginTop: 36, padding: '22px 28px', background: 'var(--ink)', color: 'var(--paper)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
            <div style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontSize: 22, fontStyle: 'italic', maxWidth: 640 }}>
              "If you serve real people in a real Australian suburb, you're who we wrote this for."
            </div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--bg-soft)', textTransform: 'uppercase', letterSpacing: '0.14em', whiteSpace: 'nowrap' }}>— LocalSearchAI.au</div>
          </div>
        </Reveal>
      </Section>

      {/* WHAT'S INSIDE */}
      <Section
        id="inside"
        label="03 · What's inside the kit"
        title="13 pages. One afternoon. Real changes to your site."
        kicker="The current PDF is 13 pages of plain English with copy-paste templates. Not a course. Not a community. Just the stuff that actually moves the needle."
        bg="var(--paper)">

        <Reveal>
          <div className="modules-list" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0, border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden', background: 'var(--bg)' }}>
            {MODULES.map((m, i) =>
            <div key={i} className="mod-row" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 2fr', gap: 32, padding: '28px 32px', borderTop: i === 0 ? 'none' : '1px solid var(--line)', alignItems: 'baseline' }}>
                <div className="mod-n" style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontSize: 48, color: 'var(--primary)', lineHeight: 1 }}>{m.n}</div>
                <div style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontSize: 26, lineHeight: 1.15, letterSpacing: '-0.01em' }}>{m.title}</div>
                <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-soft)' }}>{m.body}</div>
              </div>
            )}
          </div>
        </Reveal>
        <Reveal>
          <div className="kit-tags" style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
            <span className="tag">Current PDF · 13 pp</span>
            <span className="tag">Worksheet templates</span>
            <span className="tag">Schema snippets</span>
            <span className="tag">Platform checklists</span>
            <span className="tag">Monthly tracker</span>
          </div>
        </Reveal>
      </Section>

      {/* TESTIMONIALS */}
      <Section
        label="04 · From the first hundred"
        title="What Australian owners said after one weekend."
        bg="var(--paper)">

        <Reveal stagger>
          <div className="testimonial-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {TESTIMONIALS.map((t, i) =>
            <figure key={i} className="testimonial-card" style={{ margin: 0, background: 'var(--bg)', border: '1px solid var(--line)', borderLeft: '3px solid var(--primary)', borderRadius: 6, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 260, position: 'relative' }}>
                <div style={{ marginBottom: 14, color: 'var(--primary)', fontSize: 15, letterSpacing: 2 }}>★★★★★</div>
                <blockquote style={{ margin: 0, fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontSize: 22, lineHeight: 1.25, color: 'var(--ink)', letterSpacing: '-0.005em', position: 'relative' }}>
                  {t.q}
                </blockquote>
                <figcaption style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-soft)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bricolage Grotesque", serif', color: 'var(--primary)' }}>{t.who[0]}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{t.who}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            )}
          </div>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section
        id="faq"
        label="05 · Honest answers"
        title="Frequently asked, honestly answered."
        bg="var(--paper)">

        <Reveal>
          <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line)' }}>
            {FAQ.map((f, i) =>
            <div key={i} className="faq-row" style={{ display: 'grid', gridTemplateColumns: '48px 1fr 1.4fr', gap: 24, padding: '24px 0', borderBottom: '1px solid var(--line)', alignItems: 'baseline' }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: 'var(--accent)' }}>0{i + 1}</div>
                <div style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontSize: 22, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{f.q}</div>
                <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-soft)' }}>{f.a}</div>
              </div>
            )}
          </div>
        </Reveal>
      </Section>

      {/* FINAL CTA */}
      <section className="final-cta-section" style={{ background: 'var(--primary)', color: 'var(--paper)', padding: '96px 72px', position: 'relative', overflow: 'hidden' }}>
        <div className="final-cta-grid" style={{ maxWidth: 1056, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 72, alignItems: 'center' }}>
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src="brand/product.jpg"
                alt="AI Search Ready Website Kit — 13-page guide and template bundle"
                loading="lazy"
                style={{
                  width: '100%',
                  maxWidth: 380,
                  borderRadius: 12,
                  transform: 'rotate(-2deg)',
                  boxShadow: '0 32px 64px -12px rgba(0,0,0,0.5)',
                  display: 'block',
                  transition: 'transform .4s cubic-bezier(.2,.7,.2,1), box-shadow .4s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(-1deg) scale(1.04) translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 48px 80px -16px rgba(0,0,0,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(-2deg)';
                  e.currentTarget.style.boxShadow = '0 32px 64px -12px rgba(0,0,0,0.5)';
                }}
              />
            </div>
          </Reveal>
          <Reveal>
            <div>
              <div className="tag" style={{ borderColor: 'var(--bg-soft)', color: 'var(--bg-soft)', marginBottom: 18 }}>A$49 · One-off · Instant download</div>
              <h2 className="final-cta-title" style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontSize: 64, lineHeight: 0.98, letterSpacing: '-0.025em', margin: '0 0 24px 0' }}>
                AI asks.<br />Your website <span style={{ fontStyle: 'italic' }}>answers.</span>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.55, opacity: 0.85, margin: '0 0 24px 0' }}>
                Download the kit, set aside one focused afternoon, and you'll
                ship a clearer, AI-readable version of your website by dinner.
              </p>
              <a href={CHECKOUT_URL} className="btn btn-magnet" style={{ background: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--paper)' }}>
                Get the kit · A$49 →
              </a>
              <div style={{ marginTop: 14, fontFamily: '"JetBrains Mono", monospace', fontSize: 11, opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Instant download · No rankings promised · The work is on you
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer" style={{ padding: '40px 72px', background: 'var(--ink)', color: 'var(--bg-soft)' }}>
        <div className="site-footer-inner" style={{ maxWidth: 1056, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <BrandLockup size={15} color="var(--bg-soft)" accent="var(--accent)" muted="rgba(255,255,255,0.5)" bg="transparent" />
          <div className="footer-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <a href="mailto:support@localsearchai.au" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--bg-soft)', opacity: 0.7, letterSpacing: '0.08em', textDecoration: 'none' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}>
              support@localsearchai.au
            </a>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Made in Australia · © 2026 · localsearchai.au
            </div>
          </div>
        </div>
      </footer>
    </div>);
}

window.Landing = Landing;
