/**
 * SVG Diagram Generators
 * Generate flowcharts, timelines, process diagrams
 *
 * Usage:
 *   generateFlowchart([{id:'1',label:'Start'}, ...])
 *   generateTimeline([{year:'2020',title:'Founded'}, ...])
 *   generateProcessSteps([{num:1,title:'Plan'}, ...])
 */

/**
 * Horizontal Flowchart with boxes and arrows
 */
function generateFlowchart(nodes, color = '#4f46e5', options = {}) {
  const {
    width = 800,
    height = 200,
    boxWidth = 140,
    boxHeight = 60,
    textColor = '#1f2937',
    bgColor = '#f3f4f6',
  } = options;

  if (!nodes || nodes.length === 0) return '';

  const spacing = (width - 100) / (nodes.length - 1 || 1);
  let boxes = '';
  let arrows = '';

  nodes.forEach((node, i) => {
    const x = 50 + i * spacing - boxWidth / 2;
    const y = (height - boxHeight) / 2;

    // Box
    boxes += `
      <g data-anim="fade-up" style="--d:${i + 1}">
        <rect x="${x}" y="${y}" width="${boxWidth}" height="${boxHeight}"
              fill="${bgColor}" stroke="${color}" stroke-width="2" rx="8" />
        <text x="${x + boxWidth / 2}" y="${y + boxHeight / 2}"
              text-anchor="middle" dominant-baseline="middle"
              font-size="12" font-weight="600" fill="${textColor}">
          ${node.label}
        </text>
      </g>
    `;

    // Arrow to next node
    if (i < nodes.length - 1) {
      const x1 = x + boxWidth;
      const x2 = 50 + (i + 1) * spacing - boxWidth / 2;
      const y1 = y + boxHeight / 2;

      arrows += `
        <line x1="${x1}" y1="${y1}" x2="${x2 - 15}" y2="${y1}"
              stroke="${color}" stroke-width="2" />
        <polygon points="${x2 - 10},${y1} ${x2 - 15},${y1 - 5} ${x2 - 15},${y1 + 5}"
                 fill="${color}" />
      `;
    }
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"
         style="width:100%; height:auto;">
      ${arrows}
      ${boxes}
    </svg>
  `;
}

/**
 * Vertical Timeline
 */
function generateTimeline(events, color = '#4f46e5', options = {}) {
  const {
    width = 300,
    lineColor = '#e5e7eb',
    textColor = '#1f2937',
    fontSize = 13,
  } = options;

  if (!events || events.length === 0) return '';

  const itemHeight = 100;
  const height = events.length * itemHeight + 40;
  const centerX = 50;

  let items = '';

  events.forEach((event, i) => {
    const y = 40 + i * itemHeight;

    // Timeline dot
    items += `
      <circle cx="${centerX}" cy="${y}" r="8" fill="${color}"
              stroke="white" stroke-width="2" data-anim="scale-in"
              style="--d:${i + 1}" />
    `;

    // Connector line
    if (i < events.length - 1) {
      items += `
        <line x1="${centerX}" y1="${y + 8}" x2="${centerX}" y2="${y + itemHeight - 8}"
              stroke="${lineColor}" stroke-width="2" />
      `;
    }

    // Content
    items += `
      <g data-anim="fade-up" style="--d:${i + 1}">
        <text x="${centerX + 30}" y="${y - 8}" font-size="${fontSize}"
              font-weight="700" fill="${color}">
          ${event.year}
        </text>
        <text x="${centerX + 30}" y="${y + 12}" font-size="${fontSize - 1}"
              fill="${textColor}" font-weight="500">
          ${event.title}
        </text>
        ${
          event.description
            ? `<text x="${centerX + 30}" y="${y + 28}" font-size="${fontSize - 2}"
                     fill="#9ca3af" width="200">${event.description}</text>`
            : ''
        }
      </g>
    `;
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"
         style="width:100%; max-width:350px; height:auto;">
      ${items}
    </svg>
  `;
}

/**
 * Process Steps with numbered circles and connecting line
 */
function generateProcessSteps(steps, color = '#4f46e5', options = {}) {
  const {
    width = 600,
    height = 150,
    circleRadius = 30,
    textColor = '#1f2937',
  } = options;

  if (!steps || steps.length === 0) return '';

  const spacing = (width - 100) / (steps.length - 1 || 1);
  let circles = '';
  let lines = '';
  let labels = '';

  // Connecting line
  const y = height / 2;
  lines += `
    <line x1="50" y1="${y}" x2="${width - 50}" y2="${y}"
          stroke="#e5e7eb" stroke-width="3" />
  `;

  steps.forEach((step, i) => {
    const x = 50 + i * spacing;

    // Circle
    circles += `
      <g data-anim="scale-in" style="--d:${i + 1}">
        <circle cx="${x}" cy="${y}" r="${circleRadius}" fill="${color}"
                stroke="white" stroke-width="3" />
        <text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle"
              font-size="20" font-weight="700" fill="white">
          ${step.num}
        </text>
      </g>
    `;

    // Label below
    labels += `
      <text x="${x}" y="${y + circleRadius + 25}" text-anchor="middle"
            font-size="12" font-weight="600" fill="${textColor}">
        ${step.title}
      </text>
    `;

    if (step.description) {
      labels += `
        <text x="${x}" y="${y + circleRadius + 42}" text-anchor="middle"
              font-size="11" fill="#9ca3af">
          ${step.description}
        </text>
      `;
    }
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height + 60}"
         style="width:100%; height:auto;">
      ${lines}
      ${circles}
      ${labels}
    </svg>
  `;
}

/**
 * Comparison Two-Column Layout
 */
function generateComparison(items, colors = ['#ef4444', '#22c55e'], options = {}) {
  const {
    width = 500,
    height = 400,
    title1 = 'Option A',
    title2 = 'Option B',
    textColor = '#1f2937',
    dividerColor = '#d1d5db',
  } = options;

  if (!items || items.length === 0) return '';

  const colWidth = (width - 40) / 2;
  const itemHeight = 60;
  const padding = 20;

  let columns = '';

  // Headers
  columns += `
    <rect x="${padding}" y="${padding}" width="${colWidth}" height="40"
          fill="${colors[0]}" opacity="0.1" rx="4" />
    <text x="${padding + colWidth / 2}" y="${padding + 25}" text-anchor="middle"
          font-size="14" font-weight="700" fill="${colors[0]}">
      ${title1}
    </text>

    <line x1="${padding + colWidth + 10}" y1="${padding}" x2="${padding + colWidth + 10}"
          y2="${height - padding}" stroke="${dividerColor}" stroke-width="2" />

    <rect x="${padding + colWidth + 20}" y="${padding}" width="${colWidth}" height="40"
          fill="${colors[1]}" opacity="0.1" rx="4" />
    <text x="${padding + colWidth + 20 + colWidth / 2}" y="${padding + 25}"
          text-anchor="middle" font-size="14" font-weight="700" fill="${colors[1]}">
      ${title2}
    </text>
  `;

  // Items
  items.forEach((item, i) => {
    const y = padding + 50 + i * itemHeight;

    // Left item
    if (item.left) {
      columns += `
        <g data-anim="fade-up" style="--d:${i + 1}">
          <circle cx="${padding + 15}" cy="${y + 15}" r="4" fill="${colors[0]}" />
          <text x="${padding + 30}" y="${y + 18}" font-size="12" fill="${textColor}">
            ${item.left}
          </text>
        </g>
      `;
    }

    // Right item
    if (item.right) {
      columns += `
        <g data-anim="fade-up" style="--d:${i + 1}">
          <circle cx="${padding + colWidth + 35}" cy="${y + 15}" r="4" fill="${colors[1]}" />
          <text x="${padding + colWidth + 50}" y="${y + 18}" font-size="12" fill="${textColor}">
            ${item.right}
          </text>
        </g>
      `;
    }
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"
         style="width:100%; max-width:550px; height:auto;">
      <rect x="${padding}" y="${padding}" width="${width - padding * 2}"
            height="${height - padding * 2}" fill="none" stroke="${dividerColor}"
            stroke-width="1" rx="8" />
      ${columns}
    </svg>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateFlowchart,
    generateTimeline,
    generateProcessSteps,
    generateComparison,
  };
}
