import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, totalPages, onPageChange, dataPerPage,pageStart,pageEnd ,totalRecords}) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">

    

      <div className="page-info1">
        {pageStart} - {pageEnd} of {totalRecords}
      </div>
    <> </>
      

      <div className="page-control">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft />
        </button>

        <div className="page-info1">{currentPage} from {totalPages}</div>

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