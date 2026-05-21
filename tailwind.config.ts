import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
			screens: {
				'2xl': '1280px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Cyberpunk / terminal palette
				neon: {
					green: '#39ff14',
					cyan: '#00f0ff',
					magenta: '#ff2bd6',
					purple: '#a855f7',
					yellow: '#fde047',
					blue: '#3b82f6'
				},
				terminal: {
					bg: '#05060a',
					panel: '#0a0e16',
					line: '#11151f'
				}
			},
			fontFamily: {
				sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
				display: ['Orbitron', '"Space Grotesk"', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'neon-cyan': '0 0 5px rgba(0,240,255,0.5), 0 0 20px rgba(0,240,255,0.25)',
				'neon-green': '0 0 5px rgba(57,255,20,0.5), 0 0 20px rgba(57,255,20,0.25)',
				'neon-magenta': '0 0 5px rgba(255,43,214,0.5), 0 0 20px rgba(255,43,214,0.25)',
			},
			backgroundImage: {
				'grid-lines':
					'linear-gradient(to right, rgba(0,240,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.06) 1px, transparent 1px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(16px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(-24px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'blink': {
					'0%, 49%': { opacity: '1' },
					'50%, 100%': { opacity: '0' }
				},
				'glitch': {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' }
				},
				'flicker': {
					'0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
					'20%, 22%, 24%, 55%': { opacity: '0.4' }
				},
				'scanline': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100vh)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-12px)' }
				},
				'grid-pan': {
					'0%': { backgroundPosition: '0 0' },
					'100%': { backgroundPosition: '40px 40px' }
				},
				'spin-slow': {
					to: { transform: 'rotate(360deg)' }
				},
				'pulse-ring': {
					'0%': { boxShadow: '0 0 0 0 rgba(0,240,255,0.5)' },
					'70%': { boxShadow: '0 0 0 12px rgba(0,240,255,0)' },
					'100%': { boxShadow: '0 0 0 0 rgba(0,240,255,0)' }
				},
				'marquee': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'glow-pulse': {
					'0%, 100%': { opacity: '0.6' },
					'50%': { opacity: '1' }
				},
				'tilt': {
					'0%, 100%': { transform: 'rotate(-1deg)' },
					'50%': { transform: 'rotate(1deg)' }
				},
				'bounce-x': {
					'0%, 100%': { transform: 'translateX(0)' },
					'50%': { transform: 'translateX(6px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'fade-in-delay-1': 'fade-in 0.6s ease-out 0.15s forwards',
				'fade-in-delay-2': 'fade-in 0.6s ease-out 0.3s forwards',
				'fade-in-delay-3': 'fade-in 0.6s ease-out 0.45s forwards',
				'fade-in-right': 'fade-in-right 0.6s ease-out forwards',
				'blink': 'blink 1s step-end infinite',
				'glitch': 'glitch 0.4s ease-in-out infinite',
				'flicker': 'flicker 3s linear infinite',
				'scanline': 'scanline 8s linear infinite',
				'float': 'float 6s ease-in-out infinite',
				'grid-pan': 'grid-pan 3s linear infinite',
				'spin-slow': 'spin-slow 14s linear infinite',
				'pulse-ring': 'pulse-ring 2s ease-out infinite',
				'marquee': 'marquee 28s linear infinite',
				'marquee-slow': 'marquee 50s linear infinite',
				'shimmer': 'shimmer 2.5s linear infinite',
				'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
				'tilt': 'tilt 6s ease-in-out infinite',
				'bounce-x': 'bounce-x 1s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
