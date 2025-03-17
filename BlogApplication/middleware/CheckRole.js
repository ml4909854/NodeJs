const CheckRole = (requiredRole) => {
    return async (req, res, next) => {
        try {
            // Check if requiredRole is provided
            if (!requiredRole) {
                return res.status(400).json({ message: "No requiredRole provided!" });
            }

            // Check if user is authenticated
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated!" });
            }

            // Check if user role exists
            if (!req.user.role) {
                return res.status(403).json({ message: "User role not found!" });
            }

            // Check if user role matches the required role
            if (req.user.role !== requiredRole) {
                return res.status(403).json({ message: "You are not authorized for this action!" });
            }

            next();
        } catch (error) {
            console.error("Authorization error:", error);
            res.status(500).json({ message: "Error during authorization!" });
        }
    };
};

module.exports = CheckRole;