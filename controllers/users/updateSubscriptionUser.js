const { User } = require('../../models/user');


const updateSubscriptionUser = async (req, res, next) => {
    try {
        const { subscription } = req.body;
        if (!subscription) {
        const error = new Error("missing field subscription");
            error.status = 400;
            throw error;
        }
        const { _id } = req.user;
        const result = await User.findByIdAndUpdate(_id, {subscription}, { new: true });
        if (!result) {
            const error = new Error(`Not found`);
            error.status = 404;
            throw error;
        }
        res.json({
            status: "success",
            code: 201,
            data: {
                result
            }
        });
    } catch (error) {
        next(error)
    };
};


module.exports = updateSubscriptionUser;