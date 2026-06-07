import jwt from "jsonwebtoken";
export function authMiddleware(req, res, next) {
    const token = req.headers.authorization; //converting forcefully to string to prevent type error further
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        //@ts-ignore
        req.id = payload.id;
        next();
    }
    catch (e) {
        return res.status(403).json({
            message: "You are not logged in"
        });
    }
}
//# sourceMappingURL=middleware.js.map