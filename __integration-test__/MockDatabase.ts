export const mockDatabase = async (promises: Promise<any>[]): Promise<void> =>
  Promise.all(promises).then(() => Promise.resolve());
