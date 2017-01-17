function validatLoginTime()
{
	//alert('check login time');
	var lastLoginTime=localStorage.getItem("Last_LoginTime");	
	var exp = new Date();
	var nowtime=exp.getTime();
	var abs=nowtime-lastLoginTime;
	//判断间隔是否超过两天
	var gap=1000*60*60*24;
	if(abs>gap)
	{
		//超出2天，重新登陆
		location.href='NewFront/login.html';
	}
}


//赛事主页导航方法
function Goto(obj)
	{		
		var gotourl;
		
		switch(obj.innerHTML)
		{
			case "全部赛事":				
				$("#navpal").children().removeClass();
				obj.parentNode.parentNode.className='hv';
				gotourl='Pages/5-1.html';
				break;
			case "筹备赛事":
				$("#navpal").children().removeClass();
				obj.parentNode.parentNode.className='hv';
				gotourl='Pages/5-2.html';
				break;
			case "赛事报名":
				$("#navpal").children().removeClass();
				obj.parentNode.parentNode.className='hv';
				gotourl='Pages/5-4.html';
				break;
			case "结束报名":
				$("#navpal").children().removeClass();
				obj.parentNode.parentNode.className='hv';
				gotourl='Pages/5-7.html';
				break;
			case "赛事签表":
				$("#navpal").children().removeClass();
				obj.parentNode.parentNode.className='hv';
				gotourl='Pages/JQ_5-3.html';
				break;
			case "资源分配":
				$("#navpal").children().removeClass();
				obj.parentNode.parentNode.className='hv';
				gotourl='Pages/JQ_5-5.html';
				break;
			case "正在进行":
				$("#navpal").children().removeClass();
				obj.parentNode.parentNode.className='hv';
				gotourl='Pages/5-6.html';
				break;
			case "已完成":
				$("#navpal").children().removeClass();
				obj.parentNode.parentNode.className='hv';
				gotourl='Pages/5-8.html';
				break;				
		}	
		
		//document.getElementById('hl_functionbody').src=gotourl;	
		try
		{
			$("#hl_functionbody").attr("src",gotourl);
		}
		catch(error)
		{
			$("#hl_functionbody",window.parent.document).attr("src",gotourl);
		}
		
	}
	
	function GotobyName(Name)
	{		
		var gotourl;
		switch(Name)
		{
			case "全部赛事":				
				$("#nav_all",window.parent.document).click();
				break;
			case "筹备赛事":
				$("#nav_status0",window.parent.document).click();
				break;
			case "赛事报名":
			$("#nav_status1",window.parent.document).click();
				break;
			case "结束报名":	
				$("#nav_status2",window.parent.document).click();
				break;
			case "赛事签表":	
				$("#nav_status3",window.parent.document).click();
				break;
			case "资源分配":
				$("#nav_status4",window.parent.document).click();
				break;
			case "正在进行":
				$("#nav_status5",window.parent.document).click();
				break;
			case "已完成":
				$("#nav_status6",window.parent.document).click();
				break;				
		}	
	}

// JavaScript Document
//子页面调用父页面的右侧弹出框
	function showFloatRight(title,url)
	{
		$("#FunctFRight",window.parent.document).show();
		$("#fr_title",window.parent.document).html(title);
		$("#FR_Content_frm",window.parent.document).attr("src",url);
	}

//Public/Index.html
//加载用户信息
function loadMemberInfo()
{
	//验证cookie，判断cookie是否过期，若过期，则跳转到登陆页面

	//加载用户信息
	var MemberInfo;
	MemberInfo=localStorage.getItem('Club_Basic');//从本地信息获取俱乐部基础信息
	//MemberInfo={"thumbnail":"http://wetennis.cn/images/Head/89F78FFA-276E-4768-BE49-A953B645D362.jpg","clubname":"中国网球协会"};//以json格式存储俱乐部信息
	MemberInfo=eval("("+MemberInfo+")");
	//alert(MemberInfo.clubname);
	if(MemberInfo)
	{			
		document.getElementById('Clubimg').src=MemberInfo.EXT2;
		document.getElementById('lbl_ClubName').innerHTML=MemberInfo.CLUBNAME;
	}
	else
	{
		//当前处于未登陆状态，返回登陆
		location.href='NewFront/Login.html';
	}
}

