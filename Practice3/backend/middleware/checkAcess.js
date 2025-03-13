const checkAccess = (requiredRole) => {
    return (req, res, next) => {
      try {
        // Check if requiredRole is provided
        if (!requiredRole) {
          return res.status(400).json({ message: "Required role not provided!" });
        }
  
        // Check if user is authenticated and has a role
        if (!req.user || !req.user.role) {
          return res.status(403).json({ message: "User role not found!" });
        }
  
        // Check if the user's role matches the required role
        if (requiredRole === req.user.role) {
          return next(); // Allow access
        } else {
          return res.status(403).json({ message: "Access denied: Insufficient permissions! You are not allowed !" });
        }
      } catch (error) {
        return res.status(500).json({ message: "Error in role access check" });
      }
    };
  };
  
  module.exports = checkAccess;