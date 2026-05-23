---
name: slide-html
description: Use when creating slide decks, presentations, or content carousels as HTML. Triggers on "tạo slide", "làm deck", "slide presentation", "bài thuyết trình", "tạo deck", uploading a .pptx, or enhancing an existing .html slide file.
---

# slide-html — HTML Slide Deck Generator

Creates self-contained HTML slide decks. Single output file. No build step.

**Triggers:** "tạo slide", "làm deck", "slide presentation", "slide html", "bài thuyết trình", "tạo deck"

---

## Phase 0 — Intent Detection

Scan user's message for:

| Signal | Path |
|---|---|
| `.pptx` file path | → PPT Convert (Phase 5 first, then Phase 1) |
| "cải thiện", "enhance", existing `.html` path | → Enhance (skip to Phase 3 with existing file) |
| Anything else | → New deck (continue to Phase 1) |

---

## Phase 1 — Content Discovery

Ask these 4 questions **one at a time**, wait for each answer:

1. **Mục đích:** "Deck này dùng để làm gì?"
   Options: Content FB/Zalo · Webinar/khóa học · Pitch/proposal · Onboarding học viên · Khác

2. **Số slides:** "Khoảng bao nhiêu slides?"
   Options: Ít hơn 10 · 10–20 · Hơn 20

3. **Content:** "Bạn có outline hoặc nội dung sẵn chưa?"
   Options: Có (paste vào) · Chưa, AI tự đề xuất

   *If "Chưa": propose a standard outline based on mục đích from question 1:*
   - Content FB/Zalo: Hook → Problem → Solution (3 points) → CTA
   - Webinar/khóa học: Title → Agenda → 3–5 Content sections → Q&A → CTA
   - Pitch/proposal: Problem → Solution → Results/Proof → Offer → CTA
   - Onboarding: Welcome → What you get → How it works → Next steps → Community

4. **Ngôn ngữ:** "Ngôn ngữ chính của deck?"
   Options: Tiếng Việt · Tiếng Anh · Song ngữ

---

## Phase 2 — Style Discovery

**Load now:** `skills/slide-html/templates/index.json`
**Load now:** `skills/slide-html/STYLE_PRESETS.md`

**Steps:**

1. Use STYLE_PRESETS.md Quick Decision Matrix to identify 2–3 template categories
2. From `index.json`, filter by `occasion`, `mood`, `best_for` — pick 3 best candidates
3. For each candidate, read:
   - `skills/slide-html/templates/{slug}/design.md`
   - `skills/slide-html/templates/{slug}/template.json`
4. Generate 3 **animated title-slide HTML preview files**:
   - Save to `output/.previews/preview-{n}-{slug}.html`
   - Each preview: `height: 100vh`, animated entrance, user's actual deck title
   - Recreate the template's aesthetic (palette + fonts + layout) — **DO NOT copy HTML from template files**
   - If VN content + template font is in Avoid list → override with Tier 1 VN font
5. Open all 3 previews:
   ```
   open output/.previews/preview-1-*.html output/.previews/preview-2-*.html output/.previews/preview-3-*.html
   ```
6. Ask user to choose

---

## Phase 3 — Generate Full Deck

**Load now:**
- `skills/slide-html/references/viewport-base.css`
- `skills/slide-html/references/animation-patterns.md`
- `skills/slide-html/references/html-template.md`
- `skills/slide-html/references/vn-typography.md` ← only if VN or song ngữ
- `skills/slide-html/assets/heroicons.js` ← for all slides with icons
- `skills/slide-html/assets/chart-generators.js` ← for stats/metrics slides
- `skills/slide-html/assets/diagram-generators.js` ← for process/workflow slides
- `skills/slide-html/assets/ornament-generators.js` ← for decorative elements

**Generate** a single self-contained HTML file with visual elements on every content slide.

**Before generating, create output directory:**
```bash
mkdir -p output/slides/YYYY-MM-DD
```

**Output path:**
```
output/slides/YYYY-MM-DD/{deck-slug}.html
```

Where:
- `YYYY-MM-DD` = today's date
- `deck-slug` = deck title in kebab-case (lowercase, bỏ dấu tiếng Việt, dấu cách → `-`)
  - Ví dụ: "Khóa Học AI 2025" → `khoa-hoc-ai-2025`

---

### Slide Generation Workflow

**For each slide, follow this sequence:**

1. **Identify slide type** — compare against the Slide Type → Visual Element Mapping table (see Visual Elements Standard section below)
2. **Choose visual element** — pick the Primary Visual from the mapping:
   - If it's a **chart** → use `generateBarChart()`, `generatePieChart()`, or `generateLineChart()`
   - If it's a **diagram** → use `generateFlowchart()`, `generateTimeline()`, `generateProcessSteps()`, or `generateComparison()`
   - If it's an **icon** → embed `heroicons[name]` inline in heading or beside content
   - If it's an **ornament** → use `generateTopBorder()`, `generateDividerLine()`, `generateCornerAccent()`, or `generateGradientBg()`
   - If it's a **media slot** → create labeled placeholder for user images
