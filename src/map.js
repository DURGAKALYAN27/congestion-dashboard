// map.js
import * as d3 from 'https://cdn.skypack.dev/d3@6';
import { timer } from 'https://cdn.skypack.dev/d3-timer@2';
import { feature } from 'https://cdn.skypack.dev/topojson-client@3';
import { setupZoom, zoomToBounds } from './zoom.js';

const width = 960, height = 600;
const svg = d3.select('#map-container')
    .append('svg')
      .attr('width', width)
      .attr('height', height);
const g = svg.append('g');

const projection = d3.geoMercator()
    .scale(width / (2 * Math.PI))
    .translate([width / 2, height / 2]);
const path = d3.geoPath(projection);

// === CONFIG: period of full hue cycle in milliseconds ===
// For testing, use a small value so you can see changes quickly (e.g., 10000 ms = 10s).
// Then increase to slow breathing: e.g., 60000 (1 min), 120000 (2 min), 300000 (5 min), etc.
let PERIOD_MS = 10000; // start with 10 seconds for visible cycling; adjust later

d3.json('data/countries-110m.json').then(worldTopo => {
  if (!worldTopo.objects || !worldTopo.objects.countries) {
    console.error('Invalid TopoJSON structure:', worldTopo.objects);
    return;
  }
  const countries = feature(worldTopo, worldTopo.objects.countries).features;
  console.log('Loaded countries:', countries.length);

  // 1. Attach a fixed baseHue property on each country object:
  countries.forEach(d => {
    // Random base hue in [0,360). Replace with your normalized ML value * 360 when available.
    d.baseHue = Math.random() * 360;
  });

  // 2. Create country paths:
  const countryPaths = g.selectAll('.country')
    .data(countries)
    .join('path')
      .attr('class', 'country')
      .attr('d', path)
      .attr('stroke', '#222')
      .attr('stroke-width', 0.5)
      .on('click', (event, d) => {
        zoomToBounds(svg, g, path, width, height, d);
      });

  setupZoom(svg, g, width, height);

  // 3. Start the breathing rainbow animation:
  // Use d3.timer: elapsed is ms since timer started.
  const t = timer(elapsed => {
    // Compute hueOffset between 0 and 360 based on PERIOD_MS
    const hueOffset = ((elapsed % PERIOD_MS) / PERIOD_MS) * 360;

    // Debug: uncomment to see hueOffset logged occasionally
    // if (elapsed % 5000 < 16) console.log('hueOffset:', hueOffset.toFixed(1));

    countryPaths.attr('fill', d => {
      // Use the attached baseHue
      const hue = (d.baseHue + hueOffset) % 360;
      return `hsl(${hue},100%,50%)`;
    });
  });
})
.catch(err => console.error('Error loading TopoJSON:', err));
