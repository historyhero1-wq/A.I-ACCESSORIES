import { useQuery } from '@tanstack/react-query';
import { fetchStoreCategories } from '@/services/api';

export function useStoreCategories(limit?: number) {
    const { data: categories = [], isLoading, error } = useQuery({
        queryKey: ['store-categories', limit ?? 'all'],
        queryFn: () => fetchStoreCategories(limit),
        staleTime: 0,
        refetchInterval: 1000 * 30,
    });

    return {
        categories,
        isLoading,
        error: error instanceof Error ? error.message : null,
    };
}
