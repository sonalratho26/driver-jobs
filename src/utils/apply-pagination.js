export function applyPagination(documents, page, rowsPerPage) {
  return documents.length > 0 && documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}