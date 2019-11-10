/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).send("User not found");

        const match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).send("Wrong Password");

        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;
            req.session.role=user.role;
            req.session.userid=user.id;

            sails.log("[Session] ", req.session);
            if (req.wantsJSON) {
                return res.json({ message: "login successfully.", url: '/rentalsystem/home' });    // for ajax request
            } else {
                return res.redirect('/rentalsystem/home');           // for normal request
            }

          

        });

    },
    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);
            if (req.wantsJSON) {
                return res.json({ message: "logout successfully.", url: '/rentalsystem/home' });    // for ajax request
            } else {
                return res.redirect('/rentalsystem/home');           // for normal request
            }

           
            
           

        });
    },
    populate: async function (req, res) {

        var model = await User.findOne(req.params.id).populate("rent");
    
        if (!model) return res.notFound();
    
        return res.json(model);
    
    },
    add: async function (req, res) {

        
        const house = await Rentalsystem.findOne(req.params.fk);
       
        
        const thatHouse = await Rentalsystem.findOne({id:req.params.fk}).populate("rentBy");

    
        if (!thatHouse) return res.notFound();
            
        if (thatHouse.rentBy.length>=thatHouse.tenants)
            return res.status(409).send("full rent.");   // conflict
        
        await User.addToCollection(user.id, "rent").members(req.params.fk);
        if (req.wantsJSON) {
            return res.json({ message: "rent successfully.", url: '/rentalsystem/detail/'+req.params.fk });    // for ajax request
        } else {
            return res.redirect('/rentalsystem/detail/'+req.params.fk);           // for normal request
        }
    
       
    
    },
    remove: async function (req, res) {

        const user = await User.findOne({username:req.session.username})
        
        const thatHouse = await Rentalsystem.findOne(req.params.fk).populate("rentBy", {id: user.id});
        
        
        if (!thatHouse) return res.notFound();
    
        if (!thatHouse.rentBy.length)
            return res.status(409).send("Nothing to delete.");    // conflict
    
        await User.removeFromCollection(user.id, "rent").members(req.params.fk);
    
        if (req.wantsJSON) {
            return res.json({ message: "rent successfully.", url: '/rentalsystem/detail/'+req.params.fk });    // for ajax request
        } else {
            return res.redirect('/rentalsystem/detail/'+req.params.fk);           // for normal request
        }
    
    },
    

};

