import { useEffect, useState } from "react";
import api from "../api/client";

export default function ClientDashboard() {
  const [me, setMe] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [offers, setOffers] = useState([]);

  const [newPurchase, setNewPurchase] = useState({
    product: "",
    amount: 1,
    price: 0,
  });

  const loadAll = async () => {
    const [{ data: meData }, { data: myPurchases }, { data: myOffers }] =
      await Promise.all([
        api.get("/clients/me"),
        api.get("/purchases/me"),
        api.get("/offers/me"),
      ]);
    setMe(meData);
    setPurchases(myPurchases);
    setOffers(myOffers);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const onCreatePurchase = async (e) => {
    e.preventDefault();
    await api.post("/purchases", {
      product: newPurchase.product,
      amount: +newPurchase.amount,
      price: +newPurchase.price,
    });
    setNewPurchase({ product: "", amount: 1, price: 0 });
    await loadAll();
  };
  const editClient = async () => {
    const name = prompt("Nuevo nombre:", me.name);
    const email = prompt("Nuevo email:", me.email);
    if (!name || !email) return;

    await api.put(`/clients/edit/me/${me.id}`, { name, email });
    await loadAll();
  };

  return (
    <div className="container py-4">
      <h3 className="mb-3">Panel del cliente</h3>
      {me && (
        <p className="text-muted">
          Bienvenido, {me.name} ({me.email})
        </p>
      )}
      <div className="mb-4">
        <button
          className="btn btn-sm btn-primary "
          sx={{ marginBottom: "1rem", color: "white !important" }}
          onClick={() => editClient()}
        >
          Editar mis datos
        </button>
      </div>
      <div className="row g-4">
        <div className="col-md-8">
          <h5>Mis compras</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cant.</th>
                <th>Precio</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p) => (
                <tr key={p.id}>
                  <td>{p.product}</td>
                  <td>{p.amount}</td>
                  <td>Q{p.price}</td>
                  <td>{new Date(p.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Registrar compra</h5>
            <form onSubmit={onCreatePurchase} className="vstack gap-2">
              <input
                className="form-control"
                placeholder="Producto"
                value={newPurchase.product}
                onChange={(e) =>
                  setNewPurchase({ ...newPurchase, product: e.target.value })
                }
                required
              />
              <input
                className="form-control"
                type="number"
                min="1"
                placeholder="Cantidad"
                value={newPurchase.amount}
                onChange={(e) =>
                  setNewPurchase({ ...newPurchase, amount: e.target.value })
                }
                required
              />
              <input
                className="form-control"
                type="number"
                step="0.01"
                placeholder="Precio"
                value={newPurchase.price}
                onChange={(e) =>
                  setNewPurchase({ ...newPurchase, price: e.target.value })
                }
                required
              />
              <button className="btn btn-primary">Guardar</button>
            </form>
          </div>
        </div>
      </div>

      <hr className="my-4" />
      <h5>Ofertas para mí</h5>
      <ul className="list-group">
        {offers.map((o) => (
          <li className="list-group-item" key={o.id}>
            <strong>{new Date(o.date).toLocaleString()}:</strong> {o.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
