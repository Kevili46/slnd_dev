import { SafeHtml } from "@angular/platform-browser"

export type Message = {
    text: SafeHtml,
    date: Date,
    role: string
}