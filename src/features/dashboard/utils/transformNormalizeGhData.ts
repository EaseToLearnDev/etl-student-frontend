import type { constants } from "buffer";

export interface ITransformedGhData {
    contribution: number;
    date: Date;
    isInvalidDate: boolean;
}


export const transformNormalizeGhData = (data: number[][] | null, year: number | null): ITransformedGhData[][] | null => {

    if(!data) return null;

    if(year === null) {
        const startingDate = new Date();
        const currentYear = startingDate.getFullYear();

        const prevYear = currentYear - 1;
        const currentMonth = startingDate.getMonth();

        const diff = 12 - currentMonth;

        let _year = prevYear;


        return data.map((month: number[], monthIdx: number) => {

            if(monthIdx >= diff) {
                _year = currentYear;
            }

            const _m = (currentMonth + monthIdx) % 12;

            return month.map((day: any, dayIdx: any) => {
                const currentDay = dayIdx;
                const constructedDate = new Date(_year, _m, currentDay+1);

                console.log("currentDay: ", currentDay+1, constructedDate)
                return {
                    contribution: day,
                    date: constructedDate,
                    isInvalidDate: ((monthIdx === 12 && (currentDay+1 > startingDate.getDate()))) ? true: false
                }
            })
        });

    }


    return data.map((month: number[], monthIdx: number) => {
        const currentMonth = monthIdx;
        return month.map((day: any, dayIdx: any) => {
            const currentDay = dayIdx;
            const constructedDate = new Date(year as number, currentMonth, currentDay+1);
            return {
                contribution: day,
                date: constructedDate,
                isInvalidDate: false
            }
        })
    });

}