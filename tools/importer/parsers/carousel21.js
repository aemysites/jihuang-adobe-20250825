/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row
  const headerRow = ['Carousel (carousel21)'];

  // Find the card body (where content lives)
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) cardBody = element;

  // Get the image (mandatory for the carousel block)
  const img = cardBody.querySelector('img');

  // Build text cell: choose heading if present, otherwise empty
  let textCell = null;
  const heading = cardBody.querySelector('.h4-heading, h4, h3, h2, h1');
  if (heading) {
    // Use the same heading level as found (preserving semantics)
    const headingTag = heading.tagName.toLowerCase() === 'div' ? 'h2' : heading.tagName.toLowerCase();
    const textHeading = document.createElement(headingTag);
    textHeading.textContent = heading.textContent;
    textCell = textHeading;
  } else {
    textCell = document.createTextNode('');
  }

  // Compose rows
  const rows = [headerRow, [img, textCell]];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
