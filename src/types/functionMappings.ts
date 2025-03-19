import { CategoryItem } from "./catalog";

export const functionMap: Record<
  string,
  (item: CategoryItem[] | null) => void
> = {
  doSomething: (item) => console.log("Doing something with:", item),
  anotherFunction: (item) => console.log("Another function executed:", item),
};
