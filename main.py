from fastapi import FastAPI, WebSocket
from solver import solve_stream, Board   # our engine

app = FastAPI(title="Sudofy solver API")


@app.websocket("/solve")
async def solve_socket(websocket: WebSocket):
    await websocket.accept()

    try:
        payload = await websocket.receive_json()
        raw_grid = payload["grid"]
    except Exception:
        await websocket.send_json({"status": "error", "message": "Invalid payload"})
        await websocket.close()
        return

    # Normalise and validate incoming board
    try:
        grid: Board = [
            [int(cell) for cell in row]
            for row in raw_grid
        ]
    except Exception:
        await websocket.send_json({"status": "error", "message": "Grid must be 2D numbers"})
        await websocket.close()
        return

    if len(grid) != 9 or any(len(row) != 9 for row in grid):
        await websocket.send_json({"status": "error", "message": "Grid must be 9x9"})
        await websocket.close()
        return

    stream = solve_stream([row[:] for row in grid])
    solved = False

    while True:
        try:
            board = next(stream)
        except StopIteration as stop:
            solved = bool(stop.value)
            break
        await websocket.send_json({"board": board})

    await websocket.send_json({"status": "done", "solved": solved})
    await websocket.close()