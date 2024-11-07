"use client";

import { create } from "zustand";
import { usePathname, useRouter } from "next/navigation";

interface SearchStore {
  query: string;
  setQuery: (newQuery: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  setQuery: (newQuery) => set({ query: newQuery }),
}));

export function useSearchResult() {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);
  const searchUrl = process.env.NEXT_PUBLIC_HOME_SEARCH;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    console.log("newQuery: " + newQuery);
    setQuery(newQuery); // Update the query in Zustand store
    router.push(`${searchUrl}/${encodeURIComponent(newQuery.trim())}`);
  };

  const handleSearchButtonClicked = () => {
    const decodedPathname = decodeURIComponent(pathname).trim();
    const targetPath = `/home/search/${query}`.trim();

    //console.log("query: " + query);
    //console.log("pathname: " + decodedPathname);
    //console.log(targetPath);
    //console.log("test: " + typeof targetPath);
    //console.log("test2: " + typeof decodedPathname);
    //console.log("isSame: " + (decodedPathname === targetPath));

    if (!query || decodedPathname === targetPath) return;
    router.push(`${searchUrl}/${encodeURIComponent(query.trim())}`);
  };

  const handleClearInput = () => {
    setQuery("");
  };

  return {
    query,
    handleInputChange,
    handleSearchButtonClicked,
    handleClearInput,
  };
}

export function useIsSearchPath() {
  const pathname = usePathname();

  return pathname && pathname.startsWith(`/home/search`);
}
