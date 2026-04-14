import { Skill } from "@features/about/models/skill.model";
import { CATEGORY } from "@features/about/models/category.model";


export const skills: Skill[] = [
    {
        name: "Angular",
        logo: "/assets/logos/angular.svg",
        category: CATEGORY.FRONTEND,
        core: true,
    },
    {
        name: "CSS",
        logo: "/assets/logos/css.svg",
        category: CATEGORY.FRONTEND,
    },
    {
        name: "HTML",
        logo: "/assets/logos/html.svg",
        category: CATEGORY.FRONTEND,
    },
    {
        name: "Node.js",
        logo: "/assets/logos/nodejs.svg",
        category: CATEGORY.BACKEND,
        core: true,
    },
    {
        name: "Express",
        logo: "/assets/logos/express.svg",
        category: CATEGORY.BACKEND,
        inverseLogo: true,
    },
    {
        name: ".NET",
        logo: "/assets/logos/dotnet.svg",
        category: CATEGORY.BACKEND,
    },
    {
        name: "nginx",
        logo: "/assets/logos/nginx.svg",
        category: CATEGORY.BACKEND,
    },
    {
        name: "PostgreSQL",
        logo: "/assets/logos/postgresql.svg",
        category: CATEGORY.DB,
        core: true,
    },
    {
        name: "MySQL",
        logo: "/assets/logos/mysql.svg",
        category: CATEGORY.DB,
    },
    {
        name: "MongoDB",
        logo: "/assets/logos/mongodb.svg",
        category: CATEGORY.DB,
    },
    {
        name: "JavaScript",
        logo: "/assets/logos/javascript.svg",
        category: CATEGORY.LANGUAGE,
    },
    {
        name: "TypeScript",
        logo: "/assets/logos/typescript.svg",
        category: CATEGORY.LANGUAGE,
        core: true,
    },
    {
        name: "Java",
        logo: "/assets/logos/java.svg",
        category: CATEGORY.LANGUAGE,
    },
    {
        name: "C#",
        logo: "/assets/logos/csharp.svg",
        category: CATEGORY.LANGUAGE,
    },
    {
        name: "Git",
        logo: "/assets/logos/git.svg",
        category: CATEGORY.TOOL,
    },
    {
        name: "Docker",
        logo: "/assets/logos/docker.svg",
        category: CATEGORY.TOOL,
    },
    {
        name: "Gemini API",
        logo: "/assets/logos/gemini.svg",
        category: CATEGORY.TOOL,
    },
];