3. **Generate and embed** — call the appropriate function and insert its output:
   ```javascript
   const chartSvg = generateBarChart(data, colors, options);
   // Wrap in div with data-anim for layer reveal:
   slideHtml += `<div data-anim="fade-in" style="--d:2">${chartSvg}</div>`;
   ```
4. **Add layer structure** — split content into `data-anim` groups:
   - Layer 1: Slide title + heading visual
   - Layer 2: Chart/diagram OR main content
   - Layer 3+: Additional details, bullets, footer
5. **Add speaker notes** — every `<section class="slide">` must have `data-notes="..."` with talking points that reference the visual
6. **Test in Presenter Mode** — ensure:
   - Layers reveal in logical order
   - Visual doesn't overlap text
   - Zoom works smoothly on the chart/diagram
   - Speaker notes mention the visual's key takeaway

**Hard constraints — enforce on every slide, no exceptions:**

| Rule | Requirement |
|---|---|
| Slide height | `height: 100vh; overflow: hidden` |
| Font sizes | `clamp(min, preferred, max)` only — never fixed px |
| Content density | Max 6 bullets · OR 1 large stat · OR 1 quote per slide |
| VN font | Tier 1 only (see vn-typography.md) |
| Self-contained | All CSS + JS inline — zero runtime external deps |
| Google Fonts | One `<link>` in `<head>` — only allowed external call |
| Visual elements | Every content slide ≥ 1 non-text visual (icon, chart, media slot, or ornament) |
| Inline editing | Always include Edit Mode — never ask user — follow implementation guide below |
| Presenter Mode | Always include — never ask user — follow implementation guide below |
| Layer reveal | Every `[data-anim]` element is a layer — reveal one group per Next in presenter |
| Speaker notes | Every `<section class="slide">` must have `data-notes="..."` attribute |

---

### Visual Elements Standard

Every slide must contain at least one non-text visual element. Choose by slide type:

| Slide type | Required visual |
|---|---|
| Cover / Chapter | Template ornament (e.g., gold rule + decorative mark) |
| Agent / Feature | 1 inline SVG icon (Heroicons or Tabler) beside headline or kicker |
| Stats / Numbers | Visual weight: oversized numeral, CSS bar fill, or icon grid |
| Process / Steps | Numbered visual steps with connecting line or arrow SVG |
| Comparison | Divider line + column header accents |
| Demo / Placeholder | Labeled media slot — NOT a bare empty box |
| Q&A / CTA | Decorative display text or brand mark |

**Media slots — always labeled and positioned:**

```html
<!-- Use this pattern — never a plain empty div -->
<div class="media-slot" data-slot="SCREENSHOT">
  <span class="slot-label">[ SCREENSHOT ]</span>
</div>
```

Slot types: `PHOTO` · `SCREENSHOT` · `PRODUCT` · `RESULT` · `VIDEO` · `PORTRAIT` · `DIAGRAM`

**Inline SVG icons:** Heroicons outline (MIT license). Embed inline. Size `clamp(1rem, 2vw, 2rem)`. Color `currentColor`.

---

### Inline Editing Standard

**Always include Edit Mode in every output. No exceptions. Never ask the user.**

Implementation: follow `skills/slide-html/references/html-template.md` → "Inline Editing Implementation" section exactly.

| Feature | Behavior |
|---|---|
| Trigger | `E` key + floating button with 400ms hotzone |
| Text editing | `contenteditable="true"` on all text elements |
| Image editing | Click `.media-slot` → file picker → FileReader → base64 swap |
| Auto-save | `localStorage.setItem(deckSlug, outerHTML)` on every `input`/`blur` |
| Export | `Ctrl+S` → strip edit state → download clean `.html` |
| Restore | On reload: `localStorage.getItem(deckSlug)` → ask "Restore last session?" |

---

### Presenter Mode Standard

**Always include in every output. Never ask the user. Toggle with `P` key.**

```
┌────────────────────────────────┬──────────────┐
│                                │  Script/Notes │
│   Current slide (scaled 16:9)  │  (top 58%)   │
│   #ps-main — overflow:hidden   ├──────────────┤
│                                │  Next slide  │
│   #ps-deck-wrap — zoom here    │  preview     │
│                                │  (bot 42%)   │
└────────────────────────────────┴──────────────┘
     72% width                       28% width
```

- Grid: `grid-template-columns: 72fr 28fr`
- `goTo(n)` in presenter mode does NOT scroll the deck

