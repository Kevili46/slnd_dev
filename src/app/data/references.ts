import { Reference } from "../model/Reference.type";

const maable: Reference = {
    name: "Maable",
    description: "Semester assignment in Responsive Web Design.",
    img: "assets/logos/maable_logo.svg",
    url: "https://kevili46.github.io/maable/",
    tags: ['concept']
}

const trapper: Reference = {
    name: "Trapper",
    description: "Manufacturer of individual food trailers.",
    img: "assets/logos/trapper_logo.svg",
    url: "https://trapper.info",
    tags: ['published']
}


export const work: Reference[] = [maable, trapper]