import { AnimatePresence } from "framer-motion";
import { TableContainer } from "../TableContainer/TableContainer";

export const Products = () => {
  const keyword = "product";
  return (
    <div className="flex flex-col bg-transparent overflow-auto items-center justify-center text-white ">
      <AnimatePresence initial={true} mode="wait">
        <TableContainer keyword={keyword} />
      </AnimatePresence>
    </div>
  );
};
