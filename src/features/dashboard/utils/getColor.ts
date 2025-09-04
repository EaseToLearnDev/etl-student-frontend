export const getColor = (val: number, color: string) => {
    const colorMap = {
        green: ['bg-gray-500/20', 'bg-green-200', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-800'],
        emerald: ['bg-gray-500/20', 'bg-emerald-200', 'bg-emerald-400', 'bg-emerald-500', 'bg-emerald-600', 'bg-emerald-800'],
        amber: ['bg-gray-500/20', 'bg-amber-200', 'bg-amber-400', 'bg-amber-500', 'bg-amber-600', 'bg-amber-800'],
        cyan: ['bg-gray-500/20', 'bg-cyan-200', 'bg-cyan-400', 'bg-cyan-500', 'bg-cyan-600', 'bg-cyan-800'],
        fuchsia: ['bg-gray-500/20', 'bg-fuchsia-200', 'bg-fuchsia-400', 'bg-fuchsia-500', 'bg-fuchsia-600', 'bg-fuchsia-800'],
        rose: ['bg-gray-500/20', 'bg-rose-200', 'bg-rose-400', 'bg-rose-500', 'bg-rose-600', 'bg-rose-800'],
    };

    const colors = colorMap[color as keyof typeof colorMap] || colorMap.green;
    
    switch (val) {
        case 1: return colors[1];
        case 2: return colors[2];
        case 3: return colors[3];
        case 4: return colors[4];
        case 5: return colors[5];
        default: return colors[0];
    }
}