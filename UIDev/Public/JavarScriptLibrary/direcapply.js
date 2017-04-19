// JavaScript Document

		//页面：手动报名
	var TourApp_toursys;
	//加载赛事的项目
	function LoadTourContent()
	{
		TourApp_toursys=localStorage.getItem("Current_TourSys");
		//alert(TourApp_toursys);
		$.ajax({
			type:"get",
			url:"http://localhost:46755////BackService/TourMgm.ashx",
			data:{typename:"GetTourContents",sysno:TourApp_toursys},
			success:function(data){
				data=eval("("+data+")");
				if(data.code==0)
				{
					var cont=data.data;
					
					if(cont.length>0)
					{						
						for(var i=0;i<cont.length;i++)
						{
							$("#selContent").append("<option value=\""+cont[i].id+"\">"+cont[i].ContentName+"</option>");	
						}
					}
				}
			}
		});
	}	
	
	//添加报名人员信息
	var Apply_PlayerArr=[];
	
	function AddApply()
	{
		var playername=$("#tbPlayer").val();
		var playersys = $("#playerId").val();
		var parternername=$("#tbParterner").val();
		var parternersys=$("#parternerId").val();		
		var playerTelephone = $("#playerPhone").val();
		var parternerTelephone = $("#parternerPhone").val();
		//验证人员信息
		if($("#selContent").val()=='-1')
		{
			alert('请选择项目');
			return;
		}
		

		if (playername.length == 0 || playersys.length == 0)
		{
		    alert('请输入队员名字和身份证');
		    return;
		}

		if (playerTelephone.length <= 0)
		{
			if(confirm(playername+'还未注册，注册需要填写电话号码，是否为其注册新账号？'))
			{
			    playerTelephone = prompt("请输入用户电话号码！", "");
			    console.log("telephone", playerTelephone);
			    if (checkPhone(playerTelephone))
				{
					$.ajax({
						type:"post",
						async:false,
						url:"http:wetennis.cn:83/WebService/WeMember.ashx",
						data: { typename: "RapidRegister", name: $("#tbPlayer").val(), tele: playerTelephone },
						success:function(data){
							alert(data);
						}
					});
				}
				else
				{
					alert('输入电话有误');
					return;
				}
			}
			else
			{
				return;
			}
		}
		var contName=$("#selContent").val();
		if(contName.indexOf('双')>0)
		{
		   
		    if (parternername.length == 0 || parternersys.length == 0) {
		        alert('请输入搭档名字和身份证');
		        return;
		    }

		    if (parternerTelephone.length <= 0) {
		        if (confirm(parternername + '还未注册，注册需要填写电话号码，是否为其注册新账号？')) {
		            parternerTelephone = prompt("请输入用户电话号码！", "");
		            if (checkPhone(parternerTelephone)) {
		                $.ajax({
		                    type: "post",
		                    async: false,
		                    url: "http:wetennis.cn:83/WebService/WeMember.ashx",
		                    data: { typename: "RapidRegister", name: $("#parternername").val(), tele: parternerTelephone },
		                    success: function (data) {
		                        alert(data);
		                    }
		                });
		            }
		            else {
		                alert('输入电话有误');
		                return;
		            }
		        }
		        else {
		            return;
		        }
		    }
		}
		
	    //已json的形式来添加
		var item={ 
		           TourSys: TourApp_toursys,
		           ContentId: $("#selContent").val(),
		           ContentName: $("#selContent").find("option:selected").text(),
		           PlayerIDCard: $("#playerId").val(),
		           PlayerName: $("#tbPlayer").val(),
		           PlayerTelePhone: playerTelephone,
		           PartIDCard: $("#parternerId").val(),
		           PartName: $("#tbParterner").val(),
		           PartTelePhone: parternerTelephone,
		};
		Apply_PlayerArr.push(item);//添加已选择的信
		//localStorage.setItem("temp_Applier",JSON.stringify(Apply_PlayerArr));
		//添加人员信息		
		loadPlayer();
		
		//清空人员填写
		$("#tbPlayer").val("");
		$("#playerId").val("");
		$("#tbParterner").val("");
		$("#parternerId").val("");
	    $("#playerPhone").val("");
	    $("#parternerPhone").val("");
	}
	
	//加载选择结果
	function loadPlayer()
	{
	    var html = '<table><tr><th>序号</th><th>项目</th><th>球员</th><th>身份证</th><th>电话</th><th>操作</th></tr>';
		for(var i=0;i<Apply_PlayerArr.length;i++)
		{			
		    if (Apply_PlayerArr[i].ContentName.indexOf('双') > 0)
			{
		        html += '<tr><td>' + (i + 1) + '</td><td>' + Apply_PlayerArr[i].ContentName + '</td><td>' + Apply_PlayerArr[i].PlayerName + ',' + Apply_PlayerArr[i].PartName + '</td><td>' + Apply_PlayerArr[i].PartIDCard + '</td><td>' + Apply_PlayerArr[i].PartTelePhone + '</td><td><a href="javascript:void" onclick="DeleteApp(\'' + i + '\')">删除</a></td></tr>';
			}
			else
			{
		        html += '<tr><td>' + (i + 1) + '</td><td>' + Apply_PlayerArr[i].ContentName + '</td><td>' + Apply_PlayerArr[i].PlayerName + '</td><td>' + Apply_PlayerArr[i].PlayerIDCard + '</td><td>' + Apply_PlayerArr[i].PlayerTelePhone + '</td><td><a href="javascript:void" onclick="DeleteApp(\'' + i + '\')">删除</a></td></tr>';
			}	
		}
		html+='</table>';
		$("#selres").html(html);
	}
	
	//加载选择结果
	function loadAddResult()
	{
	    var html = '<table><tr><th>序号</th><th>项目</th><th>球员</th><th>身份证</th><th>电话</th><th>操作</th></tr>';
		for(var i=0;i<Apply_PlayerArr.length;i++)
		{			
		    if (Apply_PlayerArr[i].ContentName.indexOf('双') > 0)
			{
		        html += '<tr><td>' + (i + 1) + '</td><td>' + Apply_PlayerArr[i].ContentName + '</td><td>' + Apply_PlayerArr[i].PlayerName + ',' + Apply_PlayerArr[i].PartName + '</td><td>' + Apply_PlayerArr[i].PartIDCard + '</td><td>' + Apply_PlayerArr[i].PartTelePhone + '</td><td>' + Apply_Result[i].status + '</td></tr>';
			}
			else
			{
		        html += '<tr><td>' + (i + 1) + '</td><td>' + Apply_PlayerArr[i].ContentName + '</td><td>' + Apply_PlayerArr[i].PlayerName + '</td><td>' + Apply_PlayerArr[i].PlayerIDCard + '</td><td>' + Apply_PlayerArr[i].PlayerTelePhone + '</td><td>' + Apply_Result[i].status + '</td></tr>';
			}	
		}
		html+='</table>';
		$("#selres").html(html);
	}
	
	
	function DeleteApp(id)
	{
		//删除id,利用slice和contact
		Apply_PlayerArr=Apply_PlayerArr.slice(0,id).concat(Apply_PlayerArr.slice(id+1,Apply_PlayerArr.length));
		loadPlayer();
	}

	var Apply_Cont_Type;
	//选定项目
	function Apply_SelectCont()
	{
	    Apply_PlayerArr = [];//清空数组
		var seltxt=$("#selContent").find("option:selected").text();
		var selval=$("#selContent").val();
		//判断是否显示搭档
		if(seltxt.indexOf('双')>0)
		{
			//双打项目，显示搭档
			Apply_Cont_Type='double';
			$("#partner").show();
		}
		else
		{
			Apply_Cont_Type='single';
			$("#partner").hide();
		}		
	}

