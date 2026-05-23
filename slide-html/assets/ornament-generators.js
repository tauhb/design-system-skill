/**
 * SVG Ornament Generators
 * Decorative borders, dividers, backgrounds, and ornaments
 *
 * Usage:
 *   generateTopBorder(color, style)
 *   generateDividerLine(color, pattern)
 *   generateCornerAccent(color, position)
 *   generateGradientBg(colors)
 */

/**
 * Top decorative border/rule
 */
function generateTopBorder(color = '#4f46e5', style = 'line', options = {}) {
  const { width = 300, height = 10 } = options;

  let svg = '';

  if (style === 'line') {
    svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"
           style="width:100%; height:${height}px;">
        <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}"
              stroke="${color}" stroke-width="3" />
      </svg>
    `;
  } else if (style === 'wave') {
    const amplitude = 5;
    let pathData = 'M 0 ' + height / 2;
    for (let x = 0; x <= width; x += 20) {
      pathData += ` Q ${x + 10} ${height / 2 - amplitude}, ${x + 20} ${height / 2}`;
    }
    svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"
           style="width:100%; height:${height}px;">
        <path d="${pathData}" stroke="${color}" stroke-width="2" fill="none" />
      </svg>
    `;
  } else if (style === 'dashes') {
    svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"
           style="width:100%; height:${height}px;">
        <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}"
              stroke="${color}" stroke-width="2" stroke-dasharray="8,4" />
      </svg>
    `;
  } else if (style === 'dots') {
    let dots = '';
    for (let x = 0; x < width; x += 15) {
      dots += `<circle cx="${x}" cy="${height / 2}" r="2" fill="${color}" />`;
    }
    svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"
           style="width:100%; height:${height}px;">
        ${dots}
      </svg>
    `;
  }

  return svg;
}

/**
 * Horizontal divider with optional text
 */
function generateDividerLine(color = '#e5e7eb', text = '', options = {}) {
  const { width = 400, textColor = '#6b7280', fontSize = 12 } = options;

  let svg = '';

  if (text) {
    const textLength = text.length * (fontSize * 0.5);
    const lineWidth = (width - textLength - 20) / 2;

    svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 40"
           style="width:100%; height:40px;">
        <line x1="0" y1="20" x2="${lineWidth}" y2="20"
              stroke="${color}" stroke-width="1" />
        <text x="${width / 2}" y="25" text-anchor="middle"
              font-size="${fontSize}" fill="${textColor}" font-weight="500">
          ${text}
        </text>
        <line x1="${width - lineWidth}" y1="20" x2="${width}" y2="20"
              stroke="${color}" stroke-width="1" />
      </svg>
    `;
  } else {
    svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 10"
           style="width:100%; height:10px;">
        <line x1="0" y1="5" x2="${width}" y2="5"
              stroke="${color}" stroke-width="1" />
      </svg>
    `;
  }

  return svg;
}

/**
 * Corner accent/flourish
 */
