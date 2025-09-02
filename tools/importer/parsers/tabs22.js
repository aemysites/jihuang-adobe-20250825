/* global WebImporter */
export default function parse(element, { document }) {
  // Header row should match exactly
  const headerRow = ['Tabs (tabs22)'];

  // Get tab menu links for tab labels
  const menu = element.children[0];
  const tabLinks = Array.from(menu.querySelectorAll(':scope > a'));
  const tabLabels = tabLinks.map(link => {
    // Find inner label div for text
    const labelDiv = link.querySelector('div');
    // Defensive: fallback to link text if missing
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // Get tab pane content
  const contentContainer = element.children[1];
  const tabPanes = Array.from(contentContainer.querySelectorAll(':scope > div'));

  // Build table rows, referencing existing content elements
  const rows = tabLabels.map((label, i) => {
    // Defensive: match tabPanes by index
    const pane = tabPanes[i];
    // Tab content: reference child div if present, else pane
    let grid = pane.querySelector(':scope > div');
    if (!grid) grid = pane;
    return [label, grid];
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(block);
}
