
export function updateObject<T extends object>(oldObject: T, ...newValues: { [P in keyof T]?: T[P] }[]): T {
  return Object.assign({}, oldObject, ...newValues);
};
