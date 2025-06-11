export function setupZoom(svg, g, width, height) {
  const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .translateExtent([[0, 0], [width, height]])
    .on('zoom', (event) => g.attr('transform', event.transform));
  svg.call(zoom);
}

export function zoomToBounds(svg, g, path, width, height, d) {
  const bounds = path.bounds(d),
    dx = bounds[1][0] - bounds[0][0],
    dy = bounds[1][1] - bounds[0][1],
    x = (bounds[0][0] + bounds[1][0]) / 2,
    y = (bounds[0][1] + bounds[1][1]) / 2,
    scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx/width, dy/height))),
    translate = [width/2 - scale * x, height/2 - scale * y];

  svg.transition()
    .duration(750)
    .call(d3.zoom().transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
}
