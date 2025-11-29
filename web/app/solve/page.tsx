"use client"

import { useState, useRef, useEffect } from "react"
import PillNav from "@/components/pill-nav"
import Link from "next/link"

interface GridCell {
  value: number
  isOriginal: boolean
}

export default function SolvePage() {
  const [grid, setGrid] = useState<GridCell[][]>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill({ value: 0, isOriginal: false })),
  )
  const [solving, setSolving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(null)),
  )
  const wsRef = useRef<WebSocket | null>(null)
  const originalMaskRef = useRef<boolean[][]>(
    Array(9).fill(null).map(() => Array(9).fill(false))
  )

  useEffect(() => {
    return () => {
      wsRef.current?.close()
    }
  }, [])

  const handleInputChange = (r: number, c: number, value: string) => {
    const num = value.replace(/[^1-9]/g, "")
    const newGrid = grid.map((row, ri) =>
      row.map((cell, ci) =>
        ri === r && ci === c ? { value: num ? Number.parseInt(num) : 0, isOriginal: false } : cell,
      ),
    )
    setGrid(newGrid)
  }

  const handleSolve = () => {
    if (solving) return
    wsRef.current?.close()

    const payload = grid.map((row) => row.map((cell) => cell.value))
    originalMaskRef.current = grid.map((row) => row.map((cell) => cell.value !== 0))

    const socket = new WebSocket("ws://localhost:8000/solve")
    wsRef.current = socket
    setSolving(true)
    setError(null)

    socket.onopen = () => {
      socket.send(JSON.stringify({ grid: payload }))
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)

      if (message.status === "done") {
        setSolving(false)
        socket.close()
        return
      }

      if (message.status === "error") {
        setError(message.message)
        setSolving(false)
        socket.close()
        return
      }

      if (Array.isArray(message.board)) {
        const board = message.board
        setGrid(
          board.map((row: number[], r: number) =>
            row.map((value: number, c: number) => ({
              value,
              isOriginal: originalMaskRef.current[r][c],
            })),
          ),
        )
      }
    }

    socket.onerror = () => {
      setSolving(false)
      setError("Cannot connect to solver. Make sure the backend is running (uvicorn main:app --reload)")
    }

    socket.onclose = () => {
      wsRef.current = null
    }
  }

  const handleClear = () => {
    wsRef.current?.close()
    setSolving(false)
    setError(null)
    setGrid(
      Array(9)
        .fill(null)
        .map(() => Array(9).fill({ value: 0, isOriginal: false })),
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PillNav
        items={[
          { label: "Home", href: "/" },
          { label: "Solve", href: "/solve" },
        ]}
        activeHref="/solve"
      />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <h1
            className="text-4xl font-bold mb-8 font-mono text-accent text-center"
            style={{
              textShadow: "0 0 20px rgba(56, 155, 242, 0.5)",
            }}
          >
            SOLVER
          </h1>

          <div className="mb-8 flex justify-center">
            <table className="sudoku-grid border-4 border-accent">
              <tbody>
                {grid.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td
                        key={`${r}-${c}`}
                        className={`sudoku-cell w-16 h-16 p-0 ${
                          c === 2 || c === 5 ? "border-right-bold" : ""
                        } ${r === 2 || r === 5 ? "border-bottom-bold" : ""}`}
                      >
                        <input
                          ref={(el) => {
                            if (el) inputRefs.current[r][c] = el
                          }}
                          type="text"
                          maxLength={1}
                          value={cell.value || ""}
                          onChange={(e) => handleInputChange(r, c, e.target.value)}
                          className="w-full h-full text-2xl font-bold text-center bg-transparent text-accent outline-none"
                          disabled={solving}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={handleSolve} disabled={solving} className="ui-btn">
              <span>{solving ? "SOLVING..." : "SOLVE"}</span>
            </button>
            <button onClick={handleClear} disabled={solving} className="ui-btn">
              <span>CLEAR</span>
            </button>
            <Link href="/">
              <button className="ui-btn">
                <span>BACK</span>
              </button>
            </Link>
          </div>

          {error && (
            <p className="mt-4 text-center text-red-400 font-mono text-sm">{error}</p>
          )}

          <div className="mt-12 p-6 bg-card border border-border rounded-lg">
            <h3 className="text-accent font-mono mb-3">HOW TO USE:</h3>
            <ul className="text-sm text-foreground/80 space-y-2 font-mono">
              <li>Type numbers 1-9 into each cell</li>
              <li>Leave empty cells blank (0)</li>
              <li>Click SOLVE to auto-solve your puzzle</li>
              <li>Click CLEAR to reset the grid</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
