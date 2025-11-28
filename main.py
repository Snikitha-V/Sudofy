from fastapi import FastAPI, WebSocket
import json
from solver import solve_stream, Board   # our engine

app = FastAPI(title="Sudofy solver API")

@app.websocket("/solve")
async def solve_socket(websocket: WebSocket):
    await websocket.accept()
    data = await websocket.receive_json()      # expect {"grid":[[int]]}
    grid: Board = data["grid"]

    for board in solve_stream(grid):
        await websocket.send_json({"board": board})
    await websocket.send_json({"status": "done"})
    await websocket.close()