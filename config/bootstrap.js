/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  if (await Rentalsystem.count() > 0) {
    return ;
  }

  await Rentalsystem.createEach([
    { Propertytitle: "酒店式靓装，有泳池会所", image:"http://image.guojj.com/exhibition/3/23/d0039ed7df87e94cdc67e427fdfc315a.jpg", Estate:"Festival City",Bedrooms:3,area:700,tenants:5,rent:25000,high:"highlighted" },
    { Propertytitle: "沙田第一城 套三房刚翻新", image:"https://img.zxzhijia.com/edpic/image/201712/20171211144829_65258.jpg", Estate:"City One Shatin",Bedrooms:3,area:900,tenants:6,rent:28000,high:"highlighted" },
    { Propertytitle: "2房实用，交通方便", image:"https://i1.kknews.cc/SIG=1qgbl7s/ctp-vzntr/153614606917764n0561806.jpg", Estate:"Tin Ma Court",Bedrooms:2,area:600,tenants:3,rent:18000,high:"highlighted" },
    { Propertytitle: "平绝同区", image:"http://i.epochtimes.com/assets/uploads/2018/12/155ea29179e3a72de76ed44694189667-600x400.jpg", Estate:"Festival City",Bedrooms:2,area:500,tenants:2,rent:15000,high:"highlighted" },
    { Propertytitle: "绝佳交通，临近学校", image:"http://www-img.assets.zhufaner.com/d5d69204-c3aa-11e8-87c3-00163e30738e.jpg", Estate:"Tin Ma Court",Bedrooms:2,area:700,tenants:4,rent:21000,high:"highlighted" },
    { Propertytitle: "沙田第一场豪华大房", image:"http://cms-bucket.nosdn.127.net/03164f48b729426cb531dfa5023aad3020180503185330.jpeg", Estate:"City One Shatin",Bedrooms:3,area:900,tenants:6,rent:29000,high:"" },
    // etc.
  ]);

};
