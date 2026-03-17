import { Experience } from "../core/models/Experience.class";

const studyObj = {
    label: 'OnlineMedien B.Sc.',
    place: 'HFU, Furtwangen',
    start: new Date('2021-09-01T08:00:00Z'),
    end: new Date('2025-02-28T20:00:00Z'),
    description: 'Student of digital media with specialization in computer science'
}
const study = new Experience(studyObj);

const internshipSemesterObj = {
    label: 'Internship Semester',
    place: 'adam medien, Ohlsbach',
    start: new Date('2022-09-19T08:00:00Z'),
    end: new Date('2023-02-07T20:00:00Z'),
    description: 'webdevelopment, online marketing & audio processing'
}
const internshipSemester = new Experience(internshipSemesterObj);

const thesisObj = {
    label: 'Thesis Project',
    place: 'AH & OH GmbH, Villingen',
    start: new Date('2024-09-01T08:00:00Z'),
    end: new Date('2024-12-31T20:00:00Z'),
    description: 'Development of an individualised AI agent for text-based interaction with a CMS'
}
const thesis = new Experience(thesisObj);


export const experiences: Experience[] = [study, internshipSemester, thesis];