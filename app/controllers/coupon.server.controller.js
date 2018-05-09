'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    couponModel = require('../models/coupon.server.model.js'),
    crypto = require('crypto');


/**
 @api {post} /coupon/create
 @apiName create
 @apiGroup coupon

 @apiParam {title} title
 @apiParam {description} description
 @apiParam {repeatFrequency} repeatFrequency
 @apiParam {category} category
 @apiParam {status} status
 @apiParam {storeAvailability} storeAvailability
 @apiParam {couponCode} couponCode
 @apiParam {DateAdded} DateAdded
 @apiParam {DateDeleted} DateDeleted

 @apiSuccessExample Success-Response:
  200 OK
  {success: true, id: frequency.id}

 @apiErrorExample Error-Response:
  400 Bad Request
  {
    "message": "error of some kind"
    }
*/
exports.create = function (req, res) {
    // used to create ID
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    console.dir(req.dbname);
    //for user database
    userDbConn.userDBConnection(req.dbname, function (userdb) {
        var coupon = userdb.model('coupon');
        console.dir(req.body);
        var v = new coupon({
            id: crypto.createHash('sha1').update(current_date + random).digest('hex'),
            title: req.body.title,
            description: req.body.description,
            repeatFrequency: req.body.repeatFrequency,
            category: req.body.category,
            status: req.body.status,
            storeAvailability: req.body.storeAvailability,
            couponCode: req.body.couponCode,    //TODO: make randomly generated unless manualy typed in.
            DateAdded: current_date

        });

        v.save(function (err, coupon) {
            if (err) {
                return res.status(400).send({
                    message:  err
                });
            } else {
                res.status(200).send({success: true, id: coupon.id});
            }
        });
    });

};

/**
 * @api {get} /coupon
 * @apiName list
 * @apiGroup coupon
 *
 * @apiSuccessExample Success-Response:
 *  200 OK
 * {coupon}
 *
 * @apiErrorExample Error-Response:
 *  400 Bad Request
 *  {
* "message": "error of some kind"
*     }
 */
exports.list = function (req, res) {
    //for user database
    console.log('req.dbname: ' + req.dbname);
    userDbConn.userDBConnection(req.dbname, function (userdb) {
        var coupon = userdb.model('coupon');

        coupon.find().sort('-type').exec(function (err, coupons) {
            if (!coupon.length) {
                res.status(200).send({coupons: coupons})
            } else {
                if (err) {
                    return res.status(400).send({
                        message:  err
                    });
                } else {
                    res.jsonp(coupons);
                }
            }
        });
    });
};

/**
 * @api {get} /coupon
 * @apiName detail
 * @apiGroup coupon
 *
 * @apiSuccessExample Success-Response:
 *  200 OK
 * {coupon}
 *
 * @apiErrorExample Error-Response:
 *  400 Bad Request
 *  {
* "message": "error of some kind"
*     }
 */
exports.detail = function (req, res) {
    //for user database
    userDbConn.userDBConnection(req.dbname, function (userdb) {
        var coupon = userdb.model('coupon');
        coupon.findOne({id: req.params.id}).sort('-type').exec(function (err, coupon) {
            if (!coupon) {
                res.status(200).send()
            } else {
                if (err) {
                    return res.status(400).send({
                        message: err
                    });
                } else {
                    res.jsonp(coupon);
                }
            }
        });
    });
};

/**
 * @api {post} /coupon
 * @apiName update
 * @apiGroup coupon
 *
 * @apiParam {couponid} couponid
 * @apiParam {updatedcoupon} Updatecoupon
 *
 * @apiSuccessExample Success-Response:
 *  200 OK
 *  {results: doc}
 *
 * @apiErrorExample Error-Response:
 *  400 Bad Request
 *  {
*  "message": "error of some kind"
*     }
 */
exports.update = function (req, res) {
    var query = {id: req.body.id};
    //for user database
    userDbConn.userDBConnection(req.dbname, function (userdb) {
        var coupon = userdb.model('coupon');
        coupon.findOneAndUpdate(query, req.body, {upsert: true}, function (err, doc) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                res.status(200).send({results: doc});
            }
        });
    });
};

/**
 * @api {delete} /coupon/:coupon
 * @apiName delete
 * @apiGroup coupon
 *
 * @apiParam {couponid} couponid
 *
 * @apiSuccessExample Success-Response:
 * 200 OK
 *  {results: doc}
 *
 * @apiErrorExample Error-Response:
 *  400 Bad Request
 *  {
*  "message": "error of some kind"
*     }
 */
exports.delete = function (req, res) {
    var query = {id: req.params.id};
    //for user database
    userDbConn.userDBConnection(req.dbname, function (userdb) {
        var coupon = userdb.model('coupon');
        coupon.remove(query, function (err, doc) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                res.status(200).send({results: doc});
            }

        })
    });
};