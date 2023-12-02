import { SortingDirection } from '@common/sorting-direction';

export class PagedResponse {
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  totalPages: number;
  orderByPropertyName: string;
  sortingDirection: SortingDirection;
}
