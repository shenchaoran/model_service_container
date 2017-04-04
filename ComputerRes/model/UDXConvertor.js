var fs = require('fs');
var lib_udx = require("./nxdat.js");
var proj4 = require("proj4");

function Convertor(convertor)
{
}

module.exports = Convertor;

Convertor.Asc2Geotiff = function(srcPath,dstPath,callback){
    fs.readFile(srcPath,function (err, data) {
        if(err) {
            console.log("Error:read file err!\n");
            callback(err);
        }
        var strUDX = data.toString();
        var AscDataset = lib_udx.createDataset();
        // bug
        // Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X
        // with X higher than the current value 16777216, (2) compile with
        // ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some
        // optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.
        var ss = lib_udx.loadFromXmlFile(AscDataset,strUDX);
        if(ss!='Parse XML OK'){
            return console.log('Error:load udx err!');
        }
        var AscRootNode = lib_udx.getDatasetNode(AscDataset);
        var count = lib_udx.getNodeChildCount(AscRootNode);
        if(count<2){
            return console.log('Error:fill err!');
        }
        //////////////////////////////////////////////
        // read
        var ascheadNode,ascbodyNode,ascncolsNode,ascnrowsNode,ascxllcornerNode,ascyllcornerNode,asccellsizeNode,ascnodatavNode;
        ascheadNode = lib_udx.getChildNode(AscRootNode,0);
        ascbodyNode = lib_udx.getChildNode(AscRootNode,1);
        ascncolsNode = lib_udx.getChildNode(ascheadNode,0);
        ascnrowsNode = lib_udx.getChildNode(ascheadNode,1);
        ascxllcornerNode = lib_udx.getChildNode(ascheadNode,2);
        ascyllcornerNode = lib_udx.getChildNode(ascheadNode,3);
        asccellsizeNode = lib_udx.getChildNode(ascheadNode,4);
        ascnodatavNode = lib_udx.getChildNode(ascheadNode,5);
        var nrows = lib_udx.getNodeIntValue(ascnrowsNode);
        var ncols = lib_udx.getNodeIntValue(ascncolsNode);
        var nodatav = lib_udx.getNodeRealValue(ascnodatavNode);

        ///////////////////////////////////////////////
        // write
        var TiffDataset = lib_udx.createDataset();
        var TiffRootNode = lib_udx.getDatasetNode(TiffDataset);
        var tiffHeadNode = lib_udx.addChildNode(TiffRootNode,'header',lib_udx.KernelType.dxnode,1);
        var tiffBandsNode = lib_udx.addChildNode(TiffRootNode,'bands',lib_udx.KernelType.dxlist,1);
        var tiffProNode = lib_udx.addChildNode(TiffRootNode,'projection',lib_udx.KernelType.dxstring,1);
        var tiffBand1Node = lib_udx.addChildNode(tiffBandsNode,'band1',lib_udx.KernelType.dxnode,1);
        var tiffnodataVN = lib_udx.addChildNode(tiffBand1Node,'nodata',lib_udx.KernelType.dxreal,1);
        var tiffoffsetN = lib_udx.addChildNode(tiffBand1Node,'offset',lib_udx.KernelType.dxreal,1);
        var tiffscaleN = lib_udx.addChildNode(tiffBand1Node,'scale',lib_udx.KernelType.dxreal,1);
        var tiffunitN = lib_udx.addChildNode(tiffBand1Node,'unit',lib_udx.KernelType.dxstring,1);
        var tiffvalueN = lib_udx.addChildNode(tiffBand1Node,'value',lib_udx.KernelType.dxlist,1);

        // head node
        {
            var tiffULCXN = lib_udx.addChildNode(tiffHeadNode,'upper left corner X',lib_udx.KernelType.dxreal,1);
            var tiffPXN = lib_udx.addChildNode(tiffHeadNode,'pixel width',lib_udx.KernelType.dxreal,1);
            var tiffTP1N = lib_udx.addChildNode(tiffHeadNode,'tansform param 1',lib_udx.KernelType.dxreal,1);
            var tiffULCYN = lib_udx.addChildNode(tiffHeadNode,'upper left corner Y',lib_udx.KernelType.dxreal,1);
            var tiffTP2N = lib_udx.addChildNode(tiffHeadNode,'tansform param 2',lib_udx.KernelType.dxreal,1);
            var tiffPHN = lib_udx.addChildNode(tiffHeadNode,'pixel height',lib_udx.KernelType.dxreal,1);
            var tiffWN = lib_udx.addChildNode(tiffHeadNode,'width',lib_udx.KernelType.dxint,1);
            var tiffHN = lib_udx.addChildNode(tiffHeadNode,'height',lib_udx.KernelType.dxint,1);
            lib_udx.setRealNodeValue(tiffULCXN,lib_udx.getNodeRealValue(ascxllcornerNode));
            lib_udx.setRealNodeValue(tiffULCYN,lib_udx.getNodeRealValue(ascyllcornerNode));
            lib_udx.setRealNodeValue(tiffPXN,lib_udx.getNodeRealValue(asccellsizeNode));
            lib_udx.setRealNodeValue(tiffPHN,lib_udx.getNodeRealValue(asccellsizeNode));
            lib_udx.setIntNodeValue(tiffWN,ncols);
            lib_udx.setIntNodeValue(tiffHN,nrows);
        }
        //bands info
        lib_udx.setRealNodeValue(tiffnodataVN,nodatav);
        // lib_udx.setRealNodeValue(tiffoffsetN,);
        // lib_udx.setRealNodeValue(tiffscaleN,);
        // lib_udx.setRealNodeValue(tiffunitN,);
        for(var i=0;i<nrows;i++)
        {
            var rowNode = lib_udx.addChildNode(tiffvalueN,'line',lib_udx.KernelType.dxreal,ncols);
            for(var j=0;j<ncols;j++)
            {
                var kernal = lib_udx.getNodeRealArrayValue(lib_udx.getChildNode(ascbodyNode,i),j);
                lib_udx.addRealNodeValue(rowNode,kernal,j);
            }
        }
        //projection
        // lib_udx.setStringNodeValue(tiffProNode,);

        //////////////////////////////////////////////
        //save
        var ss = lib_udx.formatToXmlFile(TiffDataset);
        fs.writeFile(dstPath,ss,function (err) {
            if(err){
                console.log('Error:write dst file err!');
            }
        })
    })
};

