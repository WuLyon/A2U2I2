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
			url:"http://wetennis.cn:83/BackService/TourMgm.ashx",
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
		var playersys=$("#playerId").val();
		var parternername=$("EtbParterner").val();
		var parterner=$("#parternerId").val();		
		
		//验证人员信息
		if($("#selContent").val()=='-1')
		{
			alert('请选择项目');
			return;
		}
		
		if(playersys.length<=0)
		{
			if(confirm(playername+'还未注册，注册需要填写电话号码，是否为其注册新账号？'))
			{
				var Telephone=prompt("请输入用户电话号码！","");
				if(checkPhone(Telephone))
				{
					$.ajax({
						type:"post",
						async:false,
						url:"http:wetennis.cn:83/WebService/WeMember.ashx",
						data:{typename:"RapidRegister",name:$("#tbPlayer").val(),tele:Telephone},
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
		if(parterner.length<=0)
		{
			if(confirm(parternername+'还未注册，注册需要填写电话号码，是否为其注册新账号？'))
			{
				var Telephone=prompt("请输入用户电话号码！","");
				if(checkPhone(Telephone))
				{
					$.ajax({
						type:"post",
						async:false,
						url:"http:wetennis.cn:83/WebService/WeMember.ashx",
						data:{typename:"RapidRegister",name:$("#parternername").val(),tele:Telephone},
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
		}
		
		//已json的形式来添加
		var item={ 
				   TOURSYS:TourApp_toursys,
				   CONTENTID:$("#selContent").val(),
				   contentName:$("#selContent").find("option:selected").text(),
				   MEMBERID:$("#playerId").val(),
				   playerName:$("#tbPlayer").val(),
				   PATERNER:$("#parternerId").val(),
				   parternerName:$("#tbParterner").val()
				   //,EXT3: ClubInfo.EXT3
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
	}
	
	//加载选择结果
	function loadPlayer()
	{
		var html='<table><tr><th>序号</th><th>项目</th><th>球员</th><th>操作</th></tr>';
		for(var i=0;i<Apply_PlayerArr.length;i++)
		{			
			if(Apply_PlayerArr[i].contentName.indexOf('双')>0)
			{
			html+='<tr><td>'+(i+1)+'</td><td>'+Apply_PlayerArr[i].contentName+'</td><td>'+ Apply_PlayerArr[i].playerName+','+Apply_PlayerArr[i].parternerName+'</td><td><a href="javascript:void" onclick="DeleteApp(\''+i+'\')">删除</a></td></tr>';		
			}
			else
			{
			html+='<tr><td>'+(i+1)+'</td><td>'+Apply_PlayerArr[i].contentName+'</td><td>'+ Apply_PlayerArr[i].playerName+Apply_PlayerArr[i].playerName+'</td><td><a href="javascript:void" onclick="DeleteApp(\''+i+'\')">删除</a></td></tr>';	
			}	
		}
		html+='</table>';
		$("#selres").html(html);
	}
	
	//加载选择结果
	function loadAddResult()
	{
		var html='<table><tr><th>序号</th><th>项目</th><th>球员</th><th>操作</th></tr>';
		for(var i=0;i<Apply_PlayerArr.length;i++)
		{			
			if(Apply_PlayerArr[i].contentName.indexOf('双')>0)
			{
			html+='<tr><td>'+(i+1)+'</td><td>'+Apply_PlayerArr[i].contentName+'</td><td>'+ Apply_PlayerArr[i].playerName+','+Apply_PlayerArr[i].parternerName+'</td><td>'+Apply_Result[i].status+'</td></tr>';		
			}
			else
			{
			html+='<tr><td>'+(i+1)+'</td><td>'+Apply_PlayerArr[i].contentName+'</td><td>'+ Apply_PlayerArr[i].playerName+Apply_PlayerArr[i].playerName+'</td><td>'+Apply_Result[i].status+'</td></tr>';	
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
		likeComment();
		return;
		var res=JSON.stringify(Apply_PlayerArr);
		res='{"TOURSYS":"FA64C51C92474D7884F20A573BBDD6DB","CONTENTID":"5ed6782d91014331b150d230c685d463","contentName":"男子单打","MEMBERID":"9ef3d426-7e09-4bdb-87e3-e10eaddaa5b5","playerName":"门张茂","PATERNER":"","parternerName":""}';
		res={"TOURSYS":"FA64C51C92474D7884F20A573BBDD6DB"}
		
		$.ajax({
			type:"POST",
			contentType:"application/json;charset=utf-8",
			//url:"http://wetennis.cn:83/BackService/TourMgm.ashx?typename=AddDirectApply2",
			url:"http://wetennis.cn:83/API/FEservice.ashx?method=directApply",					
			data:JSON.stringify(res),
			success:function(data)
			{
				alert(data);
				var res=eval("("+data+")");
				if(res.code==0)
				{
					//$("#FunctFRight",window.parent.document).hide();	
					//将添加结果返回到添加清单上面
					Apply_Result=res.data;
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
                url: "http://wetennis.cn:83/API/FEservice.ashx?method=eventCommentLike",
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