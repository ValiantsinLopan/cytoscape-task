import "./App.css";
import * as React from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { ErrorBoundary } from "react-error-boundary";
import { JSONEditor } from "./JSONEditor";
import { layouts } from "./layouts";
import { generateGraph } from "./generateGraph";
import setupCy from "./setupCy";
import cytoscape, { Stylesheet } from "cytoscape";
import { GraphNode } from "./GraphNode";
setupCy();

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function getDefaultStylesheet() {
  return [
    {
      selector: "edge",
      style: { "line-color": "#EBAF54", "line-cap": "square" },
    },
  ];
}

export default function App() {
  const cyRef = React.useRef();
  const [elements, setElements] = React.useState(() => generateGraph(8));
  const [layout, setLayout] = React.useState(layouts.klay);
  const [stylesheet, setStylesheet] = React.useState(getDefaultStylesheet);
  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            <td className="c">
              <button onClick={() => setElements(generateGraph())}>
                new graph
              </button>
              <button onClick={() => setElements(generateGraph(35))}>
                new big graph
              </button>
              <button onClick={() => setElements(generateGraph(35, 7))}>
                new big disconnected graph
              </button>
              <button onClick={() => setElements(generateGraph(35, 20, true))}>
                new big acyclic graph
              </button>
              <br />
              layout preset:
              <br />
              <select
                size={Object.keys(layouts).length}
                onChange={(e) => {
                  setLayout({ ...layouts[e.target.value] });
                }}
              >
                {Object.keys(layouts).map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <br />
              layout config:
              <br />
              <JSONEditor value={layout} onChange={setLayout} />
              <br />
              stylesheet:
              <br />
              <JSONEditor value={stylesheet} onChange={setStylesheet} />
            </td>
            <td>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <CytoscapeComponent
                  elements={elements}
                  style={{
                    width: "800px",
                    height: "500px",
                    border: "1px solid black",
                    background: "#29292e",
                  }}
                  layout={layout}
                  stylesheet={stylesheet}
                  cy={(cy) =>
                    (cyRef.current = cy.nodeHtmlLabel([
                      {
                        query: "node",
                        // TODO: rewrite to attach as component with props
                        tpl: function (data) {
                          return `<div className="container">
                          <div className="score">${data.unprotected}</div>
                          <div className="properties">
                            <div className="property-row">
                              <div className="protected">${data.protected}</div>
                              <div className="label">Protected</div>
                            </div>
                            <div className="property-row">
                              <div className="unprotected">${data.unprotected}</div>
                              <div className="label">Unprotected</div>
                            </div>
                            <div className="property-row">
                              <div className="risky">${data.risky}</div>
                              <div className="label">Risky</div>
                            </div>
                          </div>
                        </div>`;
                        },
                      },
                    ]))
                  }
                />
              </ErrorBoundary>
            </td>
          </tr>
        </tbody>
      </table>
      <GraphNode data={{ protected: 0, unprotected: 751, risky: 1 }} />
    </div>
  );
}
