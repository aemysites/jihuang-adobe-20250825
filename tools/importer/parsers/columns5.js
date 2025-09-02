/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;

  // Find left (text content) and right (image) columns
  let leftCol = null;
  let rightCol = null;
  // The expected structure is: leftCol is a grid containing text, rightCol is an image
  // Get direct children of the mainGrid
  const colNodes = Array.from(mainGrid.children);
  colNodes.forEach((child) => {
    if (!leftCol && child.querySelector('h2, .h2-heading')) {
      leftCol = child;
    }
    if (!rightCol && child.tagName === 'IMG') {
      rightCol = child;
    }
  });

  // Fallback if the structure isn't exactly as expected
  if (!leftCol) {
    // Try to find a child with text content
    leftCol = colNodes.find(el => el.textContent.trim().length > 0 && el !== rightCol);
  }
  if (!rightCol) {
    // Try to find img anywhere in the mainGrid
    rightCol = mainGrid.querySelector('img');
  }

  const headerRow = ['Columns (columns5)'];
  const cellsRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([headerRow, cellsRow], document);
  element.replaceWith(table);
}
