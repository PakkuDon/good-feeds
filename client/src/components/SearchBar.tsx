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

  const handleReset = () => {
    setSearchQuery("");
    onSubmit("");
  };

  return (
    <form className="pb-4 flex" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex-1 rounded-tl rounded-bl bg-gray-800 p-2 text-sm max-w-3xl"
        placeholder="Search by name, address or description"
        value={searchQuery}
        onChange={handleTextChange}
      />
      <input
        type="reset"
        value="X"
        alt="Clear search"
        className="flex-none rounded-tr rounded-br bg-gray-800 py-2 px-3 font-semibold text-sm"
        onClick={handleReset}
      />
      <button
        type="submit"
        className="flex-none rounded bg-gray-800 hover:bg-gray-600 p-2 font-semibold text-sm ml-2"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
