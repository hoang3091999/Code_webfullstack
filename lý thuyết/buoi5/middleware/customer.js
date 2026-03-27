
export const createCustomerMiddleware = async (req,res,next) => {
    const { name, age, address, email } = req.body;
    if (!name || !age || !address || !email) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    next()
}
