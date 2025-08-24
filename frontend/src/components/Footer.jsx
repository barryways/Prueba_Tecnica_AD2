export default function Footer() {
  return (
    <footer className="bg-light border-top">
      <div className="container py-4 d-flex flex-column flex-md-row gap-2 justify-content-between align-items-center">
        <span className="text-muted">© {new Date().getFullYear()} Foodie Test</span>
        <nav className="d-flex gap-3 small">
          <a className="text-muted text-decoration-none" href="#">Términos</a>
          <a className="text-muted text-decoration-none" href="#">Privacidad</a>
          <a className="text-muted text-decoration-none" href="#">Soporte</a>
        </nav>
      </div>
    </footer>
  );
}
