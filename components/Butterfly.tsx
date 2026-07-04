'use client'

// Borboleta branca flutuando — decorativa, pointer-events-none
export default function Butterfly({
  className = '',
  size = 64,
  opacity = 0.25,
  delay = '0s',
}: {
  className?: string
  size?: number
  opacity?: number
  delay?: string
}) {
  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        animation: `butterflyFly 22s ease-in-out ${delay} infinite`,
        opacity,
      }}
    >
      <svg
        width={size}
        height={size * 0.75}
        viewBox="0 0 80 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Asa superior esquerda */}
        <path
          d="M38 28 C28 10, 4 8, 2 22 C0 36, 20 44, 38 32"
          fill="white"
          style={{
            transformOrigin: '38px 30px',
            animation: `wingLeft 0.55s ease-in-out infinite`,
          }}
        />
        {/* Asa inferior esquerda */}
        <path
          d="M38 32 C24 34, 8 46, 10 54 C12 60, 28 58, 38 42"
          fill="white"
          fillOpacity="0.85"
          style={{
            transformOrigin: '38px 37px',
            animation: `wingLeft 0.55s ease-in-out infinite`,
          }}
        />
        {/* Asa superior direita */}
        <path
          d="M42 28 C52 10, 76 8, 78 22 C80 36, 60 44, 42 32"
          fill="white"
          style={{
            transformOrigin: '42px 30px',
            animation: `wingRight 0.55s ease-in-out infinite`,
          }}
        />
        {/* Asa inferior direita */}
        <path
          d="M42 32 C56 34, 72 46, 70 54 C68 60, 52 58, 42 42"
          fill="white"
          fillOpacity="0.85"
          style={{
            transformOrigin: '42px 37px',
            animation: `wingRight 0.55s ease-in-out infinite`,
          }}
        />
        {/* Corpo */}
        <ellipse cx="40" cy="35" rx="2" ry="10" fill="white" fillOpacity="0.9" />
        {/* Antenas */}
        <line x1="39" y1="25" x2="33" y2="15" stroke="white" strokeWidth="1" strokeOpacity="0.7" />
        <circle cx="33" cy="14" r="1.5" fill="white" fillOpacity="0.7" />
        <line x1="41" y1="25" x2="47" y2="15" stroke="white" strokeWidth="1" strokeOpacity="0.7" />
        <circle cx="47" cy="14" r="1.5" fill="white" fillOpacity="0.7" />
      </svg>
    </div>
  )
}
