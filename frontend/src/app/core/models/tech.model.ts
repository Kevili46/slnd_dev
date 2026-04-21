export const TECH = {
    "HTML": "HTML",
    "CSS": "CSS",
    "SCSS": "SCSS",
    "JAVASCRIPT": "JavaScript",
    "TYPESCRIPT": "TypeScript",
    "JAVA": "Java",
    "C_SHARP": "C#",
    "ANGULAR": "Angular",
    "NODE_JS": "Node.js",
    "EXPRESS": "Express",
    "NGINX": "nginx",
    "DOTNET": ".NET",
    "POSTGRES": "PostgreSQL",
    "MY_SQL": "MySQL",
    "MONGO_DB": "MongoDB",
    "GIT": "Git",
    "DOCKER": "Docker",
    "GEMINI_API": "Gemini API",
    "WORDPRESS": "WordPress"
}
export type Tech = typeof TECH[keyof typeof TECH];