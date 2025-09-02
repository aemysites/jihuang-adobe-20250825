/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container holding all slides
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const slideDivs = Array.from(grid.children);
  const cells = [];
  cells.push(['Carousel (carousel16)']);

  slideDivs.forEach(slide => {
    // Image: in nested .utility-aspect-2x3 > img
    let img = null;
    const aspectDiv = slide.querySelector('.utility-aspect-2x3');
    if (aspectDiv) {
      img = aspectDiv.querySelector('img');
    }

    // Attempt to extract text content associated with the slide
    // Gather all text nodes and non-image elements from the slide
    const textFragments = [];
    // Find all descendants of the slide not inside .utility-aspect-2x3
    Array.from(slide.childNodes).forEach(node => {
      if (node.nodeType === 1 && !node.classList.contains('utility-aspect-2x3')) {
        // Recursively gather text content from this element
        Array.from(node.childNodes).forEach(subNode => {
          if (subNode.nodeType === 3 && subNode.textContent.trim().length > 0) {
            const span = document.createElement('span');
            span.textContent = subNode.textContent.trim();
            textFragments.push(span);
          } else if (subNode.nodeType === 1) {
            textFragments.push(subNode);
          }
        });
      } else if (node.nodeType === 3 && node.textContent.trim().length > 0) {
        const span = document.createElement('span');
        span.textContent = node.textContent.trim();
        textFragments.push(span);
      }
    });
    // If there is any text content collected, use it. Else, empty string.
    let textCell = textFragments.length > 0 ? textFragments : '';

    if (img) {
      cells.push([img, textCell]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
