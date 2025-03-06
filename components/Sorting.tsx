'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const Sorting = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const sortingOptions = [
    { key: 'vote_average', label: 'Rating' },
    { key: 'popularity', label: 'Popularity' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'primary_release_date', label: 'Release Date' },
    { key: 'vote_count', label: 'Vote Count' },
  ];

  const getCurrentSorting = (option: string) => {
    const sortBy = searchParams.get('sort_by');
    if (sortBy?.startsWith(option)) {
      return sortBy.endsWith('asc') ? 'asc' : 'desc';
    }
    return null;
  };

  const toggleSorting = (option: string) => {
    const currentSorting = getCurrentSorting(option);
    let newSort = '';

    if (!currentSorting) {
      newSort = `${option}.asc`;
    } else if (currentSorting === 'asc') {
      newSort = `${option}.desc`;
    }
    // Third click removes sorting
    
    const params = new URLSearchParams(searchParams.toString());
    if (newSort) {
      params.set('sort_by', newSort);
    } else {
      params.delete('sort_by');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 p-4 bg-gray-800 rounded-lg flex-wrap">
      {sortingOptions.map(({ key, label }) => {
        const currentSorting = getCurrentSorting(key);
        return (
          <button
            key={key}
            onClick={() => toggleSorting(key)}
            className={`flex items-center p-2 gap-1 text-white hover:text-gray-300 ${currentSorting ? 'bg-pink-900' : ''}`}
          >
            {label}
            {currentSorting === 'asc' && ' 🔼'}
            {currentSorting === 'desc' && ' 🔽'}
          </button>
        );
      })}
    </div>
  );
};

export default Sorting;