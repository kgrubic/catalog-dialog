import { Category } from "../types/catalog";

function CategoryFilter(
  item: Category & {
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    selectedCategory: string;
    disable: boolean;
    column: number;
  }
) {
  return (
    <div
      className={`p-2 m-2 border border-solid cursor-pointer ${
        item.selectedCategory == item.id ? "bg-cyan-500" : ""
      } ${
        !item.disable && item.id !== "cat-0"
          ? "pointer-events-none opacity-50"
          : ""
      }`}
      onClick={() => item.setSelectedCategory(item.id)}
    >
      {item.name}
    </div>
  );
}

export default CategoryFilter;
