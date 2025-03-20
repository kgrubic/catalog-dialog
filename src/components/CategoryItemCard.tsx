import { CategoryItem } from "../types/catalog";

function CategoryItemCard(
  item: CategoryItem & {
    setSelectedCategoryItems: React.Dispatch<
      React.SetStateAction<CategoryItem[]>
    >;
    selectedCategoryItems: CategoryItem[];
    column: number;
    ref?: (node: HTMLDivElement | null) => void;
  }
) {
  const handleSelect = (category: CategoryItem) => {
    if (item.selectedCategoryItems.some((c) => c.id === category.id)) {
      item.setSelectedCategoryItems([
        ...item.selectedCategoryItems.filter((f) => f.id !== item.id),
      ]);
    } else {
      item.setSelectedCategoryItems([...item.selectedCategoryItems, item]);
    }
  };
  const selected = item.selectedCategoryItems.some((i) => i.id === item.id);

  return (
    <div
      ref={item.ref}
      className={`flex ${
        selected ? "bg-cyan-500" : ""
      } items-center h-[90px] border border-solid border-white hover:border hover:border-gray-400`}
      onClick={() => handleSelect(item)}
    >
      <div className="grow-1 justify-items-center">
        <div
          className={`icon-size-${item.column} flex items-center justify-center`}
        >
          <span
            className={`m-4 inline-flex items-center justify-center border border-solid icon-size-${item.column}`}
          >
            {item.icon ? item.icon : "❓"}
          </span>
        </div>
      </div>
      <div className="grow-2 justify-items-start">
        <div className="font-bold">{item.name}</div>
        <div className={`col-card-text-${item.column} text-left text-sm`}>
          {item.description}
        </div>
      </div>
    </div>
  );
}

export default CategoryItemCard;
