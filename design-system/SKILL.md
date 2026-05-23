---
name: design-system
description: Use when creating brand identity assets for a business. Triggers on /brand (full brand book + design system HTML), /logo (SVG logo), or when starting a funnel/landing page build without an existing design system in output/design/.
---

# Design System

Tạo bộ nhận diện thương hiệu đầy đủ: logo SVG, design token system, và brand book PDF.

**Triggers:** `/brand` · `/logo` · bắt đầu build funnel/landing page mà chưa có design system

---

## Skill Map

| Lệnh | Skill | Output |
|---|---|---|
| `/brand` | Brand System | `design-system.html` + `brand-book-a4.html/pdf` |
| `/logo` | Logo Creator | `logo-final.svg` |

Khi bắt đầu build funnel/landing page: kiểm tra `output/design/` — nếu chưa có subfolder nào, nhắc user chạy `/brand` trước.

---

## /brand — Brand System

> Tạo bộ nhận diện thương hiệu đầy đủ: design-system.html scrollable + brand-book-a4.html/pdf giao cho client.

### Bước 1 — Brand Discovery

Hỏi user ngay lập tức:

> "Để tạo brand system, bạn muốn bắt đầu theo cách nào?"
> - **[A] Website** — paste URL, tôi tự extract màu, font, tagline
> - **[B] Điền nhanh** — trả lời 5 câu hỏi
> - **[C] Chọn mẫu** — xem các style preset sẵn và pick

---

#### Path A — Website URL

Dùng WebFetch để fetch URL user cung cấp. Extract từ HTML/CSS:

| Cần tìm | Tìm ở đâu |
|---|---|
| Tên thương hiệu | `<title>`, `<meta name="application-name">`, `og:site_name`, logo alt text |
| Tagline | `<meta name="description">`, `og:description`, H1/H2 lớn nhất trên trang |
| Màu chính | CSS variables `--primary`, `--color-primary`, background-color của header/CTA button |
| Font | `<link>` Google Fonts trong `<head>`, `font-family` trong body/heading CSS |
| Ngành | Nội dung trang, meta description |