---

### Layer Reveal Standard

In Presenter Mode, `[data-anim]` elements are the layers — hidden until manually revealed.

1. On slide render: do NOT add `is-active` — all `[data-anim]` start at `opacity: 0`
2. Group by `--d` value: same `--d` = reveals together
3. Each **Next**: reveal next group via `.layer-revealed` → advance slide when all done
4. **Prev**: always go to previous slide, restart from group 0

```css
[data-anim="fade-up"].layer-revealed  { animation: fadeUp   .55s var(--ease) 0ms forwards; }
[data-anim="fade-in"].layer-revealed  { animation: fadeIn   .45s ease        0ms forwards; }
[data-anim="rule"].layer-revealed     { animation: growRule .35s ease        0ms forwards; }
[data-anim="scale-in"].layer-revealed { animation: scaleIn  .55s var(--ease) 0ms forwards; }
[data-anim="reveal-r"].layer-revealed { animation: revealRight .55s var(--ease) 0ms forwards; }
```

Layer counter: dots `●●○○` + `N / Total` + Next button label:
- Layers remain: `Reveal (2/6) →`
- All done: `Next slide →`

---

### Presenter Zoom Standard

Click anywhere on slide in Presenter Mode → zoom 2.2× at that exact point. Click again → zoom out.

```javascript
function handleZoom(e) {
  const wrap = document.getElementById('ps-deck-wrap');
  if (zoomed) {
    wrap.style.transform = ''; wrap.style.transformOrigin = '';
    wrap.classList.remove('zoomed'); zoomed = false; return;
  }
  const rect = wrap.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
  const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
  wrap.style.transformOrigin = x + '% ' + y + '%';
  wrap.style.transform = 'scale(2.2)';
  wrap.classList.add('zoomed'); zoomed = true;
}
```

**Navigation JS:**

```javascript
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});
// Touch swipe: deltaX > 50 = next, deltaX < -50 = prev
```

---

---

## Visual Element Generation Strategy

**Every content slide MUST include at least one non-text visual element.**

This section defines which visual types fit each slide type, and how to generate them using the SVG asset library.

### Visual Element Asset Library

**Location:** `skills/slide-html/assets/`

```
assets/
├── heroicons.js              (24 most-used icons as inline SVG)
├── chart-generators.js       (bar, pie, line charts + progress bars)
├── diagram-generators.js     (flowchart, timeline, process, comparison)
└── ornament-generators.js    (borders, dividers, accents, patterns)
```

**Usage Pattern:**
```javascript
// Import at top of HTML <script> section
const { generateBarChart } = chartsLib;
const { heroicons } = iconsLib;

// Use in slide generation
function createStatsSlide(data) {
  const chart = generateBarChart(data, '#4f46e5');
  const icon = heroicons['chart-bar'];
  return `
    <section class="slide" data-notes="...">
      <h2>${heroicons['chart-bar']} Sales Metrics</h2>
      ${chart}
    </section>
  `;
}
```

---

### Slide Type → Visual Element Mapping

| Slide Type | Primary Visual | Tool | Example |
|---|---|---|---|
| **Title/Cover** | Ornament + decorative mark | `generateCornerAccent()` or CSS gradient | Top accent line + corner flourish |
| **Problem/Pain** | Icon + optional tint overlay | `heroicons['lightning-bolt']` | Lightning icon in color accent |
| **Solution/Benefit** | Icon + highlight box | `heroicons['check-circle']` or `['star']` | Green checkmark or star icon |
| **Stats/Metrics** | Bar/Pie/Line chart | `generateBarChart/PieChart/LineChart()` | Quarterly sales as bar chart |
| **Process/Steps** | Numbered step diagram | `generateProcessSteps()` | 1→2→3 with connecting line |
| **Features List** | Icon grid + bullets | `heroicons['*']` array | 4 feature icons + descriptions |
| **Comparison** | Two-column with divider | `generateComparison()` | Option A vs Option B grid |
| **Timeline/Journey** | Vertical timeline | `generateTimeline()` | 2020, 2021, 2022 milestones |
| **Flowchart/Workflow** | Connected boxes + arrows | `generateFlowchart()` | Start→Decide→Execute→Result |
| **Testimonial** | Avatar circle + quote mark | CSS circle + `heroicons` | Profile circle + quote icon |
| **Call-to-Action** | Large icon + accent | `generateBurst()` or `heroicons['gift']` | Gift burst or big arrow |
| **Closing** | Ornament + brand accent | `generateTopBorder()` + gradient | Top rule + color accent |

---

### SVG Generation Code Patterns

#### Charts (Self-Contained)

