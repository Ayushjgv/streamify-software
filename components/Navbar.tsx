import React, { useState, useEffect, useRef } from "react";
import { Search, User, Tv } from "lucide-react";
import SearchResults from "../components/SearchResults";
import axios from "axios";
// import { useNavigation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [SearchResultsList, setSearchResultsList] = useState<any[]>([]);
  const ANILISTAPI = "https://graphql.anilist.co";
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearch(value);

    // Clear previous timeout
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set new timeout
    timerRef.current = setTimeout(async () => {
      try {
        const res = await axios.post(ANILISTAPI, {
          query: Query,
          variables: {
            search: value,
          },
        });

        console.log(res.data.data.Page.media);
        setSearchResultsList(res.data.data.Page.media);
      } catch (err) {
        console.error(err);
      }
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target.value === "") {
      navigate("/home");
      return;
    }
    navigate(`/search/query=${encodeURIComponent(search)}`);
  };

  return (
    <nav
      className={`fixed top-0 z-50 flex flex-col w-full items-center justify-between px-4 py-4 md:px-12 transition-colors duration-300 ${
        isScrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="flex flex items-center justify-between w-full">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="rounded-xl bg-purple-600 p-2 text-white">
            <Tv className="h-5 w-5" />
          </div>

          <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
            STREAMIFY
          </span>
        </div>

        <div className="relative hidden w-full max-w-md sm:block mx-4">
          <input
            type="text"
            placeholder="Search anime..."
            className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-2 pl-11 text-sm text-white"
            value={search}
            onChange={handleSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (search.trim() === "") {
                  navigate("/home");
                  return;
                }

                navigate(`/search?query=${encodeURIComponent(search)}`);
              }
            }}
          />

          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        </div>

        <button className="flex items-center justify-center rounded-full bg-white/10 border border-white/10 p-2.5 text-neutral-200">
          <User className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-center w-full pl-25">
        {search && (
          <div className="absolute top-full mt-2 w-full max-w-md rounded-lg bg-[#0a0a0a]/90 border border-white/10 p-4 text-sm text-white">
            {/* Render search results here */}
            Search results for "{search}"
            <SearchResults search={SearchResultsList} />
          </div>
        )}
      </div>
    </nav>
  );
};

const Query = `
query ($search: String) {
  Page(page: 1, perPage: 10) {
    media(search: $search, type: ANIME) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
      }
    }
  }
}
`;

export default Navbar;
