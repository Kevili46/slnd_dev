import { SafeHtml } from "@angular/platform-browser";

export interface SvgAttributes {
    viewbox: string,
    content: string,
    sanitized?: SafeHtml,
}