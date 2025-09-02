/* global WebImporter */
export default function parse(element, { document }) {
  // Define block header as in the example
  const headerRow = ['Cards (cards23)'];

  // Helper to get all card <a> within a grid
  function getCardsFromGrid(grid) {
    return Array.from(grid.querySelectorAll(':scope > a'));
  }

  // Gather all cards from all tabs
  let cardRows = [];
  const tabPanes = Array.from(element.children);
  tabPanes.forEach(tabPane => {
    // Find first .w-layout-grid inside tabPane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = getCardsFromGrid(grid);

    cards.forEach(card => {
      // Try to get image from aspect div
      let imgDiv = card.querySelector('.utility-aspect-3x2');
      let imgEl = imgDiv ? imgDiv.querySelector('img') : null;
      // If no image, leave cell blank as per variant
      let imgCell = imgEl ? imgEl : '';
      // Title: h3 (mandatory in these examples)
      let titleEl = card.querySelector('h3');
      // Description: first .paragraph-sm inside card; can be inside nested div
      let descEl = card.querySelector('.paragraph-sm');
      // Compose text cell
      let textContent = [];
      if (titleEl) textContent.push(titleEl);
      if (descEl) textContent.push(descEl);
      // Only push card rows that have at least title or description
      if (textContent.length) {
        cardRows.push([imgCell, textContent]);
      }
    });
  });

  // Compose table
  const cells = [headerRow, ...cardRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
