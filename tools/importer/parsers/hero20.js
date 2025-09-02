/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name as in the example
  const headerRow = ['Hero (hero20)'];

  // 2. Background image row: all images in the collage background
  // The images are inside: .ix-hero-scale-3x-to-1x > .grid-layout.desktop-3-column
  let bgImgsDiv = document.createElement('div');
  const heroScale = element.querySelector('.ix-hero-scale-3x-to-1x');
  if (heroScale) {
    const grid = heroScale.querySelector('.grid-layout.desktop-3-column');
    if (grid) {
      const imgs = Array.from(grid.querySelectorAll('img'));
      imgs.forEach(img => bgImgsDiv.appendChild(img));
    }
  }
  // Fallback: if no images found, leave the div empty but still create a row

  // 3. Content row: title, subheading, CTAs
  // Source: .ix-hero-scale-3x-to-1x-content > .container OR closest container
  let contentCell = null;
  const contentHolder = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (contentHolder) {
    contentCell = contentHolder.querySelector('.container');
    // fallback: if no container, just use the contentHolder
    if (!contentCell) contentCell = contentHolder;
  }
  // Fallback: if not found, create empty div
  if (!contentCell) contentCell = document.createElement('div');

  // Compose table rows
  const cells = [
    headerRow,
    [bgImgsDiv],
    [contentCell]
  ];

  // Create table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