**Bar Chart:**
```javascript
generateBarChart(
  [
    {label: 'Q1', value: 100},
    {label: 'Q2', value: 150},
    {label: 'Q3', value: 120},
    {label: 'Q4', value: 200}
  ],
  ['#4f46e5', '#06b6d4', '#ec4899', '#f59e0b'],
  {width: 400, height: 250}
)
// Returns: <svg>...</svg> string ready to embed
```

**Pie Chart:**
```javascript
generatePieChart(
  [
    {label: 'Product', value: 45},
    {label: 'Service', value: 35},
    {label: 'Other', value: 20}
  ],
  ['#ef4444', '#3b82f6', '#10b981']
)
```

**Progress Bar:**
```javascript
generateProgressBar(75, 100, '#4f46e5', {
  label: '75% Complete'
})
```

#### Diagrams (Self-Contained)

**Flowchart:**
```javascript
generateFlowchart(
  [
    {id: '1', label: 'Start'},
    {id: '2', label: 'Plan'},
    {id: '3', label: 'Execute'},
    {id: '4', label: 'Review'}
  ],
  '#4f46e5'
)
```

**Process Steps:**
```javascript
generateProcessSteps(
  [
    {num: 1, title: 'Research', description: 'Understand the market'},
    {num: 2, title: 'Design', description: 'Create mockups'},
    {num: 3, title: 'Develop', description: 'Build the product'}
  ],
  '#06b6d4'
)
```

**Timeline:**
```javascript
generateTimeline(
  [
    {year: '2020', title: 'Founded', description: 'Started with idea'},
    {year: '2021', title: 'Launch', description: 'Released MVP'},
    {year: '2022', title: 'Growth', description: '10k users'}
  ],
  '#8b5cf6'
)
```

**Comparison:**
```javascript
generateComparison(
  [
    {left: 'Expensive', right: 'Affordable'},
    {left: 'Slow setup', right: 'Quick start'},
    {left: 'Complex UI', right: 'Simple interface'}
  ],
  ['#ef4444', '#10b981'],
  {title1: 'Before', title2: 'After'}
)
```

#### Icons (Inline SVG)

**Embed icon in text:**
```html
<h2 style="display:flex; align-items:center; gap:12px;">
  ${heroicons['rocket-launch']}
  Launch Your Product
</h2>
```

**Icon grid for features:**
```javascript
const features = [
  {icon: 'sparkles', text: 'Easy to use'},
  {icon: 'lightning-bolt', text: 'Super fast'},
  {icon: 'check-circle', text: 'Reliable'},
  {icon: 'rocket-launch', text: 'Scalable'}
];

let grid = '<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">';
features.forEach(f => {
  grid += `
    <div style="text-align:center;">
      <div style="font-size:40px; margin-bottom:10px;">
        ${heroicons[f.icon]}
      </div>
      <p>${f.text}</p>
    </div>
  `;
});
grid += '</div>';
```

#### Ornaments (Decorative)

**Top Border:**
```javascript
generateTopBorder('#4f46e5', 'wave')
// styles: 'line' | 'wave' | 'dashes' | 'dots'
```

**Divider with text:**
```javascript
generateDividerLine('#e5e7eb', 'or')
```

**Corner Accent:**
```javascript
generateCornerAccent('#4f46e5', 'top-right', 60)
// positions: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
```

**Gradient Background:**
```javascript
// Use in CSS for slide background
const bg = generateGradientBg(
  ['#4f46e5', '#06b6d4', '#ec4899'],
  '135deg'
);
// Returns: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 50%, #ec4899 100%)"
// Apply: style="background: ${bg};"
```

---

### Media Slot Pattern (When Not Using SVG)

For slides that need user-provided images:

```html
<div class="media-slot" data-slot="PRODUCT">
  <span class="slot-label">[ PRODUCT SCREENSHOT ]</span>
</div>
```

**CSS:**
```css
.media-slot {
  aspect-ratio: 16 / 9;
  background: #f3f4f6;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-height: 300px;
}

.media-slot:hover {
  background: #e5e7eb;
  border-color: #4f46e5;
}

.slot-label {
  color: #9ca3af;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}

.media-slot img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 6px;
}
```

**Instructions:**
```html
<!-- Comment before media slot to guide user -->
<!-- Replace with PRODUCT screenshot: full-page view showing dashboard -->
<div class="media-slot" data-slot="SCREENSHOT">
  <span class="slot-label">[ PRODUCT SCREENSHOT ]</span>
</div>
```

---

### Implementation Checklist

Before generating each slide:

- ✅ Identify slide type from mapping table
- ✅ Choose visual element type
- ✅ If SVG: call appropriate `generate*()` function
- ✅ If Icon: pick from `heroicons[name]`
- ✅ If Image: create media slot with label
- ✅ Embed with `data-anim` for layer reveal in Presenter Mode
- ✅ Verify visual and text don't overlap
- ✅ Test in Presenter Mode with zoom + layer reveal

