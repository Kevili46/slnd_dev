import { Skill } from "@features/about/models/skill.model";
import { CATEGORY } from "@features/about/models/category.model";
import { TECH } from "@core/models/tech.model";


export const skills: Skill[] = [
    {
        name: TECH.ANGULAR,
        logo: "/assets/logos/angular.svg",
        category: CATEGORY.FRONTEND,
        core: true,
    },
    {
        name: TECH.CSS,
        logo: "/assets/logos/css.svg",
        category: CATEGORY.FRONTEND,
    },
    {
        name: TECH.HTML,
        logo: "/assets/logos/html.svg",
        category: CATEGORY.FRONTEND,
    },
    {
        name: TECH.NODE_JS,
        logo: "/assets/logos/nodejs.svg",
        category: CATEGORY.BACKEND,
        core: true,
    },
    {
        name: TECH.EXPRESS,
        logo: "/assets/logos/express.svg",
        category: CATEGORY.BACKEND,
        inverseLogo: true,
    },
    {
        name: TECH.DOTNET,
        logo: "/assets/logos/dotnet.svg",
        category: CATEGORY.BACKEND,
    },
    {
        name: TECH.NGINX,
        logo: "/assets/logos/nginx.svg",
        category: CATEGORY.BACKEND,
    },
    {
        name: TECH.POSTGRES,
        logo: "/assets/logos/postgresql.svg",
        category: CATEGORY.DB,
        core: true,
    },
    {
        name: TECH.MY_SQL,
        logo: "/assets/logos/mysql.svg",
        category: CATEGORY.DB,
    },
    {
        name: TECH.MONGO_DB,
        logo: "/assets/logos/mongodb.svg",
        category: CATEGORY.DB,
    },
    {
        name: TECH.JAVASCRIPT,
        logo: "/assets/logos/javascript.svg",
        category: CATEGORY.LANGUAGE,
    },
    {
        name: TECH.TYPESCRIPT,
        logo: "/assets/logos/typescript.svg",
        category: CATEGORY.LANGUAGE,
        core: true,
    },
    {
        name: TECH.JAVA,
        logo: "/assets/logos/java.svg",
        category: CATEGORY.LANGUAGE,
    },
    {
        name: TECH.C_SHARP,
        logo: "/assets/logos/csharp.svg",
        category: CATEGORY.LANGUAGE,
    },
    {
        name: TECH.GIT,
        logo: "/assets/logos/git.svg",
        category: CATEGORY.TOOL,
    },
    {
        name: TECH.DOCKER,
        logo: "/assets/logos/docker.svg",
        category: CATEGORY.TOOL,
    },
    {
        name: TECH.GEMINI_API,
        logo: "/assets/logos/gemini.svg",
        category: CATEGORY.TOOL,
    },
];