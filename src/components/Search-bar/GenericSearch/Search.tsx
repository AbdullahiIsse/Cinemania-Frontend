import React, { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoClose, IoSearch } from "react-icons/io5";
import { MoonLoader } from "react-spinners";
import MovieSearchContent from "../../MovieSearchContent/MovieSearchContent.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useClickOutside } from "react-click-outside-hook";
import { useDebounce } from "../../../hooks/DebounceHook.tsx";
import { useNavigate } from "react-router-dom";
import './Search.scss'

interface SearchResult {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
    vote_average: number;
    name:string;
    profile_path:string;

}

interface SearchBarProps {
    placeholder: string;
    searchUrl: string;
    navigateUrl: (id: number) => string;
}

const SearchBar = <T extends SearchResult>({
                                               placeholder,
                                               searchUrl,
                                               navigateUrl,
                                           }: SearchBarProps) => {
    const [isExpanded, setExpanded] = useState(false);
    const [ref, isClickedOutside] = useClickOutside();
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [resultsEmpty, setResultsEmpty] = useState(false);
    const [results, setResults] = useState<T[]>([]);
    const navigate = useNavigate();

    const isEmpty = !results || results.length === 0;
    const containerVariants = {
        expanded: {
            height: "20em",
        },
        collapsed: {
            height: "3.6em",
        },
    };

    const changeHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    };

    const expandSearchContainer = () => {
        setExpanded(true);
    };

    const collapseSearchContainer = () => {
        setExpanded(false);
        setSearchQuery("");
        setLoading(false);
        setResults([]);
        setResultsEmpty(false);
    };

    useEffect(() => {
        if (isClickedOutside) {
            collapseSearchContainer();
        }
    }, [isClickedOutside]);

    const closeIconOnClickHandler = () => {
        collapseSearchContainer();
    };

    const searchItems = async () => {
        if (!searchQuery || searchQuery.trim() === "") return;
        setLoading(true);
        const url = `${searchUrl}?query=${searchQuery.trim()}&include_adult=false&language=en-US&page=1`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjI1OTY2ZTA2NDcwOGZlY2U0MjU2OTAyYjZmNjJkNSIsInN1YiI6IjY0NTc0YjAzZmUwNzdhMDEzOThiZDQyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n-FpTuOAfnnvgFwjTBs_7a0ak9iO9OG8SBSxH0nuPos",
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Network response failed for search items");
            }
            const { results } = await response.json();
            console.log(results);
            if (results && results.length === 0) setResultsEmpty(true);
            setResults(results);
            setLoading(false);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    useDebounce(searchQuery, 500, searchItems);

    return (
        <motion.div
            className="search-bar-container"
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={containerVariants}
            ref={ref}
        >
            <div className="search-input-container">
        <span className="search-icon">
          <IoSearch />
        </span>
                <input
                    className="search-input"
                    placeholder={placeholder}
                    onFocus={expandSearchContainer}
                    value={searchQuery}
                    onChange={changeHandler}
                />
                <span className="close-icon" onClick={closeIconOnClickHandler}>
          <IoClose />
        </span>
            </div>
            {isExpanded && <span className="line-separator" />}
            {isExpanded && (
                <div className="search-content">
                    <div className="loading-wrapper">
                        {isLoading && <MoonLoader loading color="#000" size={20} />}
                    </div>
                    {resultsEmpty && <div>No items were found</div>}
                    {!isLoading && !isEmpty && (
                        <Fragment>
                            {results.map((item: T) => (
                                <Fragment key={item.id}>

                                    <MovieSearchContent
                                        tsrc={`https://image.tmdb.org/t/p/w300${item.poster_path ? item.poster_path : item.profile_path}`}
                                        name={item.title ? item.title:item.name }
                                        rating={item.vote_average}
                                        onClick={() => navigate(navigateUrl(item.id))}
                                    />
                                </Fragment>
                            ))}
                        </Fragment>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default SearchBar;
