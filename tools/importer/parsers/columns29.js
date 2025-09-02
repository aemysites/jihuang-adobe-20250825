/* global WebImporter */
export default function parse(element, { document }) {
  // Get columns (immediate children)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Extract img or use the whole column if no img
  const cellsRow = columns.map(col => {
    const img = col.querySelector('img');
    return img || col;
  });

  // Build table with colspan in header
  const table = document.createElement('table');

  // Header row with single th, colspan matches columns
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columns29)';
  th.setAttribute('colspan', cellsRow.length);
  trHeader.appendChild(th);
  table.appendChild(trHeader);

  // Content row
  const trContent = document.createElement('tr');
  cellsRow.forEach(cell => {
    const td = document.createElement('td');
    td.append(cell);
    trContent.appendChild(td);
  });
  table.appendChild(trContent);

  // Replace original element
  element.replaceWith(table);
}
