/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid as columns
  const columns = Array.from(grid.children);

  // The block header, matching the required format
  const headerRow = ['Columns (columns3)'];

  // The content row: each column goes into its own cell, referencing the actual elements (not cloning)
  const contentRow = columns.map(col => col);

  // Compose the table rows for the block
  const tableRows = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the table block
  element.replaceWith(block);
}
