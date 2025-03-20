import { useQuery } from "@apollo/client";
import CategoryItemCard from "./CategoryItemCard";
import { GET_ALL_CATEGORY_ITEMS } from "../services/queries";
import { Category, CategoryItem } from "../types/catalog";
import CategoryFilter from "./CategoryFilter";
import { useCallback, useEffect, useRef, useState } from "react";

function Content(content: {
  setSelectedCategoryItems: React.Dispatch<
    React.SetStateAction<CategoryItem[]>
  >;
  selectedCategoryItems: CategoryItem[];
  column: number;
  searchFilter: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("cat-0");
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState<number>(0);
  const [perPage] = useState<number>(12);
  const [initialAllCategoryItems, setInitialAllCategoryItems] = useState<
    CategoryItem[]
  >([]);

  const { data, loading } = useQuery(GET_ALL_CATEGORY_ITEMS, {
    variables: {
      page: page,
      perPage: perPage,
      filter: filter,
    },
  });
  const { allCategoryItems, allCategories, allColumns } = data || [];

  useEffect(() => {
    console.log("allCategoryItems", allCategoryItems);
  }, [allCategoryItems]);

  useEffect(() => {
    setFilter(() => ({
      ...(selectedCategory !== "cat-0" && { category: selectedCategory }),
      ...(content.searchFilter && { name: content.searchFilter }),
    }));
  }, [content.searchFilter, selectedCategory]);

  useEffect(() => {
    if (selectedCategory === "cat-0")
      setInitialAllCategoryItems(allCategoryItems);
  }, [allCategoryItems, selectedCategory]);

  const overflow =
    allCategoryItems?.length > (content.column === 2 ? 6 : 4)
      ? "overflow-y-auto"
      : "";

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading && allCategoryItems.length) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, allCategoryItems]
  );

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
          className={`grid col-card-lay-${content.column} gap-4 max-h-[450px] ${overflow}`}
        >
          {allCategoryItems?.map((item: CategoryItem, index: number) => {
            if (allCategoryItems.length === index + 1) {
              return (
                <CategoryItemCard
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                  id={item.id}
                  ref={lastItemElementRef}
                  tags={item.tags}
                  category={item.category}
                  column={content.column}
                  setSelectedCategoryItems={content.setSelectedCategoryItems}
                  selectedCategoryItems={content.selectedCategoryItems}
                />
              );
            } else {
              return (
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
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Content;
