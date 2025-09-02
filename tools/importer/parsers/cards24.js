/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with block name exactly as in the example
  const cells = [['Cards (cards24)']];

  // Find all cards (direct <a> children)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  cards.forEach(card => {
    // First cell: the image inside the card (mandatory)
    let image = null;
    const imgWrapper = card.querySelector('div.utility-aspect-2x3');
    if (imgWrapper) {
      image = imgWrapper.querySelector('img');
    }

    // Second cell: text content (title, meta)
    // 1. Meta (tag and date)
    const metaDiv = card.querySelector('div.flex-horizontal');
    const metaContent = [];
    if (metaDiv) {
      const tag = metaDiv.querySelector('.tag');
      if (tag) metaContent.push(tag);
      const date = metaDiv.querySelector('.paragraph-sm');
      if (date) metaContent.push(date);
    }
    // 2. Title (h3 or .h4-heading)
    const heading = card.querySelector('h3, .h4-heading');

    // Compose the text content cell, always as an array of real elements
    const textCellContent = [];
    if (metaContent.length) {
      // Wrap meta in a div to preserve line structure
      const metaWrap = document.createElement('div');
      metaContent.forEach(el => metaWrap.appendChild(el));
      textCellContent.push(metaWrap);
    }
    if (heading) textCellContent.push(heading);

    cells.push([
      image || '',
      textCellContent.length === 1 ? textCellContent[0] : textCellContent.length > 1 ? textCellContent : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
