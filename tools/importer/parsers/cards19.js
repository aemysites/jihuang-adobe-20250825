/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match example
  const headerRow = ['Cards (cards19)'];
  const cells = [headerRow];

  // Select all card blocks (immediate children)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach(cardDiv => {
    // Icon is always in the first child div > div.icon
    const iconWrapper = cardDiv.querySelector(':scope > div');
    let icon = null;
    if (iconWrapper) {
      icon = iconWrapper.querySelector('.icon');
    }

    // Text is always a <p> (may contain additional formatting)
    const textContent = cardDiv.querySelector('p');

    // Always reference existing elements directly
    // Only push if we have both cells (per block definition, both are mandatory)
    if (icon && textContent) {
      cells.push([icon, textContent]);
    } else if (icon) {
      cells.push([icon, '']);
    } else if (textContent) {
      cells.push(['', textContent]);
    }
  });

  // Create and replace with block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
