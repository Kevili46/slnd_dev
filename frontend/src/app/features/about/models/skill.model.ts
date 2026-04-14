import { CategoryType } from "@features/about/models/category.model";

export interface Skill {
    name: string;
    logo: string;
    category: CategoryType
    core?: boolean;
    inverseLogo?: boolean;
}