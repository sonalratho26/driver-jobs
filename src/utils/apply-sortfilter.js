import { filter } from 'lodash';
export function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.length > 0 && array?.map((el, index) => [el, index]);
    stabilizedThis.length> 0 && stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.length> 0 && stabilizedThis.map((el) => el[0]);
  }