// Shared brand lockup — LocalSearchAI.au, parameterisable.
// Search-bar pill with magnifier glyph + wordmark.
// Used in landing nav, PDF headers, footer, anywhere.
//
// animate=true: types the wordmark character-by-character on mount,
// with a blinking cursor — like someone searching for the brand.

function BrandLockup({size=18, color='var(--ink)', accent='var(--primary)', muted='var(--muted)', bg='var(--paper)', border=true, compact=false, animate=false}) {
  const FULL = 'localsearchai.au';
  //                             ^^^^^^^^^^^^ 11 chars
  //                                        ^^ 2 chars  (accent)
  //                                          ^^^ 3 chars (muted mono)

  const [typed, setTyped]           = React.useState(animate ? 0 : FULL.length);
  const [cursorOn, setCursorOn]     = React.useState(true);
  const [cursorActive, setCursorActive] = React.useState(animate);

  React.useEffect(() => {
    if (!animate) return;
    let n = 0;
    const blink = { id: null };

    // Start cursor blinking immediately
    blink.id = setInterval(() => setCursorOn(v => !v), 530);

    // Small pause before typing begins (feels more deliberate)
    const startTimer = setTimeout(() => {
      const typeTimer = setInterval(() => {
        n++;
        setTyped(n);
        if (n >= FULL.length) {
          clearInterval(typeTimer);
          // Blink a little after finished, then remove cursor
          setTimeout(() => {
            clearInterval(blink.id);
            setCursorActive(false);
          }, 1500);
        }
      }, 72); // ~72 ms per character → ~1.15 s total
    }, 480);

    return () => {
      clearTimeout(startTimer);
      clearInterval(blink.id);
    };
  }, []); // runs once on mount

  // Sizing helpers (unchanged from original)
  const padY = Math.round(size * 0.55);
  const padX = Math.round(size * 1.0);
  const dot = Math.round(size * 1.0);
  const lensSize = Math.round(size * 0.75);
  const lensBorder = Math.max(1.5, size * 0.11);
  const tail = Math.round(size * 0.45);

  // Colour-segment slices
  const seg0 = FULL.slice(0,  Math.min(typed, 11));  // 'localsearch'
  const seg1 = FULL.slice(11, Math.min(typed, 13));  // 'ai'
  const seg2 = FULL.slice(13, Math.min(typed, 16));  // '.au'

  // Cursor colour follows the segment currently being typed
  const cursorColor = typed >= 13 ? muted : typed >= 11 ? accent : color;

  return (
    <div style={{
      display:'inline-flex', alignItems:'center',
      border: border ? `${Math.max(1.5, size*0.09)}px solid ${color}` : 'none',
      borderRadius: 999,
      padding: border ? `${padY}px ${padX}px ${padY}px ${Math.round(padX*0.8)}px` : 0,
      gap: Math.round(size * 0.55),
      background: border ? bg : 'transparent',
      lineHeight: 1,
    }}>
      {/* Magnifier icon */}
      <div style={{position:'relative', width:dot, height:dot, flexShrink:0}}>
        <div style={{position:'absolute', left:0, top:0, width:lensSize, height:lensSize, border:`${lensBorder}px solid ${color}`, borderRadius:'50%', boxSizing:'border-box'}}></div>
        <div style={{position:'absolute', left:lensSize*0.78, top:lensSize*0.78, width:tail, height:lensBorder, background:color, transform:'rotate(45deg)', transformOrigin:'left center'}}></div>
      </div>

      {/* Wordmark */}
      <div style={{fontFamily:'"Manrope", system-ui, sans-serif', fontWeight:500, fontSize:size, letterSpacing:'-0.01em', color, display:'flex', alignItems:'center'}}>
        {seg0}
        {seg1 ? <span style={{color:accent}}>{seg1}</span> : null}
        {seg2 ? <span style={{color:muted, fontFamily:'"JetBrains Mono", monospace', fontSize:Math.round(size*0.78)}}>{seg2}</span> : null}
        {/* Always in DOM when animate=true so the pill width never shifts when the cursor disappears */}
        {animate ? (
          <span style={{
            display: 'inline-block',
            width: Math.max(2, Math.round(size * 0.1)) + 'px',
            height: Math.round(size * 1.1) + 'px',
            background: cursorColor,
            opacity: (cursorActive && cursorOn) ? 1 : 0,
            marginLeft: '1px',
            verticalAlign: 'middle',
            borderRadius: '1px',
            transition: cursorActive ? 'opacity 55ms' : 'none',
          }} />
        ) : null}
      </div>
    </div>
  );
}

window.BrandLockup = BrandLockup;
