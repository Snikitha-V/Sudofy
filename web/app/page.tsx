"use client"

import PillNav from "@/components/pill-nav"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PillNav
        items={[
          { label: "Home", href: "/" },
          { label: "Solve", href: "/solve" },
        ]}
        activeHref="/"
      />

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <h1
              className="text-6xl font-bold mb-4 font-mono text-accent drop-shadow-lg"
              style={{
                textShadow: "0 0 30px rgba(0, 255, 0, 0.5)",
              }}
            >
              SUDOFY
            </h1>
            <p className="text-xl text-muted-foreground font-mono mb-2">TYPE & SOLVE</p>
            <div className="h-1 w-24 bg-gradient-to-r from-accent to-primary mx-auto mb-8"></div>
          </div>

          {/* Description */}
          <div className="mb-12 space-y-4">
            <p className="text-lg text-foreground/90 leading-relaxed">
              The modern Sudoku solver built for speed and style. Type your puzzle, hit solve, and watch as it cracks
              the code with cyberpunk aesthetics.
            </p>
            <p className="text-sm text-muted-foreground">
              Powered by advanced algorithm | Zero dependencies | Pure performance
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="p-6 bg-card border border-border rounded-lg hover:border-accent transition">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-mono text-accent mb-2">Lightning Fast</h3>
              <p className="text-sm text-foreground/70">Solves any Sudoku instantly</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg hover:border-accent transition">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-mono text-accent mb-2">Cyberpunk Vibes</h3>
              <p className="text-sm text-foreground/70">Neon-lit dark mode interface</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg hover:border-accent transition">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-mono text-accent mb-2">Easy to Use</h3>
              <p className="text-sm text-foreground/70">Simple input, powerful results</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col gap-4 items-center">
            <Link href="/solve">
              <button className="ui-btn group">
                <span>START SOLVING</span>
              </button>
            </Link>
            <p className="text-xs text-muted-foreground font-mono">Press Enter or click above to begin</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <p className="font-mono">© 2025 Sudofy. Built with passion.</p>
          <a
            href="https://github.com/Snikitha-V/Sudofy"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}
