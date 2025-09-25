export const getColor = (val: number, color: string, darkMode: boolean) => {
  const colorMap = {
    green: {
      light: ['bg-gray-200', 'bg-green-200', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-800'],
      dark:  ['bg-green-100/30', 'bg-green-900/50', 'bg-green-800', 'bg-green-700', 'bg-green-600', 'bg-green-500'],
    },
    emerald: {
      light: ['bg-emerald-100/30', 'bg-emerald-200', 'bg-emerald-400', 'bg-emerald-500', 'bg-emerald-600', 'bg-emerald-800'],
      dark:  ['bg-emerald-900/50', 'bg-emerald-800', 'bg-emerald-700', 'bg-emerald-600', 'bg-emerald-500', 'bg-emerald-400'],
    },
    amber: {
      light: ['bg-amber-100/30', 'bg-amber-200', 'bg-amber-400', 'bg-amber-500', 'bg-amber-600', 'bg-amber-800'],
      dark:  ['bg-amber-900/50', 'bg-amber-800', 'bg-amber-700', 'bg-amber-600', 'bg-amber-500', 'bg-amber-400'],
    },
    cyan: {
      light: ['bg-cyan-100/30', 'bg-cyan-200', 'bg-cyan-400', 'bg-cyan-500', 'bg-cyan-600', 'bg-cyan-800'],
      dark:  ['bg-cyan-900/50', 'bg-cyan-800', 'bg-cyan-700', 'bg-cyan-600', 'bg-cyan-500', 'bg-cyan-400'],
    },
    fuchsia: {
      light: ['bg-fuchsia-100/30', 'bg-fuchsia-200', 'bg-fuchsia-400', 'bg-fuchsia-500', 'bg-fuchsia-600', 'bg-fuchsia-800'],
      dark:  ['bg-fuchsia-900/50', 'bg-fuchsia-800', 'bg-fuchsia-700', 'bg-fuchsia-600', 'bg-fuchsia-500', 'bg-fuchsia-400'],
    },
    rose: {
      light: ['bg-rose-100/30', 'bg-rose-200', 'bg-rose-400', 'bg-rose-500', 'bg-rose-600', 'bg-rose-800'],
      dark:  ['bg-rose-900/50', 'bg-rose-800', 'bg-rose-700', 'bg-rose-600', 'bg-rose-500', 'bg-rose-400'],
    },
  };

  const colors = (colorMap[color as keyof typeof colorMap] || colorMap.green)[darkMode ? 'dark' : 'light'];

  // Map val to index (0-5)
  const index = Math.min(Math.floor(val), colors.length - 1);

  return colors[index];
};
