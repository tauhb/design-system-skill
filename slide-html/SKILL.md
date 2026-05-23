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

**Generate** a single self-contained HTML file.

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
| Inline editing | Always include Edit Mode — never ask user — see spec below |
| Presenter Mode | Always include — never ask user — see spec below |
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

## Phase 4 — Delivery

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
