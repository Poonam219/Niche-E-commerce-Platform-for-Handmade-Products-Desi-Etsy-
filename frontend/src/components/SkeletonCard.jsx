export function SkeletonCard(){
  return (
    <div className="card">
      <div className="img skeleton" />
      <div className="body">
        <div className="skeleton" style={{height:16, width:"70%", borderRadius:8, marginBottom:8}} />
        <div className="skeleton" style={{height:12, width:"40%", borderRadius:8}} />
      </div>
    </div>
  );
}
