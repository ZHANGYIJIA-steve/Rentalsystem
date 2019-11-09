/**
 * RentalsystemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // action - create
create: async function (req, res) {

    if (req.method == "GET")
        return res.view('rentalsystem/create');

    if (!req.body.Rentalsystem)
        return res.badRequest("Form-data not received.");

    await Rentalsystem.create(req.body.Rentalsystem);

    return res.ok("Successfully created!");
},
json: async function (req, res) {

    var rentalsystems = await Rentalsystem.find();

    return res.json(rentalsystems);
},
admin: async function (req, res) {

    var models = await Rentalsystem.find();
    return res.view('rentalsystem/admin', { rentalsystems: models });
    
},



delete: async function (req, res) {

    if (req.method == "GET") return res.forbidden();

    var models = await Rentalsystem.destroy(req.params.id).fetch();

    if (models.length == 0) return res.notFound();
  


    return res.ok("Rentalsystem Deleted.");

},

edit: async function (req, res) {

    if (req.method == "GET") {

        var model = await Rentalsystem.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('rentalsystem/edit', { rentalsystem: model });

    } else {

        if (!req.body.Rentalsystem)
            return res.badRequest("Form-data not received.");

        var models = await Rentalsystem.update(req.params.id).set({
            Propertytitle: req.body.Rentalsystem.Propertytitle,
            image: req.body.Rentalsystem.image,
            Estate: req.body.Rentalsystem.Estate,
            Bedrooms: req.body.Rentalsystem.Bedrooms,
            area: req.body.Rentalsystem.area,
            tenants: req.body.Rentalsystem.tenants,
            rent: req.body.Rentalsystem.rent,
            high: req.body.Rentalsystem.high ||"",
        }).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Record updated");

    }
},
// search function
search: async function (req, res) {

    const qEstate = req.query.Estate || "";
    const qBedrooms = parseInt(req.query.Bedrooms);
    const qMinArea = parseInt(req.query.MinArea)||0;
    const qMaxArea = parseInt(req.query.MaxArea)||99999999;
    const qMinRent = parseInt(req.query.MinRent)||0;
    const qMaxRent = parseInt(req.query.MaxRent)||99999999;
    const qPage = Math.max(req.query.page - 1, 0) || 0;

    const numOfItemsPerPage = 2;


    if (isNaN(qBedrooms)) {

        var models = await Rentalsystem.find({
            
            where: { 
                Estate: { contains: qEstate } ,
                area:{'<=':qMaxArea,'>=':qMinArea},
                rent:{'<=':qMaxRent,'>=':qMinRent},


            },
            limit: numOfItemsPerPage, 
            skip: numOfItemsPerPage * qPage,
            sort: 'Estate'
        });
        var getcount = await Rentalsystem.find({
            
            where: { 
                Estate: { contains: qEstate } ,
                area:{'<=':qMaxArea,'>=':qMinArea},
                rent:{'<=':qMaxRent,'>=':qMinRent},


            },
            sort: 'Estate'
        });

        


    } else {

        var models = await Rentalsystem.find({
            where: { 
              
                Estate: { contains: qEstate },
                Bedrooms: qBedrooms,
                area:{'<=':qMaxArea,'>=':qMinArea},
                rent:{'<=':qMaxRent,'>=':qMinRent},
              
                

        
        },
        limit: numOfItemsPerPage, 
        skip: numOfItemsPerPage * qPage,
            sort: 'Estate'
        });

        var getcount = await Rentalsystem.find({
            where: { 
              
                Estate: { contains: qEstate },
                Bedrooms: qBedrooms,
                area:{'<=':qMaxArea,'>=':qMinArea},
                rent:{'<=':qMaxRent,'>=':qMinRent},
              
                

        
        },
     
            sort: 'Estate'
        });

    }
    var numOfPage = Math.ceil(await getcount.length / numOfItemsPerPage);

    return res.view('rentalsystem/search', { rentalsystems: models , count: numOfPage });
},
home: async function (req, res) {
    const numOfItemsPerPage = 4;

    var models = await Rentalsystem.find({
        where:{
            high:"highlighted",


        },
        limit: numOfItemsPerPage, 
        sort: 'createdAt'

    });
    if(req.session.role=='client'){
        return res.view('client/home', { rentalsystems: models });
    }else
    return res.view('rentalsystem/home', { rentalsystems: models });

    
},
detail: async function (req, res) {

    var model = await Rentalsystem.findOne(req.params.id);
  

    if (!model) return res.notFound();
    var ct= new Date().toLocaleDateString(model.createdAt);
    var ut= new Date().toLocaleDateString(model.updatedAt);

    return res.view('rentalsystem/detail', { model: model,ct,ut});
},



};



