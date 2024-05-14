import { AnimatePresence } from "framer-motion";
import { Table } from "../Table/Table";
import { keywordStore } from "../../../store/useStore";
export const Products = () => {
  keywordStore.setState({ keyword:"products" })
  return (
    <div className="flex flex-col w-full bg-transparent h-screen items-center justify-center text-white text-4xl">
      <AnimatePresence initial={true} mode="wait">
        <Table />
      </AnimatePresence>
    </div>
  );
};
