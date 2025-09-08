export default function NotFound() {
  return (
    <div className="panel" style={{ marginTop: 24 }}>
      <h2 style={{ marginTop: 0 }}>Page not found</h2>
      <p className="helper">The page you’re looking for doesn’t exist.</p>
      <a className="btn" href="/">Go Home</a>
    </div>
  );
}
