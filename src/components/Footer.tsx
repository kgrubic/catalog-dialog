import { CategoryItem } from "../types/catalog";
import { functionMap } from "../types/functionMappings";

function Footer(item: {
  add: string;
  cancel: string;
  callback: string;
  disabledAdd: boolean;
  selectedCategoryItems: CategoryItem[];
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  prompt: string;
}) {
  const handleCallback = (value: CategoryItem[] | null) => {
    if (item.callback in functionMap) {
      functionMap[item.callback](value);
    }
    item.setIsDialogOpen(false);
  };

  return (
    <div className=" flex items-center border-1 justify-between border-solid w-full h-24 p-4">
      <div className="">{item.prompt}</div>
      <div className="flex items-center justify-end gap-4">
        <button
          className="btn-primary w-24"
          disabled={item.disabledAdd}
          onClick={() => handleCallback(item.selectedCategoryItems)}
        >
          {item.add}
        </button>
        <button className="btn w-24" onClick={() => handleCallback(null)}>
          {item.cancel}
        </button>
      </div>
    </div>
  );
}

export default Footer;
