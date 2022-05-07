import React from "react";
import Categories from "../components/Categories";
import ContentWrap from "../components/ContentWrap";

import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

const homepage = () => {
  return (
    <div>
      <Slider />
      <ContentWrap>
        <Categories />
        <Products />
        <Newsletter />
      </ContentWrap>
    </div>
  );
};

export default homepage;
