
const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        status: "success",
        code: 200,
        dara: {
            email,
            subscription
        }
    })
};


module.exports = getCurrent;