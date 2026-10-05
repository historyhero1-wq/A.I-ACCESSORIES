import { useQuery } from '@tanstack/react-query';
import { fetchStoreCategories } from '@/services/api';

export function useMegaMenuCategories() {
    const { data: categories = [], isLoading, error } = useQuery({
        queryKey: ['store-categories', 'all'],
        queryFn: () => fetchStoreCategories(),
        staleTime: 0,
        refetchInterval: 1000 * 30,
    });

    return {
        categories,
        isLoading,
        error: error instanceof Error ? error.message : null,
    };
}
