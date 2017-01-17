var pub_user='admin';
var pub_pwd='123456';

//判断浏览器是否支持本地存储
function checkLocalStorage()
{
	if(window.localStorage)
	{
		alert('this browser support local storage');
	}
	else
	{
		alert('this browser not support local storage');	
	}	
}

//判断浏览器的种类
	function GetBrowserType()
	{
		//检测浏览器语言
		currentLang = navigator.language;   //判断除IE外其他浏览器使用语言
		if(!currentLang){//判断IE浏览器使用语言
			currentLang = navigator.browserLanguage;
		}
		//alert(currentLang);
				
		//判断访问终端
		var browser={
			versions:function(){
				var u = navigator.userAgent, app = navigator.appVersion;
				return {
					trident: u.indexOf('Trident') > -1, //IE内核
					presto: u.indexOf('Presto') > -1, //opera内核
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
					mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
					iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
					iPad: u.indexOf('iPad') > -1, //是否iPad
					webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
				};
			}(),
			language:(navigator.browserLanguage || navigator.language).toLowerCase()
		}
		
		//browser.versions.trident返回真假，真则是IE内核，以此类推browser.versions.webKit是否为谷歌内核
		//if(browser.versions.trident){
			//alert("is IE");
		//}
		//if(browser.versions.webKit){
			//alert("is webKit");
		//}
		
		if(browser.versions.mobile)
		{			
			return true;	
		}
		else
		{
			return false;	
		}
		
		
	}
	
//XMLHTTPREQUEST 基本方法
function xmlPost(para)
{	
	var res='';
	//使用CORS
	var xhr=new XMLHttpRequest();		
	xhr.open("POST",para.url,false);//设置为POST,可以通过send传递参数，第三个参数是用来设置async的，true表示异步处理，false表示顺序执行。
	xhr.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
	xhr.onloadstart=para.ready;	
	xhr.onreadystatechange=function(){	
		if(xhr.readyState==4)
		{
			res= xhr.responseText;
		}			
	}
	xhr.send(para.params);	
	return res;
}

function xmlGet(para)
{	
	var res='';
	//使用CORS
	var xhr=new XMLHttpRequest();		
	xhr.open("GET",para.url,true);//设置为POST,可以通过send传递参数，第三个参数是用来设置async的，true表示异步处理，false表示顺序执行。
	xhr.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
	xhr.onloadstart=para.ready;	
	xhr.onreadystatechange=function(){	
		if(xhr.readyState==4)
		{			
			res= xhr.responseText;
			alert(res);
		}			
	}
	xhr.send(para.params);	
	return res;
}

function pub_SendCodexml(phone)
{
	//配置函数所需参数
	var para={
		url:'http://localhost:46755/WebService/SMS.ashx?typename=GenerateCodeXML&userid=admin&secret=12837216371623',
		ready:function(){},
		params:"tele="+phone
	}		
	
	var message=xmlPost(para);
	if(message=='ok')
	{
		return true;	
	}
	else
	{
		return false;	
	}
	
}

//xml httprequest 方法应用
function pub_validcodexml(tele,code)
{
	var para={
			url:'http://localhost:46755/WebService/SMS.ashx?typename=ValidateCodeXML&userid=admin&secret=1234567',
			ready:function(){},
			params:"tele="+tele+"&code="+code
		}	
	var res=xmlPost(para);	
	return res;
}

	
	
//验证手机号
function checkPhone(phone){
var sPhone = phone;
var zh=/^1[3|4|5|8]\d{9}$/;
if(!(zh.test(sPhone))){
     return false;
   }
   else
   {
	return true;   
	}
}

//登陆认证
function pub_ValidateLogin(username,pwd)
{
	var para={
			url:'http://localhost:46755/WebService/WeMember.ashx?typename=ValidateClubLogin',
			ready:function(){},
			params:{username:username,pass:pwd}
		}
	var res=xmlPost(para);	
	return res;
}

function pub_getNewsList()
{
	var para={
			url:'http://localhost:46755/WebService/WeNews.ashx?typename=LoadNewsXml&userid='+pub_user+'&secret='+pub_pwd,
			ready:function(){},
			params:'type=Pro&pagesize=10&page=1&status=0'
		}		
	var res=xmlPost(para);	
	return res;
}

function pub_TestConne()
{
	var para={
			//url:'http://localhost:46755/WebService/WeNews.ashx?typename=LoadNewsXml&userid='+pub_user+'&secret='+pub_pwd,
			url:'http://wetennis.cn:8082/api/News/GetNewsList',
			ready:function(){},
			params:'type=Pro&pagesize=10&page=1&status=0'
		}		
	var res=xmlPost(para);	
	return res;
}



//注册新的俱乐部
function pub_Register()
{
	
	//验证是否填写数据
	var phone=$("#phone").val();
	var clubname=$("#clubname").val();
	if(phone==""||clubname=="")
	{
		alert('信息填写不完整');
		return;
	}
	$.ajax({
		async:"false",
		type:"POST",
		url:"http://localhost:46755/BackService/TourMgmJson.ashx?typename=RegisterClub",
		data:$("#registerDate").serialize(),
		success:function(ret)
		{
			if(ret.code==0)
			{
				//添加成功，模拟登陆，并添加数据到localstorage
				var uname=ret.data.username;
				var pwd=ret.data.password;				
				pub_login(uname,pwd);
			}
			else
			{
				alert('注册俱乐部失败');
			}

		}

	});
}

function pub_login(user,pwd)
{
	$.ajax({
			type:"POST",
			url:"http://localhost:46755/WebService/WeMember.ashx",
			data:{typename:"ValidateClubLogin",username:user,pass:pwd},
			success:function(data){
				//alert(data);
				var retdata=eval("("+data+")");
				if(retdata.code=="0")
				{
					//添加cookie
					delCookie("username");
					delCookie("password");
					setCookie("username",user);
					setCookie("password",pwd);

					if(window.localStorage)
					{
					   localStorage.setItem("Club_Basic",JSON.stringify(retdata.data));
					   var exp = new Date();
					   localStorage.setItem("Last_LoginTime",exp.getTime());
					}
					//页面跳转
					location.href='../Index.html';					
				}
				else
				{
					alert(retdata.errormsg);
				}				
			}
		});	
}

function Login()
	{
		var user=$("#user").val();
		var pwd=$("#pwd").val();
		if(user=='')
		{
			alert('请输入用户名！');
			return;
		}
		
		pub_login(user,pwd);
		
	}

function init_logininfo(){
	var usern=getCookie("username");
	$("#user").val(usern);
	var pwd=getCookie("password");
	$("#pwd").val(pwd);
}


//写cookies
function setCookie(name,value)
{
	var Days = 2;//保存2天
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}