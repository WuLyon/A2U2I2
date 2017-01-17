// JavaScript Document
//赛事资源分配页面的js

//5-5-1.html
//场馆资源分配
//全局变量定义
var ServiceUrl='http://localhost:46755/BackService/TourMgm.ashx';
//为赛事分配的场馆列表
var Dist_TourGymList=[{"gymSys":"1","gymImgUrl":"","gymName":"莲花球场","courtInfo":"已选择0片场地"},{"gymSys":"1","gymImgUrl":"","gymName":"莲花球场","courtInfo":"已选择0片场地"}];
var Dist_Gyms=[{"gymSys":"123","gymName":"莲花球场"},{"gymSys":"123","gymName":"榴莲球场"},{"gymSys":"123","gymName":"西瓜球场"}];
var TourSys=localStorage.getItem("Current_TourSys");
//为赛事添加场馆信息
//从服务器获取俱乐部所包含的场馆信息
function GetClubGyms()
{
	var clubinfo=localStorage.getItem("Club_Basic");	
	var json=eval("("+clubinfo+")");
	var clubSys=json.SYSNO;
	//alert(clubSys);
	$.get(ServiceUrl,{typename:"GetMyGyms",clubsys:clubSys},function(data){
		//alert(data);
		var res=eval("("+data+")");
		res=res.data;
		Dist_Gyms=res;		
	});
}

//从服务器获取赛事已添加的场馆信息
function GetTourGyms()
{	
	$.get(ServiceUrl,{typename:"GetGymsbyToursys",toursys:TourSys},function(data){
		//alert(data);
		var res=eval("("+data+")");
		Dist_TourGymList=res.data;
		
		//展示添加的Gym
		LoadTourGyms()
		
	});
}

function showEdit()
{
	$("#Edit_Seed").show();
	LoadClubGym();
}


function hideEdit()
{
	$("#Edit_Seed").hide();
}

//加载可选择的场馆信息
function LoadClubGym()
{
	var htm='<select id="myGyms"><option value="-1">--请选择--</option>';
	//俱乐部的场地主键，已经添加到赛事的场馆，则不需要展示。
	for(var i=0;i<Dist_Gyms.length;i++)
	{
		var isAdded=false;
		for( var j=0;j<Dist_TourGymList.length;j++)
		{
			if(	Dist_Gyms[i].gymSys==Dist_TourGymList[j].gymSys)
			{
				isAdded=true;	
			}
		}
		if(!isAdded)
		{
			htm+='<option value=\''+Dist_Gyms[i].gymSys+'\'>'+Dist_Gyms[i].gymName+'</option>';
		}
	}
	htm+='</select>';
	
	$("#selGyms").html(htm);
}

//加载赛事的场馆信息
function LoadTourGyms()
{
	var htm='';
	for(var i=0;i<Dist_TourGymList.length;i++)
	{
		htm+='<ul class="ListView_Ul">';
		htm+='<li><img src="'+Dist_TourGymList[i].gymImgUrl+'" class="ListView_left_img" /></li>';
		htm+='<li ><strong>'+Dist_TourGymList[i].gymName+'</strong><br />'+Dist_TourGymList[i].courtInfo+'</li>';
		htm+='<li class="ListView_right_btn"><input type="button" onclick="EditGymCourts(\''+Dist_TourGymList[i].gymSys+'\')" value="选择场地"/>&nbsp<input type="button" onclick="EditGymContent(\''+Dist_TourGymList[i].gymSys+'\')" value="选择项目"/>&nbsp<input type="button" onclick="DeleteGym(\''+Dist_TourGymList[i].gymSys+'\')" value="删除"/></li>';
		htm+='</ul>';
	}
	$("#ChooseGyms").html(htm);
}

//添加选中的Gym
function SubmitSelGym()
{
	var Gymsys=$("#myGyms").val();	
	if(Gymsys!='-1')
	{
		$.post(ServiceUrl,{typename:"AddGymToTour",gymsys:Gymsys,toursys:TourSys},function(data){
			//alert(data);
			//重新加载绑定场馆
			hideEdit();
			GetTourGyms();
		});
	}
	else
	{
		alert('请选择场馆');	
	}
	
}

//为场馆选择场地
function EditGymCourts(gymsys)
{
	location.href='5-5-1-1.html?sysno='+gymsys;
}

