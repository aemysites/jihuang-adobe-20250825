/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell, matches example exactly
  const headerRow = ['Columns (columns38)'];

  // For the content row, each column should contain all its direct children (not just the image)
  // This allows for extensibility if there is ever more content in each column.
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const contentRow = columns.map(col => {
    // If there's only one child, use it directly; else use all children
    if (col.childNodes.length === 1) {
      return col.firstChild;
    }
    return Array.from(col.childNodes);
  });

  // Create the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}