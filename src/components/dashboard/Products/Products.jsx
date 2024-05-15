import { AnimatePresence } from "framer-motion";
import { TableContainer } from "../Table/TableContainer";
export const Products = () => {
  const keyword = "product";
  return (
    <div className="flex flex-col w-full bg-transparent h-screen items-center justify-center text-white text-4xl">
      <AnimatePresence initial={true} mode="wait">
        <TableContainer keyword={keyword} />
      </AnimatePresence>
    </div>
  );
};
