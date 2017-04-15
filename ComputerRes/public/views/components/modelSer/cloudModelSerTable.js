/**
 * Created by Franklin on 2017/3/30.
 */
var React = require('react');
var Axios = require('axios');

var CloudModelSerTable = React.createClass({
    getInitialState : function () {
        return {
            loading : true,
            err : null,
            data : null,
            init : false
        };
    },

    componentDidMount : function () {
        this.refresh();
    },

    refresh : function () {
        Axios.get(this.props['data-source']).then(
            data => {
                if(data.data.result == 'err')
                {
                    this.setState({loading : false, err : data.data.message});
                }
                else
                {
                    this.setState({loading : false, err : false, data : data.data.data});
                    //初始化完成
                    $('#model-gate-table').dataTable(
                        {
                            //数据URL
                            "data": "/modelser/json/rmtall",
                            //载入数据的时候是否显示“正在加载中...”
                            "processing": true,
                            //是否显示分页
                            "bPaginate": true,
                            //每页显示条目数
                            "bLengthChange": true,
                            //初始化显示条目数
                            "iDisplayLength" : 10,
                            //排序
                            "bSort": true,
                            //排序配置
                            "aaSorting": [[2, "desc"]],
                            //自适应宽度
                            "bAutoWidth": true,
                            //多语言配置
                            "oLanguage": {
                                "sLengthMenu": "每页显示 _MENU_ 条记录",
                                "sZeroRecords": "对不起，查询不到任何相关数据",
                                "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                                "sInfoEmtpy": "找不到相关数据",
                                "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
                                "sProcessing": "正在加载中...",
                                "sSearch": "搜索",
                                //多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
                                "sUrl": "",
                                "oPaginate": {
                                    "sFirst":    "第一页",
                                    "sPrevious": " 上一页 ",
                                    "sNext":     " 下一页 ",
                                    "sLast":     " 最后一页 "
                                }
                            }
                        }
                    );
                }
            },
            err => {
                this.setState({loading : false, err : err});
            }
        );
    },

    render : function() {
        if(this.state.loading){
            return (
                <span>加载中...</span>
            );
        }
        if(this.state.err) {
            return (
                <span>Error:{JSON.stringify(this.state.err)}</span>
            );
        }
        var modelItems = this.state.data.modelArray.map(function(item){
            var platform = null;
            if(item.model_platform == 'Windows'){
                platform = (<span className="label label-info"><i className="fa fa-windows"> </i> windows</span>);
            }
            var modelName = '';
            if(item.model_name.length > 30) {
                modelName = item.model_name.substr(0, 30);
                modelName += '...';
            }
            else{
                modelName = item.model_name;
            }
            return (
                <tr key={item.model_id}>
                    <td>{modelName}</td>
                    <td>{item.model_author}</td>
                    <td>{platform}</td>
                    <td>未下载</td>
                    <td>
                        <button className="btn btn-info btn-xs"><i className="fa fa-book"> </i>详情</button>&nbsp;
                        <button className="btn btn-default btn-xs"><i className="fa fa-download"> </i>下载</button>&nbsp;
                    </td>
                </tr>
            );
        });
        return (
            <div>
                <div>
                    <table className="display table table-bordered table-striped" id="model-gate-table">
                        <thead>
                            <tr>
                                <th>模型服务名称</th>
                                <th>作者</th>
                                <th>平台</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modelItems}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div aria-hidden="true" aria-labelledby="gateGateModelDetail" role="dialog" tabIndex="-1" id="diaDetail" className="modal fade">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                                    <h4 className="modal-title">服务</h4>
                                </div>
                                <div className="modal-body">

                                </div>
                                <div className="modal-footer">
                                    <button id="btn_ok" type="button" className="btn btn-default" data-dismiss="modal" >关闭</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
});

module.exports = CloudModelSerTable;