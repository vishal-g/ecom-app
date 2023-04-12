import SHOP_DATA from "../../shop-data.json";
import "./shop.styles.scss";

import { useContext } from "react";

import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.componet";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((product) => {
        const { id, name } = product;
        return <ProductCard product={product} key={id} />;
      })}
    </div>
  );
};

export default Shop;
