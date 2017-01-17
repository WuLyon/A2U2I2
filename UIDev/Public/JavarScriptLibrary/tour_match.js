var content=location.href.split('=')[1];

//加载项目的轮次
function LoadContRound()
{
	
	$.ajax({
		type:"GET",
		url:"http://wetennis.cn:83/BackService/TourMgm.ashx",
		data:{typename:"GetContentRounds",cont:content},
		success:function(ret)
		{
			var res=eval("("+ret+")");
			if(res.code==0)
			{
				var rounds=res.data;
				var htm='';
				htm+='<ul class="roundNav">';
				for(var i=0;i<rounds.length;i++)
				{
					htm+='<li onclick="LoadContMatches(\''+rounds[i].value+'\')">'+rounds[i].text+'</li>';
				}
				htm+='</ul>'
				$("#contRound").html(htm);
			}
		}
	});
}
//加载比分
function LoadContMatches(round)
{	
	$.ajax({
		type:"GET",
		url:"http://wetennis.cn:83/BackService/TourMgm.ashx",
		data:{typename:"GetMatchesByContRound",cont:content,round:round},
		success:function(ret)
		{
			var res=eval("("+ret+")");
			if(res.code==0)
			{
				var matchs=res.data;
				var htm='';
				
				
				for(var i=0;i<matchs.length;i++)
				{
					htm+='<ul class="matchMain">';
					var match=matchs[i];
					//加载比赛双方
					var ply1=match.Player1ComName;
					var ply2=match.Player2ComName;
					//判断胜负
					if(match.PLAYER1==match.WINNER&&match.WINNER!='')
					{
						ply1+='√';
					}
					if(match.PLAYER2==match.WINNER&&match.WINNER!='')
					{
						ply2+='√';
					}
					htm+='<li>'+ply1+' vs  '+ply2+'</li>';

					//添加比分，显示
					var sys=match.SYS;
					var read_id=sys+'_read';
					var edit_id=sys+'_edit';
					var btn_id=sys+'_btn';
					var p1_id=sys+'_p1';
					var p2_id=sys+'_p2';

					var Score=match.SCORE.toString();
					var s1=0;
					var s2=0;
					//alert(Score.length);
					if(Score.length==2)
					{
						s1=Score.substring(0,1);
						s2=Score.substring(1,2);
					}
					htm+='<li><div id="'+read_id+'" >'+s1+':'+s2+'</div> ';
					//添加比分，编辑
					htm+='<div id="'+edit_id+'" class="hidden"><input type="text" id="'+p1_id+'"/>:<input type="text" id="'+p2_id+'"/></div></li>';
					//添加编辑按钮
					htm+='<li><input type="button" id="'+btn_id+'" value="修改比分" onclick="editScore(\''+sys+'\')"/></li>';
					htm+='</ul>';
				}
				
				//alert(htm);
				$("#contMatch").html(htm);
			}
		}
	});
}

//编辑比分
function editScore(sys)
{
	//更改展示内容
	var read_id='#'+sys+'_read';
	var edit_id='#'+sys+'_edit';
	var btn_id='#'+sys+'_btn';

	$(read_id).toggleClass("hidden");
	$(edit_id).toggleClass("hidden");

	//修改按钮文字
	var a=$(btn_id).val();
	if(a!='保存')
	{
		$(btn_id).val("保存");
	}
	else
	{
		$(btn_id).val("修改比分");
	}

	//修改比分
	if(a=='保存')
	{
		var p1_id='#'+sys+'_p1';
		var p2_id='#'+sys+'_p2';
		var p1s=$(p1_id).val();
		var p2s=$(p2_id).val();
		
		SaveMatResult2(sys,p1s,p2s);
	}
}

//保存比赛结果
function SaveMatResult(sys,p1s,p2s)
{
	var results={"sys":sys,"p1s":p1s,"p2s":p2s};
	$.ajax({
		type:"POST",
		contentType:"application/json",
		url:"http://wetennis.cn:83/BackService/TourMgm.ashx?typename=RecordMatchRes",
		data:JSON.stringify(results),
		success:function(ret)
		{
			LoadContMatches('');
		}
	});
}

function SaveMatResult2(sys,p1s,p2s)
{
	$.ajax({
		type:"GET",
		url:"http://wetennis.cn:83/BackService/TourMgm.ashx?typename=RecordMatchRes2",
		data:{sys:sys,p1s:p1s,p2s:p2s},
		success:function(ret)
		{
			LoadContMatches('');
		}
	});
}