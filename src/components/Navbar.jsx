import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Input from "./Input";

const Navbar = styled.nav`
  background: ${({ scrolled }) =>
    scrolled
      ? "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%)"
      : "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"};
  height: 80px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  transition: background 0.3s;
`;

const NavbarItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  @media (max-width: 880px) {
    justify-content: space-around;
  }
`;

const Logo = styled.img`
  height: 40px;
  @media (max-width: 880px) {
    height: 30px;
  }
`;

const Categories = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 880px) {
    display: none;
  }
  span {
    font-size: 20px;
    color: white;
    font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
    margin-right: 10px;
    cursor: pointer;
    @media (max-width: 880px) {
      display: none;
    }
  }
`;

const Category = styled.span`
  font-size: 20px;
  color: white;
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  margin-right: 10px;
  cursor: pointer;
`;

const NavbarComponent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleCategoryClick = (category) => {
    window.location.reload()
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

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
        .slice(0, 6)
        .map(([genre]) => genre);

      setCategories(sortedGenres);
      setSelectedCategory(localStorage.getItem("selectedCategory") || "");
    };

    fetchCategories();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar scrolled={scrolled}>
      <NavbarItems>
        <Logo
          src="https://static.tvmaze.com/images/tvm-header-logo.png"
          alt="Logo"
        />
        <Categories>
          <span onClick={() => handleCategoryClick('')}>Inicio</span>
          {categories.map((category) => (
            <Category
              key={category}
              selected={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Category>
          ))}
        </Categories>
        <Input />
      </NavbarItems>
    </Navbar>
  );
};

export default NavbarComponent;
