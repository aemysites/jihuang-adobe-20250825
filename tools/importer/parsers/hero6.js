/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row matching example
  const headerRow = ['Hero (hero6)'];

  // Extract background image for the image row
  let bgImg = null;
  // Looks for the first <img> in the block - background image
  bgImg = element.querySelector('img');
  const imgRow = [bgImg ? bgImg : ''];

  // Extract main content (heading, subheading, CTAs)
  let mainContent = null;
  // The main content is inside the .card element (contains h1, p, buttons)
  const card = element.querySelector('.card');
  if (card) {
    mainContent = card;
  } else {
    // fallback: create a fragment from available heading, paragraph, and CTA
    const contentDiv = document.createElement('div');
    const h1 = element.querySelector('h1');
    if (h1) contentDiv.appendChild(h1);
    const p = element.querySelector('p');
    if (p) contentDiv.appendChild(p);
    const buttonGroup = element.querySelector('.button-group');
    if (buttonGroup) {
      Array.from(buttonGroup.children).forEach(btn => {
        contentDiv.appendChild(btn);
      });
    }
    mainContent = contentDiv;
  }
  const contentRow = [mainContent];

  // Build the single table block matching the example: 1 column, 3 rows
  const cells = [headerRow, imgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
