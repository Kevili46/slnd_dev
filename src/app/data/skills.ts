import { SkillCategory } from "../model/SkillCategory.type"

const frameworks: SkillCategory = {
    name: "frameworks & CMS",
    skills: [
        {
            name: "Node.js",
            icon: "assets/logos/nodejs.svg"
        },
        {
            name: "Flask",
            icon: "assets/logos/flask.svg"
        },
        {
            name: "Angular",
            icon: "assets/logos/angular.svg"
        },
        {
            name: "React",
            icon: "assets/logos/react.svg"
        },
        {
            name: "WordPress",
            icon: "assets/logos/wordpress.svg"
        }
    ]
}

const programming: SkillCategory = {
    name: "programming & coding",
    skills: [
        {
            name: "Java",
            icon: "assets/logos/java.svg"
        },
        {
            name: "Python",
            icon: "assets/logos/python.svg"
        },
        {
            name: "JavaScript",
            icon: "assets/logos/javascript.svg"
        },
        {
            name: "TypeScript",
            icon: "assets/logos/typescript.svg"
        },
        {
            name: "CSS",
            icon: "assets/logos/css.svg"
        },
        {
            name: "HTML",
            icon: "assets/logos/html.svg"
        },
    ]
}

const databases: SkillCategory = {
    name: "databases",
    skills: [
        {
            name: "MongoDB Atlas",
            icon: "assets/logos/mongodb.svg"
        },
        {
            name: "MySQL",
            icon: "assets/logos/mysql.svg"
        },
    ]
}

const more: SkillCategory = {
    name: "more",
    skills: [
        {
            name: "LangChain",
            icon: "assets/logos/langchain.svg"
        },
        {
            name: "Gemini Agentic AI",
            icon: "assets/logos/gemini.svg"
        },
        {
            name: "Google Analytics 4",
            icon: "assets/logos/ga4.svg"
        },
        {
            name: "Adobe Creative Cloud",
            icon: "assets/logos/adobe.png"
        },
        {
            name: "FL Studio",
            icon: "assets/logos/flstudio.png"
        }
    ]
}

export const skills: SkillCategory[] = [frameworks, programming, databases, more];