function toggleFloatLeft()
{
	//alert('head image clicked');
	$(".floatleft_Back").toggleClass("shown");
}

//修改俱乐部信息
var sclubinfo=localStorage.getItem('Club_Basic');
var ClubInfo=eval("("+sclubinfo+")");	
	//加载俱乐部信息
	function LoadClubInfo()	{		
		$("#lblClubName").html(ClubInfo.CLUBNAME);
		$("#tbClubName").val(ClubInfo.CLUBNAME);
		$("#lblClubDesc").html(ClubInfo.DESCRIPTION);
		$("#tbClubDesc").val(ClubInfo.DESCRIPTION);
		$("#lblClubAddr").html(ClubInfo.EXT1);
		$("#tbClubAddr").val(ClubInfo.EXT1);
		$("#imgClub").attr("src",ClubInfo.EXT2);
	}
	



function modifyfst()
{
	$("#modify1").hide();
	$("#save1").show();
	$("#lblClubName").hide();
	$("#tbClubName").show();
}

function savefst()
{
	var NewName=$("#tbClubName").val();
	$.ajax({
		   type:"POST",
		   async:"false",
		   url:"http://localhost:46755/WebService/WeClub.ashx",
		   data:{typename:"UpdateClubField",fieldname:"ClubName",keyvalue:NewName,clubsys:ClubInfo.SYSNO},
		   success:function(data){
			   	//alert(JSON.stringify(data));
				var res=eval("("+data+")");
				if(res.code==0)
				{
					if(res.data.status=='success')
					{
						$("#modify1").show();
						$("#save1").hide();
						
						$("#lblClubName").html(NewName);
						$("#lblClubName").show();
						$("#tbClubName").hide();
						
					}
					else
					{
						alert('修改失败');	
					}
				}
				else
				{
					alert(res.errormsg);	
				}
			}
	});
	
	
}

function modifysnd()
{
	$("#modify2").hide();
	$("#save2").show();
	$("#lblClubDesc").hide();
	$("#tbClubDesc").show();
}

function savesnd()
{
	var NewDesc=$("#tbClubDesc").val();
	$.ajax({
		 type:"POST",
		   async:"false",
		   url:"http://localhost:46755/WebService/WeClub.ashx",
		   data:{typename:"UpdateClubField",fieldname:"Description",keyvalue:NewDesc,clubsys:ClubInfo.SYSNO},	  
		   success:function(data){
				var res=eval("("+data+")");   
				if(res.code==0)
				{
					if(res.data.status=='success')
					{
						$("#modify2").show();
						$("#save2").hide();
						$("#lblClubDesc").html(NewDesc);
						$("#lblClubDesc").show();
						$("#tbClubDesc").hide();
					}
					else
					{
						alert('修改失败');	
					}
				}
				else
				{
					alert(res.errormsg);	
				}
		   }
	});
	
	
}

function modifytrd()
{
	$("#modify3").hide();
	$("#save3").show();
	$("#lblClubAddr").hide();
	$("#tbClubAddr").show();
}

function savetrd()
{
	var NewAddr=$("#tbClubAddr").val();
	$.ajax({
		type:"POST",
		async:"false",
		url:"http://localhost:46755/WebService/WeClub.ashx",
		data:{typename:"UpdateClubField",fieldname:"EXT1",keyvalue:NewAddr,clubsys:ClubInfo.SYSNO},
		success:function(data){
			var res=eval("("+data+")");	
			if(res.code==0)
			{
				if(res.data.status=='success')
				{
					$("#modify3").show();
					$("#save3").hide();
					$("#lblClubAddr").show();
					$("#tbClubAddr").hide();
				}
				else
				{
					alert('修改失败');
				}
			}
			else
			{
				alert(res.errormsg);	
			}
		}
	});	
}

