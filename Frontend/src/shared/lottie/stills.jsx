// Still drawings shown while an animation loads, when it cannot load, or when
// the viewer asked for reduced motion. No imports: they must always render.
const Frame = ({ children }) => (
  <svg viewBox="0 0 240 240" width="100%" height="100%" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {children}
  </svg>
)

export const EmptyBasketStill = () => (
  <Frame>
    <circle cx="120" cy="120" r="106" fill="#eef9dd" />
    <g transform="translate(120 194) scale(0.968 1) translate(-120 -194)">
      <ellipse cx="120" cy="194" rx="58" ry="6" fill="#061a5c" fillOpacity="0.14" />
    </g>
    <g transform="translate(120 190) rotate(3.6) translate(-120 -190)">
      <path d="M82 106 C82 38 158 38 158 106" fill="none" stroke="#061a5c" strokeWidth="8" />
      <path d="M64 112 L176 112 L167 176 C165.7 185.3 160.3 190 151 190 L89 190 C79.7 190 74.3 185.3 73 176 L64 112 Z" fill="#59c414" stroke="#061a5c" strokeWidth="6" />
      <path d="M96 134 L99 172" fill="none" stroke="#ffffff" strokeWidth="7" />
      <path d="M120 134 L120 172" fill="none" stroke="#ffffff" strokeWidth="7" />
      <path d="M144 134 L141 172" fill="none" stroke="#ffffff" strokeWidth="7" />
      <rect x="54" y="98" width="132" height="22" rx="11" fill="#b6f23c" stroke="#061a5c" strokeWidth="6" />
    </g>
    <g transform="translate(197.6 83.6) rotate(-9.1)">
      <path d="M0 -15 C13 -9 13 8 0 15 C-13 8 -13 -9 0 -15 Z" fill="#59c414" stroke="#061a5c" strokeWidth="4" />
      <path d="M0 -6 L0 20" fill="none" stroke="#061a5c" strokeWidth="3.5" />
    </g>
  </Frame>
)

export const SearchingStill = () => (
  <Frame>
    <circle cx="120" cy="120" r="106" fill="#eef9dd" />
    <g transform="translate(120 120) translate(-120 -120)">
      <rect x="58" y="56" width="124" height="128" rx="16" fill="#ffffff" stroke="#061a5c" strokeWidth="6" />
      <rect x="74" y="74" width="26" height="26" rx="8" fill="#b6f23c" />
      <rect x="74" y="108" width="26" height="26" rx="8" fill="#b6f23c" />
      <rect x="74" y="142" width="26" height="26" rx="8" fill="#b6f23c" />
      <path d="M114 81 L164 81" fill="none" stroke="#59c414" strokeWidth="7" />
      <path d="M114 115 L156 115" fill="none" stroke="#59c414" strokeWidth="7" />
      <path d="M114 149 L162 149" fill="none" stroke="#59c414" strokeWidth="7" />
      <path d="M114 94 L142 94" fill="none" stroke="#061a5c" strokeWidth="5" strokeOpacity="0.22" />
      <path d="M114 128 L138 128" fill="none" stroke="#061a5c" strokeWidth="5" strokeOpacity="0.22" />
      <path d="M114 162 L144 162" fill="none" stroke="#061a5c" strokeWidth="5" strokeOpacity="0.22" />
    </g>
    <g transform="translate(148 96) rotate(8)">
      <path d="M24 24 L50 50" fill="none" stroke="#061a5c" strokeWidth="15" />
      <path d="M34 34 L50 50" fill="none" stroke="#59c414" strokeWidth="7" />
      <circle cx="0" cy="0" r="31" fill="#ffffff" fillOpacity="0.82" stroke="#061a5c" strokeWidth="8" />
      <path d="M-18 -4 C-16 -13 -10 -18 -2 -19" fill="none" stroke="#b6f23c" strokeWidth="6" />
    </g>
  </Frame>
)

