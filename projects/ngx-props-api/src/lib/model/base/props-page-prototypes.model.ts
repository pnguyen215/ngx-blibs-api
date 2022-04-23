export interface PropsPagePrototypes<T> {
    isFirst?: boolean;
    totalItems?: number;
    isLast?: boolean;
    totalPages?: number;
    hasPrevious?: boolean;
    hasNext?: boolean;
    currentPage?: number;
    totalNumberOfElements?: number;
    pageContents?: T[];
    contents?: T[]
}
