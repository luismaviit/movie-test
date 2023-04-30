import React, { useState, useEffect } from "react";
import styled from "styled-components";

const BottomNavbar = styled.nav`
  background: rgba(0, 0, 0, 0.7);
  height: 80px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  transition: background 0.3s;
`;

const BottomNavbarItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BottomCategory = styled.span`
  font-size: ${({ selected }) => (selected ? "22px" : "20px")};
  color: white;
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  margin-right: 10px;
  cursor: pointer;
`;

const BottomNavbarComponent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showBottomNavbar, setShowBottomNavbar] = useState(false);

  const handleCategoryClick = (category) => {
    window.location.reload();
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://api.tvmaze.com/shows");
      const shows = await response.json();
      const genreCounts = {};

      shows.forEach((show) => {
        show.genres.forEach((genre) => {
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });
      });

      const sortedGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([genre]) => genre);

      setCategories(sortedGenres);
      setSelectedCategory(localStorage.getItem("selectedCategory") || "");
    };

    fetchCategories();

    const handleResize = () => {
      if (window.innerWidth < 600) {
        setShowBottomNavbar(true);
      } else {
        setShowBottomNavbar(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BottomNavbar show={showBottomNavbar}>
      <BottomNavbarItems>
        <BottomCategory
          selected={selectedCategory === ""}
          onClick={() => handleCategoryClick("")}
        >
          Inicio
        </BottomCategory>
        {categories.map((category) => (
          <BottomCategory
            key={category}
            selected={selectedCategory === category}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </BottomCategory>
        ))}
      </BottomNavbarItems>
    </BottomNavbar>
  );
};

export default BottomNavbarComponent;
