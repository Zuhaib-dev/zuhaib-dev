const fs = require('fs');
const https = require('https');

const AVATAR_URL = 'https://github.com/Zuhaib-dev.png?size=200';

https.get(AVATAR_URL, (res) => {
  let data = [];

  res.on('data', (chunk) => {
    data.push(chunk);
  });

  res.on('end', () => {
    const buffer = Buffer.concat(data);
    const base64Image = buffer.toString('base64');
    
    const svg = `
<svg width="850" height="400" viewBox="0 0 850 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Grid Pattern -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00ffff" stroke-width="0.5" stroke-opacity="0.2"/>
    </pattern>

    <style>
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&amp;display=swap');
      
      .hud-text { font-family: 'Share Tech Mono', monospace; }
      
      /* Glitch Animation */
      @keyframes glitch-anim-1 {
        0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
        20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
        40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
        60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
        80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
        100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
      }
      
      @keyframes glitch-anim-2 {
        0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
        20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 2px); }
        40% { clip-path: inset(70% 0 10% 0); transform: translate(1px, -2px); }
        60% { clip-path: inset(20% 0 50% 0); transform: translate(-1px, 1px); }
        80% { clip-path: inset(50% 0 30% 0); transform: translate(2px, 1px); }
        100% { clip-path: inset(5% 0 80% 0); transform: translate(-2px, -1px); }
      }

      .glitch-text-main {
        font-size: 52px; font-weight: bold; fill: #ffffff;
        text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
      }
      
      .glitch-layer-1 {
        font-size: 52px; font-weight: bold; fill: #ff0055;
        animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
      }
      
      .glitch-layer-2 {
        font-size: 52px; font-weight: bold; fill: #00ffff;
        animation: glitch-anim-2 3s infinite linear alternate-reverse;
      }
      
      /* HUD Rotation */
      @keyframes rotate-cw { 100% { transform: rotate(360deg); } }
      @keyframes rotate-ccw { 100% { transform: rotate(-360deg); } }
      
      .ring-1 { transform-origin: 200px 200px; animation: rotate-cw 15s linear infinite; }
      .ring-2 { transform-origin: 200px 200px; animation: rotate-ccw 20s linear infinite; }
      .ring-3 { transform-origin: 200px 200px; animation: rotate-cw 10s linear infinite; }
      
      /* Avatar Hexagon Mask */
      .avatar-hex {
        clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
      }

      /* Bar Equalizer */
      @keyframes eq {
        0%, 100% { transform: scaleY(0.2); }
        50% { transform: scaleY(1); }
      }
      .bar { transform-origin: bottom; fill: #00ffff; }
      
      .hud-title { fill: #00ffff; font-size: 16px; letter-spacing: 2px; }
      .hud-val { fill: #ff0055; font-size: 14px; }
      
      /* Background Grid movement */
      @keyframes pan-grid {
        0% { transform: translateY(0); }
        100% { transform: translateY(40px); }
      }
      .grid-bg { animation: pan-grid 2s linear infinite; }
    </style>

    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Base Background -->
  <rect width="850" height="400" fill="#050914" />
  
  <!-- Moving Grid -->
  <g class="grid-bg">
    <rect x="-40" y="-40" width="930" height="480" fill="url(#grid)" />
  </g>
  
  <!-- Vignette overlay for depth -->
  <rect width="850" height="400" fill="none" stroke="#00ffff" stroke-width="4" stroke-opacity="0.3" />
  <rect width="850" height="400" fill="none" stroke="#ff0055" stroke-width="1" stroke-opacity="0.5" transform="scale(0.98) translate(8, 4)" />

  <!-- LEFT SIDE: AVATAR & RINGS (Center at 200, 200) -->
  
  <g class="ring-1">
    <circle cx="200" cy="200" r="140" fill="none" stroke="#00ffff" stroke-width="2" stroke-dasharray="20 10 50 20" stroke-opacity="0.5"/>
    <circle cx="200" cy="200" r="130" fill="none" stroke="#00ffff" stroke-width="1" stroke-dasharray="10 30" stroke-opacity="0.8"/>
  </g>
  
  <g class="ring-2">
    <circle cx="200" cy="200" r="115" fill="none" stroke="#ff0055" stroke-width="3" stroke-dasharray="100 40 10 40" />
    <path d="M 200 85 L 210 75 L 190 75 Z" fill="#ff0055" />
    <path d="M 200 315 L 210 325 L 190 325 Z" fill="#ff0055" />
  </g>
  
  <g class="ring-3">
    <circle cx="200" cy="200" r="100" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="4 6" stroke-opacity="0.4"/>
  </g>
  
  <!-- Hexagonal Profile Image -->
  <g transform="translate(100, 100)">
    <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="#00ffff" opacity="0.1" transform="scale(2)" />
    <!-- Avatar Base64 Image inside Hexagon -->
    <image href="data:image/png;base64,${base64Image}" x="12" y="12" width="176" height="176" class="avatar-hex" />
    <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="#00ffff" stroke-width="4" transform="scale(2)" filter="url(#glow)" />
  </g>

  <!-- RIGHT SIDE: TEXT & DATA -->
  
  <!-- System Status -->
  <g transform="translate(380, 70)" class="hud-text">
    <text x="0" y="0" fill="#00ffff" font-size="14" font-weight="bold">> SYSTEM.STATUS : <tspan fill="#ff0055" style="animation: blink 1s step-end infinite;">ONLINE</tspan></text>
    <text x="0" y="20" fill="#00ffff" font-size="12" opacity="0.7">INITIALIZING PROTOCOLS... [100%]</text>
    <style>@keyframes blink { 50% { opacity: 0; } }</style>
  </g>
  
  <!-- Glitch Name -->
  <g transform="translate(380, 150)" class="hud-text">
    <text x="0" y="0" class="glitch-layer-1">ZUHAIB RASHID</text>
    <text x="0" y="0" class="glitch-layer-2">ZUHAIB RASHID</text>
    <text x="0" y="0" class="glitch-text-main">ZUHAIB RASHID</text>
    <text x="5" y="30" fill="#ff0055" font-size="20" font-weight="bold" letter-spacing="4">FRONTEND ENGINEER</text>
  </g>
  
  <!-- Skill Data Nodes -->
  <g transform="translate(380, 240)" class="hud-text">
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="80" height="4" fill="#00ffff" />
      <text x="0" y="20" class="hud-title">CORE.STACK</text>
      <text x="0" y="40" class="hud-val">REACT / NEXT.JS</text>
    </g>
    
    <g transform="translate(150, 0)">
      <rect x="0" y="0" width="80" height="4" fill="#ff0055" />
      <text x="0" y="20" class="hud-title">STYLING</text>
      <text x="0" y="40" class="hud-val">TAILWIND / GSAP</text>
    </g>
    
    <g transform="translate(300, 0)">
      <rect x="0" y="0" width="80" height="4" fill="#ffffff" />
      <text x="0" y="20" class="hud-title">FOCUS</text>
      <text x="0" y="40" class="hud-val">AI INTEGRATION</text>
    </g>
  </g>
  
  <!-- Animated Equalizer Bars -->
  <g transform="translate(380, 360)">
    <rect class="bar" x="0" y="-30" width="8" height="30" style="animation: eq 1s ease-in-out infinite alternate 0.1s;" />
    <rect class="bar" x="12" y="-30" width="8" height="30" style="animation: eq 1s ease-in-out infinite alternate 0.4s;" />
    <rect class="bar" x="24" y="-30" width="8" height="30" style="animation: eq 1s ease-in-out infinite alternate 0.2s;" />
    <rect class="bar" x="36" y="-30" width="8" height="30" style="animation: eq 1s ease-in-out infinite alternate 0.6s;" />
    <rect class="bar" x="48" y="-30" width="8" height="30" style="animation: eq 1s ease-in-out infinite alternate 0.3s;" />
    <rect class="bar" x="60" y="-30" width="8" height="30" style="animation: eq 1s ease-in-out infinite alternate 0.5s;" />
    <rect class="bar" x="72" y="-30" width="8" height="30" style="animation: eq 1s ease-in-out infinite alternate 0.1s;" />
  </g>
  
  <!-- Cyberpunk Bar code block thing on the far right -->
  <g transform="translate(750, 60)">
    <rect width="40" height="4" fill="#00ffff" />
    <rect y="10" width="30" height="4" fill="#00ffff" />
    <rect y="20" width="40" height="4" fill="#ff0055" />
    <rect y="30" width="20" height="4" fill="#00ffff" />
    <rect y="40" width="40" height="4" fill="#ffffff" />
  </g>
</svg>
`;
    
    fs.writeFileSync('banner.svg', svg.trim());
    console.log('banner.svg generated with crazy HUD effect!');
  });
}).on('error', (err) => {
  console.error('Error fetching avatar:', err.message);
});