//为场馆选择要进行的赛事项目
function EditGymContent(gymsys)
{
	location.href='5-5-1-2.html?sysno='+gymsys;
}

//删除场馆
function DeleteGym(gymsys)
{		
	$.post(ServiceUrl,{typename:"DeleteTourGym",gymsys:gymsys,toursys:TourSys},function(data){
		//alert(data);
		//重新加载绑定场馆
		GetTourGyms();
	});
}


///////5-5-1-1.html
//根据场馆编号，获取该场馆所对应的场地信息，并进行选择。

///变量定义
//场馆的场地清单
var DisCourt_Courtlist=[{"courtId":"1","courtName":"1号场","courtType":"室外","isCheck":"1"},{"courtId":"1","courtName":"1号场","courtType":"室外","isCheck":"1"},{"courtId":"1","courtName":"1号场","courtType":"室外","isCheck":"1"}];

//从服务器获取
function GetGymCourts()
{
	var gymsys=location.href.split('=')[1];
	$.get(ServiceUrl,{typename:"GetTourCourt",gymsys:gymsys,toursys:TourSys},function(data){
		//alert(data);	
		var res=eval("("+data+")");
		DisCourt_Courtlist=res.data;
		
		LoadCourtlist();
	});
}


//加载场馆场地列表
function LoadCourtlist()
{
	var htm='';
	for(var i=0;i<DisCourt_Courtlist.length;i++)
	{
		var htm='';
		//alert(DisCourt_Courtlist[i].isCheck);
		if(DisCourt_Courtlist[i].isCheck=='0')
		{
			htm='<li><input type="checkbox" />'+DisCourt_Courtlist[i].courtName+'( '+DisCourt_Courtlist[i].courtType+')</li>';
		}
		else
		{
			htm='<li><input type="checkbox" checked/>'+DisCourt_Courtlist[i].courtName+'( '+DisCourt_Courtlist[i].courtType+')</li>';
		}
		
		
		//alert(htm);
		$("#GymCourts").append(htm);	
	}
}

//全选按钮
function selectAll(obj)
{
	if(obj.checked)
	{
		$("input[type='checkbox']").attr("checked",true);
	}
	else	
	{
		$("input[type='checkbox']").attr("checked",false);
	}
}

//提交选择结果
function SubmitCheck()
{
	//根据checkbox的check状态，更新变量的IsCheck属性
	$("#GymCourts input[type='checkbox']").each(function(i){
		if($(this).attr("checked"))
		{
			DisCourt_Courtlist[i].isCheck='1';	
		}
		else
		{
			DisCourt_Courtlist[i].isCheck='0';
		}
	
	});
	
	//修改完成后，提交数据
	var str=JSON.stringify(DisCourt_Courtlist);
	//alert(str);
	var gymsys=location.href.split('=')[1];
	$.post(ServiceUrl,{typename:"UpdateTourGymCourts",toursys:TourSys,gymsys:gymsys,courtstr:str},function(data){
		location.href='5-5-1.html';																									  
	});
	
}


////5-5-1-2.html
///为场馆选择项目

//页面变量定义
var Gymsys=location.href.split('=')[1];
Distri_GymConts=[{"contId":"1","contName":"青年组男子单打"},{"contId":"2","contName":"男子单打"}];
Distri_TourConts=[{"contId":"1","contName":"青年组男子单打"},{"contId":"2","contName":"青年组男子单打"},{"contId":"3","contName":"青年组男子单打"}];

///从服务器获取数据
//获取场馆绑定的项目
function LoadGymCont()
{
	$.get(ServiceUrl,{typename:"LoadGymConts",toursys:TourSys,gymsys:Gymsys},function(data){
	  //alert(data);
	  var res=eval("("+data+")");
	  Distri_GymConts=res.data;
	  RenderGymConts();
	  });
	
		
}

//从服务器获取赛事的项目
function LoadTourCont()
{
	$.get(ServiceUrl,{typename:"GetTourContents",sysno:TourSys},function(data){
		//alert(data);
		var res=eval("("+data+")");	
		var tourcont=res.data;
		var gymcont=[];
		for(var i=0;i<tourcont.length;i++)
		{
			var cont={"contId":tourcont[i].id,"contName":tourcont[i].TourDate+tourcont[i].ContentName};	
			gymcont.push(cont);
		}
		Distri_TourConts=gymcont;
	});
}

