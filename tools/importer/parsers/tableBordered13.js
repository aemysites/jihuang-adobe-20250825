/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row, as per block name
  const headerRow = ['Table (bordered, tableBordered13)'];
  // Second row: column headers (derived from example: 'Question' and 'Answer')
  const columnsRow = ['Question', 'Answer'];

  // Find all direct children that are a '.divider'
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));
  const dataRows = dividers.map(divider => {
    // Each .divider contains .grid-layout with two children: question (h4-heading) and answer (rich-text)
    const grid = divider.querySelector('.grid-layout');
    let questionEl = null;
    let answerEl = null;
    if (grid) {
      const children = Array.from(grid.children);
      // Get h4-heading and rich-text
      questionEl = children.find(child => child.classList.contains('h4-heading'));
      answerEl = children.find(child => child.classList.contains('rich-text'));
    }
    // Ensure fallback for missing elements
    return [questionEl || '', answerEl || ''];
  });

  const cells = [headerRow, columnsRow, ...dataRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
