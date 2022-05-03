import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { paginateProducts, productsPagination } from '../productsSlice';
import styles from './Pagination.module.scss';
import { ReactComponent as ChevronLeft } from '../../../assets/icon-chevron-left.svg';
import { ReactComponent as ChevronRight } from '../../../assets/icon-chevron-right.svg';

const Pagination: React.FC = () => {
  const pagination = useAppSelector(productsPagination);
  const dispatch = useAppDispatch();
  const onPaginationButtonClick = (paginationTarget: number) => {
    dispatch(paginateProducts(paginationTarget));
  };
  return (
    <div className={styles.pagination_container}>
      <span className="mr-2">
        Showing {pagination.firstIndex} to {pagination.lastIndex} of{' '}
        {pagination.totalItem} entries
      </span>
      <button
        className={`btn ${styles.pagination_button} mr-2`}
        onClick={onPaginationButtonClick.bind(null, -1)}
        disabled={pagination.currentPage === 1 || pagination.disabled}
      >
        <ChevronLeft />
      </button>
      <button
        className={`btn ${styles.pagination_button}`}
        onClick={onPaginationButtonClick.bind(null, 1)}
        disabled={pagination.currentPage === pagination.totalPage || pagination.disabled}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
