import { Link } from "react-router-dom";
export default function RegisterChooser(){
  return (
    <div style={{padding:"24px 0"}}>
      <h2>Register</h2>
      <p>Choose your account type:</p>
      <div style={{display:"flex", gap:12}}>
        <Link className="btn" to="/register/customer">Customer</Link>
        <Link className="btn primary" to="/register/artisan">Artisan</Link>
      </div>
    </div>
  );
}
