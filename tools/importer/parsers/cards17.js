/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row as in the example
  const headerRow = ['Cards (cards17)'];

  // Each card is a direct child div
  const cardDivs = element.querySelectorAll(':scope > div');

  // For each card, extract the image and ALL text content (if any)
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');

    // Gather all non-image children as text content
    const textElements = Array.from(cardDiv.childNodes)
      .filter(node => node !== img && (
        (node.nodeType === 1 && node.textContent.trim() !== '') ||
        (node.nodeType === 3 && node.textContent.trim() !== '')
      ));
    
    // If there is no text element, fallback to <strong>alt text</strong>
    let textCell;
    if (textElements.length > 0) {
      textCell = textElements;
    } else if (img && img.alt && img.alt.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = img.alt.trim();
      textCell = strong;
    } else {
      textCell = '';
    }

    return [img, textCell];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
