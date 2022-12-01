import { UserSearchDTO } from 'types/models/UserSearchDTO';

export interface SearchPageState {
  searchResult: UserSearchDTO[];
  searchText: string;
}

export type SearchParam = {
  search: string;
};
