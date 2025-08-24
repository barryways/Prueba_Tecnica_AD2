import { useEffect, useState } from "react";
import api from "../api/client";

export default function AdminDashboard() {
  const [clients, setClients] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [offer, setOffer] = useState({ clientId:"", message:"" });

  const loadAll = async () => {
    const [{data:cs},{data:ps}] = await Promise.all([
      api.get("/clients"),    // solo admin
      api.get("/purchases"),  // todas las compras
    ]);
    setClients(cs);
    setPurchases(ps);
  };
  useEffect(()=>{ loadAll(); }, []);

  const sendOffer = async (e) => {
    e.preventDefault();
    await api.post("/offers", { clientId:+offer.clientId, message:offer.message });
    setOffer({ clientId:"", message:"" });
    alert("Oferta enviada");
  };

  const removeClient = async (id) => {
    if (!confirm("¿Eliminar cliente?")) return;
    await api.delete(`/clients/${id}`);
    await loadAll();
  };
  const editClient = async (id) => {
    console.log(id);
    const client = clients.find(c => c.id === id);
    if (!client) return;

    const name = prompt("Nuevo nombre:", client.name);
    const email = prompt("Nuevo email:", client.email);
    if (!name || !email) return;

    await api.put(`/clients/${id}`, { name, email });
    await loadAll();
  };

  return (
    <div className="container py-4">
      <h3 className="mb-3">Panel de administración</h3>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Clientes</h5>
            <table className="table table-hover">
              <thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th></th></tr></thead>
              <tbody>
                {clients.map(c=>(
                  <tr key={c.id}>
                    <td>{c.id}</td><td>{c.name}</td><td>{c.email}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger"
                              onClick={()=>removeClient(c.id)}>
                        Eliminar
                      </button>
                      <button className="btn btn-sm btn-outline-info"
                              onClick={()=>editClient(c.id)}>
                        Edtar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            <h5>Enviar oferta</h5>
            <form onSubmit={sendOffer} className="vstack gap-2">
              <select className="form-select" value={offer.clientId}
                      onChange={(e)=>setOffer({...offer, clientId:e.target.value})} required>
                <option value="">Selecciona cliente</option>
                {clients.map(c=>(
                  <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                ))}
              </select>
              <textarea className="form-control" rows={3} placeholder="Mensaje"
                        value={offer.message}
                        onChange={(e)=>setOffer({...offer, message:e.target.value})}
                        required/>
              <button className="btn btn-primary">Enviar</button>
            </form>
          </div>
        </div>
      </div>

      <hr className="my-4"/>
      <h5>Todas las compras</h5>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead><tr><th>ID</th><th>ClienteId</th><th>Producto</th><th>Cant.</th><th>Precio</th><th>Fecha</th></tr></thead>
          <tbody>
            {purchases.map(p=>(
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.clientId}</td><td>{p.product}</td>
                <td>{p.amount}</td><td>Q{p.price}</td><td>{new Date(p.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
