import { CategoryType } from "#features/about/models/category.model.js";

export interface Skill {
    name: string;
    icon: string;
    category: CategoryType
    core?: boolean;
    inverseIcon?: boolean;
}