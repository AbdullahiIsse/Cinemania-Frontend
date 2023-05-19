import './search-bar.scss'
import {IoClose, IoSearch} from "react-icons/io5";
import React, {Fragment, useEffect, useState} from "react";
import {motion} from "framer-motion";
import {MoonLoader} from "react-spinners";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useClickOutside } from "react-click-outside-hook";
import {useDebounce} from "../../hooks/DebounceHook.tsx";
import MovieSearchContent from "../MovieSearchContent/MovieSearchContent.tsx";
import {useNavigate} from "react-router-dom";

interface movie {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
    vote_average: number;
}

const SearchBar = () => {
    const [isExpaned,setExpanded] = useState(false)
    const [ref, isClickedOutside] = useClickOutside();
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [moviesEmpty, setMoviesEmpty] = useState(false);
    const [movie, setMovie] = useState<Movie[]>([]);
    const navigate = useNavigate();


    const isEmpty = !movie || movie.length === 0;
    const containerVariants = {
        expanded:{
            height:"20em"
        },
        collapsed:{
            height:"3.6em"
        }
    }
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setSearchQuery(event.target.value);
    };
    const expandSearchContainer = () => {
        setExpanded(true);
    }

    const collapseSearchContainer = () => {
        setExpanded(false)
        setSearchQuery("");
        setLoading(false)
        setMovie([])
        setMoviesEmpty(false)
    }

    useEffect(()=> {
        if (isClickedOutside){
            collapseSearchContainer()
        }
    },[isClickedOutside])


    const closeIconOnClickHandler = () => {
        collapseSearchContainer()
    }
    const searchTvShow = async () => {
        if (!searchQuery || searchQuery.trim() === '')
            return;
        setLoading(true)
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery.trim()}&include_adult=false&language=en-US&page=1`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjI1OTY2ZTA2NDcwOGZlY2U0MjU2OTAyYjZmNjJkNSIsInN1YiI6IjY0NTc0YjAzZmUwNzdhMDEzOThiZDQyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n-FpTuOAfnnvgFwjTBs_7a0ak9iO9OG8SBSxH0nuPos',
            },
        };

        try {
            const tvShow = await fetch(url,options)
            if (!tvShow.ok) {
                throw new Error('Network response failed for search tv-show');
            }
            const {results} = await tvShow.json();
            console.log(results);
            if (results&&results.length === 0) setMoviesEmpty(true);
            setMovie(results)
            setLoading(false)

        }catch (error){
            console.error(`Error: ${error}`);
        }

        
    }

    useDebounce(searchQuery,500,searchTvShow)

    return (
        <motion.div className='search-bar-container' animate={isExpaned ? "expanded":"collapsed"} variants={containerVariants} ref={ref}>
            <div className="search-input-container">
                <span className="search-icon">
                    <IoSearch/>
                </span>
                <input className='search-input' placeholder={"Search for Movies"} onFocus={expandSearchContainer} value={searchQuery} onChange={changeHandler}></input>
                <span className="close-icon" onClick={closeIconOnClickHandler}>
                    <IoClose/>
                </span>
            </div>
            {isExpaned && <span className="line-seperator"></span>}
            { isExpaned &&  <div className="search-content">
                <div className="loading-wrapper">
                    {
                        isLoading && (
                            <MoonLoader loading color='#000' size={20}/>
                        )
                    }
                </div>
                {moviesEmpty && <div>No movies were found</div>}
                {!isLoading && !isEmpty && <Fragment>
                    {movie.map((movie:movie) => {
                        return (    <MovieSearchContent tsrc={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} name={movie.title} rating={movie.vote_average} onClick={()=>  navigate(`/moviedetails/${movie.id}`)}/>)
                    })}
                </Fragment>}

            </div>}
        </motion.div>
    )


};

export default SearchBar;