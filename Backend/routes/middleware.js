const jwt = require("jsonwebtoken");
const SECRET = "prueba_tecnica_Carlos"; 

//middleware para verificar token y rol
function authMiddleware(role = null) {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No autorizado" });

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Token inválido" });
      if (role && decoded.role !== role) return res.status(403).json({ message: "Permiso denegado" });

      req.user = decoded;
      next();
    });
  };
}

module.exports = { authMiddleware, SECRET };
