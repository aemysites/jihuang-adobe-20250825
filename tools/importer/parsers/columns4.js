/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as per example
  const headerRow = ['Columns (columns4)'];

  // 2. Get all direct children representing columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // 3. Each column is just an image - so reference these images
  const images = columnDivs.map(col => col.querySelector('img')).filter(Boolean);

  // 4. Only create the second row if there is at least one image
  const secondRow = images;

  // 5. Build the table rows structure
  const rows = [headerRow, secondRow];

  // 6. Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 7. Replace the original element
  element.replaceWith(block);
}