function modifyfth()
{
	$("#modify4").hide();
	$("#clubImgUp").show();
	$("#save4").show();
}

		function UpdateImg()
		{
			var ClubInfo=eval("("+localStorage.getItem('Club_Basic')+")");	
			//判断是否上传了图片
			var newpic=document.getElementById('clubImgUp').value;
			if(newpic!='')			
			{
				var imgurl=PictureUpload('clubImgUp','imgClub','myCanvas');			
				$.ajax({
					type:"POST",
					async:"false",
					url:"http://localhost:46755/WebService/WeClub.ashx",
					data:{typename:"UpdateClubField",fieldname:"EXT2",keyvalue:imgurl,clubsys:ClubInfo.SYSNO},
					success:function(data){
						var res=eval("("+data+")");
						if(res.code==0)
						{
							if(res.data.status=='success')
							{
								$("#clubImgUp").hide();
								$("#save4").hide();
								alert('上传成功，重新登陆后生效');
							}
						}
					}
				});
			}//end of check pic upload
			else
			{
				alert('请选择要上传的图片');	
			}			
		}
		
		//修改赛事背景图
		function UpdateTourBack()
		{
			var imgurl=PictureUpload('clubImgUp','tourback','myCanvas');	
			//alert(imgurl);
			$("#tbimgurl").val(imgurl);


			
		}
		
