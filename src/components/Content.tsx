import { useQuery } from "@apollo/client";
import CategoryItemCard from "./CategoryItemCard";
import { GET_ALL_CATEGORY_ITEMS } from "../services/queries";
import { Category, CategoryItem } from "../types/catalog";
import CategoryFilter from "./CategoryFilter";
import { useEffect, useState } from "react";

function Content(content: {
  setSelectedCategoryItems: React.Dispatch<
    React.SetStateAction<CategoryItem[]>
  >;
  selectedCategoryItems: CategoryItem[];
  column: number;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("cat-0");

  const [initialAllCategoryItems, setInitialAllCategoryItems] = useState<
    CategoryItem[]
  >([]);
  const { data } = useQuery(GET_ALL_CATEGORY_ITEMS, {
    variables: {
      page: 0,
      perPage: 10,
      filter:
        selectedCategory !== "cat-0" ? { category: selectedCategory } : {},
    },
  });

  const { allCategoryItems, allCategories, allColumns } = data || [];

  useEffect(() => {
    if (selectedCategory === "cat-0")
      setInitialAllCategoryItems(allCategoryItems);
  }, [allCategoryItems, selectedCategory]);

  return (
    <div className="h-[450px] flex">
      <div className="w-[250px] border-r-1 max-h-[450px]">
        {[{ id: "cat-0", name: "All" }, ...(allCategories || [])]?.map(
          (i: Category) => (
            <CategoryFilter
              key={i.id}
              name={i.name}
              id={i.id}
              column={allColumns}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              disable={
                !!initialAllCategoryItems?.find(
                  (c: CategoryItem) => c.category === i.id
                )
              }
            />
          )
        )}
      </div>
      <div className={`${content.column === 2 ? "grow-7" : "grow-4"}`}>
        <div
          className={`grid col-card-lay-${content.column} gap-4 max-h-[450px] overflow-y-auto`}
        >
          {allCategoryItems?.map((item: CategoryItem) => (
            <CategoryItemCard
              key={item.id}
              name={item.name}
              description={item.description}
              icon={item.icon}
              id={item.id}
              tags={item.tags}
              category={item.category}
              column={content.column}
              setSelectedCategoryItems={content.setSelectedCategoryItems}
              selectedCategoryItems={content.selectedCategoryItems}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Content;