export const OrderPlacedStill = () => (
  <Frame>
    <g transform="translate(207.6 111.3) rotate(-145.6)">
      <circle cx="0" cy="0" r="5.5" fill="#b6f23c" />
    </g>
    <g transform="translate(202.7 168.8) rotate(155.9)">
      <rect x="-4" y="-7" width="8" height="14" rx="3" fill="#59c414" />
    </g>
    <g transform="translate(200.5 185.8) rotate(-166.1)">
      <rect x="-5" y="-5" width="10" height="10" rx="3" fill="#061a5c" />
    </g>
    <g transform="translate(143 209.1) rotate(178.4)">
      <circle cx="0" cy="0" r="5.5" fill="#b6f23c" />
    </g>
    <g transform="translate(130 219.5) rotate(-188.5)">
      <rect x="-4" y="-7" width="8" height="14" rx="3" fill="#59c414" />
    </g>
    <g transform="translate(75.3 195.8) rotate(198.6)">
      <rect x="-5" y="-5" width="10" height="10" rx="3" fill="#061a5c" />
    </g>
    <g transform="translate(59.2 194.4) rotate(-211.1)">
      <circle cx="0" cy="0" r="5.5" fill="#b6f23c" />
    </g>
    <g transform="translate(19.3 146) rotate(221.2)">
      <rect x="-4" y="-7" width="8" height="14" rx="3" fill="#59c414" />
    </g>
    <g transform="translate(28.5 129.2) rotate(-231.1)">
      <rect x="-5" y="-5" width="10" height="10" rx="3" fill="#061a5c" />
    </g>
    <g transform="translate(33.9 69.3) rotate(243.9)">
      <circle cx="0" cy="0" r="5.5" fill="#b6f23c" />
    </g>
    <g transform="translate(51.9 64.3) rotate(-253.8)">
      <rect x="-4" y="-7" width="8" height="14" rx="3" fill="#59c414" />
    </g>
    <g transform="translate(96 27) rotate(263.6)">
      <rect x="-5" y="-5" width="10" height="10" rx="3" fill="#061a5c" />
    </g>
    <g transform="translate(109.6 16.6) rotate(-276.6)">
      <circle cx="0" cy="0" r="5.5" fill="#b6f23c" />
    </g>
    <g transform="translate(166.7 40.8) rotate(286.4)">
      <rect x="-4" y="-7" width="8" height="14" rx="3" fill="#59c414" />
    </g>
    <g transform="translate(183.3 42.6) rotate(-296.1)">
      <rect x="-5" y="-5" width="10" height="10" rx="3" fill="#061a5c" />
    </g>
    <g transform="translate(205.2 98) rotate(309.4)">
      <circle cx="0" cy="0" r="5.5" fill="#b6f23c" />
    </g>
    <g transform="translate(120 120)">
      <circle cx="0" cy="0" r="62" fill="#59c414" />
      <circle cx="0" cy="0" r="62" fill="none" stroke="#061a5c" strokeWidth="7" />
    </g>
    <path d="M92 121 L112 141 L150 101" fill="none" stroke="#ffffff" strokeWidth="15" />
  </Frame>
)

export const CookingStill = () => (
  <Frame>
    <circle cx="120" cy="120" r="106" fill="#eef9dd" />
    <g transform="translate(88 78.1)" opacity="0.299">
      <path d="M0 34 C-12 24 12 14 0 4 C-10 -4 8 -12 2 -20" fill="none" stroke="#061a5c" strokeWidth="6" />
    </g>
    <g transform="translate(116 95)" opacity="0.06">
      <path d="M0 34 C-12 24 12 14 0 4 C-10 -4 8 -12 2 -20" fill="none" stroke="#061a5c" strokeWidth="6" />
    </g>
    <g transform="translate(144 78.1)" opacity="0.299">
      <path d="M0 34 C-12 24 12 14 0 4 C-10 -4 8 -12 2 -20" fill="none" stroke="#061a5c" strokeWidth="6" />
    </g>
    <g transform="translate(92 203) scale(0.996 0.881)">
      <path d="M0 0 C-13 -4 -13 -16 0 -29 C13 -16 13 -4 0 0 Z" fill="#59c414" />
      <path d="M0 -2 C-6 -4 -6 -10 0 -16 C6 -10 6 -4 0 -2 Z" fill="#b6f23c" />
    </g>
    <g transform="translate(116 203) scale(0.984 0.919)">
      <path d="M0 0 C-13 -4 -13 -16 0 -29 C13 -16 13 -4 0 0 Z" fill="#59c414" />
      <path d="M0 -2 C-6 -4 -6 -10 0 -16 C6 -10 6 -4 0 -2 Z" fill="#b6f23c" />
    </g>
    <g transform="translate(140 203) scale(0.996 0.881)">
      <path d="M0 0 C-13 -4 -13 -16 0 -29 C13 -16 13 -4 0 0 Z" fill="#59c414" />
      <path d="M0 -2 C-6 -4 -6 -10 0 -16 C6 -10 6 -4 0 -2 Z" fill="#b6f23c" />
    </g>
    <g transform="translate(85.6 96.7) rotate(-150)">
      <circle cx="0" cy="0" r="10" fill="#b6f23c" stroke="#061a5c" strokeWidth="4.5" />
    </g>
    <g transform="translate(120.9 90.6) rotate(63.3)">
      <path d="M-13 0 C-8 -12 8 -12 13 0 C8 12 -8 12 -13 0 Z" fill="#59c414" stroke="#061a5c" strokeWidth="4.5" />
    </g>
    <g transform="translate(143 110.3) rotate(2.2)">
      <rect x="-9" y="-9" width="18" height="18" rx="5" fill="#ffffff" stroke="#061a5c" strokeWidth="4.5" />
    </g>
    <g transform="translate(116 168) rotate(-2.5) translate(-116 -168)">
      <path d="M172 130 L212 120" fill="none" stroke="#061a5c" strokeWidth="13" />
      <path d="M196 124 L211 120.3" fill="none" stroke="#59c414" strokeWidth="6" />
      <path d="M58 128 L174 128 L165 156 C162.3 164 156.7 168 148 168 L84 168 C75.3 168 69.7 164 67 156 L58 128 Z" fill="#061a5c" />
      <path d="M76 144 C78 152 82.7 156 90 156" fill="none" stroke="#b6f23c" strokeWidth="5" />
      <rect x="50" y="120" width="132" height="14" rx="7" fill="#59c414" stroke="#061a5c" strokeWidth="5" />
    </g>
  </Frame>
)

