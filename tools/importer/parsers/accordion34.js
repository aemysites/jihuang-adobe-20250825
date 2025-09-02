/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as in the example
  const headerRow = ['Accordion (accordion34)'];

  // Find all accordion items by their structure
  // Each item is a direct child with class 'accordion w-dropdown'
  const accordionItems = Array.from(element.querySelectorAll(':scope > div.accordion.w-dropdown'));

  const rows = accordionItems.map((item) => {
    // Title: get the .paragraph-lg inside .w-dropdown-toggle
    let titleEl = null;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg');
    }
    // Content: get the .w-richtext inside nav.w-dropdown-list
    let contentEl = null;
    const contentNav = item.querySelector('nav.w-dropdown-list');
    if (contentNav) {
      const richText = contentNav.querySelector('.w-richtext');
      if (richText) {
        contentEl = richText;
      } else {
        // if .w-richtext is missing, fallback to the nav itself
        contentEl = contentNav;
      }
    }
    // If either is missing, fall back to an empty div to keep structure
    if (!titleEl) {
      titleEl = document.createElement('div');
    }
    if (!contentEl) {
      contentEl = document.createElement('div');
    }
    return [titleEl, contentEl];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
