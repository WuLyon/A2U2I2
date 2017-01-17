// JavaScript Document
//定义全局变量，服务访问地址
var ServiceUrl='http://localhost:46755/BackService/TourMgm.ashx';
//定义当前组别
var _GroupType='';
//定义当前项目
var _ContType='';
//ranking data
var str='{code:0,errormsg:"",GroupType:[{GroupName:"Young",ContType:["MS","WS","MD","WD"]},{GroupName:"Mid",ContType:["MD","WD"]},{GroupName:"Old",ContType:["MD","WD"]}],GroupDetail:[{GroupName:"Young",ContType:"MS",MemRanking:[{Rank:1,MemSys:"city02",Name:"LiuTao",UserName:"victor",MemImg:"",Points:"1000",ClubName:"ATP"}]},{GroupName:"Young",ContType:"WS",MemRanking:[{Rank:1,MemSys:"city02",Name:"LiuTao",UserName:"victor",MemImg:"",Points:"1000",ClubName:"WTA"}]},{GroupName:"Mid",ContType:"MD",MemRanking:[{Rank:1,MemSys:"city02",Name:"LiuTao",UserName:"victor",MemImg:"",Points:"1000",ClubName:"SERIA"}]}]}';
var json=eval("("+str+")");

//click content, load content rankings
function changeContent()
{
	//alert(_GroupType+'-'+_ContType);
	var Rankh='<ul class="MemRankCell">';
	var Rankjson=json.GroupDetail;
	for(var i=0;i<Rankjson.length;i++)
	{
		if(Rankjson[i].GroupName==_GroupType&&Rankjson[i].ContType==_ContType)
		{
			//find proper rankings
			var memRank=Rankjson[i].MemRanking;
			for(var j=0;j<memRank.length;j++)
			{
				Rankh+='<li><img src="'+memRank[j].MemImg+'" alt="MemImg" /><p class="RankName"><strong>'+memRank[j].UserName+'</strong><br />'+memRank[j].Name+'</p><h1 class="Ranknum">'+memRank[j].Rank+'</h1><p class="RankPts">'+memRank[j].Points+'<br /> pts</p><p class="clubName">'+memRank[j].ClubName+'</p></li>';
			}
		}
	}
	Rankh+='</ul>';
	$("#MemRanking").html(Rankh);
}

//update union's ranking
function UpdateUnionRanking()
{
	var _UnionSys=location.href.split("=")[1];
	alert(_UnionSys);
	$.ajax({
		type:"post",
		async:"true",
		url:ServiceUrl,
		data:{typename:"UpdateUnionRanking",unionsys:_UnionSys},
		success:function(data){
			alert(data);																		
		}
	});
	
}
//Get Union's ranking
function LoadUnionRanking()
{
	//获取数据
	var _UnionSys=location.href.split("=")[1];
	$.get(ServiceUrl,{typename:"GetUnionRank",unionsys:_UnionSys},function(data){
	   //alert(data);
		json=eval("("+data+")");
		if(json.code==0)
		{
			//count Groups
			var grouph='<ul class="GroupList">';//group html builder
			var Conth='<ul class="ContentList">';//contents html builder
			for(var i=0;i<json.GroupType.length;i++)
			{			
				if(i==0)
				{
					//first item as selected
					grouph+='<li class="Sel" onclick="ClickGroups(this)">'+json.GroupType[i].GroupName+'</li>';
					_GroupType=json.GroupType[i].GroupName;//Current Group	
					//build contents
					var Cont=json.GroupType[i].ContType;
					for(var j=0;j<Cont.length;j++)
					{
						if(j==0)
						{
							//first content item
							Conth+='<li  class="Sel" onclick="ClickContType(this)">'+Cont[j]+'</li>';
							_ContType=Cont[j];//Current ContentType 
						}
						else
						{
							Conth+='<li onclick="ClickContType(this)">'+Cont[j]+'</li>';
						}
					}
					Conth+='</ul>';
					//initiate Mem Ranking
					changeContent();
				}
				else
				{
					grouph+='<li onclick="ClickGroups(this)">'+json.GroupType[i].GroupName+'</li>';
				}
			}
			grouph+='</ul>';
			$("#groups").html(grouph);
			$("#ContTypes").html(Conth);
		}	

	});
	
	
}	
	

//event, click Group list
function ClickGroups(obj)
{	
	_GroupType=obj.innerHTML;
	$("#groups").children().children().removeClass();//除去所有子项选中效果
	obj.className="Sel";//为当前点击项属性赋值
	ChangeGroup(obj.innerHTML);
	
}
//event, click content list
function ClickContType(obj)
{
	$("#ContTypes").children().children().removeClass();//除去所有子项选中效果
	obj.className="Sel";//为当前点击项属性赋值
	_ContType=obj.innerHTML;
	changeContent();
}
//change group,click another group
function ChangeGroup(gname)
{
	var Conth='<ul class="ContentList">';//contents html builder
	for(var i=0;i<json.GroupType.length;i++)
	{
		if(json.GroupType[i].GroupName==gname)
		{
			var Cont=json.GroupType[i].ContType;
			for(var j=0;j<Cont.length;j++)
			{
				if(j==0)
				{
					//first content item
					Conth+='<li  class="Sel" onclick="ClickContType(this)">'+Cont[j]+'</li>';
					_ContType=Cont[j];
				}
				else
				{
					Conth+='<li onclick="ClickContType(this)">'+Cont[j]+'</li>';
				}
			}
			Conth+='</ul>';
		}
	}
	$("#ContTypes").html(Conth);
	changeContent();
}

