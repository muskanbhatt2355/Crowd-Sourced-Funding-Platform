'use strict';

const config = require('../../config');
const stripe = require('stripe')(config.stripe.secretKey);
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Pilot = require('../../models/pilot');
const Ride = require('../../models/ride');
const Passenger = require('../../models/passenger');
const Car = require('../../models/car');
const Car_model = require('../../models/car_model');

/*router.get('/car_dash', function(req, res) {
        Car.find({}, function(err, cars) {
        	console.log('cars below');
        	console.log(cars);
           res.render('car_view', {cars: cars});
        });
    });
*/

/*router.get('/car_dash', async (req, res) => {
  const car = req.user;
  const my_cars = await car.view_cars();
  console.log(my_cars);
  res.render('car_view',{cars: my_cars});
  //res.send('my name is muskan');
});
*/
 
 router.get('/car_dash', function(req, res) {
//create an array of documents
	var listDocuments= [
	    {
	        car_id: 1,
	        mod_name: "Ford Mustang",
	        month: "Jan",
	        revenue: 1234
	    },
	    {
	        car_id: 2,
	        mod_name: "Toyota Corolla",
	        month: "Feb",
	        revenue: 850
	    },
	    {
	        car_id: 3,
	        mod_name: "Honda Civic",
	        month: "Feb",
	        revenue: 1000
	    },
	    {
	        car_id: 4,
	        mod_name: "Jeep Wrangler",
	        month: "Jan",
	        revenue: 780
	    },
	    {
	        car_id: 5,
	        mod_name: "Honda Accord",
	        month: "March",
	        revenue: 900
	    },
	];

	//Car.create(listDocuments, function (err, results) {

	//    console.log(results);
	//});
	// Functions to delete all records
	/*Car.deleteMany(listDocuments, function (err) {
	  if(err) console.log(err);
	  console.log("Successful deletion");
	});
	Car.deleteMany({}, function (err) {
	  if(err) console.log(err);
	  else{
	  	 console.log("Successful deletion");
	  }
	 
	});
	*/
	var listDocuments2 =[
		{
			vin_id: 'GDTWEIO123YSHM905',
			mod_name: 'Toyota 100'
		},
		{
			vin_id: 'AVFSHIO123YSHM905',
			mod_name: 'Hundai 280'
		},
	];
	/*Car_model.create(listDocuments2, function (err, results) {
		if(err){
			console.log(err);
		}
		else{
			 console.log(results);
		}
	   
	});
	*/


 	Car.find({}, function(err, cars){
		if(err){
			console.log(err);
		}
		else{
			var req_months = [];
			for ( var car in cars ){
			  const month = cars[car].month;
			  if(!req_months.includes(month)){
			    req_months.push(month);
			  }
			}
			console.log('cars start here!');
			console.log(cars);
			console.log('cars end here!');
			res.render('car_view',{cars:cars,req_months:req_months});
		}
 	});
	
 });

 router.post('/edit_details', function(req,res){
 	Car.find({}, function(err, cars){
		if(err){
			console.log(err);
		}
		else{
			res.render('edit_view',{cars:cars});
		}
 	});

 });

 router.post('/car_update', function(req,res){
 	//const filter = {'car_id': req.body.car_id,'mod_name': req.body.mod_name,'month':req.body.month};
 	const filter = {'car_id': req.body.car_id};
	const update = {'revenue': req.body.revenue};

	Car.findOneAndUpdate(filter, update, {upsert: false}, function(err, doc) {
	    if (err) return res.send(500, {error: err});
	    return res.redirect('../../cars/car_dash');
	});
 });

 router.post('/apply_filter', async function(req,res){
 	 const pilot = req.user;
	  // Retrieve the balance from Stripe
	  const balance = await stripe.balance.retrieve({
	    stripe_account: pilot.stripeAccountId,
	  });
	  // Fetch the pilot's recent rides
	  const rides2 = await pilot.listRecentRides();
	  console.log(rides2);
	  
	  const [showBanner] = req.flash('showBanner');
	  const copilots = await pilot.startit();
	    console.log(copilots);
	 
	  var req_months = [];
	  for ( var ride in rides2 ){
	    const month = rides2[ride].month;
	    if(!req_months.includes(month)){
	      req_months.push(month);
	    }
	  }
	  console.log(req_months);



 	const req_month = req.body.req_month;
 	const filter = {'month': req_month};
 	const my_rides = Car.find({'month':req_month});
 	console.log('The required Month is Here!');
 	console.log(req_month);
 	console.log(my_rides);
 	Car.find(filter, function(err,rides) {
 		if(err){
 			console.log(err);
 		}
 		console.log('rides are here!');
 		console.log(rides);
 		const ridesTotalAmount = rides.reduce((a, b) => {
		    return a + b.amountForPilot();
		  }, 0);
 		res.render('dashboard',{
 			rides:rides,
 			pilot: pilot,
		    balanceAvailable: balance.available[0].amount,
		    balancePending: balance.pending[0].amount,
		    ridesTotalAmount: ridesTotalAmount,
		    req_months: req_months,
		    showBanner: !!showBanner || req.query.showBanner,

 		});
 	})
	
 });

 router.post('/ad_month_filter', function(req,res){
 	Car.find({}, function(err, rides){
		if(err){
			console.log(err);
		}
		else{
			Car.find({'month':req.body.req_month}, function(err, cars){
				if(err){
					console.log(err);
				}
				else{
					var req_months = [];
					for ( var ride in rides ){
					  const month = rides[ride].month;
					  if(!req_months.includes(month)){
					    req_months.push(month);
					  }
					}
					res.render('car_view',{cars:cars,req_months:req_months});
				}
		 	});
			
		}
 	});
 	

 });

 router.get('/disp_car_models', function(req,res){
 	Car_model.find({}, function(err,car_models){
 		if(err){
 			console.log(err);
 		}
 		res.render('my_car_models',{car_models:car_models});
 	});
 });
