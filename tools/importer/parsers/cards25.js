/* global WebImporter */
export default function parse(element, { document }) {
  // Set block header
  const headerRow = ['Cards (cards25)'];

  // Get all immediate child cards in grid
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];

  cardDivs.forEach(cardDiv => {
    // Get first <img> inside this card (mandatory)
    const img = cardDiv.querySelector('img');
    // Get card text: h3 and p (optional)
    const h3 = cardDiv.querySelector('h3');
    const p = cardDiv.querySelector('p');

    let textContent = '';
    if (h3 || p) {
      const textWrap = document.createElement('div');
      if (h3) textWrap.appendChild(h3);
      if (p) textWrap.appendChild(p);
      textContent = textWrap;
    }

    // Only add row if image is present (per block definition)
    if (img) {
      rows.push([img, textContent]);
    }
  });

  if (rows.length > 0) {
    const cells = [headerRow, ...rows];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
  }
}
