/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Cards (cards10)'];

  // Get all direct card elements
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.card-link'));
  // Edge case: If no cards, don't create extra block
  if (cardLinks.length === 0) return;

  // Build rows for each card
  const rows = cardLinks.map(card => {
    // Image cell
    let imageCell = '';
    const img = card.querySelector('img');
    if (img) {
      imageCell = img;
    }

    // Text cell
    const textWrapper = card.querySelector('.utility-padding-all-1rem');
    const textCellParts = [];

    // Tag (optional, styled as small uppercase above title)
    const tag = textWrapper && textWrapper.querySelector('.tag-group .tag');
    if (tag && tag.textContent.trim()) {
      const tagDiv = document.createElement('div');
      tagDiv.textContent = tag.textContent.trim();
      tagDiv.style.fontWeight = 'bold';
      tagDiv.style.textTransform = 'uppercase';
      tagDiv.style.fontSize = '0.8em';
      tagDiv.style.marginBottom = '0.5em';
      textCellParts.push(tagDiv);
    }

    // Title (h3)
    const title = textWrapper && textWrapper.querySelector('h3');
    if (title && title.textContent.trim()) {
      // Use h3 directly for correct semantics
      textCellParts.push(title);
    }

    // Description (p)
    const desc = textWrapper && textWrapper.querySelector('p');
    if (desc && desc.textContent.trim()) {
      textCellParts.push(desc);
    }

    return [imageCell, textCellParts];
  });

  // Compose final table cells
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