---

## Implementation Guides

### Edit Mode Implementation

**Always include in every output. Never ask the user.**

**Critical:** Do NOT use CSS `~` sibling selector for hover. Pointer-events behavior breaks the hover chain. Must use JS with 400ms timeout.

**HTML Structure:**

```html
<!-- Edit hotzone (top-left corner) + toggle button -->
<div class="edit-hotzone"></div>
<button class="edit-toggle" id="editToggle" title="Edit mode (E)">✏️</button>

<!-- Edit banner (appears when edit mode active) -->
<div class="edit-banner">
  <span>Edit Mode Active</span>
  <button id="editClose">×</button>
</div>
```

**CSS:**

```css
.edit-hotzone {
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  z-index: 10000;
  cursor: pointer;
}

.edit-toggle {
  position: fixed;
  top: 8px;
  left: 8px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 10001;
  padding: 8px 12px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  cursor: pointer;
}

.edit-toggle.show,
.edit-toggle.active {
  opacity: 1;
  pointer-events: auto;
}

body.edit-active [contenteditable] {
  outline: 2px dashed rgba(99, 102, 241, 0.5);
  outline-offset: 2px;
}

.edit-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  background: rgba(59, 130, 246, 0.9);
  color: white;
  overflow: hidden;
  transition: height 0.3s ease;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.edit-banner.show {
  height: 40px;
}
```

**JavaScript:**

```javascript
class DeckEditor {
  constructor(deckSlug) {
    this.deckSlug = deckSlug;
    this.isActive = false;
    this.setupEditMode();
    this.setupHotzone();
    this.setupKeyboard();
    this.setupAutoSave();
  }

  setupHotzone() {
    const hotzone = document.querySelector('.edit-hotzone');
    const toggle = document.getElementById('editToggle');
    let hideTimeout = null;

    const showButton = () => {
      clearTimeout(hideTimeout);
      toggle.classList.add('show');
    };

    const hideButton = () => {
      hideTimeout = setTimeout(() => {
        if (!this.isActive) toggle.classList.remove('show');
      }, 400);
    };

    hotzone.addEventListener('mouseenter', showButton);
    hotzone.addEventListener('mouseleave', hideButton);
    hotzone.addEventListener('click', () => this.toggleEditMode());
    toggle.addEventListener('mouseenter', showButton);
    toggle.addEventListener('mouseleave', hideButton);
    toggle.addEventListener('click', () => this.toggleEditMode());
  }

  setupKeyboard() {
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'e' || e.key === 'E') && !e.target.getAttribute('contenteditable')) {
        this.toggleEditMode();
      }
      if (e.key === 's' && (e.ctrlKey || e.metaKey) && this.isActive) {
        e.preventDefault();
        this.exportFile();
      }
      if (e.key === 'Escape' && this.isActive) {
        this.toggleEditMode();
      }
    });
  }

  toggleEditMode() {
    this.isActive = !this.isActive;
    const body = document.body;
    const toggle = document.getElementById('editToggle');
    const banner = document.querySelector('.edit-banner');

    if (this.isActive) {
      body.classList.add('edit-active');
      toggle.classList.add('active');
      banner?.classList.add('show');
      
      // Make all text elements editable
      document.querySelectorAll('h1, h2, h3, p, li, td, th, span:not(.slot-label)').forEach(el => {
        el.setAttribute('contenteditable', 'true');
      });

      // Make media slots clickable for image replacement
      document.querySelectorAll('.media-slot').forEach(slot => {
        slot.style.cursor = 'pointer';
        slot.addEventListener('click', (e) => this.handleImageUpload(e, slot));
      });
    } else {
      body.classList.remove('edit-active');
      toggle.classList.remove('active');
      banner?.classList.remove('show');
      
      document.querySelectorAll('[contenteditable]').forEach(el => {
        el.removeAttribute('contenteditable');
      });
    }
  }

  handleImageUpload(e, slot) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = slot.querySelector('img') || document.createElement('img');
          img.src = e.target.result;
          img.style.maxWidth = '100%';
          img.style.maxHeight = '400px';
          img.style.objectFit = 'contain';
          if (!slot.querySelector('img')) slot.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });
    input.click();
  }

  setupAutoSave() {
    document.addEventListener('input', () => this.saveToLocalStorage());
    document.addEventListener('blur', () => this.saveToLocalStorage(), true);
  }

  saveToLocalStorage() {
    if (this.isActive) {
      localStorage.setItem(`deck-${this.deckSlug}`, document.documentElement.outerHTML);
    }
  }

  exportFile() {
    // CRITICAL: Strip edit state before export
    const editableEls = Array.from(document.querySelectorAll('[contenteditable]'));
    editableEls.forEach(el => el.removeAttribute('contenteditable'));
    document.body.classList.remove('edit-active');

    const toggle = document.getElementById('editToggle');
    const banner = document.querySelector('.edit-banner');
    toggle?.classList.remove('active', 'show');
    banner?.classList.remove('show');

    const html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

    // Restore edit state
    document.body.classList.add('edit-active');
    editableEls.forEach(el => el.setAttribute('contenteditable', 'true'));
    toggle?.classList.add('active');
    banner?.classList.add('show');

    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${this.deckSlug}.html`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  restoreFromLocalStorage() {
    const saved = localStorage.getItem(`deck-${this.deckSlug}`);
    if (saved) {
      return confirm('Restore last session?');
    }
    return false;
  }
}

