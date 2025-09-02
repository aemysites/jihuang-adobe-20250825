/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the element has expected grid layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate grid columns (children)
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // First column: heading
  const leftCol = cols[0]; // Usually contains <h2>

  // Second column: paragraph and button
  const rightCol = cols[1];
  // Gather all children of rightCol for the cell
  const rightChildren = Array.from(rightCol.children);
  // If no children, fallback to the column itself
  const rightCell = rightChildren.length ? rightChildren : [rightCol];

  // Table header must match example exactly
  const headerRow = ['Columns (columns14)'];
  // Build the table rows
  const contentRow = [leftCol, rightCell];
  const cells = [headerRow, contentRow];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
