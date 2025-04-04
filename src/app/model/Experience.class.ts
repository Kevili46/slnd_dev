export class Experience {
    label: string;
    place: string;
    start: Date;
    end: Date;
    description: string;
    startString: string;
    endString: string;
    duration: string;

    constructor(data: { label: string, place: string, start: Date, end: Date, description: string }) {
        this.label = data.label;
        this.place = data.place;
        this.start = data.start;
        this.end = data.end;
        this.description = data.description
        this.startString = this.getDateString(this.start);
        this.endString = this.getDateString(this.end);
        this.duration = this.calcDurationString(this.start, this.end);
    }

    getDateString(date: Date): string {
        let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
        let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
        let year = `${date.getFullYear()}`
        return `${day}.${month}.${year}`
    }

    calcDurationString(start: Date, end: Date): string {
        let days: number = Math.round((end.getTime() - start.getTime()) / 86400000);
        let months: number = 0;
        let years: number = 0;

        let dayString: string = '';
        let monthString: string = '';
        let yearString: string = '';

        if (days > 29) {
            months = Math.floor(days / 30);
            days = days - months * 30;
        }
        if (months > 11) {
            years = Math.floor(months / 12);
            months = months - years * 12;
        }
        dayString = days > 1 ? `${days} days` : `${days} days`;
        dayString = days < 1 ? '' : dayString;
        monthString = months > 1 ? `${months} months ` : `${months} month `;
        monthString = months < 1 ? '' : monthString;
        yearString = years > 1 ? `${years} years ` : `${years} year `;
        yearString = years < 1 ? '' : yearString;

        let durationString = yearString + monthString + dayString;

        return durationString
    }
}