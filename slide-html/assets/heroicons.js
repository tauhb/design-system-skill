/**
 * Heroicons Outline Collection
 * MIT License - https://heroicons.com
 *
 * Usage: heroicons['star'] returns SVG string
 * Size: viewBox="0 0 24 24", use with width="clamp(1rem, 2vw, 2rem)"
 * Color: stroke="currentColor" — inherits slide text color
 */

const heroicons = {
  star: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.734 20.84a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>`,

  'chart-bar': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75h-2.25A1.125 1.125 0 013 19.125v-6zm0-3C3 9.504 3.504 9 4.125 9h2.25a.75.75 0 01.75.75v9.75a.75.75 0 01-.75.75h-2.25A1.125 1.125 0 013 16.125V10.125zm6.75.75a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v15.75a.75.75 0 01-.75.75h-2.25a.75.75 0 01-.75-.75V10.875zm6.75 0a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75V18a.75.75 0 01-.75.75h-2.25a.75.75 0 01-.75-.75V10.875z" /></svg>`,

  'presentation-chart-line': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75h-2.25A1.125 1.125 0 013 19.125v-6zm0-3C3 9.504 3.504 9 4.125 9h2.25a.75.75 0 01.75.75v9.75a.75.75 0 01-.75.75h-2.25A1.125 1.125 0 013 16.125V10.125zm6.75.75a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v15.75a.75.75 0 01-.75.75h-2.25a.75.75 0 01-.75-.75V10.875zm6.75 0a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75V18a.75.75 0 01-.75.75h-2.25a.75.75 0 01-.75-.75V10.875z" /></svg>`,

  'check-circle': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,

  'x-circle': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,

  'arrow-right': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>`,

  'arrow-down': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 19.5v-6m16.5 0l-9-9m0 0l-9 9" /></svg>`,

  'lightning-bolt': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>`,

  'sparkles': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09l-.813 2.846zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.035-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>`,

  'users': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 001.591-.319m-6.694-5.36a18.45 18.45 0 01-2.596-5.84m14.856 6.022a7.498 7.498 0 10-13.986-8.722 7.498 7.498 0 0013.986 8.722zM9 18.894a4.5 4.5 0 018.646-1.556m0 0a21.023 21.023 0 001.982-3.516A4.5 4.5 0 009 18.894" /></svg>`,

  'cog-6-tooth': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.592a.75.75 0 010 1.5h-.191c.351.182.703.346 1.037.494.624.304 1.06.957 1.06 1.674v.099a.75.75 0 01-.75.75h-.599a.75.75 0 00-.75.75v.75c0 .414.336.75.75.75h.599a.75.75 0 01.75.75v.099c0 .717-.436 1.37-1.06 1.674a6.73 6.73 0 01-1.037.494h.191a.75.75 0 010 1.5h-2.592a1.11 1.11 0 01-1.11-.94l-.213-1.281c-.512.646-.844 1.467-.844 2.368.0.901.332 1.722.844 2.368l.213 1.281c.09.542.56.94 1.11.94h2.592a.75.75 0 010-1.5h-.191c.351-.182.703-.346 1.037-.494.624-.304 1.06-.957 1.06-1.674v-.099a.75.75 0 01.75-.75h.599a.75.75 0 00.75-.75v-.75a.75.75 0 00-.75-.75h-.599a.75.75 0 01-.75-.75v-.099c0-.717.436-1.37 1.06-1.674.334-.148.686-.312 1.037-.494h-.191a.75.75 0 010-1.5h2.592a1.11 1.11 0 001.11.94l.213 1.281c.512-.646.844-1.467.844-2.368 0-.901-.332-1.722-.844-2.368l-.213-1.281c-.09-.542-.56-.94-1.11-.94h-2.592a.75.75 0 010-1.5h.191a6.73 6.73 0 01-1.037-.494 1.748 1.748 0 00-1.06-1.674v.099a.75.75 0 00-.75.75h-.599a.75.75 0 01-.75-.75v-.75a.75.75 0 01.75-.75h.599a.75.75 0 00.75-.75v-.099c0-.717-.436-1.37-1.06-1.674A6.73 6.73 0 009.404 3.94z" /></svg>`,

  'book-open': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3.042.525A9.006 9.006 0 002.25 9m12 0a9.006 9.006 0 01-9-9m9 9h.008v.008H12v-.008zM12 15a6.002 6.002 0 10-12 0 6.002 6.002 0 0012 0zm0 6a.75.75 0 110-1.5.75.75 0 010 1.5z" /></svg>`,

  'gift': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,

  'target': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A9.959 9.959 0 015.41 2.6A10.02 10.02 0 003 12c0 5.591 3.824 10.29 9 11.622m7-15.428a10.01 10.01 0 00-9-8.594" /></svg>`,

  'rocket-launch': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38A6.065 6.065 0 016 12.75 6.065 6.065 0 0121.75 12a6 6 0 01-6.16 2.37m7.07-7.07a6 6 0 00-8.465-8.465m5.657 5.657a4 4 0 11-5.656-5.656m1.5 2.757l-2.757 2.757" /></svg>`,

  'fire': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.494.574 2.812 1.613 3.653 2.906.96 1.488 1.554 3.248 1.554 5.112 0 5.373-4.164 9.754-9.254 9.754C5.896 21.094 2 17.203 2 12.23 2 9.166 3.275 6.437 5.28 4.564" /></svg>`,

  'lightbulb': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.892m-6 11.108A6.01 6.01 0 009 12.75m0 0a6 6 0 10-9 0" /></svg>`,

  'heart': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>`,

  'hand-thumb-up': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00-.286-4.957A9.001 9.001 0 0012 2.25c-4.487 0-8.374 3.365-8.889 7.743a2.25 2.25 0 003.922 2.007z" /></svg>`,

  'folder': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5a1.125 1.125 0 001-1.618m-3.75 5.418a4.5 4.5 0 00-1.141 7.143m9.75-8.06a4.5 4.5 0 10-8.772 4.992M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm6-7.5H9.375A4.875 4.875 0 004.5 12v8.25a4.5 4.5 0 004.5 4.5h9a4.5 4.5 0 004.5-4.5V4.5A4.5 4.5 0 0019.5 0z" /></svg>`,

  'document': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0013.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>`,

  'clock': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5-15a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,

  'globe': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21c2.485 0 4.834-.348 7.084-1.008M12 21c-2.485 0-4.834-.348-7.084-1.008M12 5.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5m7.5 0a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5m-15 0a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" /></svg>`,
};

/**
 * Helper function to embed icon with custom styling
 */
function getIcon(name, color = 'currentColor', size = 'clamp(1rem, 2vw, 2rem)') {
  const svg = heroicons[name];
  if (!svg) return `<!-- Icon "${name}" not found -->`;

  return svg.replace(
    '<svg',
    `<svg width="${size}" height="${size}" style="color:${color}"`
  );
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { heroicons, getIcon };
}
