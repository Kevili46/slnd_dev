import { Skill } from "@features/about/models/skill.model";

export interface SkillCategory {
    title: string,
    skills: Skill[],
}