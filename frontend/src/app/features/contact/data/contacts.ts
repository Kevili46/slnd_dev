import { Contact } from "@features/contact/models/contact.model";
import { ICON } from "@shared/features/icon/models/icon.model";

export const contacts: Contact[] = [
    { title: 'LinkedIn', logo: '/assets/logos/linkedin.svg', link: 'https://de.linkedin.com/in/kevin-seeland-42925b360' },
    { title: 'GitHub', logo: '/assets/logos/github.svg', link: 'https://github.com/Kevili46', inverseLogo: true },
    { title: 'Mail', icon: ICON.MAIL, link: 'mailto:kevin@slnd.dev' },
]