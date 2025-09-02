/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main container holding the grid
  const container = element.querySelector('.container');
  if (!container) return;

  // Get the grid row that holds the two columns
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // LEFT COLUMN: Should contain ALL content, not just selected elements.
  // To maximize content inclusion and resilience, collect all left column's direct children
  const leftCol = gridChildren[0];
  const leftContent = [];
  Array.from(leftCol.childNodes).forEach(node => {
    // Only include element or text nodes (skip empty text nodes)
    if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
      leftContent.push(node);
    }
  });

  // RIGHT COLUMN: should be the image (or its parent, if needed)
  const rightCol = gridChildren[1];
  const rightImg = rightCol.querySelector('img');
  const rightContent = rightImg ? rightImg : rightCol;

  // Construct the table rows
  const cells = [
    ['Columns (columns15)'],
    [leftContent, rightContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
