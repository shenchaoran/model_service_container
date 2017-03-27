/**
 * Created by Franklin on 2016/9/12.
 * for child node Computer Resource
 */
var ObjectId = require('mongodb').ObjectID;
var mongoose = require('./mongooseModel');
var ModelBase = require('./modelBase');
var ParamCheck = require('../utils/paramCheck');

function Child(cld) {
    if(cld != null)
    {
        this.host = cld.host;
        this.port = cld.port;
        this.platform = cld.platform;
    }
    else
    {
        this.host = '';
        this.port = 0;
        this.platform = 0;
    }
}

Child.__proto__ = ModelBase;
module.exports = Child;


var ChildSchema = new mongoose.Schema({
    host:String,
    port:String,
    platform:Number
},{collection:'child'});
var ChildModel = mongoose.model('child',ChildSchema);
Child.baseModel = ChildModel;
Child.modelName = "Child";

//新增节点
Child.prototype.save = function (callback) {
    var cld = {
        host : this.host,
        port : this.port,
        platform : this.platform
    };
    cld = new ChildModel(cld);
    cld.save(function (err, res) {
        callback(err,res);
    });
};

//得到全部子节点
Child.getAll = function (callback) {
    ChildModel.find({},this.returnFunction(callback, 'Error in getting all child'));
};

//通过OID查询子节点信息
Child.getByOID = function (_oid, callback) {
    ParamCheck.checkParam(callback,_oid);
    var oid = new ObjectId(_oid);
    ChildModel.findOne({_id:oid},this.returnFunction(callback, "error in getting by oid in child"));
};

//条件查询
Child.getByWhere = function (where, callback) {
    ParamCheck.checkParam(callback, where);
    this.baseModel.findOne(where, this.returnFunction(callback, 'Error in getting by where in child'));
};

//根据host查询
Child.getByHost = function (host, callback) {
    ParamCheck.checkParam(callback, host);
    ChildModel.findOne({host : host},this.returnFunction(callback, "error in getting by oid in child"));
};