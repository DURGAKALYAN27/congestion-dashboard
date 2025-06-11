# 🌍 Network Congestion Dashboard Prototype

## Description
Rough Prototype to begin with - 
world map using D3.js and TopoJSON, where each country smoothly cycles through RGB hues based on random values (will find a way to plug in real data)

## Libraries & Tools Used

| Library/Tool              | Purpose                                                           | CDN/Version                                      |
|--------------------------|-------------------------------------------------------------------|-------------------------------------------------|
| **D3.js v6**             | Drawing the SVG map, handling projection, zoom, and animation timer | https://d3js.org/d3.v6.min.js                   |
| **TopoJSON-Client v3**    | Converting TopoJSON to GeoJSON features for rendering              | https://unpkg.com/topojson-client@3             |
| **D3-Timer v2 (via Skypack)** | Smooth per-frame updates of hue cycling over time                | https://cdn.skypack.dev/d3-timer@2              |
