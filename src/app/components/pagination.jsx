// Пагинация - разделение контента на страницы
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  // itemsCount - кол-во итемов/юзеров (12)
  // pageSize - кол во отображаемых итемов на странице

  //   pageCount - все итемы делятся на кол-во элементов отображаемых на странице(4), результат вычисления
  // будет равен количествам страниц. в данном случае будет 3 стр. с отображением
  const pageCount = Math.ceil(itemsCount / pageSize); // 12 / 4 = 3 Math.ceil для округления
  if (pageCount === 1) return null; // если результат вычисления pageCount =1, не будем отображать пагинацию, т.к страница 1
  const pages = _.range(1, pageCount + 1); // [1,2,3]

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li
              className={
                currentPage === page ? 'page-item active' : 'page-item'
              }
              key={'page_' + page}
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Pagination;
