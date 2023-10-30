type Options = Partial<{
  onlyIntegers: boolean;
  numberOnXAxis: boolean;
}>;

export const GetOptions = (options: Options) => {
  return {
    scales: {
      x: options.numberOnXAxis
        ? {
            beginAtZero: true,
            ticks: options.onlyIntegers
              ? {
                  callback: (i: any) => {
                    if (i % 1 === 0) {
                      return i;
                    }
                    return undefined;
                  },
                }
              : undefined,
          }
        : undefined,
      y: {
        beginAtZero: true,
        ticks: options.onlyIntegers
          ? {
              callback: (i: any) => {
                if (i % 1 === 0) {
                  return i;
                }
                return undefined;
              },
            }
          : undefined,
      },
    },
  };
};
