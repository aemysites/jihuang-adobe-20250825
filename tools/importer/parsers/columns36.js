/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in example
  const headerRow = ['Columns (columns36)'];

  // Get top-level grid columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // There should be at least two columns for this layout
  if (columns.length < 2) return;

  // First column: left (text content)
  const col1 = columns[0];
  // Second column: right (images)
  const col2 = columns[1];

  // Compose left cell: h1, paragraph, button group
  const leftCellParts = [];
  const heading = col1.querySelector('h1');
  if (heading) leftCellParts.push(heading);
  const subheading = col1.querySelector('p');
  if (subheading) leftCellParts.push(subheading);
  const buttonGroup = col1.querySelector('.button-group');
  if (buttonGroup) leftCellParts.push(buttonGroup);
  // Reference the original elements directly

  // Compose right cell: all images in grid
  let rightCellParts = [];
  const innerGrid = col2.querySelector('.grid-layout');
  if (innerGrid) {
    const imgs = Array.from(innerGrid.querySelectorAll('img'));
    rightCellParts = imgs;
  } else {
    // Fallback: Any direct images in col2
    const imgs = Array.from(col2.querySelectorAll('img'));
    rightCellParts = imgs;
  }

  // Build the table
  const cells = [
    headerRow,
    [leftCellParts, rightCellParts]
  ];

  // Create block table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
