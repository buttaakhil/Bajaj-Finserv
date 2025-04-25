import React from "react";
import "./Sort.css";

const Sort = ({ sort, setSort }) => {
  return (
    <div className="sort-container">
      <h4>Sort by</h4>
      <div className="sort-options">
        <label>
          <input
            type="radio"
            value="price"
            checked={sort === "price"}
            onChange={(e) => setSort(e.target.value)}
          />
          Price: Low-High
        </label>
        <label>
          <input
            type="radio"
            value="experience"
            checked={sort === "experience"}
            onChange={(e) => setSort(e.target.value)}
          />
          Experience - Most Experience first
        </label>
      </div>
    </div>
  );
};

export default Sort;
