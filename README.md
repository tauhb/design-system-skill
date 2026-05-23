# Design System Skill

Bộ công cụ tạo brand identity và slide deck HTML - hoàn toàn tự động, không cần Figma hay design tool nào.

## 📦 Cấu trúc

```
design-system-skill/
├── design-system/           # Brand system + logo creator
│   ├── SKILL.md            # Main skill file
│   ├── templates/          # HTML templates
│   │   ├── design-system.html
│   │   └── brand-book-a4.html
│   └── references/
│       └── svg-patterns.md
├── slide-html/             # HTML slide deck generator
│   ├── SKILL.md
│   ├── STYLE_PRESETS.md
│   ├── templates/          # 34 slide templates
│   ├── references/
│   │   ├── viewport-base.css
│   │   ├── animation-patterns.md
│   │   ├── html-template.md
│   │   └── vn-typography.md
│   └── scripts/
│       ├── export-pdf.sh
│       ├── deploy.sh
│       └── extract-pptx.py
└── README.md (file này)
```

## 🚀 Cách dùng

### 1. Copy vào project của bạn

```bash
cp -r design-system my-project/skills/design-system
cp -r slide-html my-project/skills/slide-html
```

Hoặc symlink:
```bash
ln -s /path/to/design-system-skill/design-system ~/.claude/skills/design-system
ln -s /path/to/design-system-skill/slide-html ~/.claude/skills/slide-html
```

### 2. Sử dụng trong Claude Code

**Tạo Brand System:**
```
/brand
```

Lựa chọn:
- **[A] Website URL** — paste website, tôi tự extract màu + font + tên
- **[B] Điền nhanh** — trả lời 5 câu, tôi build toàn bộ brand system
- **[C] Chọn mẫu** — pick 1 trong 6 preset style

Output:
```
✓ Design system:  output/design/YYYY-MM-DD/brand-slug/design-system.html
✓ Brand book:     output/design/YYYY-MM-DD/brand-slug/brand-book-a4.html
✓ PDF:            output/design/YYYY-MM-DD/brand-slug/brand-book-a4.pdf
```

**Tạo Logo SVG:**
```
/logo
```

- 3 design directions
- 3-4 variations per direction
- Output SVG file

**Tạo Slide Deck:**
```
/slide hoặc /deck
```

Lựa chọn:
- Content FB/Zalo
- Webinar/khóa học
- Pitch/proposal
- Onboarding

Output:
```
✓ Slide: output/slides/YYYY-MM-DD/deck-slug.html
```

Features:
- Presenter Mode (`P` key)
- Layer reveal animation
- Inline editing (`E` key)
- Auto-save to localStorage
- PDF export

---

## 🔑 Key Features

### Design System
- ✅ Zero dependencies (self-contained HTML + CSS)
- ✅ Google Fonts CDN only
- ✅ 34 slide templates with Vietnamese typography
- ✅ Inline SVG logo generation
- ✅ Brand guidelines PDF export

### Slide HTML
- ✅ No build step
- ✅ Presenter mode with speaker notes
- ✅ Layer-by-layer animation reveal
- ✅ Click-to-zoom on slides
- ✅ Inline editing + auto-save
- ✅ Responsive to any screen

---

## 📝 Notes

### Design System
- **No THEME.md or BUSINESS.md needed** — Claude asks directly via website URL, quick questions, or preset mẫu
- Output files are ready to customize and share with clients
- All data comes from user input or website extraction

### Slide HTML  
- **Deck slug** follows same rule as brand-slug (kebab-case, no Vietnamese diacritics)
- All templates are responsive — works on desktop, tablet, mobile
- Presenter mode is hidden by default (`P` key to toggle)
- Changes auto-save to browser localStorage

---

## ✨ Output Paths

All outputs go to project root:

```
output/
├── design/
│   ├── 2025-05-23/
│   │   ├── brand-name/
│   │   │   ├── design-system.html
│   │   │   ├── brand-book-a4.html
│   │   │   └── brand-book-a4.pdf
│   │   └── another-brand/
│   │       └── ...
├── slides/
│   ├── 2025-05-23/
│   │   ├── deck-1.html
│   │   ├── deck-2.html
│   └── ...
└── .previews/
    ├── preview-1-style.html
    └── ...
```

---

## 🛠️ Requirements

- Claude Code
- Chrome/Chromium (for PDF export) — optional, can use online tools
- Python 3 with `python-pptx` (only for PPTX → HTML conversion)

---

## 📚 File References

Each skill has comprehensive docs inside SKILL.md:
- `design-system/SKILL.md` — 270+ lines, full workflow
- `slide-html/SKILL.md` — 280+ lines, all phases explained

Supporting docs:
- `slide-html/STYLE_PRESETS.md` — template quick reference
- `slide-html/references/vn-typography.md` — Vietnamese font guidelines
- `design-system/references/svg-patterns.md` — SVG techniques

---

## 📞 Troubleshooting

**PDF export fails:**
- Install Chrome/Chromium, or use online PDF converters
- Command is provided in the output if Chrome not found

**Logo looks pixelated:**
- Logo is SVG — always scalable
- Browser rendering difference → export as PDF for best quality

**Slide text editable but not saving:**
- Edit mode saves to browser localStorage
- Check browser settings haven't disabled localStorage
- `Ctrl+S` to export clean HTML file to disk

---

Created with Claude Code
