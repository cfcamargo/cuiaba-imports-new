import { IconButton } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginatorProps {
  readonly handleNextPage: () => void;
  readonly handleBackPage: () => void;
  readonly handleNextLastPage: () => void;
  readonly handleBackFirstPage: () => void;
}

export default function Paginator({
  handleBackFirstPage,
  handleBackPage,
  handleNextLastPage,
  handleNextPage,
}: PaginatorProps) {
  return (
    <div className="flex items-center gap-2 py-4">
      <IconButton onClick={handleBackFirstPage}>
        <ChevronsLeft />
      </IconButton>
      <IconButton onClick={handleBackPage}>
        <ChevronLeft />
      </IconButton>
      <IconButton onClick={handleNextPage}>
        <ChevronRight />
      </IconButton>
      <IconButton onClick={handleNextLastPage}>
        <ChevronsRight />
      </IconButton>
    </div>
  );
}