export const ScooterStill = () => (
  <Frame>
    <circle cx="120" cy="120" r="106" fill="#eef9dd" />
    <path d="M50 190 L190 190" fill="none" stroke="#061a5c" strokeWidth="5" />
    <path d="M62 206 L178 206" fill="none" stroke="#59c414" strokeWidth="5" strokeDasharray="34 22" strokeDashoffset="56" />
    <g transform="translate(33.2 98)" opacity="0.9">
      <path d="M0 0 L30 0" fill="none" stroke="#59c414" strokeWidth="5" />
    </g>
    <g transform="translate(80 166) rotate(144)">
      <circle cx="0" cy="0" r="20" fill="#ffffff" stroke="#061a5c" strokeWidth="8" />
      <path d="M-11 0 L11 0" fill="none" stroke="#061a5c" strokeWidth="3.5" />
      <path d="M0 -11 L0 11" fill="none" stroke="#061a5c" strokeWidth="3.5" />
      <circle cx="0" cy="0" r="5" fill="#59c414" />
    </g>
    <g transform="translate(170 166) rotate(144)">
      <circle cx="0" cy="0" r="20" fill="#ffffff" stroke="#061a5c" strokeWidth="8" />
      <path d="M-11 0 L11 0" fill="none" stroke="#061a5c" strokeWidth="3.5" />
      <path d="M0 -11 L0 11" fill="none" stroke="#061a5c" strokeWidth="3.5" />
      <circle cx="0" cy="0" r="5" fill="#59c414" />
    </g>
    <g transform="translate(0 -2.8)">
      <path d="M152 100 L168 160" fill="none" stroke="#061a5c" strokeWidth="8" />
      <path d="M56 152 C54 130 66 118 88 118 L112 118 C118 118 121 122 121 128 L123 146 L141 146 L146 110 C147.3 104.7 150.7 103.3 156 106 L163 124 L154 150 C152 156.7 147.7 160 141 160 L112 160 C108 144 96 138 82 138 C70 138 62 143 56 152 Z" fill="#59c414" stroke="#061a5c" strokeWidth="5" />
      <circle cx="161" cy="106" r="7" fill="#b6f23c" stroke="#061a5c" strokeWidth="4" />
      <path d="M153 102 L149 90 L140 88" fill="none" stroke="#061a5c" strokeWidth="7" />
      <rect x="84" y="109" width="38" height="12" rx="6" fill="#061a5c" />
      <rect x="38" y="70" width="48" height="46" rx="9" fill="#b6f23c" stroke="#061a5c" strokeWidth="5" />
      <path d="M40 84 L84 84" fill="none" stroke="#061a5c" strokeWidth="4" />
      <path d="M54 98 L60 104 L71 93" fill="none" stroke="#061a5c" strokeWidth="5" />
    </g>
    <g transform="translate(0 -3.3)">
      <path d="M128 144 L139 144" fill="none" stroke="#061a5c" strokeWidth="10" />
      <path d="M104 110 L128 115 L128 142" fill="none" stroke="#061a5c" strokeWidth="14" />
      <path d="M93 112 C90 88 98 72 111 70 C124 70 127 80 125 92 L120 112 L93 112 Z" fill="#ffffff" stroke="#061a5c" strokeWidth="5" />
      <path d="M112 82 L124 98 L141 92" fill="none" stroke="#061a5c" strokeWidth="12" />
      <path d="M112 82 L124 98 L134 94.5" fill="none" stroke="#b6f23c" strokeWidth="5" />
      <ellipse cx="118" cy="55" rx="13.5" ry="14" fill="#ffffff" stroke="#061a5c" strokeWidth="5" />
      <path d="M101 55 C100 31 136 31 137 52 L118 52 C114 52 111.7 54 111 58 C110.3 62 108.3 63.7 105 63 C102.3 61.7 101 59 101 55 Z" fill="#59c414" stroke="#061a5c" strokeWidth="5" />
      <path d="M121 62 C123.7 63.3 125.7 63 127 61" fill="none" stroke="#061a5c" strokeWidth="3" />
    </g>
  </Frame>
)

