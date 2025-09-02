/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the example
  const headerRow = ['Columns (columns27)'];

  // Find the grid-layout div
  const gridLayout = element.querySelector('.grid-layout');
  if (!gridLayout) return;
  // Get all direct children of grid-layout (columns)
  const cols = Array.from(gridLayout.children);
  // Defensive check: expect at least 2 columns
  if (cols.length < 2) return;

  // Left column: structured content block (by Taylor Brooks, heading, desc, button)
  const leftCol = cols[0];
  // Use all children of leftCol in their original order
  const leftChildren = Array.from(leftCol.childNodes);
  // Create a fragment to preserve structure & semantics
  const leftFragment = document.createDocumentFragment();
  leftChildren.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
      leftFragment.appendChild(node);
    }
  });

  // Right column: image
  const rightCol = cols[1];
  // As per guidelines, reference the actual element, not a clone

  // Compose rows for createTable
  const blockRows = [
    headerRow,
    [leftFragment, rightCol]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(blockRows, document);

  // Replace original element with block table
  element.replaceWith(block);
}