// Initialize at bottom of script
const deckEditor = new DeckEditor('{deck-slug}');
if (deckEditor.restoreFromLocalStorage()) {
  document.documentElement.innerHTML = localStorage.getItem(`deck-${deckEditor.deckSlug}`);
}
```

---

### Presenter Mode Implementation

**Always include in every output. Never ask the user. Toggle with `P` key.**

**HTML Structure:**

```html
<div id="presenter-mode" class="hidden">
  <div id="ps-main">
    <div id="ps-deck-wrap">
      <!-- Cloned slides go here -->
    </div>
  </div>
  
  <div id="ps-sidebar">
    <div id="ps-notes">
      <div id="ps-notes-header">
        <span id="ps-layer-counter">●●○○ (1/4)</span>
        <button id="ps-reveal-next">Reveal (1/4) →</button>
      </div>
      <div id="ps-script"><!-- Speaker notes here --></div>
    </div>
    
    <div id="ps-preview">
      <p>Next slide</p>
      <div id="ps-preview-content"><!-- Next slide clone --></div>
    </div>
  </div>
</div>

<!-- Navigation controls -->
<div id="ps-nav" class="hidden">
  <button id="ps-prev">← Prev</button>
  <button id="ps-next">Next →</button>
  <button id="ps-close">Exit Presenter (P)</button>
</div>
```

**CSS:**

```css
#presenter-mode {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  z-index: 5000;
  display: grid;
  grid-template-columns: 72fr 28fr;
  gap: 0;
}

#presenter-mode.hidden {
  display: none;
}

#ps-main {
  background: #000;
  overflow: hidden;
  position: relative;
}

#ps-deck-wrap {
  width: 100vw;
  height: 100vh;
  transform-origin: top left;
  transition: transform 0.4s ease;
}

#ps-deck-wrap.zoomed {
  cursor: zoom-out;
}

#ps-deck-wrap:not(.zoomed) {
  cursor: zoom-in;
}

#ps-sidebar {
  background: #1a1a1a;
  color: #fff;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 0;
  border-left: 1px solid #333;
  overflow: hidden;
}

#ps-notes {
  padding: 16px;
  overflow-y: auto;
}

#ps-notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 12px;
}

#ps-layer-counter {
  color: #888;
  letter-spacing: 1px;
}

#ps-reveal-next {
  padding: 6px 12px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
}

#ps-script {
  font-size: 14px;
  line-height: 1.6;
  color: #ccc;
}

#ps-preview {
  padding: 16px;
  border-top: 1px solid #333;
  overflow-y: auto;
  background: #0a0a0a;
}

#ps-preview p {
  color: #888;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

#ps-preview-content {
  aspect-ratio: 16 / 9;
  background: #333;
  border-radius: 4px;
  overflow: hidden;
  transform: scale(0.5);
  transform-origin: top left;
  opacity: 0.5;
}

#ps-nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 5001;
}

#ps-nav button {
  padding: 10px 16px;
  background: rgba(79, 70, 229, 0.8);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

#ps-nav button:hover {
  background: rgba(79, 70, 229, 1);
}
```

**JavaScript:**

```javascript
class PresenterMode {
  constructor() {
    this.isActive = false;
    this.currentSlide = 0;
    this.layerIndex = 0;
    this.zoomed = false;
    this.setupPresenter();
  }

