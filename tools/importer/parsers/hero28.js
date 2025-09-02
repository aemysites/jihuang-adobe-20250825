/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table Header row exactly as specified
  const headerRow = ['Hero (hero28)'];

  // 2. Find the background image - only the first <img> inside the structure
  let bgImg = null;
  const imgCandidate = element.querySelector('img');
  if (imgCandidate) {
    bgImg = imgCandidate;
  }

  // 3. Find the main text content (heading, possible subheading, CTA)
  // It's inside
  // <div class="container ..."><div class="utility-margin-bottom-6rem">...</div></div>
  let contentBlock = null;
  // Safely traverse the DOM as structure could vary
  const container = element.querySelector('.container');
  if (container) {
    const mb6rem = container.querySelector('.utility-margin-bottom-6rem');
    if (mb6rem) {
      contentBlock = mb6rem;
    } else {
      // fallback: get all children of container (rare edge case)
      contentBlock = document.createElement('div');
      Array.from(container.childNodes).forEach(n => contentBlock.appendChild(n));
    }
  }

  // Table: 1 column, 3 rows; cells contain referenced elements or empty string
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentBlock ? contentBlock : ''],
  ];

  // 4. Create table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element
  element.replaceWith(table);
}
