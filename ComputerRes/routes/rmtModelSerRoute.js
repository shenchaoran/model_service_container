/**
 * Created by Franklin on 2016/9/12.
 */
var setting = require('../setting');
var remoteReqCtrl = require('../control/remoteReqControl');
var childCtrl = require('../control/childControl');
var ModelSerControl = require('../control/modelSerControl');
var RouteBase = require('./routeBase');
var ParamCheck = require('../utils/paramCheck');

module.exports = function(app)
{
    //请求转发 上传进度
    app.route('/modelser/rmt/file/:host')
        .get(function (req, res, next) {
            var host = req.params.host;
            childCtrl.getByWhere({host:host},function (error, child) {
                if(error){
                    return res.end(JSON.stringify(error));
                }
                var url = 'http://' + host + ':' + child.port + '/modelser/file/'+req.sessionID;
                remoteReqCtrl.getRequest(req,url,function (err, data) {
                    if(err){
                        return res.end(JSON.stringify(err));
                    }
                    return res.end(data);
                });
            });
        });

    //请求转发 上传文件
    app.route('/modelser/rmt/:host')
        .post(function (req, res, next) {
            var host = req.params.host;
            ModelSerControl.postRmtModelSer(req, host, function(err, data){
                if(err){
                    return res.end(JSON.stringify(err));
                }
                return res.end(data);
            });
            //childCtrl.getByWhere({host:host},function (error, child) {
            //    if(error){
            //        return res.end(JSON.stringify(error));
            //    }
            //    var url = 'http://' + host + ':' + child.port + '/modelser/'+ req.sessionID;
            //    remoteReqCtrl.postRequest(req,url,function (err, data) {
            //        if(err){
            //            return res.end(JSON.stringify(err));
            //        }
            //        return res.end(data);
            //    });
            //});
        })
        .get(function (req, res, next) {
            res.render('modelsers_r',{
                blmodelser_r : true
            })
        });
    
    //查看所有远程结点ms的JSON
    app.route('/modelser/rmt/json/all')
        .get(function (req, res, next) {
            ModelSerControl.getChildModelSer(RouteBase.returnFunction(res, 'error in getting all rmt model services'));
        });

    //远程上传模型页面
    app.route('/modelser/rmt/:host/new')
        .get(function(req, res, next){
            var host = req.params.host;
            res.render('modelSerNew_r',{
                host : host
            });
        });

    //操控特定结点的特定ms
    app.route('/modelser/rmt/:host/:msid')
        .get(function (req, res, next) {
            var host = req.params.host;
            var msid = req.params.msid;
            if(req.query.ac == 'run')
            {
                ModelSerControl.runRmtModelSer(host, msid, req.query.inputdata, function(err, data){
                    if(err)
                    {
                        return res.end('error in run a rmt model service');
                    }
                    return res.end(JSON.stringify(data));
                });
            }
            else
            {
                ModelSerControl.getRmtModelSer(host, msid, function (err, data) {
                    if(err)
                    {
                        return res.end(JSON.stringify({
                            result : 'err',
                            message : JSON.stringify(err)
                        }));
                    }
                    delete data['blmodelser'];
                    data["blmodelser_r"] = true;
                    data["host"] = host;
                    return res.render('modelSer_r', data);
                });
            }
        })
        .put(function (req, res) {
            var msid = req.params.msid;
            var host = req.params.host;
            if(req.query.ac === 'start')
            {
                ModelSerControl.startRmtModelSer(host, msid, RouteBase.returnFunction(res, "Error in start rmt model service"));
            }
            else if(req.query.ac == 'stop')
            {
                ModelSerControl.stopRmtModelSer(host, msid, RouteBase.returnFunction(res, "Error in stop rmt model service"));
            }
        })
        .delete(function (req, res) {
            var msid = req.params.msid;
            var host = req.params.host;
            ModelSerControl.deleteRmtModelSer(host, msid, RouteBase.returnFunction(res, 'Error in delete a rmt model service!'));
        });

    //获取某个模型服务的输入输出数据声明
    app.route('/modelser/rmt/inputdata/:host/:msid')
        .get(function (req, res, next) {
            var host = req.params.host;
            var msid = req.params.msid;
            ModelSerControl.getRmtInputDate(host, msid, function(err, data){
                if(err)
                {
                    return res.end(JSON.stringify({
                        result : 'err',
                        message : errMessage + JSON.stringify(err)
                    }));
                }
                return res.end(JSON.stringify({
                    result : 'suc',
                    data : data.data
                }));
            });
        });

    //特定结点的特定ms进入准备调用页面
    app.route('/modelser/rmt/preparation/:host/:msid')
        .get(function (req, res, next) {
            var host = req.params.host;
            var msid = req.params.msid;
            ModelSerControl.getRmtPreparationData(host, msid, function(err, data)
            {
                if(err)
                {
                    return res.end(JSON.stringify({
                        result : 'err',
                        message : JSON.stringify(err)
                    }));
                }
                data.host = host;
                return res.render('modelRunPro_r',data);
            });
        });

    //操控特定结点的特定ms   返回JSON
    app.route('/modelser/rmt/json/:host/:msid')
        .get(function (req, res, next) {
            var host = req.params.host,
                msid = req.params.msid;
                ModelSerControl.getRmtModelSer(host, msid, function (err, data) {
                    if(err)
                    {
                        return res.end(JSON.stringify({
                            result : 'err',
                            message : JSON.stringify(err)
                        }));
                    }
                    delete data['blmodelser'];
                    data["host"] = host;
                    return res.end(JSON.stringify(data));
                });
        });

    //模型图像转发
    app.route('/modelser/rmt/img/:host/:imgname')
        .get(function(req, res, next){
            var host = req.params.host;
            var imgname = req.params.imgname;
            ModelSerControl.getRmtImg(host, imgname, res, function(err, result)
            {
                if(err)
                {
                    return res.end(JSON.stringify(err));
                }
            });
        });
};