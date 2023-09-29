export type Symbol = "X" | "O"

export type Player = {
    id: string
    symbol: Symbol
}

export type Board = {
    id: string
    created_at: number
    players: Array<Player>
    board: Array<number>
    current_turn?: string
}

export type Boards = {
    [key: string]: Board
}