type Options = Partial<{
  onlyIntegers: boolean;
  numberOnXAxis: boolean;
  stacked: boolean;
}>;

export const GetOptions = (options: Options) => {
  return {
    scales: {
      x: options.numberOnXAxis
        ? {
            stacked: options.stacked,
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
        : {
            stacked: options.stacked,
          },
      y: {
        beginAtZero: true,
        ticks: options.onlyIntegers
          ? {
              stacked: options.stacked,
              callback: (i: any) => {
                if (i % 1 === 0) {
                  return i;
                }
                return undefined;
              },
            }
          : {
              stacked: options.stacked,
            },
      },
    },
  };
};
