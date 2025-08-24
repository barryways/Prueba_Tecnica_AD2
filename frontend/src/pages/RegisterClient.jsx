import { useState } from "react";
import api from "../api/client";

export default function RegisterClient() {
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [ok, setOk] = useState(""); const [err, setErr] = useState("");

  const onChange = (e)=> setForm({...form, [e.target.name]: e.target.value});
  const onSubmit = async (e) => {
    e.preventDefault(); setOk(""); setErr("");
    try {
      await api.post("/auth/register", form);
      setOk("Registro exitoso. Ya puedes iniciar sesión.");
    } catch (e) {
      setErr(e?.response?.data?.error || "Error al registrar");
    }
  };

  return (
    <div className="container py-5" style={{maxWidth: 520}}>
      <h3 className="mb-3">Registro de cliente</h3>
      {ok && <div className="alert alert-success">{ok}</div>}
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={onSubmit} className="vstack gap-3">
        <input className="form-control" name="name" placeholder="Nombre"
               value={form.name} onChange={onChange} required />
        <input className="form-control" name="email" type="email" placeholder="Email"
               value={form.email} onChange={onChange} required />
        <input className="form-control" name="password" type="password" placeholder="Contraseña"
               value={form.password} onChange={onChange} required />
        <button className="btn btn-success">Registrarme</button>
      </form>
    </div>
  );
}