//赛事管理
//赛事列表
	
	//Tour_List="[{toursys:"123",tourimg:"url1",tourtypeimg:"url2",tourname:"ausopen",tourdate:"20160427",touraddr:"崇州市长城路",status:"3",statusdesc:"抽签完毕",host:"",asso-host:"",advertise:[{adverid:"adver-id",advername:"",adverimg:"",adverurl:""}],tourcontrol:[{key:"Delete",name:"删除"}]}]";
	
	function LoadTourlistData(_status)
	{
		$.ajax({
			type:"GET",
			async:"true",
			//url:"http://localhost:46755/WebService/TourMgm.ashx",
			url:"http://localhost:46755/BackService/TourMgm.ashx",
			data:{typename:"GetTourList",ClubSys:ClubInfo.SYSNO,status:_status,tourtype:"Club"},
			success:function(data){	
				//alert(data);
				localStorage.setItem("tourList",data);
				Tour_LoadTourlist();
			}
		});	
	}
	
		
	function Tour_LoadTourlist()
	{		
		var html='';
		var Tour_List=localStorage.getItem("tourList");
		var tourl=eval("("+Tour_List+")");
		var tours=tourl.data;
		if(tours.length>0)
		{
			for(var i=0;i<tours.length;i++)
			{
				html+='<ul class="tourcell" id="'+tours[i].TourSys+'">';
				html+='<li class="tourimgpos"><img src="'+tours[i].TourImg+'" class="tourlevelimg" /></li>';
				html+='<li class="levelimgpos"><img src="'+tours[i].TourTypeImg+'" alt="公开赛"></li>';
				html+='<li class="con1"><ul class="con1ul">';
					html+='<li >'+tours[i].TourName+'</li>';
					html+='<li><img src="../img/tour-time.jpg" class="fontimg" alt="比赛日期">'+tours[i].TourDate+'</li>';
					html+='<li><img src="../img/tour-addrs.jpg" class="fontimg" alt="比赛地点">'+tours[i].TourAddress+'</li>';
				html+='</ul></li><li class="con2"><ul class="con2ul">';
					html+='<li>状态:'+tours[i].StatusDesc+'</li>';
					html+='<li>协助单位</li>';
				html+='</ul></li>';
				
				html+='<li class="toursetbtn"><input type="button" value="设置" onclick="Set(\''+tours[i].TourSys+'\')"/></li>';
				html+='<li class="toursetbtn_a hidden" id="'+tours[i].TourSys+'btn"><ul class="Setting_Btn"><li><a href="javascript:void" onclick="Delete(\''+tours[i].TourSys+'\')">删除</a></li>';
				var TourCtr=tours[i].Tour_Controls;
				if(TourCtr.length>0)
				{
					for(var j=0;j<TourCtr.length;j++)
					{						
						html+='<li><a href="'+TourCtr[j].ControlUrl+'" onclick="'+TourCtr[j].ControlFun+'(\''+tours[i].TourSys+'\')">'+TourCtr[j].ControlName+'</a></li>';
					}
				}
				//是否添加禁用
				var TourSta=parseInt(tours[i].Status);
				if(TourSta>0)
				{
					html+='<li><a href="javascript:void" onclick="Disable(\''+tours[i].TourSys+'\')">禁用</a></li>';
					html+='<li><a href="javascript:void" onclick="Rollback(\''+tours[i].TourSys+'\')">状态回滚</a></li>';
				}
				html+='</ul></li>';
				html+='</ul>'
			}
			
			$("#tourlist").html(html);
		}
	}
	
	function HideSetbtn()
	{
		//$(".toursetbtn_a").hide();	
	}
		
	//赛事管理按钮
	function Set(toursys)
	{
		var id='#'+toursys+'btn';
		$(id).toggleClass("shown");
	}
	
	//删除赛事
	function Delete(toursys)
	{
		if(confirm('删除赛事之后，将无法恢复！请确认是否删除赛事？'))
		{
			var url=location.href;
			$.get('http://localhost:46755/BackService/TourMgm.ashx',{typename:"UpdateTourStatus",sysno:toursys,status:"99"},function(data){
				location.href=url;
			});	
		}
	}
	
	function Enable(toursys)
	{
		var url=location.href;
		$.get('http://localhost:46755/BackService/TourMgm.ashx',{typename:"UpdateTourStatus",sysno:toursys,status:"1"},function(data){
			location.href=url;
		});		
	}
	
	function Disable(toursys)
	{
		if(confirm('请确认是否禁用赛事？'))
		{
			var url=location.href;
			$.get('http://localhost:46755/BackService/TourMgm.ashx',{typename:"UpdateTourStatus",sysno:toursys,status:"-1"},function(data){
				location.href=url;
			});	
		}	
	}
	
	//管理赛事签表
	function  EditSign(toursys)
	{
		localStorage.setItem("Current_TourSys",toursys);
		var url='Pages/5-3-nav.html?sysno='+toursys;		
		showFloatRight('管理赛事签表',url);
	}

	//管理赛事积分，5-8
	function SeeTourScore(toursys)
	{
		localStorage.setItem("Current_TourSys",toursys);
		var url='Pages/5-8-1.html?sysno='+toursys;		
		showFloatRight('赛事积分管理',url);
	}
	
	//结束签表分配
	function EndSign(toursys)
	{
			$.get('http://localhost:46755/BackService/TourMgm.ashx',{typename:"UpdateTourStatus",sysno:toursys,status:"4"},function(data){
			GotobyName('资源分配');
		});	
	}
	
	
	//赛事状态回滚
	function Rollback(toursys)
	{
		if(confirm('状态回滚，会让赛事回到之前的状态，并且会导致已产生的数据丢失，是否继续状态回滚？'))
		{
			//alert(toursys);
			var url=location.href;
			$.get('http://localhost:46755/BackService/TourMgm.ashx',{typename:"RollBackTour",sysno:toursys},function(data){
				//alert(data);
				var res=eval("("+data+")");
				if(res.code==0)
				{
				location.href=url;
				}
			});
		}
	}
	
	//开始报名
	function StartApply(toursys)
	{
		$.get('http://localhost:46755/BackService/TourMgm.ashx',{typename:"UpdateTourStatus",sysno:toursys,status:"1"},function(data){
			GotobyName('赛事报名');
		});		
	}
	
	function Manage(toursys)
	{
		//goto url
		var url=''+toursys;
		showFloatRight('管理赛事',url);
	}
	
	function ModifyTourInfo(toursys)
	{
		localStorage.setItem("Current_TourSys",toursys);
		var url='Pages/5-1-2-1.html?sysno='+toursys;		
		showFloatRight('修改赛事基本信息',url);
	}
	//赛事直通报名
	function  DirectApply(toursys)
	{
		localStorage.setItem("Current_TourSys",toursys);
		var url='Pages/5-4-1.html?sysno='+toursys;		
		showFloatRight('赛事直通车报名',url);
	}
	
	//查看赛事报名
	function CheckApply(toursys)
	{
		localStorage.setItem("Current_TourSys",toursys);
		var url='Pages/5-4-2.html?sysno='+toursys;		
		showFloatRight('查看赛事报名',url);	
	}

	//维护比赛结果
	function MatchResult(toursys)
	{
		localStorage.setItem("Current_TourSys",toursys);
		var url='Pages/5-6-1.html';		
		showFloatRight('比赛结果维护',url);	
	}

	function EndTour(toursys)
	{
		if(confirm('是否结束赛事？'))
		{			
			$.get('http://localhost:46755/BackService/TourMgm.ashx',{typename:"UpdateTourStatus",sysno:toursys,status:"6"},function(data){
				GotobyName('已完成');
			});	
		}
	}
	
	//结束赛事报名
	function EndApply(toursys)
	{
		if(confirm('是否结束报名？'))
		{			
			$.get('http://localhost:46755/BackService/TourMgm.ashx',{typename:"UpdateTourStatus",sysno:toursys,status:"2"},function(data){
				GotobyName('赛事签表');
			});	
		}
	}

	//重新设置签表,2016-09-19
	function SetSign(toursys)
	{		
		localStorage.setItem("Current_TourSys",toursys);
		var url='Pages/5-7-1.html?sysno='+toursys;		
		showFloatRight('设置签表',url);	
	}

	//开始抽签，2016-09-19
	function StartSign(toursys)
	{
		if(confirm('是否开始抽签？'))
		{			
			$.get('http://localhost:46755/BackService/TourMgm.ashx',{typename:"UpdateTourStatus",sysno:toursys,status:"3"},function(data){
				GotobyName('赛事签表');
			});	
		}
	}
	
	//分配赛事资源
	function DistributeRes(toursys)
	{
		localStorage.setItem("Current_TourSys",toursys);
		var url='Pages/5-5-1.html';		
		showFloatRight('分配赛事资源',url);
	}
	
	//分配赛事资源
	function ScoreSetting(toursys)
	{
		localStorage.setItem("Current_TourSys",toursys);
		var url='Pages/5-5-5.html';		
		showFloatRight('设置奖励积分',url);
	}
	
	//分配裁判资源
	function UmpireSetting(toursys)
	{
		localStorage.setItem("Current_TourSys",toursys);
		var url='Pages/5-5-6.html';		
		showFloatRight('裁判分配',url);
	}

	//开始比赛
	function StartEvent(toursys)
	{
		if(confirm('是否开始比赛？'))
		{			
			$.get('http://localhost:46755/BackService/TourMgm.ashx',{typename:"UpdateTourStatus",sysno:toursys,status:"5"},function(data){
				GotobyName('正在进行');
			});	
		}
	}
	
	//赛事修改路由安排
	function GotoTourMod(obj)
	{
		var TourSys=localStorage.getItem("Current_TourSys");
		var pagename=obj.innerHTML;
		switch (pagename)
		{
			case "基本信息":
				location.href='5-1-2-1.html?sysno='+TourSys;
				break;
			case "赛事规程":
				location.href='5-1-2-2.html?sysno='+TourSys;
				break;
			case "比赛项目":
				location.href='5-1-2-3.html?sysno='+TourSys;
				break;
			case "报名名单":
				location.href='5-4-2.html?sysno='+TourSys;
				break;
			case "收款对账":
				location.href='5-4-3.html?sysno='+TourSys;
				break;
		}		
	}	
	
	//分配签表
	function disSigns(toursys)
	{
		//alert(toursys);
		$("#FunctFRight",window.parent.document).show();
		$("#fr_title",window.parent.document).html('分配赛事项目签表');
	}
	
	//新建赛事
	function newTour()
	{
		$("#FunctFRight",window.parent.document).show();
		$("#fr_title",window.parent.document).html('新建赛事');
		$("#FR_Content_frm",window.parent.document).attr("src","Pages/5-1-1.html");
	}
	//创建新的赛事
	function NewTourSubmit()
	{				
		$.ajax({
				type:"POST",
				async:"true",
				url:"http://localhost:46755/BackService/TourMgm.ashx?typename=CreateNewTour",
				data:$("#frmNewTour").serialize()+'&ClubSys='+ClubInfo.SYSNO+'&memsys='+ClubInfo.EXT3,
				success:function(data){
					//alert(data);
					var ret=eval("("+data+")");
					if(ret.code=='0')
					{
						$("#FunctFRight",window.parent.document).hide();
						$("#nav_status0",window.parent.document).click();
					}
				}
			});	
	}
	
	//根据赛事主键获得赛事实体
	function GetTourInfobySys()
	{
		var sysno=location.href.split('=')[1];
		if(!sysno)
		{
			//
			sysno=prompt("请输入要修改赛事的sysno","");			
		}
		$.get('http://localhost:46755/BackService/TourMgm.ashx',{typename:'GetTourInfobySys',sysno:sysno},function(data){
																												  
			var ret=eval("("+data+")");
			if(ret.code==0)
			{
				var tour=ret.data;
				$('input[name="tourName"]').val(tour.NAME);
				$('input[name="tourDate"]').val(tour.STARTDATE);
				$('input[name="tourAddress"]').val(tour.ADDRESS);
				$('input[name="ext1"]').val(tour.EXT1);
				//$('input[name="ext2"]').val(tour.EXT2);
				$("#ext2").val(tour.EXT2);
				$("#tourType").val(tour.CITYTYPE);//赛事类型
				$("#unionName").val(tour.UnionSys);
				$("#tourLevel").val(tour.TOURSYS);
				$("#setType").val(tour.SETTYPE);
				$("#gameType").val(tour.GAMETYPE);
				//添加的属性
				
				$("#applyEnd").val(tour.ENDDATE);
				$("#tbimgurl").val(tour.TourBackImg);
				$("#tourback").attr("src",tour.TourBackImg);
			}
		});
	}
	
	//修改赛事基本信息
	function UpdateTourBasic()
	{
		var sysno=location.href.split('=')[1];
		//alert(sysno);
		$.ajax({
			type:"POST",
			async:"false",
			url:'http://localhost:46755/BackService/TourMgm.ashx?typename=UpdateTourBasic',
			data:$("#frmNewTour").serialize()+'&sysno='+sysno,
			success:function(data){
				//alert(data);
				var ret=eval("("+data+")");
				if(ret.code==0)
				{
					alert('修改成功！');	
				}
				else
				{
					alert('修改不成功，请重试');	
				}
			}
		});	
	}
	
	//页面：手动报名
	var TourApp_toursys;
	//加载赛事的项目
	function LoadTourContent()
	{
		TourApp_toursys=localStorage.getItem("Current_TourSys");
		//TourApp_toursys='E0F4A8D3DE784172A7CE003C0C6D4B99';		
		//alert(TourApp_toursys);
		$.ajax({
			type:"get",
			url:"http://localhost:46755/BackService/TourMgm.ashx",
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
	
	
	
	//5-4-1
	//向服务器提交已经添加的人员信息
	function SubmitApplyList()
	{
		var res=JSON.stringify(Apply_PlayerArr);
		//alert(res);
		//alert(res);
		$.get("http://localhost:46755/BackService/TourMgm.ashx",{typename:"AddDirectApply",ApplyList:res},function(data){			
			//alert(data);
			var res=eval("("+data+")");
			if(res.code==0)
			{
				//$("#FunctFRight",window.parent.document).hide();	
				//将添加结果返回到添加清单上面
			}
		});
	}
	//5-4-1
	//
	
	
	
	
	
	///种子选手
	//提交种子选手
	function AddSeed_Click()
	{
			
	}
	
	
	//创建赛事--添加赛事项目
	//显示
	function ShowAddCont()
	{
		$("#Tour_AddCont").show();	
		//初始化
		$("#contid").val("");
			$("#tbContName").val("");
			$("#selGroup").val("-1");
			$("#type").val("-1");
			$("#tbApplyFee").val("");
			$("#tbSignQty").val("");
			$("#selAllowGroup").val("-1");
			$("#selGroupQty").val("-1");
	}
	
	function HidAddCont()
	{
		$("#Tour_AddCont").hide();		
	}
	
	//
	function TourContent_Save()
	{
		var id=$("#contid").val();
		var Requrl='';
		if(id!='')
		{
			//已有id，修改信息
			Requrl='http://localhost:46755/BackService/TourMgm.ashx?typename=UpdateTourContent';
		}
		else
		{
			//无id，新增项目
			Requrl='http://localhost:46755/BackService/TourMgm.ashx?typename=CreateTourContent';
		}
		
		var Toursys=localStorage.getItem("Current_TourSys");
		$.ajax({
			type:"post",
			async:"false",
			url:Requrl,
			data:$("#Tour_AddCont_Form").serialize()+'&toursys='+Toursys,
			success:function(data){
				//alert(data);
				var res=eval("("+data+")");
				if(res.code==0)
				{
					//修改成功
					$("#Tour_AddCont").hide();
					GetTourContent();
				}
				else
				{
					//失败
					alert(res.errormsg);
				}
				
			}			
		});	
	}
	
	//删除项目
	function TourContent_Delete()
	{
		var id=$("#contid").val();
		if(id!='')
		{
			//已有id，删除
			if(confirm('是否删除项目'))
			{
				$.ajax({
					type:"post",
					async:"false",
					url:"http://localhost:46755/BackService/TourMgm.ashx",
					data:{typename:"DeleteTourContent",id:id},
					success:function(data){
						//alert(data);
						var res=eval("("+data+")");
						if(res.code==0)
						{
							//修改成功
							$("#Tour_AddCont").hide();
							GetTourContent();
							
						}
						else
						{
							//失败
							alert(res.errormsg);
						}
						
					}		  
				});
			}
		}
		else
		{
			//新添加项目，无法删除	
			$("#Tour_AddCont").hide();
		}
	}
	
	//获取所有的项目
	function GetTourContent()
	{
		var toursys=localStorage.getItem("Current_TourSys");
		$.get("http://localhost:46755/BackService/TourMgm.ashx",{typename:"GetTourContents",sysno:toursys},function(data){

			var res=eval("("+data+")");
			var conts=res.data;
			var html='';
			for(var i=0;i<conts.length;i++)
			{
				html+='<ul class="contcell">';
				html+='<li class="contDesc">项目名称：<strong>'+conts[i].ContentName+'</strong><br />项目类型：'+conts[i].TourDate+' '+conts[i].ContentType+'<br />正签数量：'+conts[i].SignQty+'</li>';			
				html+='<li class="toursetbtn"><input type="button" value="编辑" onclick="UpdateCont(\''+conts[i].id+'\')" /></li></ul>';		
			}
			
			$("#Tour_ContList").html(html);
		});
		
	}
	
	//根据id显示项目内容
	function UpdateCont(id)
	{
		$("#Tour_AddCont").show();
		//加载信息
		$.get("http://localhost:46755/BackService/TourMgm.ashx",{typename:"GetTourContentModel",id:id},function(data){
			var res=eval("("+data+")");
			var cont=res.data;
			$("#contid").val(id);
			$("#tbContName").val(cont.ContentName);
			$("#selGroup").val(cont.TourDate);
			$("#type").val(cont.ContentType);
			$("#tbApplyFee").val(cont.ext3);
			$("#tbSignQty").val(cont.SignQty);
			$("#selAllowGroup").val(cont.AllowGroup);
			$("#selGroupQty").val(cont.GroupType);
		});
	}
	
	// JavaScript Document


	//5-4-2
	//赛事报名名单页面
	function LoadTourApplicants(toursys)
	{	
	     $.get("http://localhost:46755/BackService/TourMgm.ashx",{typename:"TourApply_GetContentApplicant",toursys:toursys},function(data){
			var res=eval("("+data+")");
			var list=res.data;
			var html='';
			for(var i=0;i<list.length;i++)
			{
				html+='<ul class="contcell"><li class="contDesc"><strong>'+list[i].ContentName+'</strong><br />	<br />报名人数：'+list[i].ext1+'</li><li class="toursetbtn"><input type="button" value="查看" onclick="SeeApplicant(\''+list[i].id+'\')" /></li></ul>';
			}
			$("#ContAppList").html(html);
	    });	
	}
	
	var Current_Cont;
	//5-4-2
	//查看具体项目的报名名单
	function SeeApplicant(id)
	{
		Current_Cont=id;
		$("#applistdiv").show();
		$.get("http://localhost:46755/BackService/TourMgm.ashx",{typename:"TourApply_GetApplistbyContid",contid:id},function(data){
			
			var res=eval("("+data+")");
			var list=res.data;
			var html='';
			for(var i=0;i<list.length;i++)
			{
				var paystatus=list[i].STATUS=="1"?"未支付":"已支付";
				html+='<ul class="contcell"><li class="contDesc">'+list[i].ApplyName+'<br />报名时间:'+list[i].APPLYDATE+'<br />'+paystatus+'</li><li class="toursetbtn"><input type="button" value="删除"  onclick="DeleteApply(\''+list[i].ID+'\')"/></li></ul>';	
			}
			$("#TourApp_Applicants").html(html);
		});		
	}
	
	var BackServiceUrl='http://localhost:46755/BackService/TourMgm.ashx';
	
	//5-4-2
	//删除报名
	function DeleteApply(id)
	{
		$.ajax({
			type:"POST",
			async:"false",
			url:BackServiceUrl,
			data:{typename:"TourApp_DeleteApp",id:id},
			success:function(data){
				//alert(data);
				var res=eval("("+data+")");
				if(res.code=="0")
				{
					SeeApplicant(Current_Cont);	
				}	
			}
		});	
	}
	
	//5-4-2
	//关闭报名清单显示
	function CloseApplist()
	{
		$("#applistdiv").hide();	
	}
	
	//5-4-3
	//加载报名费统计情况
	  function GetTourApplyFee() {
		   var toursys=location.href.split('=')[1];
           $.post("http://localhost:46755/BackService/Tourmgm.ashx?typename=TourApplyFeeInfo&toursys=" + toursys, function (data) {	
               var fees = data.split('|');
               document.getElementById("lblWeTennisPay").innerHTML = fees[0];
               document.getElementById("lblUnpaidFee").innerHTML = fees[1];
               document.getElementById("lblTotalFee").innerHTML = fees[2];
           });
       }

//5-4-3
	//报名费用收款对账
	 function GetTourApplyCon() {
		 var toursys=location.href.split('=')[1];
           $.get("http://localhost:46755/BackService/Tourmgm.ashx",{typename:"GetTourApplyCon",toursys:toursys}, function (data) {																							   				
               //var items = $.parseJSON(data);
			   var items=eval("("+data+")");
			   if(items.code==0)
			   {
				   items=items.data;
				   var table = $("#tableApplyTotal");
				   //添加表头
				   var row = $("<tr><th>序号</th><th>子项</th><th>报名费</th><th>已支付数量</th><th>未支付数量</th><th>总报名数量</th></tr>");
				   table.append(row);
				   var Pai=0, UnPai=0, Total=0;
				   //添加表身
				   for (var i = 0; i < items.length; i++) {
					   var item = items[i];
					   row = $("<tr><td>" + (i + 1) + "</td><td>" + item.ContentName + "</td><td>" + item.ApplyFee + "</td><td>" + item.PaidQty + "</td><td>" + item.UnPaidQty + "</td><td>" + item.TotalQty + "</td></tr>");
					   table.append(row);
	
					   Pai += parseInt(item.PaidQty);
					   UnPai += parseInt(item.UnPaidQty);
					   Total += parseInt(item.TotalQty);
				   }
				   //添加合计
				   var row = $("<tr><td colspan=\"3\">合计</td><td>" + Pai + "</td><td>" + UnPai + "</td><td>" + Total + "</td></tr>");
				   table.append(row);
			   }
           });
       }

       function Dis_TourResource()
       {
       		

       }

       //加载比赛维护的项目
       function LoadTourContRes()
		{	
			var toursys=localStorage.getItem("Current_TourSys");
		     $.get("http://localhost:46755/BackService/TourMgm.ashx",{typename:"TourApply_GetContentApplicant",toursys:toursys},function(data){
				//alert(data);
				var res=eval("("+data+")");
				var list=res.data;
				var html='';
				for(var i=0;i<list.length;i++)
				{
					var groupinfo='';
					if(list[i].AllowGroup=='1')
					{
						groupinfo='含'+list[i].GroupType+'人小组赛';
					}
					else
					{
						groupinfo='不包含小组赛';	
					}
					html+='<ul class="contcell"><li class="contDesc"><strong>'+list[i].TourDate+'-'+list[i].ContentName+'</strong></li><li class="toursetbtn"><input type="button" value="管理" onclick="EditContResult(\''+list[i].id+'\')" /></li></ul>';
				}
				$("#tourContRes").html(html);
		    });	
		}

		//维护某个项目的比赛结果
		function EditContResult(id)
		{
			location.href='5-6-2.html?contid='+id;
		}
	
	
	//5-8，已完成赛事管理
	//赛事项目页面
	function LoadFinishTourContents(toursys)
	{	
	     $.get("http://localhost:46755/BackService/TourMgm.ashx",{typename:"TourApply_GetContentApplicant",toursys:toursys},function(data){
			var res=eval("("+data+")");
			var list=res.data;
			var html='';
			for(var i=0;i<list.length;i++)
			{
				html+='<ul class="contcell"><li class="contDesc"><strong>'+list[i].TourDate+'-'+list[i].ContentName+'</strong><br /></li><li class="toursetbtn"><input type="button" value="查看" onclick="SeeFiniCont(\''+list[i].id+'\')" /></li></ul>';
			}
			$("#ContAppList").html(html);
	    });	
	}
	
	//查看已完成项目积分情况
	function SeeFiniCont(id)
	{

	}
	