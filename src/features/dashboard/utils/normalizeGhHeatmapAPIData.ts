const numberOfDaysInMonth = (year: number, month: number): number => {
    const date: Date = new Date(year, month+1, 0);
    return date.getDate();
}

export const normalizeGhHeatmapAPIData = (apiData: any, year: number | null): any[] | null => {

    if(!apiData) return null;

    if(year == null) {
        const startingDate = new Date();
        const currentYear = startingDate.getFullYear();

        const prevYear = currentYear - 1;
        const currentMonth = startingDate.getMonth();

        const diff = 12 - currentMonth;

        let year = prevYear;

        return apiData?.map((month: number[], monthIdx: number) => {
            if(monthIdx >= diff) {
                year = currentYear;
            }

            const _m = (currentMonth + monthIdx) % 12;

            if(month?.length === 0) {
                return new Array(numberOfDaysInMonth(year, _m)).fill(0);
            } 
            return month.concat(new Array(numberOfDaysInMonth(year, _m) - month.length).fill(0));
        })
    }
    

    return apiData?.map((month: number[], monthIdx: number) => {
        console.log(numberOfDaysInMonth(year, monthIdx), year, monthIdx)
        if(month?.length === 0) {
            return new Array(numberOfDaysInMonth(year, monthIdx)).fill(0);
        } 
        return month.concat(new Array(numberOfDaysInMonth(year, monthIdx) - month.length).fill(0));
    })
}