function DeleteGymCont(contid)
{
	$.post(ServiceUrl,{typename:"DeleteContid",toursys:TourSys,gymsys:Gymsys,contid:contid},function(data){
			LoadGymCont();																								
	});
}

///加载页面内容
//加载项目下拉框
function RenderContSel()
{
	var htm='<select id="SelTourCont"><option value="-1">--请选择--</option>';
	for(var i=0;i<Distri_TourConts.length;i++)
	{
		var IsTrue=true;
		for(var j=0;j<Distri_GymConts.length;j++)
		{
			if(	Distri_GymConts[j].contId==Distri_TourConts[i].contId)
			{
				IsTrue=false;
			}
		}
		if(IsTrue)
		{
			htm+='<option value="'+Distri_TourConts[i].contId+'">'+Distri_TourConts[i].contName+'</opotion>';	
		}
	}
	htm+='</select>';
	
	$("#selContent").html(htm);
}

//加载赛事添加的项目
function RenderGymConts()
{
	var htm='';
	for(var i=0;i<Distri_GymConts.length;i++)
	{
		htm+='<ul class="ListView_Ul">';
		htm+='<li ><h3>'+Distri_GymConts[i].contName+'</h3></li>';
		htm+='<li class="ListView_right_btn"><a href="javascript:DeleteGymCont(\''+Distri_GymConts[i].contId+'\')">删除</a></li>';
		htm+='</ul>';
	}
	//alert(htm);
	$("#GymCont").html(htm);
}

function showEdit2()
{
	$("#Edit_Seed").show();
	RenderContSel();
}

function SubmitSelCont()
{
	var ContId=$("#SelTourCont").val();
	var Gymsys=location.href.split('=')[1];
	$.post(ServiceUrl,{typename:"AddDistriGymCont",toursys:TourSys,gymsys:Gymsys,contid:ContId},function(data){
			hideEdit();	
			LoadGymCont();
	});
}

////页面5-5-2.htm
///赛事日期分配页面

//页面变量
var Dist_TourDate=[{"Id":"1","TourSys":"","TourDate":"2016-6-2"}];

//从服务器获取数据
function LoadTourDate()
{
	$.get(ServiceUrl,{typename:"GetTourDate",toursys:TourSys},function(data){
		//alert(data);
		var res=eval("("+data+")");
		Dist_TourDate=res.data;
		
		RenderTourdate();
	});	
}

//页面展示
function RenderTourdate()
{
	var htm="";
	for(var i=0;i<Dist_TourDate.length;i++)
	{
		htm+='<ul class="ListView_Ul">';
		htm+='<li><h3>'+Dist_TourDate[i].TourDate+'</h3></li>';
		htm+='<li><br /><br />已选择'+Dist_TourDate[i].TourMatchQty+'场比赛</li>';
		htm+='<li class="ListView_right_btn"><a href="javascript:AssignRound(\''+Dist_TourDate[i].TourDate+'\')">指定轮次</a>&nbsp;<a href="javascript:DeleteTourDate(\''+Dist_TourDate[i].Id+'\')">删除</a></li>';
		htm+='</ul>';
	}
	
	$("#ChoosedDate").html(htm);
}

function AssignRound(date)
{
	//alert(date);
	location.href='5-5-2-1.html?date='+date;
}

//
function DeleteTourDate(id)
{
		$.post(ServiceUrl,{typename:"Delete_TourDate",id:id},function(data){
			LoadTourDate();
			hideEdit();	
		});
}

function showEdit3()
{
	$("#Edit_Seed").show();	
}

function AddTourDate()
{
	var _Date=$("#tbDatePick").val();
	$.post(ServiceUrl,{typename:"AddTour_Date",toursys:TourSys,date:_Date},function(data){
			LoadTourDate();
			hideEdit();																					
	});
}

///页面5-5-2-1.html
//为日期选择要进行项目以及项目的轮次

