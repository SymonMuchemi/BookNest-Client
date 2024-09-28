import '../skeleton.css';

const MembersSkeleton = () => (
  <div className="skeleton-wrapper">
    <div className="skeleton-header"></div>
    <div className="skeleton-table">
      <div className="skeleton-row header">
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
      </div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="skeleton-row">
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell actions">
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
    <div className="skeleton-pagination">
      <div className="skeleton-button"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-button"></div>
    </div>
  </div>
);

export default MembersSkeleton;
