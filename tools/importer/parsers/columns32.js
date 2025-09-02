/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  // Defensive: Expecting at least two columns (image, content)
  const firstCol = columns[0] || document.createElement('div');
  const secondCol = columns[1] || document.createElement('div');
  // Table header as in the example
  const headerRow = ['Columns (columns32)'];
  // Columns row: image | content
  const contentRow = [firstCol, secondCol];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}
