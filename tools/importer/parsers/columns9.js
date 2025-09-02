/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of grid (should be 4 columns)
  const columns = Array.from(grid.children).filter((col) =>
    col.tagName === 'DIV' || col.tagName === 'UL'
  );

  // Defensive: if not exactly 4 columns, fallback to all children
  const contentCols = columns.length === 4 ? columns : Array.from(grid.children);

  // Prepare table headers as per requirements
  const headerRow = ['Columns (columns9)'];

  // The second row should have one cell for each column (4 cells)
  // Each cell references the corresponding column block (DIV or UL as in the HTML)
  const contentRow = contentCols;

  // Compose table data
  const tableCells = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
