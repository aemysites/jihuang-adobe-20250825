/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header should EXACTLY match example
  const headerRow = ['Hero (hero12)'];

  // 2. Extract background image (first column)
  // Find an img.cover-image.utility-position-absolute in the top-level children
  let backgroundImg = null;
  const topDivs = Array.from(element.querySelectorAll(':scope > div'));
  for (const d of topDivs) {
    const img = d.querySelector('img.cover-image.utility-position-absolute');
    if (img) {
      backgroundImg = img;
      break;
    }
  }

  // 3. Extract main content block (headline, icons, paragraphs, CTA)
  let contentCell = [];
  // Find the div with .card
  let cardDiv = null;
  for (const d of topDivs) {
    if (d.querySelector('.card')) {
      cardDiv = d.querySelector('.card');
      break;
    }
  }

  if (cardDiv) {
    const cardBody = cardDiv.querySelector('.card-body');
    if (cardBody) {
      const grid = cardBody.querySelector('.grid-layout');
      if (grid) {
        // Two main children: left image, right text block
        // Always reference existing elements
        const gridChildren = Array.from(grid.children);
        // The image
        const imgGrid = gridChildren.find(el => el.tagName === 'IMG');
        if (imgGrid) {
          contentCell.push(imgGrid);
        }
        // The text content block
        const textGrid = gridChildren.find(el => el.querySelector('h2'));
        if (textGrid) {
          contentCell.push(textGrid);
        }
      }
    }
  }

  // 4. Correctly handle edge cases (missing img, missing text, etc)
  const imageRow = [backgroundImg ? backgroundImg : ''];
  const contentRow = [contentCell.length > 0 ? contentCell : ''];

  // 5. Compose table with header, image, content rows only (no Section Metadata block)
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // 6. Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
