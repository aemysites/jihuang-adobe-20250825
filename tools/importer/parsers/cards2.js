/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row, per example
  const cells = [['Cards (cards2)']];

  // Find the grid layout containing all cards
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // --- First card (large, image left) ---
  const firstCard = grid.querySelector('a.utility-link-content-block');
  if (firstCard) {
    // Image cell
    const imgDiv = firstCard.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    const img = imgDiv ? imgDiv.querySelector('img') : null;

    // Text cell: tag (category), heading, paragraph
    const textCell = document.createElement('div');
    const tagGroup = firstCard.querySelector('.tag-group');
    if (tagGroup) textCell.appendChild(tagGroup);
    const heading = firstCard.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textCell.appendChild(heading);
    const desc = firstCard.querySelector('p');
    if (desc) textCell.appendChild(desc);
    cells.push([img, textCell]);
  }

  // --- Next flex-horizontal: 2 more image cards ---
  const flexHorizs = grid.querySelectorAll('.flex-horizontal');
  if (flexHorizs.length > 0) {
    // First flex-horizontal: contains two cards with images
    const imgCards = flexHorizs[0].querySelectorAll('a.utility-link-content-block');
    imgCards.forEach(card => {
      // Image cell
      const imgDiv = card.querySelector('.utility-aspect-3x2, .utility-aspect-1x1');
      const img = imgDiv ? imgDiv.querySelector('img') : null;
      // Text cell: tag, heading, paragraph
      const textCell = document.createElement('div');
      const tagGroup = card.querySelector('.tag-group');
      if (tagGroup) textCell.appendChild(tagGroup);
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) textCell.appendChild(heading);
      const desc = card.querySelector('p');
      if (desc) textCell.appendChild(desc);
      cells.push([img, textCell]);
    });

    // Second flex-horizontal: contains text-only cards (no image)
    const textCards = flexHorizs[1]?.querySelectorAll('a.utility-link-content-block');
    if (textCards) {
      textCards.forEach(card => {
        // Text cell: heading, paragraph
        const textCell = document.createElement('div');
        const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) textCell.appendChild(heading);
        const desc = card.querySelector('p');
        if (desc) textCell.appendChild(desc);
        // Add as [empty image cell, text cell]
        cells.push(['', textCell]);
      });
    }
  }

  // Create and replace block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
