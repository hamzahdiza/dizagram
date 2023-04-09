function errorHandler(err, req, res, next) {
  if (err.name === "username-already-exists") {
    res.status(401).json({ message: "Username already exists", status: false });
  } else if (err.name === "email-already-exists") {
    res.status(401).json({ message: "Email already exists", status: false });
  } else if (err.name === "data-not-found") {
    res.status(404).json({
      message: "Data not found",
    });
  } else if (err.name === "forbidden") {
    res.status(403).json({ message: "This action is only for the admin role" });
  } else if (err.name === "invalid-login") {
    res.status(401).json({ message: "Username/Password Invalid", status: false });
  } else if (err.name === "invalid-token" || err.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid Token" });
  } else {
    res.status(500).json({
      message: "Fixing 500 Internal Server Error Problems on Your Own Site",
    });
  }
}

module.exports = errorHandler;
