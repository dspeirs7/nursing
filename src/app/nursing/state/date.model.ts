export interface Date {
  id: number | string;
  date: string;
}

export function createDate(params: Partial<Date>) {
  return { ...params } as Date;
}