//页面变量定义
var Dist_ContRound=[{"contId":"1","contName":"男子单打","contRound":[{"roundNum":"0","roundName":"小组赛","isCheck":"0","isEnable":"1"},{"roundNum":"1","roundName":"第一轮","isCheck":"0","isEnable":"0"}]},{"contId":"2","contName":"女子单打","contRound":[{"roundNum":"0","roundName":"小组赛","isCheck":"0","isEnable":"0"},{"roundNum":"1","roundName":"第一轮","isCheck":"0","isEnable":"0"}]}];
var _Date=location.href.split('=')[1];

function LoadTourRoundsDate()
{	
	$.get(ServiceUrl,{typename:"GetDateRounds",toursys:TourSys,tourdate:_Date},function(data){
		
		var res=eval("("+data+")");
		Dist_ContRound=res.data;
		
		RenderContRound();
	});
																						
	
}

function RenderContRound()
{
	var htm='';
	for(var i=0;i<Dist_ContRound.length;i++)
	{
		htm+='<p><input type="checkbox" onclick="selectCont(this,\''+Dist_ContRound[i].contId+'\')"/>'+Dist_ContRound[i].contName+'('+Dist_ContRound[i].MatchQty+')</p>';
		htm+='<div id="'+Dist_ContRound[i].contId+'" class="RoundCheck">';
		var contR=Dist_ContRound[i].contRound;
		
		for(var j=0;j<contR.length;j++)
		{
			if(contR[j].isEnable=='1')
			{
				htm+='<input type="checkbox" checked disabled/>'+contR[j].roundName;	
			}
			else if(contR[j].isCheck=='1')
			{
				htm+='<input type="checkbox" checked/>'+contR[j].roundName;	
			}
			else 
			{
				htm+='<input type="checkbox"/>'+contR[j].roundName;	
			}
			htm+='('+contR[j].MatchQty+')<br/>';
		}
		htm+='</div>';
	}
	
	$("#TourRouns").html(htm);
}


//全选按钮
function selectCont(obj,contid)
{
	var sel="#"+contid+" input[type='checkbox']";
	if(obj.checked)
	{
		$(sel).attr("checked",true);
	}
	else	
	{
		$(sel).attr("checked",false);
	}
}

//提交选择的
function submitTourRound()
{
	//根据checkbox选择情况，修改页面变量
	for(var i=0;i<Dist_ContRound.length;i++)
	{
		var contid="#"+Dist_ContRound[i].contId+" input[type='checkbox']";	
		$(contid).each(function(j){
			if($(this).attr("checked"))
			{
				Dist_ContRound[i].contRound[j].isCheck='1';	
			}
			else
			{
				Dist_ContRound[i].contRound[j].isCheck='0';	
			}			
		});
	}
	
	var str=JSON.stringify(Dist_ContRound);
	alert(str);
	$.post(ServiceUrl,{typename:"SubmitContRound",toursys:TourSys,tourdate:_Date,rsstr:str},function(data){
		alert(data);																				
		location.href='5-5-2.html';
	});
}


//5-5-3.html
//赛事资源分配
function RandowmDistri()
{
	var tour_sys=localStorage.getItem('Current_TourSys');
		var ser_url='http://localhost:46755/BackService/TourMgm.ashx?typename=Dis_TourResource';
		$.ajax({
			type:'POST',
			url:ser_url,
			data:{toursys:tour_sys},
			success:function(ret){
				alert(ret);
			}
		});	
}

///5-5-4.html,
//赛事秩序册
var CourtMatches=[{matchDate:"2016-6-14",dateMatchQty:"198",dateMatches:[{courtName:"高新网球中心-1号场",courtMatchQty:"17",courtMatches:[{matchSys:"123",courtMatchOrder:"1",matchOrder:"1",matchDesc:"青年组男子单打-小组赛-第1组",player1:"费德勒",player2:"纳达尔"},{matchSys:"124",courtMatchOrder:"1",matchOrder:"1",matchDesc:"青年组男子单打-小组赛-第1组",player1:"费德勒",player2:"纳达尔"}]},{courtName:"高新网球中心-2号场",courtMatchQty:"18",courtMatches:[{matchSys:"123",courtMatchOrder:"1",matchOrder:"1",matchDesc:"青年组男子单打-小组赛-第1组",player1:"费德勒",player2:"纳达尔"},{matchSys:"124",courtMatchOrder:"1",matchOrder:"1",matchDesc:"青年组男子单打-小组赛-第1组",player1:"费德勒",player2:"纳达尔"}]} ]}];

