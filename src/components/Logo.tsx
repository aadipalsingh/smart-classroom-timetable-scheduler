import React from 'react'
import logoUrl from '../assets/logo.png'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  variant?: 'light' | 'dark' | 'color'
}

export function Logo({ className = '', size = 'md', showText = true, variant = 'color' }: LogoProps) {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl', 
    xl: 'text-2xl'
  }

  // Your custom logo from assets
  const LogoIcon = () => {
    return (
      <img
        src={logoUrl}
        alt="TimeNest Logo"
        className={`${sizes[size]} object-contain`}
        onError={(e) => {
          // Fallback to placeholder if logo fails to load
          e.currentTarget.style.display = 'none'
          e.currentTarget.parentElement!.innerHTML = `<div class="${sizes[size]} bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold ${textSizes[size]}">TN</div>`
        }}
      />
    );
  };

  // If you have an actual logo file, use this instead:
  // const LogoIcon = () => (
  //   <img 
  //     src="/src/assets/logo.png" // or "/logo.png" if in public folder
  //     alt="TimeNest Logo" 
  //     className={`${sizes[size]} object-contain`}
  //   />
  // )

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon />
      {showText && (
        <span className={`font-bold ${textSizes[size]} ${
          variant === 'light' ? 'text-white' : 
          variant === 'dark' ? 'text-gray-900' : 
          'text-primary'
        }`}>
          TimeNest
        </span>
      )}
    </div>
  )
}