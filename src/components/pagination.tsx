import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";



interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export function PaginatioElement({ totalItems, itemsPerPage, currentPage ,setCurrentPage }: PaginationProps) {

  const totalPages = Math.ceil(totalItems / itemsPerPage)-1;

  const itemsLinksPerPage = 3;

  const currentGroup = Math.floor((currentPage)/itemsLinksPerPage);

  const startPage = currentGroup * itemsLinksPerPage ;

  const endPage = Math.min(startPage + itemsLinksPerPage - 1, totalPages);




  const handlePageChange = (page: number) => {
    setCurrentPage(page);

  };

  const handlePrevious = () => {
    if (currentPage  > 0) {
      handlePageChange(currentPage - 1);

    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);

    }
   
    
  };


  return (
    <Pagination className=" mt-1.5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePrevious} />
        </PaginationItem>
        {Array.from({ length: endPage - startPage +1 }, (_, index) => (
          <PaginationItem key={index} className={currentPage  === startPage+index? "shadow rounded-sm" : ""}>
            <PaginationLink href="#" onClick={() => handlePageChange(startPage + index)}>
              {startPage + index+1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {endPage < totalPages && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => handlePageChange(endPage + 1)}>
              ...
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext href="#" onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginatioElement;