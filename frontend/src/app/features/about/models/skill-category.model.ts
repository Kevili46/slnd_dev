import { Skill } from "#features/about/models/skill.model.js";

export interface SkillCategory {
    title: string,
    skills: Skill[],
}