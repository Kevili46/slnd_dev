import { Icon } from "@shared/features/icon/models/icon.model";

export interface Contact {
    title: string,
    logo?: string,
    icon?: Icon,
    link: string,
    inverseLogo?: boolean,
}