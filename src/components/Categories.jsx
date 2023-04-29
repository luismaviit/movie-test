import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
//components
import Button from "./Button";

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  /* ß */
  margin-bottom: -15px;
  h2 {
    display: flex;
    justify-self: f;
    text-align: start;
    font-size: 26px;
    font-weight: bold;
    margin: 0;
    margin-bottom: 5px;
    align-self: flex-start;
    margin-left: 90px;
  }
`;


const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  overflow: hidden;
`;

const ScrollButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

const MovieList = styled.ul`
  height: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 25px;
  overflow-x: scroll;
  scroll-behavior: smooth;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Movie = styled.li`
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }

  &:hover div {
    opacity: 1;
  }
`;

const MovieImage = styled.img`
  border-radius: 15px;
`;

const MovieInfo = styled.div`
  padding-left: 15px;
  padding-right: 5px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  display: flex;
  gap: -5px;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 15px;
  h1{
    margin-bottom: -15px;
  }
  p{
    margin-bottom: -15px;
  }
`;

const MoviesByGenre = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef({});

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((response) => response.json())
      .then((data) => {
        const allGenres = data.reduce((genres, show) => {
          const genre = show.genres[0];
          if (!genres.includes(genre)) {
            return [...genres, genre];
          }
          return genres;
        }, []);

        setGenres(allGenres);
        setMovies(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const getMoviesByGenre = (genre) => {
    return movies.filter((movie) => movie.genres.includes(genre));
  };

  const handleScroll = (direction, genre) => {
    if (direction === "left") {
      scrollRef.current[genre].scrollLeft -= 200;
    } else {
      scrollRef.current[genre].scrollLeft += 200;
    }
  };

  const selectedCategory = localStorage.getItem("selectedCategory");
  const renderGenres = () => {
    if (selectedCategory) {
      const genre = selectedCategory;
      return (
        <Section key={genre}>
          <h2>{genre}</h2>
          <ScrollContainer>
            <ScrollButton onClick={() => handleScroll("left", genre)}>
              {"<"}
            </ScrollButton>
            <MovieList ref={(el) => (scrollRef.current[genre] = el)}>
              {getMoviesByGenre(genre).map((movie) => (
                <Movie key={movie.id}>
                  <MovieImage src={movie.image.medium} alt={movie.name} />
                  
                  <MovieInfo>
                    <h1 >{movie.name}</h1>
                    <p >Status: {movie.status}</p>
                    <p>Rating: {movie.rating.average}</p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${movie.summary
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}...`,
                      }}
                    ></div>
                    <Button url={movie.url}/>
                  
                  </MovieInfo>
                </Movie>
              ))}
            </MovieList>
            <ScrollButton onClick={() => handleScroll("right", genre)}>
              {">"}
            </ScrollButton>
          </ScrollContainer>
        </Section>
      );
    } else {
      return genres.map((genre) => (
        <Section key={genre}>
          <h2>{genre}</h2>
          <ScrollContainer>
            <ScrollButton onClick={() => handleScroll("left", genre)}>
              {"<"}
            </ScrollButton>
            <MovieList ref={(el) => (scrollRef.current[genre] = el)}>
              {getMoviesByGenre(genre).map((movie) => (
                <Movie key={movie.id}>
                  <MovieImage src={movie.image.medium} alt={movie.name} />
                  <MovieInfo>
                    <h1 >{movie.name}</h1>
                    <p >Status: {movie.status}</p>
                    <p>Rating: {movie.rating.average}</p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${movie.summary
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}...`,
                      }}
                    ></div>
                    <Button url={movie.url}/>
                  
                  </MovieInfo>
                </Movie>
              ))}
            </MovieList>
            <ScrollButton onClick={() => handleScroll("right", genre)}>
              {">"}
            </ScrollButton>
          </ScrollContainer>
        </Section>
      ));
    }
  };

  return <div>{renderGenres()}</div>;

};

export default MoviesByGenre;
