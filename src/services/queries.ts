import { gql } from "@apollo/client";

export const GET_ALL_CATEGORY_ITEMS = gql`
  query allCategoryItems(
    $page: Int!
    $perPage: Int!
    $filter: CategoryItemFilter!
  ) {
    allCategoryItems(page: $page, perPage: $perPage, filter: $filter) {
      id
      name
      description
      icon
      category
    }
    allCategories(sortField: "name") {
      name
      id
    }
    allColumns {
      column
    }
  }
`;

export const GET_DIALOG_CONFIG = gql`
  query appConfig {
    allColumns {
      column
    }
    allActions {
      add
      callback
      cancel
    }
    allTitles {
      title
    }
    allTitles {
      title
    }
    allPrompts {
      prompt
    }
  }
`;