export const OfflineStill = () => (
  <Frame>
    <circle cx="120" cy="120" r="106" fill="#eef9dd" />
    <g transform="translate(-9.4 0)">
      <path d="M40 152 C54 160 46 120 74 120" fill="none" stroke="#061a5c" strokeWidth="8" />
      <path d="M104 108 L121 108" fill="none" stroke="#061a5c" strokeWidth="7" />
      <path d="M104 132 L121 132" fill="none" stroke="#061a5c" strokeWidth="7" />
      <path d="M74 108 C74 98 82 94 92 94 L98 94 C103.3 94 106 96.7 106 102 L106 138 C106 143.3 103.3 146 98 146 L92 146 C82 146 74 142 74 132 L74 108 Z" fill="#59c414" stroke="#061a5c" strokeWidth="6" />
      <path d="M85 108 L85 118" fill="none" stroke="#b6f23c" strokeWidth="5" />
    </g>
    <g transform="translate(7.6 0)">
      <path d="M174 120 C202 120 194 74 209 88" fill="none" stroke="#061a5c" strokeWidth="8" />
      <path d="M174 106 C174 96 168 92 160 92 L148 92 C142.7 92 140 94.7 140 100 L140 140 C140 145.3 142.7 148 148 148 L160 148 C168 148 174 144 174 134 L174 106 Z" fill="#b6f23c" stroke="#061a5c" strokeWidth="6" />
      <path d="M141 108 L152 108" fill="none" stroke="#061a5c" strokeWidth="7" />
      <path d="M141 132 L152 132" fill="none" stroke="#061a5c" strokeWidth="7" />
    </g>
    <path d="M130 88 L130 68" fill="none" stroke="#59c414" strokeWidth="6" pathLength="100" strokeDasharray="62.8 200" strokeDashoffset="-37.2" />
    <path d="M119 90 L109 75" fill="none" stroke="#59c414" strokeWidth="6" pathLength="100" strokeDasharray="91.3 200" strokeDashoffset="-8.7" />
    <path d="M142 88 L152 74" fill="none" stroke="#59c414" strokeWidth="6" pathLength="100" strokeDasharray="91.3 200" strokeDashoffset="-8.7" />
    <path d="M130 154 L130 174" fill="none" stroke="#59c414" strokeWidth="6" pathLength="100" strokeDasharray="96.3 200" strokeDashoffset="0" />
    <path d="M118 152 L108 166" fill="none" stroke="#59c414" strokeWidth="6" pathLength="100" strokeDasharray="74.4 200" strokeDashoffset="0" />
    <path d="M142 154 L152 168" fill="none" stroke="#59c414" strokeWidth="6" pathLength="100" strokeDasharray="74.4 200" strokeDashoffset="0" />
  </Frame>
)

export const STILLS = {
  'empty-basket': EmptyBasketStill,
  'searching': SearchingStill,
  'order-placed': OrderPlacedStill,
  'cooking': CookingStill,
  'scooter': ScooterStill,
  'offline': OfflineStill,
}