function generateCornerAccent(color = '#4f46e5', position = 'top-right', size = 60) {
  let path = '';

  if (position === 'top-right') {
    path = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"
           style="position:absolute; top:0; right:0; width:${size}px; height:${size}px;">
        <path d="M ${size} 0 Q ${size} ${size * 0.5} ${size * 0.7} ${size}"
              stroke="${color}" stroke-width="2" fill="none" opacity="0.3" />
        <circle cx="${size}" cy="0" r="3" fill="${color}" opacity="0.6" />
        <circle cx="${size * 0.7}" cy="${size}" r="3" fill="${color}" opacity="0.6" />
      </svg>
    `;
  } else if (position === 'top-left') {
    path = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"
           style="position:absolute; top:0; left:0; width:${size}px; height:${size}px;">
        <path d="M 0 0 Q 0 ${size * 0.5} ${size * 0.3} ${size}"
              stroke="${color}" stroke-width="2" fill="none" opacity="0.3" />
        <circle cx="0" cy="0" r="3" fill="${color}" opacity="0.6" />
        <circle cx="${size * 0.3}" cy="${size}" r="3" fill="${color}" opacity="0.6" />
      </svg>
    `;
  } else if (position === 'bottom-right') {
    path = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"
           style="position:absolute; bottom:0; right:0; width:${size}px; height:${size}px;">
        <path d="M ${size} ${size} Q ${size} ${size * 0.5} ${size * 0.7} 0"
              stroke="${color}" stroke-width="2" fill="none" opacity="0.3" />
        <circle cx="${size}" cy="${size}" r="3" fill="${color}" opacity="0.6" />
        <circle cx="${size * 0.7}" cy="0" r="3" fill="${color}" opacity="0.6" />
      </svg>
    `;
  } else if (position === 'bottom-left') {
    path = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"
           style="position:absolute; bottom:0; left:0; width:${size}px; height:${size}px;">
        <path d="M 0 ${size} Q 0 ${size * 0.5} ${size * 0.3} 0"
              stroke="${color}" stroke-width="2" fill="none" opacity="0.3" />
        <circle cx="0" cy="${size}" r="3" fill="${color}" opacity="0.6" />
        <circle cx="${size * 0.3}" cy="0" r="3" fill="${color}" opacity="0.6" />
      </svg>
    `;
  }

  return path;
}

/**
 * Background pattern as SVG
 */
function generatePatternBg(pattern = 'dots', color = 'rgba(79, 70, 229, 0.05)', options = {}) {
  const { width = 100, height = 100 } = options;

  let patternSvg = '';

  if (pattern === 'dots') {
    patternSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"
           style="width:100%; height:100%; position:fixed; top:0; left:0; z-index:-1;">
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="${color}" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    `;
  } else if (pattern === 'grid') {
    patternSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"
           style="width:100%; height:100%; position:fixed; top:0; left:0; z-index:-1;">
        <defs>
          <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="20" height="20" fill="none"
                  stroke="${color}" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    `;
  } else if (pattern === 'lines') {
    patternSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"
           style="width:100%; height:100%; position:fixed; top:0; left:0; z-index:-1;">
        <defs>
          <pattern id="lines" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="10" y2="10" stroke="${color}" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines)" />
      </svg>
    `;
  } else if (pattern === 'circles') {
    patternSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"
           style="width:100%; height:100%; position:fixed; top:0; left:0; z-index:-1;">
        <defs>
          <pattern id="circles" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="10" fill="none" stroke="${color}" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circles)" />
      </svg>
    `;
  }

  return patternSvg;
}

/**
 * Gradient background CSS
 */
function generateGradientBg(colors = ['#4f46e5', '#06b6d4'], direction = '135deg', options = {}) {
  if (Array.isArray(colors) && colors.length >= 2) {
    const colorStops = colors.map((c, i) => `${c} ${(i / (colors.length - 1)) * 100}%`).join(', ');
    return `linear-gradient(${direction}, ${colorStops})`;
  }
  return `linear-gradient(${direction}, ${colors[0]}, ${colors[0]})`;
}

/**
 * Radial burst/starburst
 */
function generateBurst(color = '#fbbf24', rays = 12, options = {}) {
  const { radius = 100, size = 200 } = options;

  let rays_svg = '';
  const angleStep = 360 / rays;

  for (let i = 0; i < rays; i++) {
    const angle = i * angleStep;
    const rad = (angle * Math.PI) / 180;

    const x1 = size / 2;
    const y1 = size / 2;
    const x2 = size / 2 + radius * Math.cos(rad);
    const y2 = size / 2 + radius * Math.sin(rad);

    const opacity = 0.3 + (i % 3) * 0.2;

    rays_svg += `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
            stroke="${color}" stroke-width="2" opacity="${opacity}" />
    `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"
         style="width:${size}px; height:${size}px;">
      ${rays_svg}
      <circle cx="${size / 2}" cy="${size / 2}" r="8" fill="${color}" />
    </svg>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateTopBorder,
    generateDividerLine,
    generateCornerAccent,
    generatePatternBg,
    generateGradientBg,
    generateBurst,
  };
}
