interface usePaginationProps {
    page: number;
    setPage: (page: number) => void;
    totalCount: number;
    limit: number;
}

const usePagination = ({ page, setPage, totalCount, limit }: usePaginationProps) => {

    const lastPage = Math.max(1, Math.ceil(totalCount / limit))
    
    console.log("lastPage", totalCount);
    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleNextPage = () => {
        const lastPage = Math.ceil(totalCount / limit);
        if (page >= lastPage) return;
        setPage(page + 1);
    };    

  return {
    page,
    lastPage,
    handlePreviousPage,
    handleNextPage
  }
}

export default usePagination