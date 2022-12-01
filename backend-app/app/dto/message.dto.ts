import { User } from "../ts-models/User"

export interface MessageDTO {
    content: string,
    sender: User,
    room: number
}