export type Symbol = "X" | "O" | string

export type Player = {
    id: string
    name: string
    symbol: string
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