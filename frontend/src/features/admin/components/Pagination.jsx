import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <div className="page-info">
        {currentPage} from {totalPages}
      </div>

      <div className="page-control">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft />
        </button>

        <div className="current-page">{currentPage}</div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;