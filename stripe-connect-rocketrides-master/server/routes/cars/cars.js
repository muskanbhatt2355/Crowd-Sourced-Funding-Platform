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
const Req_Car = require('../../models/req_car');
const Subs_id = require('../../models/subs_id_list');



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
	/*var listDocuments= [
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
	];*/

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
	/*var listDocuments2 =[
		{
			vin_id: 'GDTWEIO123YSHM905',
			mod_name: 'Toyota 100'
		},
		{
			vin_id: 'AVFSHIO123YSHM905',
			mod_name: 'Hundai 280'
		},
	];*/
	/*Car_model.create(listDocuments2, function (err, results) {
		if(err){
			console.log(err);
		}
		else{
			 console.log(results);
		}
	   
	});
	*/
	/*Pilot.find({firstName: 'Taruna'}, function(err,pilot){
		console.log('Here is she');
		//console.log(pilot);
		pilot[0].vin_points_pair.push({vin_id:"HEFINSHH154890201",partner_points:"20000"});
		//pilot[0].vin_points_pair = [];
		pilot[0].save();
		pilot[0].vin_points_pair.push({vin_id:"JHDHASUD6126387IK",partner_points:"12000"});
		pilot[0].save();
		console.log(pilot[0].vin_points_pair);
		for( var man in pilot){
			console.log(pilot[man].vin_points_pair[0].vin_id);
		}
	});
	Pilot.find({firstName: 'Shashwat'}, function(err,man){
		console.log('Here is he');
		//console.log(pilot);
		man[0].vin_points_pair.push({vin_id:"278DGSKLCBN489XNK",partner_points:"20000"});
		//pilot[0].vin_points_pair = [];
		man[0].save();
		man[0].vin_points_pair.push({vin_id:"JHDHASUD6126387IK",partner_points:"8000"});
		man[0].save();
		console.log(man[0].vin_points_pair);
		for( var man in pilot){
			console.log(pilot[man].vin_points_pair[0].vin_id);
		}
	});
	*/


	Car_model.find({}, function(err,cars){
		console.log(cars);
	});


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
			var req_years = [];
			for ( var car in cars ){
			  const year = cars[car].year;
			  if(!req_years.includes(year)){
			    req_years.push(year);
			  }
			}
			console.log('cars start here!');
			console.log(cars);
			console.log('cars end here!');
			res.render('car_view',{cars:cars,req_months:req_months,req_years:req_years});
		}
 	});
	
 });

 router.post('/add_new_record', function(req,res){
 	Car_model.find({}, function(err, cars){
		if(err){
			console.log(err);
		}
		else{
			/*var years = [];
			const present_year = parseInt(new Date().getFullYear());
			for(var i=0; i<4;i++){
				years.push(present_year-i);
			}

			var months = [];
			var month_list = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			const present_month = parseInt(new Date().getMonth());
			for(var i in month_list){
				months.push(month_list[i]);
			}

			res.render('edit_view',{cars:cars,years:years,months:months});
			*/
			const present_year = parseInt(new Date().getFullYear());
			const present_month = parseInt(new Date().getMonth());
			var months = [];
			var month_list = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			for(var i in month_list){
				if(i==present_month){
					break;
				}
				months.push(month_list[i]);
			}
			res.render('edit_view',{cars:cars,present_year:present_year,months:months});
		}
 	});

 });
 router.get('/add_new_record', function(req,res){
 	Car_model.find({}, function(err, cars){
		if(err){
			console.log(err);
		}
		else{
			var years = [];
			const present_year = parseInt(new Date().getFullYear());
			for(var i=0; i<4;i++){
				years.push(present_year-i);
			}

			var months = [];
			var month_list = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			const present_month = parseInt(new Date().getMonth());
			for(var i=present_month;i>=0;i--){
				months.push(month_list[i]);
			}

			res.render('edit_view',{cars:cars,years:years,months:months});
		}
 	});

 });
 router.post('/edit_existing_record_view', function(req,res){
 	Car.find({}, function(err, cars){
		if(err){
			console.log(err);
		}
		else{
			res.render('edit_existing_record_view',{cars:cars});
		}
 	});

 });
 router.post('/edit_existing_record', function(req,res){
 	Car.findOneAndUpdate({'car_id':req.body.car_id},{'revenue':req.body.revenue},{'upsert':true},function(err, my_car){
		if(err){
			console.log(err);
		}
		Car.find({}, function(err, cars){
			if(err){
				console.log(err);
			}
			else{
				res.render('edit_existing_record_view',{cars:cars});
			}
	 	});
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

	  var req_years = [];
	  for ( var ride in rides2 ){
	    const year = rides2[ride].year;
	    if(!req_years.includes(year)){
	      req_years.push(year);
	    }
	  }
	  console.log(req_months);



 	const req_month = req.body.req_month;
 	const filter = {'month': req_month,'year':req.body.req_year};
 	//const my_rides = rides2.find({'month':req_month});
 	console.log('The required Month is Here!');
 	//console.log(req_month);
 	//console.log(my_rides);
 	Car.find(filter, function(err,rides) {
 		var req_rides = [];
 		for ( var i in rides2 ){
 			if((rides2[i].month == req.body.req_month)&&(rides2[i].year == req.body.req_year)){
 				req_rides.push(rides2[i]);
 			};
 		}
 		if(err){
 			console.log(err);
 		}
 		//console.log('rides are here!');
 		//console.log(rides);
 		const ridesTotalAmount = req_rides.reduce((a, b) => {
		    return a + b.amountForPilot();
		  }, 0);
 		res.render('dashboard',{
 			rides:req_rides,
 			pilot: pilot,
		    balanceAvailable: balance.available[0].amount,
		    balancePending: balance.pending[0].amount,
		    ridesTotalAmount: ridesTotalAmount,
		    req_months: req_months,
		    req_years: req_years,
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
			Car.find({'month':req.body.req_month,'year':req.body.req_year}, function(err, cars){
				if(err){
					console.log(err);
				}
				else{
					console.log('Riya');
					console.log(cars);
					console.log('riya ends here!');
					var req_months = [];
					for ( var ride in rides ){
					  const month = rides[ride].month;
					  if(!req_months.includes(month)){
					    req_months.push(month);
					  }
					}
					var req_years = [];
					for ( var ride in rides ){
					  const year = rides[ride].year;
					  if(!req_years.includes(year)){
					    req_years.push(year);
					  }
					}
					res.render('car_view',{cars:cars,req_months:req_months,req_years:req_years});
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

 	/*Car.deleteMany(filter, function(err, results){
 		if(err){
 			console.log(err);
 		}
 	});
 	*/

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
router.get('/add_options', function(req,res){
 	res.render('add_view');
 });

router.post('/add_car', function(req,res){
	const filter = {'vin_id': req.body.vin_id};
	const update = {'mod_name': req.body.mod_name, 'total_points': req.body.total_points};
	Car_model.findOneAndUpdate(filter, update ,{upsert: true}, function(err,results){
		if(err){
			console.log(err);
		}
	});
	return res.redirect('../../cars/add_options');
});

router.post('/add_record', function(req,res){
 	//const filter = {'vin_id': req.body.vin_id,'mod_name': req.body.mod_name,'month':req.body.month};
 	//const filter = {'car_id': req.body.car_id};
	//const update = {'car_id': req.body.car_id,'revenue': req.body.revenue};
	Car_model.find({'vin_id': req.body.vin_id}, function(err,req_model){
		console.log("here is our model");
		console.log(req_model);
		const mod_name = req_model[0].mod_name;
		const total_points = req_model[0].total_points;

		Subs_id.find({},function(err,subs_id){
			const car_id = subs_id[0].car_id + 1;

			Subs_id.findOneAndUpdate({},{'car_id': car_id},{upsert:false},function(err,result){
				if(err){
					console.log("M not working");
				}
				else{
					console.log(car_id);
				}
			});

			const car = new Car({
			    car_id: car_id,
			    vin_id: req.body.vin_id,
			    mod_name: mod_name,
			    year: req.body.year,
			    month: req.body.month,
			    revenue: req.body.revenue,
			    total_points: total_points
		     });
			car.save();
			Pilot.find({}, async function(err, pilots){
				if(err){
					console.log(err);
				}
				else{
					console.log(pilots);
					//Car.findOneAndUpdate(filter, update, {upsert: true}, async function(err, doc) {
			    		//if (err) return res.send(err);
			    // As a new car is created we also need to add charges of amount = amountforpilot() to each pilots stripe id

					    for (const pilot of pilots) {
					    	const list = pilot.car_points_pair;
					    	for( const dict of list){
					    		if(dict.vin_id==car.vin_id){
					    			var month_list = ['January','February','March','April','May','June','July','August','September','October','November','December'];
					    			var j=0;
					    			for(var x in month_list){
					    				if(car.month==month_list[x]){
					    					j=x;
					    					break;
					    				}
					    			}
					    			if(j>parseInt(dict.date.getMonth())){
					    				var req_car2 = new Req_Car({
									        car_id: car_id,
										    vin_id: req.body.vin_id,
										    mod_name: mod_name,
										    year: req.body.year,
										    month: req.body.month,
										    revenue: req.body.revenue,
										    total_points: total_points,
									        partner_points: dict.partner_points,
									        });
									    req_car2.save();
					    				var source = 'tok_bypassPending';

								    	const charge = await stripe.charges.create({
									      source: source,
									      amount: req_car2.amountForPilot(),
									      currency: 'usd',
									      description: config.appName,
									      statement_descriptor: config.appName,
									      // The destination parameter directs the transfer of funds from platform to pilot
									      transfer_data: {
									        // Send the amount for the pilot after collecting a 20% platform fee:
									        // the `amountForPilot` method simply computes `ride.amount * 0.8`
									        amount: req_car2.amountForPilot(),
									        // The destination of this charge is the pilot's Stripe account
									        destination: pilot.stripeAccountId,
									      },
									    });
					    			}
					    			
					    		}
					    	}
						    //car.stripeChargeId = charge.id;
		    				//car.save();
					    }

			    		//return res.redirect('../../cars/car_dash');
			    		return res.redirect('../../cars/car_dash');
					//});
				}
	 	});

		});

		
 	//return res.redirect('../../cars/add_new_record');

	//});
	
	//const filter1 = {'vin_id': req.body.vin_id, 'mod_name':req.body.mod_name};
	/*Car_model.findOneAndUpdate(filter1, filter1 ,{upsert: true}, function(err,results){
		if(err){
			console.log(err);
		}
		
	});*/
	
		
 	});
 	
	
});

// Buying Points from now on

router.post('/buy_view', function(req,res){
	Car_model.find({},function(err,cars){
		res.render('buy_view',{cars:cars});
	});
 	
 });

router.post('/payment_success', function(req,res){
	res.render('payment_success');
 });
router.get('/payment_success', function(req,res){
	const query = req.query;
	console.log("My query here!");
	console.log(query);
	/*const params = req.params;
	console.log("My Params here!");
	console.log(params);
	*/
	const vin_id = query.vin_id;
	const card_num = query.card_num;
	const mod_name = query.mod_name;
	const partner_points = 500*card_num;

	const pilot = req.user;
	console.log("Tu tapri");
	console.log(pilot.car_points_pair);
	pilot.car_points_pair.push({'vin_id':vin_id,'mod_name':mod_name,'partner_points':partner_points,'date':Date.now()});
	console.log("New Tapri");
	console.log(pilot.car_points_pair);
	pilot.save();
	//pilot.car_points_pair.append({'vin_id':vin_id,'partner_points':partner_points});
	res.render('payment_success');
 });
router.post('/payment_failure', function(req,res){
	res.render('payment_failure');
 });
router.get('/payment_failure', function(req,res){
	res.render('payment_failure');
 });

router.post('/buy_points', async function(req,res){
	const stripe = require('stripe')('sk_test_rZ5sztZvwHNJHN1IlyNyn3uM00PlJIr9I7');
	var VIN_ID = req.body.vin_id;
	var CARD_NUM = req.body.card_num;

	Car_model.find({'vin_id':VIN_ID}, async function(err,car_model){
		var MOD_NAME = car_model[0].mod_name;

		const session = await stripe.checkout.sessions.create({
		  payment_method_types: ['card'],
		  line_items: [{
		    price: 'price_HM5BUob6PEQPwM',
		    quantity: req.body.card_num,
		  }],
		  mode: 'payment',
		  success_url: `http://localhost:3000/cars/payment_success?session_id={CHECKOUT_SESSION_ID}&vin_id=${VIN_ID}&card_num=${CARD_NUM}&mod_name=${MOD_NAME}`,
		  cancel_url: 'http://localhost:3000/cars/payment_failure',
		});
		console.log(session);
		res.render('react_checkout',{session:session});
	});

	
	/*const stripe2 = require('stripe');
	var stripe3 = window.Stripe('pk_test_oI7eGSPKEwUseX96bbtPoS0N00niVXASui');
	stripe3.redirectToCheckout({
	  // Make the id field from the Checkout Session creation API response
	  // available to this file, so you can provide it as parameter here
	  // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
	  sessionId: session.id
	}).then(function (result) {
	  // If `redirectToCheckout` fails due to a browser or network
	  // error, display the localized error message to your customer
	  // using `result.error.message`.
	});*/
});


module.exports = router;