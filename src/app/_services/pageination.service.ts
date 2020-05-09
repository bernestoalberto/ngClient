import * as _ from 'underscore';

export class PagerService {
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);


        let startPage = 0;
        let endPage = 0;

        if (totalPages <= 10) {
            // less than 10 pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item index
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ngRepeat in the pager control
        const pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }
  }