Convertor.GtiffClip = function(srcPath,dstPath,control,callback){
    fs.readFile(srcPath,function (err, data) {
        if(err) {
            console.log("Error:read file err!\n");
            callback(err);
        }
        var strUDX = data.toString();
        var srcDataset = lib_udx.createDataset();
        // bug
        // Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X
        // with X higher than the current value 16777216, (2) compile with
        // ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some
        // optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.
        var ss = lib_udx.loadFromXmlFile(srcDataset,strUDX);
        if(ss!='Parse XML OK'){
            return console.log('Error:load udx err!');
        }
        var srcRootNode = lib_udx.getDatasetNode(srcDataset);
        var count = lib_udx.getNodeChildCount(srcRootNode);
        if(count<2){
            return console.log('Error:fill err!');
        }
        //////////////////////////////////////////////
        // read
        var srcHead,srcBody,srcProj,srcW,srcH,srcxll,srcyll,pixelW,pixelH,TP1,TP2;
        srcHead = lib_udx.getChildNode(srcRootNode,0);
        srcBody = lib_udx.getChildNode(srcRootNode,1);
        srcProj = lib_udx.getChildNode(srcRootNode,2);

        srcxll = lib_udx.getChildNode(srcHead,0);
        pixelW = lib_udx.getChildNode(srcHead,1);
        TP1 = lib_udx.getChildNode(srcHead,2);
        srcyll = lib_udx.getChildNode(srcHead,3);
        TP2 = lib_udx.getChildNode(srcHead,4);
        pixelH = lib_udx.getChildNode(srcHead,5);
        srcW = lib_udx.getChildNode(srcHead,6);
        srcH = lib_udx.getChildNode(srcHead,7);

        var nrows = lib_udx.getNodeIntValue(srcH);
        var ncols = lib_udx.getNodeIntValue(srcW);

        if(control.col >= ncols || control.row >= nrows || (control.col+control.width)>=ncols || (control.row+control.height)>=nrows){
            return console.log('Error:clip area err!');
        }
        ///////////////////////////////////////////////
        // write
        var dstDataset = lib_udx.createDataset();
        var dstRootNode = lib_udx.getDatasetNode(dstDataset);
        var dstHeadNode = lib_udx.addChildNode(dstRootNode,'header',lib_udx.KernelType.dxnode,1);
        var dstBandsNode = lib_udx.addChildNode(dstRootNode,'bands',lib_udx.KernelType.dxlist,1);
        var dstProNode = lib_udx.addChildNode(dstRootNode,'projection',lib_udx.KernelType.dxstring,1);
        //dstHeadNode = tiffHead;
        //projection
        lib_udx.setStringNodeValue(dstProNode,lib_udx.getNodeStringValue(srcProj));

        // head node
        {
            var dstULCXN = lib_udx.addChildNode(dstHeadNode,'upper left corner X',lib_udx.KernelType.dxreal,1);
            var dstPXN = lib_udx.addChildNode(dstHeadNode,'pixel width',lib_udx.KernelType.dxreal,1);
            var dstTP1N = lib_udx.addChildNode(dstHeadNode,'tansform param 1',lib_udx.KernelType.dxreal,1);
            var dstULCYN = lib_udx.addChildNode(dstHeadNode,'upper left corner Y',lib_udx.KernelType.dxreal,1);
            var dstTP2N = lib_udx.addChildNode(dstHeadNode,'tansform param 2',lib_udx.KernelType.dxreal,1);
            var dstPHN = lib_udx.addChildNode(dstHeadNode,'pixel height',lib_udx.KernelType.dxreal,1);
            var dstWN = lib_udx.addChildNode(dstHeadNode,'width',lib_udx.KernelType.dxint,1);
            var dstHN = lib_udx.addChildNode(dstHeadNode,'height',lib_udx.KernelType.dxint,1);
            lib_udx.setRealNodeValue(dstULCXN,lib_udx.getNodeRealValue(srcxll));
            lib_udx.setRealNodeValue(dstULCYN,lib_udx.getNodeRealValue(srcyll));
            lib_udx.setRealNodeValue(dstPXN,lib_udx.getNodeRealValue(pixelW));
            lib_udx.setRealNodeValue(dstPHN,lib_udx.getNodeRealValue(pixelH));
            lib_udx.setRealNodeValue(dstTP1N,lib_udx.getNodeRealValue(TP1));
            lib_udx.setRealNodeValue(dstTP2N,lib_udx.getNodeRealValue(TP2));
            lib_udx.setIntNodeValue(dstWN,control.width);
            lib_udx.setIntNodeValue(dstHN,control.height);
        }

        //bands info
        for(var k=0;k<lib_udx.getNodeChildCount(srcBody);k++){
            var srcBandNode = lib_udx.getChildNode(srcBody,k);
            var nodeName = lib_udx.getNodeName(srcBandNode);
            var srcValueNode = lib_udx.getChildNode(srcBandNode,4);
            var dstBandNode = lib_udx.addChildNode(dstBandsNode,nodeName,lib_udx.KernelType.dxnode,1);
            var dstnodataVN = lib_udx.addChildNode(dstBandNode,'nodata',lib_udx.KernelType.dxreal,1);
            var dstoffsetN = lib_udx.addChildNode(dstBandNode,'offset',lib_udx.KernelType.dxreal,1);
            var dstscaleN = lib_udx.addChildNode(dstBandNode,'scale',lib_udx.KernelType.dxreal,1);
            var dstunitN = lib_udx.addChildNode(dstBandNode,'unit',lib_udx.KernelType.dxstring,1);
            var dstvalueN = lib_udx.addChildNode(dstBandNode,'value',lib_udx.KernelType.dxlist,1);
            lib_udx.setRealNodeValue(dstnodataVN,lib_udx.getNodeRealValue(lib_udx.getChildNode(srcBandNode,0)));
            lib_udx.setRealNodeValue(dstoffsetN,lib_udx.getNodeRealValue(lib_udx.getChildNode(srcBandNode,1)));
            lib_udx.setRealNodeValue(dstscaleN,lib_udx.getNodeRealValue(lib_udx.getChildNode(srcBandNode,2)));
            lib_udx.setStringNodeValue(dstunitN,lib_udx.getNodeStringValue(lib_udx.getChildNode(srcBandNode,3)));
            for(var i=0;i<control.height;i++)
            {
                var rowNode = lib_udx.addChildNode(dstvalueN,'line',lib_udx.KernelType.dxreal,control.width);
                for(var j=0;j<control.width;j++)
                {
                    var kernal = lib_udx.getNodeRealArrayValue(lib_udx.getChildNode(srcValueNode,i+control.row),j+control.col);
                    lib_udx.addRealNodeValue(rowNode,kernal,j);
                }
            }
        }

        //////////////////////////////////////////////
        //save
        var ss = lib_udx.formatToXmlFile(dstDataset);
        fs.writeFile(dstPath,ss,function (err) {
            if(err){
                console.log('Error:write dst file err!');
            }
        })
    })
};

