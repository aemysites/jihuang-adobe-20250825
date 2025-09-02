/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // We want two columns:
  // 1. The left: main text block + contact details (UL)
  // 2. The right: image

  let leftContent = [];
  let rightContent = [];

  // Find content blocks
  let mainTextBlock = null;
  let contactList = null;
  let image = null;

  for (const child of gridChildren) {
    // Identify the main text block by presence of heading elements
    if (!mainTextBlock && child.querySelector('h2, h3, .subheading')) {
      mainTextBlock = child;
    }
    // Identify the contact list (UL)
    if (!contactList && child.tagName === 'UL') {
      contactList = child;
    }
    // Identify the image
    if (!image && child.tagName === 'IMG') {
      image = child;
    }
  }

  // Add main text block and contact details to left column
  if (mainTextBlock) leftContent.push(mainTextBlock);
  if (contactList) leftContent.push(contactList);

  // Add image to right column
  if (image) rightContent.push(image);

  // Construct cells for table
  // Header must match the block name exactly
  const headerRow = ['Columns (columns18)'];
  const columnsRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace original element with the table
  element.replaceWith(table);
}
