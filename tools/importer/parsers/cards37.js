/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, must match exactly
  const headerRow = ['Cards (cards37)'];
  const cells = [headerRow];

  // The main container with grid(s) of cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) {
    // fallback: no grid found, nothing to do
    return;
  }

  // Collect all card anchor elements (top level + possibly inside nested grids)
  // The structure in this HTML is: some <a> at top level, and a nested grid with more <a>'s
  let cardNodes = [];
  // Get all direct <a> children of the mainGrid
  cardNodes = cardNodes.concat(Array.from(mainGrid.children).filter(n => n.tagName.toLowerCase() === 'a'));
  // Check for any nested grids
  Array.from(mainGrid.children).forEach(child => {
    if (
      child.classList &&
      child.classList.contains('w-layout-grid') &&
      child.classList.contains('grid-layout')
    ) {
      // Nested grid, get all <a> inside
      cardNodes = cardNodes.concat(Array.from(child.querySelectorAll(':scope > a')));
    }
  });

  // For each card, extract image and text info
  cardNodes.forEach(card => {
    // IMAGE CELL: Get the image element
    // Usually in: <div class="utility-aspect-2x3|1x1 ..."><img ...></div>
    let img = card.querySelector('img');
    // TEXT CELL: Heading (h2/h3/h4), paragraph, CTA (button)
    let heading = card.querySelector('h2, h3, h4');
    let paragraph = card.querySelector('p');
    let cta = card.querySelector('.button');
    // Compose the text content array
    let textCell = [];
    if (heading) textCell.push(heading);
    if (paragraph) textCell.push(paragraph);
    if (cta) textCell.push(cta);
    if (textCell.length === 0) {
      // If no text content, skip this card
      return;
    }
    // Table row: [image, text cell (array or single element)]
    cells.push([img ? img : '', textCell.length === 1 ? textCell[0] : textCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