Convertor.SHP2GEOJSON = function (srcPath, dstPath, callback) {
    fs.readFile(srcPath,function (err, data) {
        if (err) {
            console.log("Error:read file err!\n");
            callback(err);
        }
        var strUDX = data.toString();
        var srcDataset = lib_udx.createDataset();
        //bug 中文字符编码的问题
        var ss = lib_udx.loadFromXmlFile(srcDataset, strUDX);
        if (ss != 'Parse XML OK') {
            return console.log('Error:load udx err!');
        }
        Convertor.SHPDataset2GEOJSON(srcDataset,function (err, rst) {
            if(err){
                callback(err);
            }
            else{
                var geojson = JSON.stringify(rst.geojson);
                fs.writeFile(dstPath,geojson,function (err) {
                    if(err){
                        console.log('Error:save image file err!');
                        callback(err);
                    }
                    else{
                        callback(null,rst);
                    }
                });
            }
        })
    })
};

Convertor.SHPDataset2GEOJSON = function (srcDataset,dstPath, callback) {
    var srcRootNode = lib_udx.getDatasetNode(srcDataset);
    var count = lib_udx.getNodeChildCount(srcRootNode);
    if (count < 3) {
        return console.log('Error:UDX err!');
    }

    var geojson = {};
    ////////////////////////////////////////////////////////////
    //read
    var shpTypeN,featuresN,attrsN,spatialRefN;
    shpTypeN = lib_udx.getChildNode(srcRootNode,0);
    featuresN = lib_udx.getChildNode(srcRootNode,1);
    attrsN = lib_udx.getChildNode(srcRootNode,2);
    spatialRefN = lib_udx.getChildNode(srcRootNode,3);
    var shptype,spatialRef;
    shptype = lib_udx.getNodeStringValue(shpTypeN);
    spatialRef = lib_udx.getNodeStringValue(spatialRefN);
    geojson["type"] = "FeatureCollection";
    var features = [];
    var featureSize = lib_udx.getNodeChildCount(featuresN);
    var minx,miny,maxx,maxy;
    minx = miny = 99999;
    maxx = maxy = -99999;
    // var hasProj = true;
    for(var i=0;i<featureSize;i++){
        var feature = {};
        feature["type"] = "Feature";
        var geometry = {};
        var prop = {};
        if(shptype == "wkbLineString")
            geometry["type"] = "LineString";
        else if(shptype == "wkbPoint")
            geometry["type"] = "Point";
        else if(shptype == "wkbPolygon")
            geometry["type"] = "Polygon";
        var coors = [];
        var polygon = [];
        var linestring = lib_udx.getNodeStringValue(lib_udx.getChildNode(featuresN,i));
        var start = linestring.indexOf("(");
        var end = linestring.indexOf(")");
        var coorStr = linestring.substring(start+1,end);
        var coorList = coorStr.split(",");
        for(var j=0;j<coorList.length;j++){
            var x = parseInt(coorList[j].split(" ")[0]);
            var y = parseInt(coorList[j].split(" ")[1]);
            var point;
            try{
                point = proj4('UDXProj').inverse([x,y]);
            }
            catch(err){
                point = proj4('EPSG:3857').inverse([x,y]);
            }
            x = point[0];
            y = point[1];
            if(minx>x)
                minx = x;
            if(maxx<x)
                maxx = x;
            if(miny>y)
                miny = y;
            if(maxy<y)
                maxy = y;
            if(shptype == "wkbPoint"){
                coors.push(point[0]);
                coors.push(point[1]);
            }
            else if(shptype == "wkbLineString"){
                coors.push(point);
            }
            else if(shptype == "wkbPolygon"){
                polygon.push(point);
            }
        }
        if(shptype == "wkbPolygon"){
            coors.push(polygon);
        }
        geometry["coordinates"] = coors;
        feature["geometry"] = geometry;
        feature["properties"] = prop;
        features.push(feature);
    }
    geojson["features"] = features;
    rst = {
        WSCorner:[minx,miny],
        ENCorner:[maxx,maxy]
        // hasProj : true
    };
    fs.writeFile(dstPath,JSON.stringify(geojson),function (err) {
        if(err){
            console.log('Error:save image file err!');
            callback(err);
        }
        else{
            callback(null,rst);
        }
    });
};