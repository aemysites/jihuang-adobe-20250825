/* global WebImporter */
export default function parse(element, { document }) {
  // Get all the immediate child divs (columns)
  const colDivs = Array.from(element.querySelectorAll(':scope > div'));
  const colCount = colDivs.length;

  // Create the table
  const table = document.createElement('table');

  // Header row with colspan to span all columns
  const trHead = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columns7)';
  if (colCount > 1) th.setAttribute('colspan', colCount);
  trHead.appendChild(th);
  table.appendChild(trHead);

  // Second row - one cell per column
  const trCols = document.createElement('tr');
  colDivs.forEach(div => {
    const td = document.createElement('td');
    td.appendChild(div);
    trCols.appendChild(td);
  });
  table.appendChild(trCols);

  element.replaceWith(table);
}