Sau khi extract — hiển thị để user confirm:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  EXTRACTED FROM WEBSITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tên:      [extracted hoặc ?]
Tagline:  [extracted hoặc ?]
Màu:      [hex hoặc ?]
Font:     [font name hoặc ?]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Thông tin nào cần chỉnh?
```

Field nào không extract được → hỏi trực tiếp ngay sau.

---

#### Path B — Hỏi nhanh (5 câu)

Hỏi lần lượt, từng câu một:

1. **Tên thương hiệu** là gì?

2. **Mô tả ngắn** ngành / sản phẩm / dịch vụ bạn cung cấp?

3. **Màu sắc chủ đạo** bạn muốn? *(hex code, tên màu, hoặc "Claude chọn theo phong cách")*

4. **Phong cách thương hiệu**?
   → Tối giản · Sang trọng · Năng động · Chuyên nghiệp · Vui vẻ trẻ trung · Khác

5. **Font chữ**?
   → Claude chọn theo phong cách · Serif cổ điển · Sans-serif hiện đại · *(tên font cụ thể)*

Sau khi có đủ 5 câu — Claude tự generate palette đầy đủ:
- Primary từ màu user chọn (hoặc generate theo phong cách)
- Secondary / Tertiary (complementary hoặc analogous)
- Background, Surface, Border, Text-head, Text-muted, Alert
- Chọn cặp font phù hợp phong cách (heading + body từ Google Fonts)

---

#### Path C — Preset mẫu

Hiển thị 6 style combo:

```
1. Tech Pro      #4F46E5 Indigo  · Inter           · Tối giản, chuyên nghiệp
2. Warm Coach    #F97316 Orange  · Nunito           · Năng động, thân thiện
3. Luxury Dark   #0F172A Navy    · Playfair Display · Sang trọng, cao cấp
4. Creative      #7C3AED Purple  · Plus Jakarta     · Sáng tạo, trẻ trung
5. Clean Corp    #0EA5E9 Sky     · DM Sans          · Sạch gọn, tin cậy
6. Natural Eco   #16A34A Green   · Lora             · Tự nhiên, bền vững
```

User chọn số → Claude áp tên thương hiệu vào preset đó. Sau đó hỏi:
> "Muốn giữ nguyên màu preset hay điều chỉnh gì không?"

---

### Bước 2 — Thông tin tùy chọn

Sau khi có data từ bất kỳ path nào, hỏi thêm (chỉ hỏi khi chưa có):

1. **Logo SVG** — paste SVG code hoặc bỏ qua
2. **Tagline** — nếu chưa có từ Bước 1
3. **Nguyên tắc thiết kế** — 4–6 quy tắc; nếu không có → drop section đó
4. **Sản phẩm / Khóa học** — tên + màu đặc trưng (4–6 items); nếu không có → drop section

**Không bịa bất kỳ thông tin nào.**

---

### Bước 3 — Xác nhận với user

Hiển thị bảng tóm tắt:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  BRAND SYSTEM — XÁC NHẬN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tên:         [TEN_THUONG_HIEU]
Tagline:     [TAGLINE]
Màu chính:   [MAU_CHINH]
Màu phụ:     [MAU_PHU]
Màu thứ ba:  [MAU_THU_BA]
Font:        [FONT_TIEU_DE] / [FONT_NOI_DUNG]
Logo SVG:    Có ✓ / Chưa có ✗
Principles:  [số lượng] nguyên tắc
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Hỏi: "Thông tin trên đúng không? Xác nhận để tôi bắt đầu gen."

Nếu user muốn chỉnh → cập nhật và hiển thị lại bảng. Chỉ gen khi có xác nhận rõ ràng.

---

### Bước 4 — Generate 2 HTML files

1. Tính `brand-slug` từ tên thương hiệu:
   - Lowercase toàn bộ
   - Bỏ dấu tiếng Việt (ă→a, ê→e, ô→o, ư→u, đ→d, v.v.)
   - Dấu cách → `-`
   - Ví dụ: "Học Viện AI" → `hoc-vien-ai`

2. Tính `NGAY` = ngày hôm nay theo định dạng `YYYY-MM-DD`

3. Tạo folder output:
   ```
   output/design/{NGAY}/{brand-slug}/
   ```

4. Đọc `skills/design-system/templates/design-system.html`
   → Fill tất cả `{{TOKEN}}` → ghi vào `output/design/{NGAY}/{brand-slug}/design-system.html`

5. Đọc `skills/design-system/templates/brand-book-a4.html`
   → Fill tất cả `{{TOKEN}}` → ghi vào `output/design/{NGAY}/{brand-slug}/brand-book-a4.html`

**Token map:**

| Token | Giá trị |
|---|---|
| `{{TEN_THUONG_HIEU}}` | Tên thương hiệu |
| `{{TAGLINE}}` | Tagline |
| `{{FONT_TIEU_DE_NAME}}` | Heading font name |
| `{{FONT_NOI_DUNG_NAME}}` | Body font name |
| `{{FONT_MONO_NAME}}` | Mono font (để trống nếu không có) |
| `{{GOOGLE_FONTS_LINK}}` | Thẻ `<link>` Google Fonts đầy đủ |
| `{{MAU_CHINH}}` | Hex màu primary |
| `{{MAU_PHU}}` | Hex màu secondary |
| `{{MAU_THU_BA}}` | Hex màu tertiary |
| `{{MAU_NEN}}` | Hex background |
| `{{MAU_SURFACE}}` | Hex surface |
| `{{MAU_VIEN}}` | Hex border |
| `{{MAU_CHU}}` | Hex text-heading |
| `{{MAU_MO}}` | Hex text-muted |
| `{{MAU_ALERT}}` | Hex alert/accent |
| `{{LOGO_SVG}}` | SVG inline code (để trống → dùng text placeholder) |
| `{{NGUYEN_TAC_1}}` → `{{NGUYEN_TAC_4}}` | Nguyên tắc thiết kế |
| `{{P1_TEN}}` → `{{P6_TEN}}` | Tên sản phẩm |
| `{{P1_MAU}}` → `{{P6_MAU}}` | Màu hex sản phẩm |
| `{{P1_VAI_TRO}}` → `{{P6_VAI_TRO}}` | Mô tả vai trò sản phẩm |

**Quy tắc fill:**
- Section `{{NGUYEN_TAC_*}}` không có data → xóa toàn bộ section
- Section `{{P*_*}}` không có data → xóa section đó
- `{{LOGO_SVG}}` không có → text placeholder viết tắt tên thương hiệu
- Không để lại bất kỳ `{{TOKEN}}` nào trong output

---

### Bước 5 — Render PDF

Detect Chrome/Chromium:
- **macOS**: `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome`
- **Linux**: `chromium` hoặc `google-chrome`
- **Không tìm thấy**: thông báo + cung cấp lệnh để user tự chạy

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="output/design/{NGAY}/{brand-slug}/brand-book-a4.pdf" \
  "file://$PWD/output/design/{NGAY}/{brand-slug}/brand-book-a4.html"
```

