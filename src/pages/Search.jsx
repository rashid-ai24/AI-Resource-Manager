import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../hooks/use-search';
import { SearchInput } from '../components/search/search-input';
import { SearchResults } from '../components/search/search-results';
import { PageHeader } from '../components/layout/PageHeader';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const { results, isLoading } = useSearch(query);

  const handleQueryChange = useCallback((value) => {
    setQuery(value);
    if (value) {
      setSearchParams({ q: value }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [setSearchParams]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Search"
        description="Search across all entities"
        icon={Search}
      />

      <SearchInput
        value={query}
        onChange={handleQueryChange}
        placeholder="Search agents, providers, models, accounts, projects, notes, tags..."
        className="max-w-2xl"
      />

      <SearchResults results={results} isLoading={isLoading} query={query} />
    </div>
  );
}
