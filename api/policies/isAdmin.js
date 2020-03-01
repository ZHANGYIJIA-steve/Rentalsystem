module.exports = async function (req, res, proceed) {

    const isUserAdmin = false;

    if (req.session.types == 'admin') {
        return proceed();   //proceed to the next policy,
    }

    //--•
    // Otherwise, this request did not come from a logged-in user.
    return res.forbidden();

};