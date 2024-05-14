import { AnimatePresence } from "framer-motion";
import { Table } from "./Table";

export const Products = () => {
  const keyword = ["products"];
  return (
    <div className="flex flex-col w-full bg-transparent h-screen items-center justify-center text-white text-4xl">
      <AnimatePresence initial={true} mode="wait">
        <Table keyword={keyword}/>
      </AnimatePresence>
    </div>
  );
};
