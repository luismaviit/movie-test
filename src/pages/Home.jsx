import React from "react";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Banner from "../components/Banner";

export default function Home() {
  return (
    <React.Fragment>
      <div>
        <header>
          <Navbar />
        </header>
        <div>
          <Banner />
        </div>
        <section sx={{ overflowX: "scroll", whitespace: "nowrap" }}>
          <Categories />
        </section>
      </div>
    </React.Fragment>
  );
}
