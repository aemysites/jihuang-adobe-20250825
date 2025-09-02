/* global WebImporter */
export default function parse(element, { document }) {
  // Find main grid container
  const container = element.querySelector(':scope > div > div.w-layout-grid');
  if (!container) return;

  // Top row cells: heading and paragraph in left cell
  const leftTop = document.createElement('div');
  const heading = container.querySelector('.h2-heading');
  if (heading) leftTop.appendChild(heading);
  const paragraph = container.querySelector('.paragraph-lg');
  if (paragraph) leftTop.appendChild(paragraph);

  // Bottom row cells: avatar/info left, logo right
  const innerGrid = container.querySelector(':scope > div.w-layout-grid');
  let leftBottom = '';
  let rightBottom = '';
  if (innerGrid) {
    const avatarBlock = innerGrid.querySelector('.flex-horizontal');
    if (avatarBlock) leftBottom = avatarBlock;
    const logoBlock = innerGrid.querySelector('.utility-display-inline-block');
    if (logoBlock) rightBottom = logoBlock;
  }

  // Compose table: header, top row, bottom row (matching example)
  const cells = [
    ['Columns (columns26)'],
    [leftTop, ''],
    [leftBottom, rightBottom]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
