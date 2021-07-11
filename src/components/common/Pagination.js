import { Link } from 'react-router-dom';

const Pagination = ({ totalCount, currentPage, perPage, pageNeighbours }) => {
  const leftArrow = 'LEFT_ARROW';
  const rightArrow = 'RIGHT_ARROW';
  const totalPages =
    totalCount === null ? null : Math.ceil(totalCount / perPage);

  const range = (start, end) => {
    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  const getPaginationItems = totalPages => {
    const arrowBlockLength = pageNeighbours * 2 + 3;
    const paginationLength = arrowBlockLength + 2;

    if (paginationLength >= totalPages) return range(1, totalPages + 1);

    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    let pages = [...range(startPage, endPage + 1)];
    const neededToFill = arrowBlockLength - pages.length - 1;

    if (startPage > 2 && totalPages - endPage > 1) {
      pages = [leftArrow, ...pages, rightArrow];
    } else if (startPage > 2) {
      pages = [
        leftArrow,
        ...range(startPage - neededToFill, startPage),
        ...pages,
      ];
    } else {
      pages = [
        ...pages,
        ...range(endPage + 1, endPage + neededToFill + 1),
        rightArrow,
      ];
    }

    return [1, ...pages, totalPages];
  };

  return (
    !!totalPages &&
    totalPages !== 1 && (
      <nav aria-label="pagination">
        <ul className="pagination justify-content-center mt-5">
          {getPaginationItems(totalPages).map(item => {
            if (item === leftArrow) {
              return (
                <li key={item} className="page-item">
                  <Link
                    to={`?page=${encodeURIComponent(
                      currentPage - pageNeighbours * 2 - 1
                    )}`}
                    className="page-link"
                  >
                    &laquo;
                  </Link>
                </li>
              );
            }

            if (item === rightArrow) {
              return (
                <li key={item} className="page-item">
                  <Link
                    to={`?page=${encodeURIComponent(
                      currentPage + pageNeighbours * 2 + 1
                    )}`}
                    className="page-link"
                  >
                    &raquo;
                  </Link>
                </li>
              );
            }

            if (item === currentPage) {
              return (
                <li key={item} className="page-item active">
                  <span className="page-link">{item}</span>
                </li>
              );
            }

            return (
              <li key={item} className="page-item">
                <Link
                  to={`?page=${encodeURIComponent(item)}`}
                  className="page-link"
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    )
  );
};

export default Pagination;
