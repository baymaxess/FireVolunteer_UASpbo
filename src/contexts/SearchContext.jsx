import { createContext } from "react";

const SearchContext = createContext({
    searchValue: "",
    setSearchValue: () => { },
});

export default SearchContext;
