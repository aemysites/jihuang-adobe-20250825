/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match example
  const headerRow = ['Hero (hero35)'];
  // Row 2: Background image (none provided in this HTML)
  const imageRow = [''];

  // Row 3: Title, subheading, CTA
  // Find main content container (likely grid)
  const grid = element.querySelector('.w-layout-grid');
  let title, subheading, cta;
  if (grid) {
    // Get direct children of grid
    const gridChildren = grid.querySelectorAll(':scope > *');
    gridChildren.forEach((child) => {
      // Titles and subheading are in div
      if (child.tagName === 'DIV') {
        // Heading - use whatever is present (h1-h3, h2 in this case)
        const heading = child.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) title = heading;
        // Subheading - use first <p>
        const p = child.querySelector('p');
        if (p) subheading = p;
      }
      // CTA: first <a> (button)
      if (child.tagName === 'A') {
        cta = child;
      }
    });
  }

  // Compose third row cell contents
  const content = [];
  if (title) content.push(title);
  if (subheading) content.push(subheading);
  if (cta) content.push(cta);
  const contentRow = [content];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the table
  element.replaceWith(table);
}
