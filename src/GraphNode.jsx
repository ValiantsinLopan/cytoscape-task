export function GraphNode({ data }) {
  return (
    <div className="container">
      <div className="score">{data.unprotected}</div>
      <div className="properties">
        <div className="property-row">
          <div className="protected">{data.protected}</div>
          <div className="label">Protected</div>
        </div>
        <div className="property-row">
          <div className="unprotected">{data.unprotected}</div>
          <div className="label">Unprotected</div>
        </div>
        <div className="property-row">
          <div className="risky">{data.risky}</div>
          <div className="label">Risky</div>
        </div>
      </div>
    </div>
  );
}
