import type { ITransformedGhData } from "./transformNormalizeGhData";

export const seggregateGhHeatmapData = (transformedData: ITransformedGhData[][] | null) => {

    if(!transformedData) return null;

    const _data = transformedData.map((month: ITransformedGhData[], _: number) => {

        const startingDate: Date = month[0]?.date;
        let _year = startingDate.getFullYear();
        let _month = startingDate.getMonth();
        let _day = startingDate.getDay();

        const date = new Date(_year, _month, 1);
        const monthName = date.toLocaleString('default', { month: 'long' });
        let monthData: { monthLabel: string, weeks: ITransformedGhData[][] } = { monthLabel: monthName.slice(0, 3), weeks: [] };

        let emptyCells: ITransformedGhData[] = new Array(_day).fill({
            contribution: 0,
            date: null,
            isInvalidDate: true
        })

        let innerWeeks = [];
        let _monthArray = [];

        for (let i = 0; i < 4; i++) {
            innerWeeks = [];
            for (let j = 0; j < 7; j++) {
                let _dayNumber = i * 7 + j;
                innerWeeks.push(month[_dayNumber]);
            }
            _monthArray.push(innerWeeks);
        }

        innerWeeks = [];
        for (let j = 0; j < month.length % 7; j++) {
            innerWeeks.push(month[4 * 7 + j])
        }
        if (innerWeeks.length != 0)
            _monthArray.push(innerWeeks);


        let completedMonths = [
           ...emptyCells,
            ..._monthArray.flat()
        ]

        for(let i = 0; i < completedMonths.length; i += 7) {
            monthData.weeks.push(completedMonths.slice(i, i+7));
        }

        return monthData;
    })
    return _data;
}