var Apply_Result;
	//5-4-1
	//向服务器提交已经添加的人员信息
	function SubmitApplyList()
	{		
	    var res = JSON.stringify(Apply_PlayerArr);
	
		$.ajax({
			type:"POST",
			async: "false",
			url: "http://localhost:46755////BackService/TourMgm.ashx",
			data: { typename: "AddDirectApply", ApplyList: res },
			success:function(data)
			{
				alert(data);
				var res=eval("("+data+")");
				if(res.code==0)
				{
					//$("#FunctFRight",window.parent.document).hide();	
					//将添加结果返回到添加清单上面
				    Apply_Result = res.data;
				    console.log("ApplyZ_Result", Apply_Result);
					loadAddResult();
					$("#BeforeSub").hide();
					$("#AfterSub").show();
				}
			}
		});
	}


	 function likeComment() {
            var reqdata = { "id": "100", "userId": "city02","type":"event" };
            $.ajax({
                type: "POST",
                contentType: "application/json;char-set=utf-8",
                url: "http://localhost:46755////API/FEservice.ashx?method=eventCommentLike",
                data: JSON.stringify(reqdata),
                success: function (data) {
                    alert(data);
                }
            });
        }
	
	//继续添加，将此前的值清空
	function KeepOnAdd()
	{
		Apply_Result='';
		Apply_PlayerArr=[];
		loadAddResult();
		$("#BeforeSub").show();
		$("#AfterSub").hide();
	}
	
	//查看报名情况
	function SeeApplicants()
	{
		var toursys=location.href.split('=')[1];
		location.href='5-4-2.html?sysno='+toursys;
	}