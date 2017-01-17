// JavaScript Document
	var ServiceUrl='http://wetennis.cn:83/BackService/TourMgm.ashx';

	//设置变量，签表功能范围内通用
	var Sign_Contid=localStorage.getItem("Current_ContId");

	//5-7-1
	//赛事结束报名页面
	function LoadTourContApply()
	{	
		var toursys=localStorage.getItem("Current_TourSys");
	     $.get("http://wetennis.cn:83/BackService/TourMgm.ashx",{typename:"TourApply_GetContentApplicant",toursys:toursys},function(data){
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
				html+='<ul class="contcell"><li class="contDesc"><strong>'+list[i].TourDate+'-'+list[i].ContentName+'</strong><br />正签数：'+list[i].SignQty+'（'+groupinfo+'）	<br />已报名人数：'+list[i].ext1+'</li><li class="toursetbtn"><input type="button" value="管理" onclick="EditContApply(\''+list[i].id+'\')" /></li></ul>';
			}
			$("#ContAppList").html(html);
	    });	
	}

	//管理项目签表
	function EditContApply(id)
	{

		localStorage.setItem("Current_ContId",id);
		
		//alert(id);
		location.href='5-7-2.html';
	}
	

	//5-3-nav
	//赛事报名名单页面
	function LoadTourSign()
	{	
		var toursys=localStorage.getItem("Current_TourSys");
	     $.get("http://wetennis.cn:83/BackService/TourMgm.ashx",{typename:"TourApply_GetContentApplicant",toursys:toursys},function(data){
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
				html+='<ul class="contcell"><li class="contDesc"><strong>'+list[i].TourDate+'-'+list[i].ContentName+'</strong><br />正签数：'+list[i].SignQty+'（'+groupinfo+'）	<br />已报名人数：'+list[i].ext1+'</li><li class="toursetbtn"><input type="button" value="管理" onclick="EditContSign(\''+list[i].id+'\')" /></li></ul>';
			}
			$("#ContAppList").html(html);
	    });	
	}
	
	
	//管理项目签表
	function EditContSign(id)
	{
		//设置当前项目
		localStorage.setItem("Current_ContId",id);
		
		//alert(id);
		location.href='5-3-1.html';
	}
	
	//5-3-1
	//修改项目基础信息 
	function LoadTourContent()
	{
		//
		//alert(Sign_Contid);
		$.get(ServiceUrl,{typename:"GetTourContentModel",id:Sign_Contid},function(data){
			//alert(data);		
			var res=eval("("+data+")");
			var item=res.data;
			$("#ContName").html(item.ContentName);
			$("#ContLevel").html(item.TourDate);
			$("#ContType").html(item.ContentType);
			
			document.getElementById('selSignQty').value=item.SignQty;
			document.getElementById('selAllowG').value=item.AllowGroup;
			document.getElementById('selGroupQty').value=item.GroupType;
		});
	}
	
	//修改项目签表设置信息
	function UpdateContSet()
	{
		var par=$("#frmNewTour").serialize();
		$.post(ServiceUrl+'?'+par,{typename:"UpdateTourContentSigns",id:Sign_Contid},function(data){
			//alert(data);
			var res=eval("("+data+")");
			if(res.code=='0')
			{
				alert('修改成功！');
			}
		});
	}
	
	//5-3-2
	//种子设置页面
	function showEdit()
	{
		$("#Edit_Seed").show();
	}
	
	function hideEdit()
	{
		$("#Edit_Seed").hide();
	}
		
	var Unseed=[];
	var Seeded=[];
	
	//从服务器获取未列为种子的报名成员，以及已成为种子的成员
	function LoadUnseedApp()
	{
		//获取已加载的种子
		$.get(ServiceUrl,{typename:"GetTourSeed",contid:Sign_Contid},function(data){
			//alert(data);
			var res=eval("("+data+")");
			if(res.code==0)
			{
				var list=res.data;
				Seeded=res.data1;
				ShowSeeded();
				var html='';
				for(var i=0;i<list.length;i++)
				{
					//展示种子
					html+='<ul class="ListView_Ul">';
					html+='<li class="ListView_left_Seed"><h1>'+(i+1)+'</h1></li>';
					html+='<li class="ListView_left_img"><img src="'+list[i].P1LIMGURL+'" class="headimg"/></li>';
					html+='<li class="ListView_left_Desc">'+list[i].P1LNAME+'</li>';
					html+='</ul>';					
				}				
				
				$("#ContSeed_List").html(html);
			}
			else
			{
				alert(res.errormsg);	
			}
		});
		
		//获取非种子报名
		$.get(ServiceUrl,{typename:"GetUnSeededApp",id:Sign_Contid},function(data){
			//alert(data);	
			var res=eval("("+data+")");
			if(res.code==0)
			{
				Unseed=res.data;				
				//将未报名展示出来
				ShowUnSeed();
			}
		});
	}
	
	//展示未列为种子的报名名单
	function ShowUnSeed()
	{
		var html='<ul class="AppUl">';
		for(var i=0;i<Unseed.length;i++)
		{
			html+='<li ondblclick="chooseSeed(\''+i+'\')">'+Unseed[i].MemberName+'</li>';
		}
		html+='<ul>';
		$("#EditSeed_Left").html(html);
	}
	
	//展示未列为种子的报名名单
	function ShowSeeded()
	{
		var html='<ul class="AppUl">';
		for(var i=0;i<Seeded.length;i++)
		{
			html+='<li ondblclick="unchooseSeed(\''+i+'\')">'+Seeded[i].MemberName+'</li>';
		}
		html+='<ul>';
		$("#EditSeed_Right").html(html);
	}
	
	//选择为种子
	function chooseSeed(id)
	{
		var i=parseInt(id);
		Seeded.push(Unseed[i]);
		ShowSeeded();
		
		//从报名清单中删除
		Unseed.splice(i,1);
		ShowUnSeed();
	}
	
	//从种子种删除
	function unchooseSeed(id)
	{
		var i=parseInt(id);
		//将剔除的元素添加到报名清单
		Unseed.push(Seeded[i]);
		ShowUnSeed();
		
		Seeded.splice(id,1);
		ShowSeeded();
		
	}
	
	//提交种子情况变化到服务器
	function SubmitSeed()
	{
		var url=location.href;
		var jsonstr=JSON.stringify(Seeded);
		//alert(jsonstr);
		$.post(ServiceUrl,{typename:"SubmitContentSeed",json:jsonstr,id:Sign_Contid},function(data){
			location.href=url;																   
		});																	   
	}
	
	
	//5-3-3.html
	//签位设置
	
	//定义页面变量
	var UnSignedApp=[{"memsys":"123","name":"张三1"},{"memsys":"123","name":"张三2"},{"memsys":"123","name":"张三3"},{"memsys":"123","name":"张三4"},{"memsys":"123","name":"张三5"}];
	
	var SignedApp=[{"signorder":"1","signmember":[{"memsys":"123","name":"1李三1"},{"memsys":"123","name":"1李三2"}]},{"signorder":"2","signmember":[{"memsys":"123","name":"2李三1"},{"memsys":"123","name":"2李三2"}]},{"signorder":"3","signmember":[{"memsys":"123","name":"3李三1"},{"memsys":"123","name":"3李三2"}]}];
	
	var SelSignOrder;
	function SignPageLoad()
	{
		GetContSigns();
		GetUnSignedApp();
	}
	
	
	//从服务器获取数据
	//获取已排签表数据
	function GetContSigns()
	{
		$.get(ServiceUrl,{typename:"GetContentSign",contid:Sign_Contid},function(data){
			//alert(data);
			var res=eval("("+data+")");
			if(res.code==0)
			{
				SignedApp=res.data;	
				//加载数据
				 LoadContentSign();
			}
		});	
	}
	
	//从服务器获取未分配到签表的报名人员信息
	function GetUnSignedApp()
	{
		$.get(ServiceUrl,{typename:"GetUnSignedApp",contid:	Sign_Contid},function(data){
			//alert(data);
			var res=eval("("+data+")");
			if(res.code==0)
			{
				UnSignedApp=res.data;	
				//加载数据
				ShowUnSignedApp();
			}
		});
	}
	
	
	//显示已分配的签表
	function LoadContentSign()
	{
		var html='';
		for(var i=0;i<SignedApp.length;i++)
		{
			html+='<ul class="ListView_Ul">';	
			html+='<li class="ListView_left_Seed"><h2>'+SignedApp[i].signorder+'</h2></li>';
			html+='<li class="ListView_mid_body">';
			var SignMember=SignedApp[i].signmember;
			for(var j=0;j<SignMember.length;j++)
			{
				html+='<p>'+SignMember[j].name+'</p>';	
			}
			html+='</li>';
			
			html+='<li class="ListView_right_btn"><a href="javascript:ShowSign(\''+i+'\')">编辑</a></li>';
			html+='</ul>';
		}
		
		$("#ContSignDisplay").html(html);
	}
	
	//展示未分配到签表的报名
	function ShowUnSignedApp()
	{
		//根据未分配签表报名人员来显示信息
		if(UnSignedApp.length==0)
		{
			$("#SignDistri").html('所有报名人员已全部分配到签表。');	
			$("#GenerateBtn").show();
		}
		else
		{
			$("#SignDistri").html('还有'+UnSignedApp.length+'人未分配签表，请编辑');	
			$("#GenerateBtn").hide();
		}		
		
		var html='<ul class="AppUl">';
		for(var i=0;i<UnSignedApp.length;i++)
		{
			html+='<li ondblclick="AddToSign(\''+i+'\')">'+UnSignedApp[i].name+'</li>';
		}
		html+='<ul>';
		$("#EditSeed_Left").html(html);
	}

	//编辑签表
	function ShowSign(id)
	{		
		$("#Edit_Seed").show();
		
		//展示点击签位的名单
		LoadSignMember(id);
		SelSignOrder=id;
		//展示未分配到签表的报名清单
		ShowUnSignedApp();
	}
	
	//隐藏签表编辑框
	function HideSign()
	{
		$("#Edit_Seed").hide();
		LoadContentSign();
	}
	
	function LoadSignMember(id)
	{
		var order=parseInt(id);
		//alert(SignedApp.length);
		var ChoosedSign=SignedApp[order].signmember;
	
		var html='<ul class="AppUl">';
		for(var i=0;i<ChoosedSign.length;i++)
		{
			html+='<li ondblclick="Unsigned(\''+i+'\')">'+ChoosedSign[i].name+'</li>';
		}
		html+='<ul>';
		$("#EditSeed_Right").html(html);
	}
	
	//从签位中删除
	//将第几个签位，
	function Unsigned(id)
	{
		SelSignOrder=parseInt(SelSignOrder);
		id=parseInt(id);
		
		var choseperson=SignedApp[SelSignOrder].signmember[id];
		UnSignedApp.push(choseperson);//添加到未分配签表的报名
		SignedApp[SelSignOrder].signmember.splice(id,1);//删除选中的签位
		//显示未分配签表
		ShowUnSignedApp();
		LoadSignMember(SelSignOrder);
	}
	
	//将报名信息添加到签位
	function AddToSign(id)
	{
		SelSignOrder=parseInt(SelSignOrder);
		id=parseInt(id);
		
		var choseApp=UnSignedApp[id];
		UnSignedApp.splice(id,1);
		SignedApp[SelSignOrder].signmember.push(choseApp);
		//显示未分配签表
		ShowUnSignedApp();
		LoadSignMember(SelSignOrder);		
	}
	
	
	
	//保存签位
	function SaveSign()
	{
		//
		var jsonstr=JSON.stringify(SignedApp);
		$.post(ServiceUrl,{typename:"UpdateContentSign",signapp:jsonstr,contid:Sign_Contid},function(data){
			alert(data);																							 
		});
	}
	
	//生成比赛
	function GenerateMatch()
	{
		//根据项目id生成比赛
		$.post(ServiceUrl,{typename:"GenerateContentMatch",contid:Sign_Contid},function(data){
			alert(data);																				
		});
	}
	
	
	//5-3-4.html
	//项目比赛列表
	
	//变量定义
	var Match_Cont=[{"RoundName":"决赛","RoundMatch":[{"matchOrder":"3","p1name":"张三","p2name":"李四"}]},{"RoundName":"半决赛","RoundMatch":[{"matchOrder":"2","p1name":"张三","p2name":"王五"},{"matchOrder":"1","p1name":"牛一","p2name":"丁二"}]} ];
	
	//从服务器获取比赛数据
	function GetMatchesData()
	{
		$.get(ServiceUrl,{typename:"GetContentMatches",	contid:Sign_Contid},function(data){
			//alert(data);
			var res=eval("("+data+")");
			Match_Cont=res.data;
			//加载比赛
			LoadMatches();
		});
	}
	
	//加载比赛
	function LoadMatches()
	{
		var htm='';
		for(var i=0;i<Match_Cont.length;i++)
		{
			if(i==Match_Cont.length-1)
			{
				//最后一轮默认展开
				htm+='<div data-role="collapsible" data-collapsed="false">';
			}
			else
			{
				//其余轮次默认折叠
				htm+='<div data-role="collapsible" >';
			}
			
			htm+='<h5>'+Match_Cont[i].RoundName+'</h5>';
			
			var RoundMatch=Match_Cont[i].RoundMatch;
			htm+='<ul class="MatchCell">';
			for(var j=0;j<RoundMatch.length;j++)
			{
				htm+='<li>'
				htm+='<ul class="Match_Ul">';
				htm+='<li>'+RoundMatch[j].matchOrder+'</li>';
				htm+='<li >'+RoundMatch[j].p1name+'</li>';
				htm+='<li>vs</li>';
				htm+='<li>'+RoundMatch[j].p2name+'</li>';
				htm+='</ul>';
				htm+='</li>'
			}
			htm+='</ul>';
			htm+='</div>';			
		}
		$("#TourMatches").html(htm);
		$("#TourMatches").trigger("create");
	}
	
	//5-3-nav.html
	//赛事各项目签表分配情况
	
	//将赛事状态改为资源分配，2->3
	function UpgradeSign()
	{
		var Toursys=localStorage.getItem("Current_TourSys");	
		
	}
	