export const isEqual = (...objects: any[]) =>
  objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));