  setupPresenter() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'p' || e.key === 'P') {
        this.togglePresenterMode();
      }
      if (this.isActive) {
        if (e.key === 'ArrowRight' || e.key === ' ') this.nextLayer();
        if (e.key === 'ArrowLeft') this.prevSlide();
        if (e.key === 'Escape') this.resetZoom();
      }
    });

    document.getElementById('ps-reveal-next').addEventListener('click', () => this.nextLayer());
    document.getElementById('ps-next').addEventListener('click', () => this.nextSlide());
    document.getElementById('ps-prev').addEventListener('click', () => this.prevSlide());
    document.getElementById('ps-close').addEventListener('click', () => this.togglePresenterMode());

    document.getElementById('ps-deck-wrap').addEventListener('click', (e) => this.handleZoom(e));
  }

  togglePresenterMode() {
    this.isActive = !this.isActive;
    document.getElementById('presenter-mode').classList.toggle('hidden');
    document.getElementById('ps-nav').classList.toggle('hidden');

    if (this.isActive) {
      this.renderPresenterView();
    }
  }

  renderPresenterView() {
    const slides = document.querySelectorAll('section.slide');
    const wrap = document.getElementById('ps-deck-wrap');
    wrap.innerHTML = '';

    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      // DO NOT add is-active — all data-anim start at opacity: 0
      wrap.appendChild(clone);
    });

    this.showSlide(0);
  }

  showSlide(index) {
    this.currentSlide = index;
    this.layerIndex = 0;

    const slides = document.querySelectorAll('#ps-deck-wrap section.slide');
    const scale = this.calculateScale();
    document.getElementById('ps-deck-wrap').style.transform = `scale(${scale})`;

    const slide = slides[index];
    const notes = slide.getAttribute('data-notes') || 'No notes for this slide';
    document.getElementById('ps-script').textContent = notes;

    // Get next slide for preview
    const nextSlide = slides[index + 1];
    if (nextSlide) {
      document.getElementById('ps-preview-content').innerHTML = nextSlide.innerHTML;
    }

    this.updateLayerCounter();
  }

  calculateScale() {
    const container = document.getElementById('ps-main');
    const w = container.clientWidth;
    const h = container.clientHeight;
    return Math.min(w / 100, h / 100); // Assuming 100vw/100vh slides
  }

  nextLayer() {
    const slides = document.querySelectorAll('#ps-deck-wrap section.slide');
    const currentSlideEl = slides[this.currentSlide];
    const layers = Array.from(currentSlideEl.querySelectorAll('[data-anim]')).reduce((acc, el) => {
      const d = el.getAttribute('style')?.match(/--d:(\d+)/)?.[1] || '1';
      acc[d] = acc[d] || [];
      acc[d].push(el);
      return acc;
    }, {});

    const layerKeys = Object.keys(layers).sort((a, b) => a - b);
    if (this.layerIndex < layerKeys.length) {
      const currentLayerKey = layerKeys[this.layerIndex];
      layers[currentLayerKey].forEach(el => el.classList.add('layer-revealed'));
      this.layerIndex++;
      this.updateLayerCounter();
    } else {
      this.nextSlide();
    }
  }

  nextSlide() {
    const slides = document.querySelectorAll('#ps-deck-wrap section.slide');
    if (this.currentSlide < slides.length - 1) {
      this.showSlide(this.currentSlide + 1);
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.showSlide(this.currentSlide - 1);
    }
  }

  updateLayerCounter() {
    const slides = document.querySelectorAll('#ps-deck-wrap section.slide');
    const slide = slides[this.currentSlide];
    const totalLayers = new Set(
      Array.from(slide.querySelectorAll('[data-anim]')).map(el => 
        el.getAttribute('style')?.match(/--d:(\d+)/)?.[1] || '1'
      )
    ).size;

    const counter = document.getElementById('ps-layer-counter');
    const button = document.getElementById('ps-reveal-next');
    
    if (this.layerIndex < totalLayers) {
      counter.textContent = `●${Array(this.layerIndex).fill('●').join('')}${Array(totalLayers - this.layerIndex).fill('○').join('')} (${this.layerIndex}/${totalLayers})`;
      button.textContent = `Reveal (${this.layerIndex + 1}/${totalLayers}) →`;
    } else {
      counter.textContent = `${Array(totalLayers).fill('●').join('')} (${totalLayers}/${totalLayers})`;
      button.textContent = 'Next slide →';
    }
  }

  handleZoom(e) {
    const wrap = document.getElementById('ps-deck-wrap');
    if (this.zoomed) {
      this.resetZoom();
      return;
    }

    const rect = wrap.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);

    wrap.style.transformOrigin = `${x}% ${y}%`;
    wrap.style.transform = `scale(2.2)`;
    wrap.classList.add('zoomed');
    this.zoomed = true;
  }

  resetZoom() {
    const wrap = document.getElementById('ps-deck-wrap');
    wrap.style.transform = '';
    wrap.style.transformOrigin = '';
    wrap.classList.remove('zoomed');
    this.zoomed = false;
  }
}

// Initialize
const presenterMode = new PresenterMode();
```

---

### Layer Reveal + Speaker Notes Pattern

**Every slide must include `data-notes` attribute:**

```html
<section class="slide" data-notes="This is the speaker script for this slide. Explain the key points, transition words, etc.">
  <h2>Slide Title</h2>
  
  <!-- Layer 1 -->
  <p data-anim="fade-up" style="--d:1">First point appears</p>
  
  <!-- Layer 2 -->
  <p data-anim="fade-up" style="--d:2">Second point appears</p>
  
  <!-- Layer 3 -->
  <ul data-anim="fade-up" style="--d:3">
    <li>Detail 1</li>
    <li>Detail 2</li>
  </ul>
