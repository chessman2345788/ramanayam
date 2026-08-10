export interface PaginationResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const getPaginationParams = (query: any) => {
  const page = parseInt(query.page || "1", 10) || 1;
  const limit = parseInt(query.limit || "10", 10) || 10;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

export const formatPaginationResult = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginationResult<T> => {
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};
