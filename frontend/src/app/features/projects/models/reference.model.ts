import { Tech } from "@core/models/tech.model";

export type Reference = {
    name: string;
    description: string;
    img: string;
    link: string;
    tags: Tech[];
}