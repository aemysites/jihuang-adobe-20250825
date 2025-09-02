/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const container = element.querySelector(':scope > .container');
  if (!container) return;
  const grid = container.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // Get all direct children of the grid layout - these are the column cells
  const columns = Array.from(grid.children);
  // Defensive: skip if no columns
  if (!columns.length) return;

  // Table header must match the spec
  const headerRow = ['Columns (columns31)'];
  // Each column is placed as-is in a cell in the row
  const contentRow = columns;

  // Create the table block
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table block
  element.replaceWith(table);
}