---

### Bước 6 — Deliver + Iterate

```
✓ Design system:  output/design/{NGAY}/{brand-slug}/design-system.html
✓ Brand book:     output/design/{NGAY}/{brand-slug}/brand-book-a4.html
✓ PDF:            output/design/{NGAY}/{brand-slug}/brand-book-a4.pdf
```

Sẵn sàng chỉnh sửa: màu sắc, font, layout, nội dung, wordmark style.

---

## /logo — Logo Creator

> Vẽ logo bằng SVG code thuần — output là native vector, không cần image API.

**Gợi ý tự động** — khi `/brand` hoàn thành mà chưa có logo.

### Bước 1 — Lấy context

**Nếu vừa chạy `/brand` trong cùng session** → dùng lại data đã có (tên, màu, font, ngành).

**Nếu chưa có data** → hỏi nhanh 3 câu:
1. Tên thương hiệu là gì?
2. Màu chủ đạo? *(hex, tên màu, hoặc "Claude chọn")*
3. Ngành / lĩnh vực? *(để gợi ý style phù hợp)*

---

### Bước 2 — Discovery (2 câu)

**Câu 1:**
> "Brand này cần logo trông như thế nào? — VD: *chuyên nghiệp và công nghệ*, *vui vẻ và trẻ trung*, *sang trọng và tối giản*, *mạnh mẽ và bold*"

**Câu 2:**
> "Có element nào muốn thấy không? — VD: chữ cái tắt, hình học, biểu tượng cụ thể (robot, tia sáng, vòng tròn, mạng lưới...) hoặc để Claude quyết định"

---

### Bước 3 — 3 Directions

Generate 3 hướng thiết kế. Mỗi direction:
- SVG 80×80 hiển thị **inline trong chat** (không save file)
- Tên style ngắn + 1 dòng mô tả concept

**Direction styles:**
- **Lettermark** — chữ cái tắt với typography mạnh
- **Abstract Symbol** — hình học đại diện concept
- **Icon + Wordmark** — icon nhỏ kết hợp tên brand
- **Badge / Emblem** — logo trong khung hình học
- **Minimal Mark** — symbol đơn giản, tối giản cực đại
- **Network / Nodes** — phù hợp tech/AI brands
- **Wordmark Only** — tên brand với custom lettering

> "Anh/chị thích hướng nào? Có thể chọn 1 hoặc kết hợp từ nhiều hướng."

---

### Bước 4 — 3-4 Variations

Gen 3-4 biến thể: khác proportion, weight, accent, complexity.
Show **inline**, không save. Hỏi:
> "Approve biến thể nào, hay cần chỉnh gì thêm?"

Iterate thoải mái, không giới hạn vòng.

---

### Bước 5 — Finalize

Sau khi user approve:

1. `NGAY` = `YYYY-MM-DD`, `brand-slug` = tên lowercase bỏ dấu
2. Dùng Write tool ghi: `output/design/{NGAY}/{brand-slug}/logo/logo-final.svg`
3. Report:
   ```
   ✓ Logo: output/design/{NGAY}/{brand-slug}/logo/logo-final.svg
   ```
4. Hỏi: "Tạo brand book với logo này luôn không? (/brand — ~1 phút)"

---

## SVG Technical Standards

- **ViewBox:** icon vuông `0 0 80 80` · horizontal `0 0 200 60` · vertical `0 0 100 120`
- **Màu sắc:** hex thật — SVG standalone không support CSS variables
- **Typography:** `font-family="Inter, sans-serif"` — không import Google Fonts trong SVG
- **Scalability:** KHÔNG set `width`/`height` cố định — chỉ dùng `viewBox`

**References:** `skills/design-system/references/svg-patterns.md`

---

## Rules

```
❌ Không bịa màu, font, logo, tagline, principles
❌ Không redraw logo — dùng đúng SVG từ source hoặc text placeholder
❌ Không overflow A4 — tighten padding nếu content quá nhiều
❌ Không dùng framework, build tool, hay JS phức tạp
❌ Không gen quá 4 logo variations/lần
❌ Không dùng image API (DALL-E, fal.ai) — SVG only
✅ Luôn self-contained — Google Fonts CDN, inline CSS/SVG, no build step
✅ Luôn render PDF — hoàn chỉnh artifact, không bàn giao raw HTML
✅ Luôn hỏi hoặc fetch website trước khi gen — không bịa thông tin
✅ Luôn dùng Write tool để ghi file — không display content trong chat
✅ Drop section nếu không có source material
✅ Output path: output/design/{YYYY-MM-DD}/{brand-slug}/
```
