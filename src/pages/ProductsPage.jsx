import { Animated } from "../components/Dashboard/Animated";
import { Products } from "../components/Dashboard/Products/Products";

export const ProductsPage = () => {
    return (
      <div className="w-5/6 h-full">
        <Animated>
          <Products />
        </Animated>
      </div>
    );
  };
  