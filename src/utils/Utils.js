
const pagenoToLink = (pageNo, rowsPerPage) => {
    let totalIndex = pageNo*rowsPerPage
    let startIndex = totalIndex - rowsPerPage;
    let endIndex = totalIndex -1;
    return `http://localhost:8080/data/${startIndex}/${endIndex}/`;
}

const getPageBtns = (maxPage) => { /* Logic checks the maxPage count in this.props 
    and sets the this.state to no of page-buttons to be rendered*/
    if(maxPage >= 3) {
        return [1,2,3];
    } else {
        if(maxPage > 0) {
            let pages = []
            for(let i = 1; i <= maxPage; i++) {
            pages.push(i);
            }
            return pages;
        } else {
        return [1];
        }
    }
}

const incrByOne = (count, currPages, actvPageNo) => { /* Function increments the page buttons */
    
    
    let maxPage = count;
    if( String(currPages) !== String([maxPage]) &&
        String(currPages) !== String([maxPage-1, maxPage]) &&
        String(currPages) !== String([maxPage-2, maxPage-1, maxPage])
    ) {
        let pageArr = [];
        currPages.forEach(el=> {
            pageArr.push(el+1);
        });
        return {currPages : pageArr}; 
    }
  }
  const decrByOne = (currPages) => { /* Function decrements the page buttons */

      if( String(currPages) !== String([1]) && 
          String(currPages) !== String([1,2]) &&
          String(currPages) !== String([1,2,3])
      ) {
          let pageArr = [];
          currPages.forEach(el=> {
              pageArr.push(el-1);
          });
          return {currPages : pageArr};
      }
  }
const utils = {
    pagenoToLink, getPageBtns, incrByOne, decrByOne
}
export default utils;