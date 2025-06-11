export function renderCauses(causes) {
  const panel = d3.select('#sidebar').html('<h3>Congestion Causes</h3>');
  const ul = panel.append('ul');
  causes.forEach(c => {
    ul.append('li').text(`${c.name}: ${Math.round(c.prob * 100)}%`);
  });
}
