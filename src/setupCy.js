import { use as cytoscapeUse } from "cytoscape";
import klay from "cytoscape-klay";
import fcose from "cytoscape-fcose";
import cola from "cytoscape-cola";
import elk from "cytoscape-elk";
import dagre from "cytoscape-dagre";
import nodeHtmlLabel from "cytoscape-node-html-label";

export default function () {
  cytoscapeUse(klay);
  cytoscapeUse(fcose);
  cytoscapeUse(cola);
  cytoscapeUse(elk);
  cytoscapeUse(dagre);
  cytoscapeUse(nodeHtmlLabel);
}
