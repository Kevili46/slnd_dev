import { TECH } from "@core/models/tech.model";
import { Reference } from "@features/projects/models/reference.model";

export const github: Reference = {
    name: "GitHub",
    description: "Behind the scenes ...",
    img: "assets/logos/github.svg",
    link: "https://github.com/Kevili46",
    tags: []
}

const slnd: Reference = {
    name: "SLND.",
    description: "My custom-built portfolio, born from curiosity, passion, and vision.",
    img: "assets/logos/slnd_logo.svg",
    link: "https://slnd.dev",
    tags: [TECH.ANGULAR, TECH.NODE_JS, TECH.EXPRESS, TECH.TYPESCRIPT, TECH.SCSS, TECH.POSTGRES, TECH.DOCKER, TECH.NGINX]
}
const maable: Reference = {
    name: "Maable",
    description: "Semester project in Responsive Web Design.",
    img: "assets/logos/maable_logo.svg",
    link: "https://kevili46.github.io/maable/",
    tags: [TECH.HTML, TECH.CSS, TECH.JAVASCRIPT]
}

const trapper: Reference = {
    name: "Trapper",
    description: "Manufacturer of individual food trailers.",
    img: "assets/logos/trapper_logo.svg",
    link: "https://trapper.info",
    tags: [TECH.HTML, TECH.CSS, TECH.JAVASCRIPT, TECH.WORDPRESS]
}

export const references: Reference[] = [slnd, maable, trapper]