</section>
```

**CSS for layer reveal:**

```css
[data-anim] {
  opacity: 0; /* Start hidden */
}

[data-anim="fade-up"].layer-revealed {
  animation: fadeUp 0.55s var(--ease) forwards;
}

[data-anim="fade-in"].layer-revealed {
  animation: fadeIn 0.45s ease forwards;
}

[data-anim="scale-in"].layer-revealed {
  animation: scaleIn 0.55s var(--ease) forwards;
}

[data-anim="reveal-r"].layer-revealed {
  animation: revealRight 0.55s var(--ease) forwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes revealRight {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}
```

---

### HTML Base Template Reference

Follow `skills/slide-html/references/html-template.md` exactly for:
- DOCTYPE and meta tags
- CSS Custom Properties (theme tokens)
- Base styles from `viewport-base.css`
- Animation patterns from `animation-patterns.md`
- Font setup from `vn-typography.md`

Minimal template structure:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Deck Title}</title>
  
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family={Font1}:{weights}&family={Font2}:{weights}&display=swap">
  
  <style>
    :root {
      --bg: #ffffff;
      --text: #000000;
      --accent: #4f46e5;
      --font-display: '{Font1}', sans-serif;
      --font-body: '{Font2}', sans-serif;
    }
    
    /* Paste viewport-base.css content here */
    /* Paste animation-patterns.md content here */
    /* Add preset-specific styles here */
  </style>
</head>

<body>
  <!-- Edit hotzone + toggle button -->
  <div class="edit-hotzone"></div>
  <button class="edit-toggle" id="editToggle">✏️</button>
  <div class="edit-banner"><span>Edit Mode</span><button id="editClose">×</button></div>
  
  <!-- Presenter mode -->
  <div id="presenter-mode" class="hidden">...</div>
  <div id="ps-nav" class="hidden">...</div>
  
  <!-- Main slides -->
  <div class="deck">
    <section class="slide title-slide" data-notes="Opening script...">
      ...
    </section>
    
    <!-- More slides with data-notes + data-anim elements -->
  </div>

  <script>
    // Edit mode controller
    const deckEditor = new DeckEditor('{deck-slug}');
    
    // Presenter mode controller
    const presenterMode = new PresenterMode();
    
    // Main navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });
  </script>
</body>
</html>
```

---

1. Open deck:
   ```
   open output/slides/YYYY-MM-DD/{deck-slug}.html
   ```
2. Tell user:
   - **Normal mode:** `← →` / Space / swipe để chuyển slide
   - **Presenter Mode:** `P` → sidebar script + next preview + layer reveal từng bước
   - **Zoom (trong Presenter):** click vào slide → zoom, click lại → zoom out
   - **Edit Mode:** `E` → click text để sửa, click ảnh để thay → `Ctrl+S` lưu file sạch
3. Offer optional:
   - **PDF:** `bash skills/slide-html/scripts/export-pdf.sh output/slides/YYYY-MM-DD/{deck-slug}.html`
   - **Deploy:** `bash skills/slide-html/scripts/deploy.sh output/slides/YYYY-MM-DD/{deck-slug}.html`

---

## Phase 5 — PPT Convert *(nice-to-have)*

Triggered when Phase 0 detects `.pptx` file path.

**Check dependency:**
```
python3 -c "import pptx" 2>/dev/null || echo "MISSING: run pip install python-pptx"
```

**Extract content:**
```bash
mkdir -p output/.pptx-extract
python3 skills/slide-html/scripts/extract-pptx.py /path/to/file.pptx > output/.pptx-extract/slides.json
cat output/.pptx-extract/slides.json
```

Parse extracted JSON → use slide titles and content as outline for Phase 1 Q3. Skip Q3, go to Q4 (language).

---

## Output Summary

| Property | Value |
|---|---|
| File | `output/slides/YYYY-MM-DD/{deck-slug}.html` |
| Dependencies | None at runtime (Google Fonts CDN only) |
| Navigation | `← →` / Space / swipe |
| Presenter Mode | `P` key → 72/28 sidebar layout |
| Layer Reveal | Next reveals one `[data-anim]` group; advances slide when all done |
| Zoom | Click in Presenter → 2.2× zoom; click again to reset |
| Edit Mode | `E` key → contenteditable text + media slot file picker |
| Auto-save | `localStorage` — restores last session on reload |
| Export | `Ctrl+S` in Edit Mode → clean `.html` download |
| PDF | `@media print` → 1 slide = 1 page |
