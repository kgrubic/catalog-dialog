type CategoryItemId = string;
type TagId = string;

export type CategoryItem = {
  id: CategoryItemId;
  name: string;
  description: string;
  icon?: string | null;
  tags: TagId[];
  category: CategoryId;
};

type CategoryId = string;

export type Category = {
  id: CategoryId;
  name: string;
};

// type Tag = {
//   id: TagId;
//   primary: string;
//   aliases: string[];
// };

// type CatalogConfig = {
//   title: string;
//   categories: Category[];
//   items: CategoryItem[];
//   tags: Tag[];
//   prompt?: string;
//   actions: {
//     add: string;
//     cancel: string;
//     callback: (item: CategoryItemId | null) => void;
//   };
//   columns?: 1 | 2;
// };
