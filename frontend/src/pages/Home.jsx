
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const OFFERS = [
  { id: 1, title: "2x1 en Pizzas", desc: "Todos los martes desde las 5pm", badge: "-50%", img: "/imgs/pizzas2x1.jpg" },
  { id: 2, title: "Combo Burger", desc: "Hamburguesa + papas + soda", badge: "Q39", img: "/imgs/ham_1.jpg" },
  { id: 3, title: "Alitas BBQ", desc: "12 unidades con salsa a elección", badge: "HOT", img: "/imgs/alitas.jpg" }
];

const CATEGORIES = [
  { id: 1, name: "Pizzas", img: "/imgs/pizzas2x1.jpg" },
  { id: 2, name: "Burgers", img: "/imgs/ham_1.jpg" },
  { id: 3, name: "Tacos", img: "/imgs/tacos.jpg" },
  { id: 4, name: "Postres", img: "/imgs/brownie_1.jpg" }
];

const FEATURED = [
  { id: 1, name: "Pizza Pepperoni", price: 69, img: "/imgs/pizzas2x1.jpg" },
  { id: 2, name: "Cheeseburger Doble", price: 55, img: "/imgs/ham_1.jpg" },
  { id: 3, name: "Tacos al Pastor", price: 42, img: "/imgs/tacos.jpg" },
  { id: 4, name: "Brownie con Helado", price: 28, img: "/imgs/brownie_1.jpg" }
];

const handleAddToCart = () => {
    Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Estamos trabajando en esta función",
    });
};

export default function Home() {
const { auth } = useContext(AuthContext);
  return (
    <>
      {/* HERO */}
      <header className="bg-dark text-white">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold">Sabor que <span className="text-warning">enamora</span></h1>
              <p className="lead mb-4">
                Ordena tus favoritos con promos del día y recibe ofertas personalizadas.
              </p>
              
            {!auth && (
              <div className="d-flex gap-2">
                <Link to="/registro" className="btn btn-warning btn-lg">Registrarme</Link>
                <Link to="/login" className="btn btn-outline-light btn-lg">Iniciar sesión</Link>
              </div>
            )}
            {auth && (
              <div className="d-flex gap-2">
                {auth.role === "admin" ? (
                  <Link to="/admin" className="btn btn-success btn-lg">Ir al Panel Admin</Link>
                ) : (
                  <Link to="/cliente" className="btn btn-success btn-lg">Ir a mis Compras</Link>
                )}
              </div>
            )}
            </div>
            <div className="col-lg-6">
            </div>
          </div>
        </div>
      </header>

      {/* OFERTAS */}
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-3">
          <h3 className="m-0">Ofertas del día</h3>
          <span className="text-muted small">Aprovecha antes de que se acaben</span>
        </div>
        <div className="row g-4">
          {OFFERS.map(o => (
            <div className="col-md-4" key={o.id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="position-relative">
                  <img src={o.img} className="card-img-top" alt={o.title} />
                  <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">{o.badge}</span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{o.title}</h5>
                  <p className="card-text text-muted">{o.desc}</p>

                
                  <Link to="/login" className="btn btn-dark btn-sm">Pedir ahora</Link>

                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="bg-light py-5">
        <div className="container">
          <h3 className="mb-4">Explora por categoría</h3>
          <div className="row g-3">
            {CATEGORIES.map(c => (
              <div className="col-6 col-md-3" key={c.id}>
                <div className="card border-0 shadow-sm">
                  <img src={c.img} className="card-img-top" alt={c.name} />
                  <div className="card-body text-center">
                    <h6 className="card-title m-0">{c.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="container py-5">
        <h3 className="mb-4">Recomendados para ti</h3>
        <div className="row g-4">
          {FEATURED.map(p => (
            <div className="col-12 col-sm-6 col-lg-3" key={p.id}>
              <div className="card h-100 border-0 shadow-sm">
                <img src={p.img} className="card-img-top" alt={p.name} />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{p.name}</h6>
                  <p className="text-muted mb-4">Desde <strong>Q{p.price}</strong></p>
                  <button className="btn btn-warning mt-auto" onClick={() => handleAddToCart(p)}>Agregar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
