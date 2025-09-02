/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: Block name exactly as given
  const headerRow = ['Hero (hero39)'];

  // Find the background image in the hero block (should be the first img)
  let imageCell = '';
  const img = element.querySelector('img[src]');
  if (img) {
    imageCell = img;
  }

  // Find the content column
  // The structure is <header> > div.grid-layout > [image-div, content-div]
  const rootGrid = element.querySelector(':scope > .w-layout-grid');
  let contentDiv = null;
  if (rootGrid) {
    // The content is usually the second grid child (not the image one)
    const gridChildren = rootGrid.querySelectorAll(':scope > div');
    if (gridChildren.length > 1) {
      contentDiv = gridChildren[1];
    }
  }

  // Defensive fallback if structure changes
  if (!contentDiv) contentDiv = element;

  // Compose content: Heading, Paragraph, CTA, in order
  const cellContent = [];
  // Heading (h1)
  const heading = contentDiv.querySelector('h1');
  if (heading) cellContent.push(heading);
  // Paragraph (first p)
  const para = contentDiv.querySelector('p');
  if (para) cellContent.push(para);
  // CTA (first a inside .button-group, or just any a)
  let cta = null;
  const btnGroup = contentDiv.querySelector('.button-group');
  if (btnGroup) {
    cta = btnGroup.querySelector('a');
  }
  if (!cta) {
    // fallback to any a inside contentDiv
    cta = contentDiv.querySelector('a');
  }
  if (cta) cellContent.push(cta);

  // Build table: [header], [image], [content]
  const cells = [
    headerRow,
    [imageCell],
    [cellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}