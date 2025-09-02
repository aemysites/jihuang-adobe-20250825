/* global WebImporter */
export default function parse(element, { document }) {
  // Find the desktop-3-column grid inside the section
  const grid = element.querySelector('.desktop-3-column.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (they are the columns)
  const columns = Array.from(grid.children);

  // Defensive: If less than 4 columns, pad with empty elements (should not happen with correct input)
  while (columns.length < 4) {
    const emptyDiv = document.createElement('div');
    columns.push(emptyDiv);
  }

  // Compose the header row
  const headerRow = ['Columns (columns30)'];
  // Compose the content row (each column in its own cell)
  const contentRow = [columns[0], columns[1], columns[2], columns[3]];

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
