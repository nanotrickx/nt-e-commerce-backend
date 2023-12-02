import { SortingDirection } from '@common/sorting-direction';

export const DEFAULT_PAGINATED_ITEMS_COUNT = 10;

export const MAX_TRANSACTION_RETRY_TIMEOUT = 120000;

export class PagedModel<T> {
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  totalPages: number;
  orderByPropertyName: string;
  sortingDirection: SortingDirection;
  items: T[];
}

export class MongooseQueryModel {
  filter: any;
  populate?: any;
  select?: string;
  lean?: boolean;
  sort?: string;
  sortBy?: 'asc' | 'desc' = 'asc';
  limit?: number;
}
