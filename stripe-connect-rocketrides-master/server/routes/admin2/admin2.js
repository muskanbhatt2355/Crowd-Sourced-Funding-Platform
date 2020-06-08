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
const Admin2 = require('../../models/admin2');
const bcrypt = require('bcryptjs');
const saltRounds = 10;


router.get('/new_admin', function(req,res){
	res.render('new_admin');
});

router.post('/add_admin', function(req,res){
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		const already_existing = Admin2.find({email:req.body.email});
		if(already_existing.length==0){
			const new_ad = new Admin2({
		    	email: req.body.email,
		    	password_hash: hash,
		    });
		    new_ad.save();
		    return res.redirect('../../cars/car_dash');
		}
		else{
			res.send("email already exists. Try logging instead!");
		}
	    
	});
	
});
router.get('/admin_login_view', function(req,res){
	res.render('adlogin');
});
/*
router.post('/admin_login', function(req,res){
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		Admin2.find({email:req.body.email},function(err,item){
			if(item.length==0){
				res.send("You are not an admin!");
			}
			else{
				console.log("Already existing");
				console.log(item);
				console.log(hash);
				if(item[0].password_hash==hash){
					return res.redirect('../../cars/car_dash');
				}
				else{
				  	res.send("Incorrect password!");
				}					
			}	
		});	    
	});
	
});
*/
router.post('/admin_login', function(req,res){
		Admin2.find({email:req.body.email},function(err,item){
			if(item.length==0){
				res.send("You are not an admin!");
			}
			else{
				console.log("Already existing");
				console.log(item);
				bcrypt.compare(req.body.password, item[0].password_hash, function(err, result) {
				    if(result==true){
				    	return res.redirect('../../cars/car_dash');
				    }
				    else{
				    	res.send("Incorrect password!");
				    }
				});				
			}	
		});	    	
});

module.exports = router;
