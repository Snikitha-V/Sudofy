print("=== NEW solver.py LOADED ===")
from typing import List, Tuple, Generator, Optional
import time

Board = List[List[int]]          # 0 == empty cell

PUZZLE = [
    [5, 1, 7, 6, 0, 0, 0, 3, 4],
    [2, 8, 9, 0, 0, 4, 0, 0, 0],
    [3, 4, 6, 2, 0, 5, 0, 9, 0],
    [6, 0, 2, 0, 0, 0, 0, 1, 0],
    [0, 3, 8, 0, 0, 6, 0, 4, 7],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 9, 0, 0, 0, 0, 0, 7, 8],
    [7, 0, 3, 4, 0, 0, 5, 6, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]


def next_empty(board: Board) -> Optional[Tuple[int, int]]:
    """Return first empty cell (row, col) or None."""
    for i in range(9):
        for j in range(9):
            if board[i][j] == 0:
                return i, j
    return None

def legal(board: Board, r: int, c: int, val: int) -> bool:
    """True if val can be placed at (r,c) without conflict."""
    # row & column
    if any(board[r][j] == val for j in range(9)): return False
    if any(board[i][c] == val for i in range(9)): return False
    # 3×3 box
    br, bc = 3 * (r // 3), 3 * (c // 3)
    if any(board[br + i][bc + j] == val for i in range(3) for j in range(3)):
        return False
    return True

def solve_stream(board: Board, delay: float = 0.01) -> Generator[Board, None, bool]:
    """
    delay = seconds between frames (0.01 ≈ 10 ms for smoother animation)
    """
    empty = next_empty(board)
    if empty is None:
        yield [row[:] for row in board]
        return True

    r, c = empty
    for val in range(1, 10):
        if legal(board, r, c, val):
            board[r][c] = val
            yield [row[:] for row in board]
            time.sleep(delay)                       
            if (yield from solve_stream(board, delay)):
                return True
            board[r][c] = 0
            # Skip yielding backtrack frames for smoother animation
    return False

if __name__ == "__main__":
    import pprint, time, sys

    board = [row[:] for row in PUZZLE]   # work on a copy
    print("Original puzzle:")
    pprint.pp(board)

    t0 = time.perf_counter()
    *states, solved = solve_stream(board)   # consume generator
    elapsed = time.perf_counter() - t0

    if not solved:
        print("No solution exists!")
        sys.exit(1)

    print(f"\nSolved in {len(states)} steps  ({elapsed*1000:.1f} ms)")
    print("Final board:")
    pprint.pp(solved)