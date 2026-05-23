/**
 * SVG Chart Generators
 * Generate bar, pie, and line charts as inline SVG
 *
 * Usage:
 *   generateBarChart([{label:'Q1',value:100}, ...], '#4f46e5')
 *   generatePieChart([{label:'A',value:30}, ...], ['#ff6b6b', '#4f46e5'])
 *   generateLineChart([{x:'Jan',y:10}, ...], '#4f46e5')
 */

/**
 * Bar Chart - Vertical bars with labels
 */
function generateBarChart(data, colors = {}, options = {}) {
  const {
    width = 400,
    height = 300,
    barColor = '#4f46e5',
    textColor = '#666',
    padding = 40,
    fontSize = 12,
  } = options;

  if (!data || data.length === 0) return '';

  const maxValue = Math.max(...data.map(d => d.value || 0));
  const barWidth = (width - padding * 2) / data.length * 0.7;
  const barSpacing = (width - padding * 2) / data.length;

  let bars = '';
  let labels = '';

  data.forEach((item, i) => {
    const x = padding + i * barSpacing + barSpacing / 2 - barWidth / 2;
    const barHeight = (item.value / maxValue) * (height - padding * 2);
    const y = height - padding - barHeight;

    const color = Array.isArray(colors) ? colors[i % colors.length] : barColor;

    bars += `
      <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}"
            fill="${color}" rx="4" data-anim="fade-up" style="--d:${i + 1}">
        <title>${item.label}: ${item.value}</title>
      </rect>
      <text x="${x + barWidth/2}" y="${height - padding + 20}"
            text-anchor="middle" font-size="${fontSize}" fill="${textColor}">
        ${item.label}
      </text>
    `;

    // Value label on top of bar
    labels += `
      <text x="${x + barWidth/2}" y="${y - 5}"
            text-anchor="middle" font-size="${fontSize - 2}"
            fill="${textColor}" font-weight="600">
        ${item.value}
      </text>
    `;
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"
         style="width:100%; max-width:500px; height:auto;">
      ${bars}
      ${labels}
    </svg>
  `;
}

/**
 * Pie Chart - Donut/pie with labels
 */
function generatePieChart(data, colors = [], options = {}) {
  const {
    width = 300,
    height = 300,
    innerRadius = 50,
    outerRadius = 100,
    textColor = '#666',
  } = options;

  if (!data || data.length === 0) return '';

  const cx = width / 2;
  const cy = height / 2;
  const total = data.reduce((sum, d) => sum + (d.value || 0), 0);

  let slices = '';
  let labels = '';
  let currentAngle = 0;

  data.forEach((item, i) => {
    const sliceAngle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    const color = colors[i % colors.length] || '#' + Math.floor(Math.random()*16777215).toString(16);

    // Create pie slice
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + outerRadius * Math.cos(startRad);
    const y1 = cy + outerRadius * Math.sin(startRad);
    const x2 = cx + outerRadius * Math.cos(endRad);
    const y2 = cy + outerRadius * Math.sin(endRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    const pathData = `
      M ${cx} ${cy}
      L ${x1} ${y1}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
      Z
    `;

    slices += `
      <path d="${pathData}" fill="${color}" stroke="white" stroke-width="2"
            data-anim="scale-in" style="--d:${i + 1}">
        <title>${item.label}: ${item.value}</title>
      </path>
    `;

    // Label positioned around pie
    const labelAngle = startAngle + sliceAngle / 2;
    const labelRad = (labelAngle * Math.PI) / 180;
    const labelRadius = (outerRadius + innerRadius) / 2;
    const labelX = cx + labelRadius * Math.cos(labelRad);
    const labelY = cy + labelRadius * Math.sin(labelRad);

    labels += `
      <text x="${labelX}" y="${labelY}" text-anchor="middle" font-size="12"
            font-weight="600" fill="white" pointer-events="none">
        ${Math.round((item.value / total) * 100)}%
      </text>
    `;

    currentAngle = endAngle;
  });

  // Legend
  let legend = '';
  let legendY = height - 40;
  data.forEach((item, i) => {
    const color = colors[i % colors.length] || '#' + Math.floor(Math.random()*16777215).toString(16);
    const legendX = 20;
    legend += `
      <rect x="${legendX}" y="${legendY - 4}" width="12" height="12" fill="${color}" />
      <text x="${legendX + 18}" y="${legendY + 4}" font-size="11" fill="${textColor}">
        ${item.label}
      </text>
    `;
    legendY += 16;
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height + 50}"
         style="width:100%; max-width:400px; height:auto;">
      ${slices}
      ${labels}
      ${legend}
    </svg>
  `;
}

/**
 * Line Chart - Connected data points with grid
 */
function generateLineChart(data, color = '#4f46e5', options = {}) {
  const {
    width = 400,
    height = 250,
    lineColor = color,
    textColor = '#666',
    padding = 40,
    showGrid = true,
    fontSize = 11,
  } = options;

  if (!data || data.length === 0) return '';

  const maxValue = Math.max(...data.map(d => d.y || 0));
  const minValue = Math.min(...data.map(d => d.y || 0));
  const range = maxValue - minValue || 1;

  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  // Generate grid lines
  let grid = '';
  if (showGrid) {
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i * plotHeight) / 4;
      const value = Math.round(maxValue - (i * range) / 4);
      grid += `
        <line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}"
              stroke="#e5e7eb" stroke-width="1" stroke-dasharray="2,2" />
        <text x="${padding - 35}" y="${y + 4}" text-anchor="end" font-size="${fontSize}"
              fill="${textColor}">${value}</text>
      `;
    }
  }

  // Generate line path
  let points = '';
  let path = `M`;

  data.forEach((item, i) => {
    const x = padding + (i / (data.length - 1 || 1)) * plotWidth;
    const y = height - padding - ((item.y - minValue) / range) * plotHeight;

    if (i === 0) {
      path += ` ${x} ${y}`;
    } else {
      path += ` L ${x} ${y}`;
    }

    // Point circle
    points += `
      <circle cx="${x}" cy="${y}" r="4" fill="${lineColor}"
              stroke="white" stroke-width="2" data-anim="scale-in"
              style="--d:${i + 1}">
        <title>${item.x}: ${item.y}</title>
      </circle>
    `;
  });

  // X-axis labels
  let xLabels = '';
  data.forEach((item, i) => {
    if (i % Math.ceil(data.length / 5) === 0 || i === data.length - 1) {
      const x = padding + (i / (data.length - 1 || 1)) * plotWidth;
      xLabels += `
        <text x="${x}" y="${height - 15}" text-anchor="middle" font-size="${fontSize}"
              fill="${textColor}">${item.x}</text>
      `;
    }
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"
         style="width:100%; max-width:500px; height:auto;">
      ${grid}
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}"
            y2="${height - padding}" stroke="#000" stroke-width="2" />
      <line x1="${padding}" y1="${padding}" x2="${padding}"
            y2="${height - padding}" stroke="#000" stroke-width="2" />
      <path d="${path}" stroke="${lineColor}" stroke-width="2.5" fill="none"
            stroke-linecap="round" stroke-linejoin="round" />
      ${points}
      ${xLabels}
    </svg>
  `;
}

/**
 * Simple progress bar
 */
function generateProgressBar(value, max = 100, color = '#4f46e5', options = {}) {
  const {
    width = 300,
    height = 20,
    label = `${Math.round((value / max) * 100)}%`,
  } = options;

  const percentage = (value / max) * 100;

  return `
    <div style="display:flex; align-items:center; gap:12px;">
      <div style="flex:1; height:${height}px; background:#e5e7eb; border-radius:10px; overflow:hidden;">
        <div style="height:100%; width:${percentage}%; background:${color}; transition:width 0.3s ease;"
             data-anim="reveal-r"></div>
      </div>
      <span style="min-width:50px; text-align:right; font-weight:600;">${label}</span>
    </div>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateBarChart,
    generatePieChart,
    generateLineChart,
    generateProgressBar,
  };
}
