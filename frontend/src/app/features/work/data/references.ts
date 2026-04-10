import { Reference } from "#features/work/models/Reference.type";

const maable: Reference = {
    name: "Maable",
    description: "Semester project in Responsive Web Design.",
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
const slnd: Reference = {
    name: "SLND.",
    description: "My custom-built portfolio, born from curiosity, passion, and vision.",
    img: "assets/logos/slnd_logo.svg",
    url: "https://slnd.dev",
    tags: ['published']
}

export const references: Reference[] = [maable, trapper, slnd]