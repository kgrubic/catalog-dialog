import { useQuery } from "@apollo/client";
import { GET_DIALOG_CONFIG } from "../services/queries";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./header";
import { useState } from "react";
import { CategoryItem } from "../types/catalog";

function CategoryDialog(dialog: {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedCategoryItems, setSelectedCategoryItems] = useState<
    CategoryItem[]
  >([]);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const { data } = useQuery(GET_DIALOG_CONFIG);
  const { allActions, allColumns, allTitles, allPrompts } = data || {};
  const { add, cancel, callback } = allActions?.[0] || "";
  const { column } = allColumns?.[0] || 2;
  const { title } = allTitles?.[0] || "";
  const { prompt } = allPrompts?.[0] || "";

  return (
    <div className={`dialog-size-${column}`}>
      <Header setSearchFilter={setSearchFilter} title={title} />
      <Content
        selectedCategoryItems={selectedCategoryItems}
        setSelectedCategoryItems={setSelectedCategoryItems}
        column={column}
        searchFilter={searchFilter}
      />
      <Footer
        add={add}
        cancel={cancel}
        callback={callback}
        selectedCategoryItems={selectedCategoryItems}
        disabledAdd={selectedCategoryItems.length === 0}
        setIsDialogOpen={dialog.setIsDialogOpen}
        prompt={prompt}
      />
    </div>
  );
}

export default CategoryDialog;
