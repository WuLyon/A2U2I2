// JavaScript Document
$(document).ready(function(){
			//会员
			$("#tbPlayer").autocomplete("http://localhost:46755/BackService/AutoComp.ashx?typename=Auto_Member", {//默认参数名为q
                    width: 200,//指定下拉框的宽度. Default: input元素的宽度；
                    dataType: "json",		
					parse: function (data) {//ajax 返回值是json需要重写
                        //var list1 =eval("("+data+")");
						var list=data.data;
                        var parsed = [];
                        for (var i = 0; i < list.length; i++) {
                            parsed[i] = {
                                data: list[i],
                                value: list[i].SYSNO,
                                result: list[i].USERNAME
                            };
                        }
                        return parsed;
                    },//处理ajax 返回的值
                    formatItem: function (row, i, max) {
                        return row.USERNAME;
                    },//为每个要显示的项目使用高级标签.即对结果中的每一行都会调用这个函数,返回值将用LI元素包含显示在 下拉列表中
                    formatMatch: function (row, i, max) {
                        return row.USERNAME;
                    }//对每一行数据使用此函数格式化需要查询的数据格式. 返回值是给内部搜索算法使用的                    
                });			
			 $("#tbPlayer").result(function (e, item) {
                    $("#playerId").val(item.SYSNO);
                });

		//搭档
		$("#tbParterner").autocomplete("http://localhost:46755/BackService/AutoComp.ashx?typename=Auto_Member", {//默认参数名为q
                    width: 200,//指定下拉框的宽度. Default: input元素的宽度；
                    dataType: "json",	
					parse: function (data) {//ajax 返回值是json需要重写
                        //var list1 =eval("("+data+")");
						var list=data.data;
                        var parsed = [];
                        for (var i = 0; i < list.length; i++) {
                            parsed[i] = {
                                data: list[i],
                                value: list[i].SYSNO,
                                result: list[i].USERNAME
                            };
                        }
                        return parsed;
                    },//处理ajax 返回的值
                    formatItem: function (row, i, max) {
                        return row.USERNAME;
                    },//为每个要显示的项目使用高级标签.即对结果中的每一行都会调用这个函数,返回值将用LI元素包含显示在 下拉列表中
                    formatMatch: function (row, i, max) {
                        return row.USERNAME;
                    }//对每一行数据使用此函数格式化需要查询的数据格式. 返回值是给内部搜索算法使用的                    
                });
				  $("#tbParterner").result(function (e, item) {
                    $("#parternerId").val(item.SYSNO);
                });
				
				//从报名人员中添加种子
				
				  
				  
		});

