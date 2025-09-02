/* global WebImporter */
export default function parse(element, { document }) {
  // Define the table header row per requirements
  const headerRow = ['Columns (columns1)'];

  // Find main grid layout containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return; // Edge case: grid not found

  // Get all immediate children (columns) of the grid
  const columns = Array.from(grid.children);
  // Edge case: Ensure there are at least two columns
  if (columns.length < 2) return;

  // Column 1: image
  const col1 = columns[0];
  // Column 2: all text and button group
  const col2 = columns[1];

  // Build table rows: header + content columns
  const tableRows = [
    headerRow,
    [col1, col2]
  ];

  // Create the block table using helper
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
