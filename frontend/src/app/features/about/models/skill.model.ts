import { Tech } from "@core/models/tech.model";
import { CategoryType } from "@features/about/models/category.model";

export interface Skill {
    name: Tech;
    logo: string;
    category: CategoryType
    core?: boolean;
    inverseLogo?: boolean;
}