function LoadCourtMatches()
{
	$.get(ServiceUrl,{typename:"LoadCourtMatches",toursys:TourSys},function(data){
		var res=eval("("+data+")");		
		CourtMatches=res.data;
		CourtMatch_Render();
	});
}

function CourtMatch_Render()
{
	var pageh='';
	for(var i=0;i<CourtMatches.length;i++)
	{
		//add date header
		pageh+='<h3>'+CourtMatches[i].matchDate+'(共'+CourtMatches[i].dateMatchQty+'场比赛)<a href="javascript:top.window.open(\'http://wetennis.cn:3000/program/'+TourSys+'/'+CourtMatches[i].matchDate+'\')" >修改赛程</a></h3>';
		
		//add date court match distribution
		var dateMatches=CourtMatches[i].dateMatches;
		for(var j=0;j<dateMatches.length;j++)
		{
			pageh+='<div class="courtMDs">';
			pageh+='<h3>'+dateMatches[j].courtName+'(共'+dateMatches[j].courtMatchQty+'场比赛)</h3>';	
			//添加场地内的比赛情况
			var courtMatches=dateMatches[j].courtMatches;
			for(var k=0;k<courtMatches.length;k++)
			{
				pageh+='<ul class="matchul">';
				pageh+='<li>第'+courtMatches[k].courtMatchOrder+'场 ('+courtMatches[k].matchOrder+')</li>';
				pageh+='<li>'+courtMatches[k].matchDesc+'</li>';
				pageh+='<li>'+courtMatches[k].player1+'&nbsp&nbsp vs &nbsp&nbsp '+courtMatches[k].player2+'</li>';
				pageh+='</ul>';	
			}
			
			pageh+='</div>';
			
		}
	}
	
	//将构造的html赋值到div
	$("#courtMatchs").html(pageh);
}

///5-5-5.html
///积分奖励设置
var Score_Seeting=[{contentId:"1",contentName:"男单",contentRounds:[{roundNum:"3",roundName:"决赛",score:"500"},{roundNum:"2",roundName:"半决赛",score:"300"},{roundNum:"1",roundName:"第一轮",score:"50"}]},{contentId:"2",contentName:"女单",contentRounds:[{roundNum:"3",roundName:"决赛",score:"500"},{roundNum:"2",roundName:"半决赛",score:"300"},{roundNum:"1",roundName:"第一轮",score:"50"}]}];

//从服务器获取数据
function Load_ScoreSetting()
{
	$.get(ServiceUrl,{typename:"ScoreSet_Get",toursys:TourSys},function(data){
		//alert(data);
		var res=eval("("+data+")");
		Score_Seeting=res.data;
		Render_ScoreSetting();
	});	
}

//初始化分数设置
function Render_ScoreSetting()
{
	var pageh='';
	for(var i=0;i<Score_Seeting.length;i++)
	{
		//add contentName
		pageh+='<h3>'+Score_Seeting[i].contentName+'</h3>';	
		//add content round
		var contRounds=Score_Seeting[i].contentRounds;
		pageh+='<ul id="'+Score_Seeting[i].contentId+'">';
		for(var j=0;j<contRounds.length;j++)
		{
			pageh+='<li><span>'+contRounds[j].roundName+'</span><input type="text" value="'+contRounds[j].score+'"/></li>';	
		}
		pageh+='</ul>';
	}
	
	$("#RoundScore").html(pageh);
}

//更新分数设置
function Update_ScoreSetting()
{
	//从页面获取设置的分数，并修改原有的json。
	for(var i=0;i<Score_Seeting.length;i++)
	{
		var contid='#'+	Score_Seeting[i].contentId +' input[type="text"]';;
		$(contid).each(function(j){
			 var Score=$(this).val();
			 Score_Seeting[i].contentRounds[j].score=Score;
		});
	}
	var str=JSON.stringify(Score_Seeting);
		
	$.post(ServiceUrl,{typename:"ScoreSet_Update",toursys:TourSys,jsonstr:str},function(data){
		Load_ScoreSetting();
	});
}


///5-5-6.html
//裁判分配
function ChangeUmpire(id)
{
	alert(id);
	$("#Edit_Seed").show();
}