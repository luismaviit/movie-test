import React from "react";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Banner from "../components/Banner";

export default function Home() {
  const selectedCategory = localStorage.getItem("selectedCategory");

  return (
    <React.Fragment>
      <div>
        <header>
          <Navbar />
        </header>
        {selectedCategory.length === 0 && (
          <div>
            <Banner />
          </div>
        )}
        <section>
          <Categories />
        </section>
      </div>
    </React.Fragment>
  );
}

