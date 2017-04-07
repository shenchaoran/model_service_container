/**
 * Created by Franklin on 2017/3/31.
 */
var React = require('react');
var Axios = require('axios');

var DataSelectTabel = require('./dataSelectTable');

var DataUploader = React.createClass({
    getInitialState : function () {
        var id = '';
        if(this.props['data-id'])
        {
            id = this.props['data-id'];
        }
        return {
            id : id,
            gdid : '',
            form : null,
            uploader : null
        };
    },

    componentDidMount : function () {
        this.setState({uploader : $('#fileuploader_' + this.state.id).uploadFile({
            //上传路径
            url : '/geodata/file/',
            //上传文件名
            fileName :"myfile",
            //是否多个文件
            multiple : false,
            //是否拖拽上传
            dragDrop : true,
            //最大文件数
            maxFileCount:1,
            //规定上传文件格式
            acceptFiles:"*/*",
            //最大文件大小
            maxFileSize:100*1024*1024,
            //动态表单
            dynamicFormData : function(){
                var formData = {
                    gd_tag : $('#fileuploaderTag_' + this.state.id).val()
                };
                return formData;
            }.bind(this),
            //上传文件按钮文本
            uploadStr:"上传文件",
            //取消上传按钮文本
            cancelStr:"取消文件",
            //拖拽上传提示文本（带HTML）
            dragDropStr:"<span><b>拖拽上传</b></span>",
            //完成上传提示文本
            doneStr:"完成上传",
            //是否自动传
            autoSubmit:false,
            //是否显示已上传文件
            showDownload:false,
            //上传完成回调
            onSuccess : this.onUploadFileFinished
        })});
        $('#dataLinkModel' + this.state.id).on('shown.bs.modal', this.refs.selectedTB.refresh)
    },

    onInputSubmit : function(e){
        Axios.post('/geodata/stream',{
                gd_tag : $('#dataInputTag_' + this.state.id).val(),
                data : $('#dataInput_' + this.state.id).val()
            })
            .then(
                data => {
                    if(data.data.res == 'suc'){
                        this.state.gdid = data.data.gd_id;
                        this.onUploadStreamFinished();
                    }
                },
                err => {}
            );
    },

    onFileSubmit : function(e){
        this.state.uploader.startUpload();
    },

    onSelectSubmit : function(e){
        var gdid = this.refs.selectedTB.getSelectedGDID();
        if(gdid == undefined)
        {
            alert('请选择一个数据！');
        }
        else
        {
            this.state.gdid = gdid;
            this.onSelectFinished();
        }
    },

    onUploadStreamFinished : function() {
        alert('数据上传成功！');
        $('#dataInputModel' + this.state.id).modal('hide');
        $('#dataInputTag_' + this.state.id).val('');
        $('#dataInput_' + this.state.id).val('');
        this.onFinished();
    },

    onUploadFileFinished : function(files, data, xhr, pd){
        var resJson = JSON.parse(data);
        if(resJson.res == 'suc')
        {
            alert('数据上传成功！');
            $('#fileuploaderTag_' + this.state.id).val('');
            $('#dataFileModel' + this.state.id).modal('hide');
            this.state.gdid = resJson.gd_id;
            this.onFinished();
        }
        this.state.uploader.reset();
    },

    onSelectFinished : function() {
        $("#dataLinkModel" + this.state.id).modal('hide');
        this.onFinished();
    },

    onFinished : function () {
        if(this.props.onFinish)
        {
            this.props.onFinish(this.state.gdid);
        }
    },

    getGDID : function(){
        return this.state.gdid;
    },

    render : function(){
        var selectBtn = null;
        var id = this.state.id;
        if(this.props['data-type'] == 'SELECT')
        {
            selectBtn = (
                <button className="btn btn-default" type="button" data-toggle="modal" data-target={"#dataLinkModel" + id} ><i className="fa fa-link"></i>选择数据</button>
            );
        }
        return (
            <div>
                <div className="btn-group">
                    <button className="btn btn-default" type="button" data-toggle="modal" data-target={'#dataInputModel' + id} ><i className="fa fa-pencil"></i>手动输入</button>
                    <button className="btn btn-default" type="button" data-toggle="modal" data-target={"#dataFileModel" + id} ><i className="fa fa-file"></i>上传文件</button>
                    {selectBtn}
                </div>
                <div aria-hidden="true" aria-labelledby="dataInputModel" role="dialog" tabIndex="-1" id={"dataInputModel" + id} className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                                <h4 className="modal-title">手动输入</h4>
                            </div>
                            <div className="modal-body">
                                <h4>数据标签</h4>
                                <input id={'dataInputTag_' + this.state.id} type="text" className="form-control" ></input>
                                <h4>UDX数据</h4>
                                <textarea id={'dataInput_' + this.state.id} className="form-control" style={{height:'200px'}} ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button id={'btn_input_ok' + id} type="button" className="btn btn-success" onClick={this.onInputSubmit} >提交</button>
                                <button id={'btn_input_close' + id} type="button" className="btn btn-default" data-dismiss="modal" >关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div aria-hidden="true" aria-labelledby="dataFileModel" role="dialog" tabIndex="-1" id={"dataFileModel" + id} className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                                <h4 className="modal-title">上传文件</h4>
                            </div>
                            <div className="modal-body">
                                <h4>数据标签</h4>
                                <input id={'fileuploaderTag_' + this.state.id} type="text" className="form-control" ></input>
                                <h4>数据文件</h4>
                                <div id={'fileuploader_' + this.state.id}>Upload</div>
                            </div>
                            <div className="modal-footer">
                                <button id={'btn_file_ok' + id} type="button" className="btn btn-success" onClick={this.onFileSubmit} >提交</button>
                                <button id={'btn_file_close' + id} type="button" className="btn btn-default" data-dismiss="modal" >关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div aria-hidden="true" aria-labelledby="dataLinkModel" role="dialog" tabIndex="-1" id={"dataLinkModel" + id} className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                                <h4 className="modal-title">链接数据</h4>
                            </div>
                            <div className="modal-body">
                                <DataSelectTabel source="/geodata/json/all" ref="selectedTB" data-id={id} />
                                <br />
                                <br />
                                <br />
                                <br />
                            </div>
                            <div className="modal-footer">
                                <button id={'btn_link_ok' + id} type="button" className="btn btn-success" onClick={this.onSelectSubmit} >确认</button>
                                <button id={'btn_link_close' + id} type="button" className="btn btn-default" data-dismiss="modal" >关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DataUploader;