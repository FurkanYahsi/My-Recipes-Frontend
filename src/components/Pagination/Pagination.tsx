import usePagination from './Pagination.logic';

import { IconBaseProps } from 'react-icons';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const IconArrowLeft = MdKeyboardDoubleArrowLeft as React.FC<IconBaseProps>;
const IconArrowRight = MdKeyboardDoubleArrowRight as React.FC<IconBaseProps>;

interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    totalCount: number;
    limit: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage, totalCount, limit }) => {

    const { lastPage, handlePreviousPage, handleNextPage } = usePagination({ page, setPage, totalCount, limit }); 

    return (
        <div className='pagination'>
            <button className={`previous-page${page === 1 ? ' cannot-click' : ''}`} onClick={handlePreviousPage}>
                <IconArrowLeft/>Previous
            </button>
            <span className='page-number'>Page {page} / {lastPage}</span>        
            <button className={`next-page${page === lastPage ? ' cannot-click' : ''}`} onClick={handleNextPage}>
                Next<IconArrowRight/>
            </button>
        </div>
    )
}

export default Pagination