export default function StatsCard(props) {
  return (
    <div className="dash-stat-card">
      <div className="stat-label"> {props.label}</div>
      <div className="stat-value">{props.value}</div>
    </div>
  );
}
