import { Skill } from "@features/about/models/skill.model";
import { CATEGORY } from "@features/about/models/category.model";


export const skills: Skill[] = [
    {
        name: "Angular",
        icon: "/assets/logos/angular.svg",
        category: CATEGORY.FRONTEND,
        core: true,
    },
    {
        name: "CSS",
        icon: "/assets/logos/css.svg",
        category: CATEGORY.FRONTEND,
    },
    {
        name: "HTML",
        icon: "/assets/logos/html.svg",
        category: CATEGORY.FRONTEND,
    },
    {
        name: "Node.js",
        icon: "/assets/logos/nodejs.svg",
        category: CATEGORY.BACKEND,
        core: true,
    },
    {
        name: "Express",
        icon: "/assets/logos/express.svg",
        category: CATEGORY.BACKEND,
        inverseIcon: true,
    },
    {
        name: ".NET",
        icon: "/assets/logos/dotnet.svg",
        category: CATEGORY.BACKEND,
    },
    {
        name: "nginx",
        icon: "/assets/logos/nginx.svg",
        category: CATEGORY.BACKEND,
    },
    {
        name: "PostgreSQL",
        icon: "/assets/logos/postgresql.svg",
        category: CATEGORY.BACKEND,
        core: true,
    },
    {
        name: "MySQL",
        icon: "/assets/logos/mysql.svg",
        category: CATEGORY.BACKEND,
    },
    {
        name: "MongoDB",
        icon: "/assets/logos/mongodb.svg",
        category: CATEGORY.BACKEND,
    },
    {
        name: "JavaScript",
        icon: "/assets/logos/javascript.svg",
        category: CATEGORY.LANGUAGE,
    },
    {
        name: "TypeScript",
        icon: "/assets/logos/typescript.svg",
        category: CATEGORY.LANGUAGE,
        core: true,
    },
    {
        name: "Java",
        icon: "/assets/logos/java.svg",
        category: CATEGORY.LANGUAGE,
    },
    {
        name: "C#",
        icon: "/assets/logos/csharp.svg",
        category: CATEGORY.LANGUAGE,
    },
    {
        name: "Gemini API",
        icon: "/assets/logos/gemini.svg",
        category: CATEGORY.TOOL,
    },
    {
        name: "Git",
        icon: "/assets/logos/git.svg",
        category: CATEGORY.TOOL,
    },
    {
        name: "FL Studio",
        icon: "/assets/logos/flstudio.png",
        category: CATEGORY.TOOL,
    },
    {
        name: "Google Analytics",
        icon: "/assets/logos/ga4.svg",
        category: CATEGORY.TOOL,
    },
    {
        name: "Adobe Creative Cloud",
        icon: "/assets/logos/adobe.png",
        category: CATEGORY.TOOL,
    },
];