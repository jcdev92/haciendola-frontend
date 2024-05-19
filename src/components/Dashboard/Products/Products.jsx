import { AnimatePresence } from "framer-motion";
import { Table } from "../Table/Table";

export const Products = () => {
  const keyword = "product";
  return (
    <div className="flex flex-col bg-transparent overflow-auto items-center justify-center text-white ">
      <AnimatePresence initial={true} mode="wait">
        <Table keyword={keyword} />
      </AnimatePresence>
    </div>
  );
};
