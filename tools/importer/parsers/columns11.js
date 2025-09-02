/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main content columns (should be 2)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  const contentGrid = mainGrid || element.querySelector('.w-layout-grid');
  let columns = [];
  if (contentGrid) {
    columns = Array.from(contentGrid.children);
  }
  while (columns.length < 2) columns.push('');
  if (columns.length > 2) columns = columns.slice(0, 2);

  // Get the images for the second row (should also be 2 cells)
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imageCells = [];
  if (imageGrid) {
    const imgs = Array.from(imageGrid.querySelectorAll('img'));
    imageCells = imgs.slice(0, 2);
  }
  while (imageCells.length < 2) imageCells.push('');

  // Header row must match number of columns in data rows (2 columns)
  const headerRow = ['Columns (columns11)', ''];

  const rows = [headerRow, columns, imageCells];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
