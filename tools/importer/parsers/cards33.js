/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row as in example
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Get all cards: direct child <a> elements
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((card) => {
    // First cell: Image (reference original element)
    const img = card.querySelector('img');

    // Second cell: Text content (reference original elements)
    const gridContent = card.querySelector(':scope > div');
    const textParts = [];

    if (gridContent) {
      // Extract tag and read time if present
      const metaRow = gridContent.querySelector('.flex-horizontal');
      if (metaRow) {
        // Tag (optional)
        const tag = metaRow.querySelector('.tag');
        if (tag) textParts.push(tag);
        // Read time (optional)
        const readTime = metaRow.querySelector('.paragraph-sm');
        if (readTime) textParts.push(readTime);
      }
      // Heading (optional)
      const heading = gridContent.querySelector('h3, .h4-heading');
      if (heading) textParts.push(heading);
      // Description (optional)
      const desc = gridContent.querySelector('p');
      if (desc) textParts.push(desc);
      // CTA (optional): Only reference the 'Read' element that is NOT in metaRow nor .tag
      const ctaCandidates = Array.from(gridContent.querySelectorAll(':scope > div'));
      const cta = ctaCandidates
        .filter(d => !d.classList.contains('flex-horizontal') && !d.classList.contains('tag') && d.textContent.trim().toLowerCase() === 'read')
        .pop(); // pick last matching, if any
      if (cta) textParts.push(cta);
    }

    // Add the table row
    rows.push([
      img,
      textParts.length === 1 ? textParts[0] : textParts
    ]);
  });

  // Create the table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
