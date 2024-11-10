import { useState } from "react";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(searchQuery);
  };

  return (
    <form className="pb-4 flex" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex-1 rounded bg-gray-800 p-2 text-sm max-w-3xl"
        placeholder="Search by name, address or description"
        value={searchQuery}
        onChange={handleTextChange}
      />
      <button
        type="submit"
        className="flex-none rounded bg-gray-800 hover:bg-gray-600 p-2 font-semibold text-sm"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
