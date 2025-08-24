import { useContext, useState } from "react";
import api from "../api/client";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      // Backend debe retornar { token, role }
      login({ token: data.token, role: data.role });
      navigate(data.role === "admin" ? "/admin" : "/cliente", { replace: true });
    } catch (e) {
      setErr(e?.response?.data?.error || "Error de autenticación");
    } finally { setBusy(false); }
  };

  return (
    <div className="container py-5" style={{maxWidth: 480}}>
      <h3 className="mb-3">Iniciar sesión</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={onSubmit} className="vstack gap-3">
        <input className="form-control" placeholder="Email"
               value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required />
        <input className="form-control" placeholder="Contraseña"
               value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required />
        <button className="btn btn-primary" disabled={busy}>
          {busy ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <hr/>
      <a href="/registro" className="btn btn-link px-0">¿No tienes cuenta? Regístrate</a>
    </div>
  );
}
