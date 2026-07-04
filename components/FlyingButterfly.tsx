'use client'

// Borboleta que "passeia" por toda a tela — position: fixed, pointer-events-none
// Percorre um caminho curvo por todo o viewport em ~35 segundos
export default function FlyingButterfly() {
  return (
    <div
      className="fixed top-0 left-0 pointer-events-none select-none"
      style={{ zIndex: 5 }}
    >
      {/* Contêiner que faz o trajeto pela tela */}
      <div
        style={{
          animation: 'butterflyScreen 35s ease-in-out infinite',
          willChange: 'transform',
        }}
      >
        {/* SVG da borboleta com asas animadas */}
        <svg
          width="72"
          height="52"
          viewBox="0 0 100 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 2px 8px rgba(255,255,255,0.3))' }}
        >
          {/* Asa superior esquerda */}
          <g style={{ transformOrigin: '50px 34px', animation: 'wingsFlap 0.42s ease-in-out infinite' }}>
            <ellipse
              cx="24" cy="22"
              rx="22" ry="17"
              fill="white" fillOpacity="0.92"
            />
          </g>

          {/* Asa inferior esquerda */}
          <g style={{ transformOrigin: '50px 34px', animation: 'wingsFlap 0.42s ease-in-out infinite 0.04s' }}>
            <ellipse
              cx="20" cy="46"
              rx="17" ry="13"
              fill="white" fillOpacity="0.75"
            />
          </g>

          {/* Asa superior direita */}
          <g style={{ transformOrigin: '50px 34px', animation: 'wingsFlap 0.42s ease-in-out infinite' }}>
            <ellipse
              cx="76" cy="22"
              rx="22" ry="17"
              fill="white" fillOpacity="0.92"
            />
          </g>

          {/* Asa inferior direita */}
          <g style={{ transformOrigin: '50px 34px', animation: 'wingsFlap 0.42s ease-in-out infinite 0.04s' }}>
            <ellipse
              cx="80" cy="46"
              rx="17" ry="13"
              fill="white" fillOpacity="0.75"
            />
          </g>

          {/* Corpo */}
          <ellipse cx="50" cy="36" rx="2.5" ry="13" fill="white" fillOpacity="0.95" />

          {/* Cabeça */}
          <circle cx="50" cy="22" r="3.5" fill="white" fillOpacity="0.9" />

          {/* Antena esquerda */}
          <path
            d="M 48 19 Q 42 12 38 8"
            stroke="white" strokeWidth="1.2" strokeOpacity="0.75"
            fill="none" strokeLinecap="round"
          />
          <circle cx="37.5" cy="7.5" r="2" fill="white" fillOpacity="0.75" />

          {/* Antena direita */}
          <path
            d="M 52 19 Q 58 12 62 8"
            stroke="white" strokeWidth="1.2" strokeOpacity="0.75"
            fill="none" strokeLinecap="round"
          />
          <circle cx="62.5" cy="7.5" r="2" fill="white" fillOpacity="0.75" />

          {/* Detalhes nas asas (veias sutis) */}
          <line x1="50" y1="26" x2="18" y2="14" stroke="white" strokeWidth="0.6" strokeOpacity="0.3" />
          <line x1="50" y1="26" x2="82" y2="14" stroke="white" strokeWidth="0.6" strokeOpacity="0.3" />
        </svg>
      </div>
    </div>
  )
}
