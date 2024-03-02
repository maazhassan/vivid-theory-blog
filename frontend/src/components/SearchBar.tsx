import React, { useState, useEffect } from 'react';
import { Blog } from '@/types/blog';
import { getBlogs } from '@/services/api';

interface SearchBarProps {
  search: string;
  onInputChange: (search: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onInputChange, onSearch }) => {
  const [suggestions, setSuggestions] = useState<Blog[]>([]);

  useEffect(() => {
    if (!search) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const { blogs: fetchedBlogs } = await getBlogs(search, 1, 4, false);
        setSuggestions(fetchedBlogs);
        console.log(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  }

  return (
    <div className="flex flex-row justify-center my-4 gap-2">
      <input
        type="text"
        placeholder='Search...'
        value={search}
        onChange={e => onInputChange(e.target.value)}
        className="border border-gray-200 p-4 rounded-md bg-white w-1/2 focus:outline-none"
        onKeyDown={handleEnter}
      />
      <button
        className="bg-blue-500 text-white p-4 rounded-md"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;