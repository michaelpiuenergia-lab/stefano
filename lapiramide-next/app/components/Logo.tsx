interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = false }: LogoProps) {
  return (
    <svg
      viewBox={showText ? "0 0 400 240" : "0 0 180 120"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="La Piramide"
    >
      <defs>
        <linearGradient id="goldFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0d78c" />
          <stop offset="50%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#9a7b2e" />
        </linearGradient>
        <linearGradient id="goldLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff0b0" />
          <stop offset="100%" stopColor="#d4b85c" />
        </linearGradient>
        <linearGradient id="goldDark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b08d3a" />
          <stop offset="100%" stopColor="#7a5e1f" />
        </linearGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {showText ? (
        <g transform="translate(0, 20)">
          {/* Piramide sinistra */}
          <path d="M90 80 L120 20 L150 80 Z" fill="url(#goldDark)" />
          <path d="M120 20 L135 50 L150 80 L120 80 Z" fill="url(#goldFace)" />
          <path d="M120 20 L105 50 L90 80 L120 80 Z" fill="url(#goldLight)" opacity="0.85" />
          {/* Linee faccia sinistra */}
          <path d="M113 35 L127 35" stroke="#5a3f0a" strokeWidth="0.4" opacity="0.6" />
          <path d="M107 50 L133 50" stroke="#5a3f0a" strokeWidth="0.4" opacity="0.6" />
          <path d="M100 65 L140 65" stroke="#5a3f0a" strokeWidth="0.4" opacity="0.6" />

          {/* Piramide centrale */}
          <path d="M140 80 L180 5 L220 80 Z" fill="url(#goldFace)" />
          <path d="M180 5 L200 42 L220 80 L180 80 Z" fill="url(#goldLight)" />
          <path d="M180 5 L160 42 L140 80 L180 80 Z" fill="url(#goldDark)" opacity="0.8" />
          {/* Linee faccia centrale */}
          <path d="M170 22 L190 22" stroke="#5a3f0a" strokeWidth="0.4" opacity="0.6" />
          <path d="M162 38 L198 38" stroke="#5a3f0a" strokeWidth="0.4" opacity="0.6" />
          <path d="M155 55 L205 55" stroke="#5a3f0a" strokeWidth="0.4" opacity="0.6" />
          <path d="M148 72 L212 72" stroke="#5a3f0a" strokeWidth="0.4" opacity="0.6" />

          {/* Piramide destra */}
          <path d="M210 80 L240 15 L270 80 Z" fill="url(#goldDark)" />
          <path d="M240 15 L255 48 L270 80 L240 80 Z" fill="url(#goldFace)" />
          <path d="M240 15 L225 48 L210 80 L240 80 Z" fill="url(#goldLight)" opacity="0.85" />
          {/* Linee faccia destra */}
          <path d="M233 30 L247 30" stroke="#5a3f0a" strokeWidth="0.4" opacity="0.6" />
          <path d="M227 48 L253 48" stroke="#5a3f0a" strokeWidth="0.4" opacity="0.6" />
          <path d="M220 65 L260 65" stroke="#5a3f0a" strokeWidth="0.4" opacity="0.6" />

          {/* Base unificata */}
          <line x1="80" y1="85" x2="280" y2="85" stroke="url(#goldFace)" strokeWidth="2" filter="url(#softGlow)" />
          <line x1="140" y1="88" x2="220" y2="88" stroke="#c9a84c" strokeWidth="0.8" opacity="0.5" />

          {/* Testo */}
          <text
            x="180"
            y="130"
            textAnchor="middle"
            fontFamily="'Playfair Display', 'Cinzel', 'Trajan Pro', Georgia, serif"
            fontSize="32"
            fontWeight="700"
            letterSpacing="6"
            fill="url(#goldFace)"
            filter="url(#softGlow)"
          >
            LA PIRAMIDE
          </text>
          <text
            x="180"
            y="155"
            textAnchor="middle"
            fontFamily="'Montserrat', sans-serif"
            fontSize="10"
            fontWeight="600"
            letterSpacing="3"
            fill="#d4b896"
          >
            DISTRIBUZIONE &amp; PROMOZIONE LOCALE
          </text>
          <line x1="110" y1="165" x2="250" y2="165" stroke="#c9a84c" strokeWidth="0.5" opacity="0.4" />
        </g>
      ) : (
        <g transform="translate(0, 5)">
          {/* Piramide sinistra */}
          <path d="M20 80 L45 30 L70 80 Z" fill="url(#goldDark)" />
          <path d="M45 30 L57 55 L70 80 L45 80 Z" fill="url(#goldFace)" />
          <path d="M45 30 L33 55 L20 80 L45 80 Z" fill="url(#goldLight)" opacity="0.85" />

          {/* Piramide centrale */}
          <path d="M60 80 L90 10 L120 80 Z" fill="url(#goldFace)" />
          <path d="M90 10 L105 45 L120 80 L90 80 Z" fill="url(#goldLight)" />
          <path d="M90 10 L75 45 L60 80 L90 80 Z" fill="url(#goldDark)" opacity="0.8" />

          {/* Piramide destra */}
          <path d="M110 80 L135 25 L160 80 Z" fill="url(#goldDark)" />
          <path d="M135 25 L147 52 L160 80 L135 80 Z" fill="url(#goldFace)" />
          <path d="M135 25 L123 52 L110 80 L135 80 Z" fill="url(#goldLight)" opacity="0.85" />

          {/* Base */}
          <line x1="10" y1="84" x2="170" y2="84" stroke="url(#goldFace)" strokeWidth="1.5" />
        </g>
      )}
    </svg>
  );
}
