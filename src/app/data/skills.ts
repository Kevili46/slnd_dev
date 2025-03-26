import { SkillCategory } from "../model/SkillCategory.type"

const frameworks: SkillCategory = {
    name: "frameworks & CMS",
    skills: [
        {
            name: "Node.js",
            icon: "assets/icons/nodejs.svg"
        },
        {
            name: "Flask",
            icon: "assets/icons/flask.svg"
        },
        {
            name: "Angular",
            icon: "assets/icons/angular.svg"
        },
        {
            name: "React",
            icon: "assets/icons/react.svg"
        },
        {
            name: "WordPress",
            icon: "assets/icons/wordpress.svg"
        }
    ]
}

const programming: SkillCategory = {
    name: "programming & coding",
    skills: [
        {
            name: "Java",
            icon: "assets/icons/java.svg"
        },
        {
            name: "Python",
            icon: "assets/icons/python.svg"
        },
        {
            name: "JavaScript",
            icon: "assets/icons/javascript.svg"
        },
        {
            name: "TypeScript",
            icon: "assets/icons/typescript.svg"
        },
        {
            name: "CSS",
            icon: "assets/icons/css.svg"
        },
        {
            name: "HTML",
            icon: "assets/icons/html.svg"
        },
    ]
}

const databases: SkillCategory = {
    name: "databases",
    skills: [
        {
            name: "MongoDB Atlas",
            icon: "assets/icons/mongodb.svg"
        },
        {
            name: "MySQL",
            icon: "assets/icons/mysql.svg"
        },
    ]
}

const more: SkillCategory = {
    name: "more",
    skills: [
        {
            name: "LangChain",
            icon: "assets/icons/langchain.svg"
        },
        {
            name: "Gemini Agentic AI",
            icon: "assets/icons/gemini.svg"
        },
        {
            name: "Google Analytics 4",
            icon: "assets/icons/ga4.svg"
        },
        {
            name: "Adobe Creative Cloud",
            icon: "assets/icons/adobe.png"
        },
        {
            name: "FL Studio",
            icon: "assets/icons/flstudio.png"
        }
    ]
}

export const skills: SkillCategory[] = [frameworks, programming, databases, more];