router.post('/delete_car_model', function(req,res){
 	Car_model.find({}, function(err, cars){
		if(err){
			console.log(err);
		}
		else{
			res.render('delete_car_view',{cars:cars});
		}
 	});

 });

router.post('/delete_car', function(req,res){
 	//const filter = {'car_id': req.body.car_id,'mod_name': req.body.mod_name,'month':req.body.month};
 	const filter = {'vin_id': req.body.vin_id};

 	Car.deleteMany(filter, function(err, results){
 		if(err){
 			console.log(err);
 		}
 	});

	Car_model.findOneAndDelete(filter, function(err, doc) {
	    if (err) return res.send(500, {error: err});
	    return res.redirect('../../cars/car_dash');
	});
 });

 router.post('/delete_options', function(req,res){
 	Car.find({}, function(err, cars){
		if(err){
			console.log(err);
		}
		else{
			res.render('delete_view',{cars:cars});
		}
 	});

 });

 router.post('/delete_record', function(req,res){
 	//const filter = {'car_id': req.body.car_id,'mod_name': req.body.mod_name,'month':req.body.month};
 	const filter = {'car_id': req.body.car_id};

	Car.findOneAndDelete(filter, function(err, doc) {
	    if (err) return res.send(500, {error: err});
	    return res.redirect('../../cars/car_dash');
	});
 });

router.post('/add_options', function(req,res){
 	res.render('add_view');
 });

router.post('/add_record', function(req,res){
 	const filter = {'vin_id': req.body.vin_id,'mod_name': req.body.mod_name,'month':req.body.month};
 	//const filter = {'car_id': req.body.car_id};
	const update = {'car_id': req.body.car_id,'revenue': req.body.revenue};

	const car = new Car({
	    car_id: req.body.car_id,
	    vin_id: req.body.vin_id,
	    mod_name: req.body.mod_name,
	    month: req.body.month,
	    revenue: req.body.revenue
     });
	const filter1 = {'vin_id': req.body.vin_id, 'mod_name':req.body.mod_name};
	Car_model.findOneAndUpdate(filter1, filter1 ,{upsert: true}, function(err,results){
		if(err){
			console.log(err);
		}
		
	});
	
	Pilot.find({firstName: 'Taruna'}, function(err, pilots){
		if(err){
			console.log(err);
		}
		else{
			console.log(pilots);
			Car.findOneAndUpdate(filter, update, {upsert: true}, async function(err, doc) {
	    		if (err) return res.send(err);
	    // As a new car is created we also need to add charges of amount = amountforpilot() to each pilots stripe id

			    for (const pilot of pilots) {
			    	var source = 'tok_bypassPending';

			    	const charge = await stripe.charges.create({
				      source: source,
				      amount: car.amountForPilot(),
				      currency: 'usd',
				      description: config.appName,
				      statement_descriptor: config.appName,
				      // The destination parameter directs the transfer of funds from platform to pilot
				      transfer_data: {
				        // Send the amount for the pilot after collecting a 20% platform fee:
				        // the `amountForPilot` method simply computes `ride.amount * 0.8`
				        amount: car.amountForPilot(),
				        // The destination of this charge is the pilot's Stripe account
				        destination: pilot.stripeAccountId,
				      },
				    });
				    car.stripeChargeId = charge.id;
    				car.save();
			    }

	    		return res.redirect('../../cars/car_dash');
			});
		}
 	});
	
 });


 




module.exports = router;