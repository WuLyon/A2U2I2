var _bridgeData;
var _callBackUrl;

function GetOpenId()
{
	var code=getQueryString("code");
	if(code==null||code=='')
	{
		var url=encodeURI(location.href);//û�б仯
		url=escape(location.href);//ֻ�����ˣ�����Ϊ��%3A;
		url=encodeURIComponent(location.href);//�ˣ�����Ϊ��%3A;"/"��Ϊ�ˡ�%2F��
		
		location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe90eba22e992ffba&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
	}
	else
	{
		$.ajax({
		type:"GET",
		url:"http://wetennis.cn:8883/API/PayMent.ashx?typename=GetAccessToken",
		data:{code:code},
		success:function(ret)
		{
			var a=JSON.stringify(ret);
			if(ret.code==0)
			{				
				var ordernum=localStorage.getItem("orderNum");	
				LoadWeChatPay(ordernum,ret.data);
			}
		}
		});
	}

	
}

//用户确认，调用微信支付接口
function LoadWeChatPay(ordernum,code)
{
	//生成paysign等参数
	$.ajax({
		type:"GET",
		url:"http://wetennis.cn:8883/API/PayMent.ashx?typename=GetOrderInfo",
		data:{orderNum:ordernum,code:code},
		success:function(ret)
		{
			if(ret.code==0)
			{
				_bridgeData=ret.data.jsBridge;
				//展示订单信息
				var order=ret.data.OrderInfo;
				$("#orderNum").html(order.orderNum);
				$("#orderDesc").html(order.description);
				$("#money").html(order.totalFee);
			}
		}
	});
}


//辅助方法，获取url参数
function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
} 

//用户确认，调用微信支付接口
function SavePay(){	
	var appid=_bridgeData.appId;	
	var timestamp=_bridgeData.timestamp;
	var nonceStar=_bridgeData.nonceStr;
    var _package=_bridgeData.packageStr;
	var paySign=_bridgeData.paySign;

    WeixinJSBridge.invoke('getBrandWCPayRequest', {
        "appId": appid, //公众号名称，由商户传入
        "timeStamp": timestamp, //时间戳
        "nonceStr": nonceStar, //随机串
        "package": _package, //扩展包
        "signType": "MD5", //微信签名方式:1.sha1
        "paySign": paySign //微信签名
    },
	   function (res) {
	       if (res.err_msg == "get_brand_wcpay_request:ok") {
	           alert("微信支付成功!");
	           ConfirmPay();
	       } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
	           alert("用户取消支付!");
	       } else {
	           alert(res.err_msg);
	           alert("支付失败!");
	       }
	       // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
	       //因此微信团队建议，当收到ok返回时，向商户后台询问是否收到交易成功的通知，若收到通知，前端展示交易成功的界面；
	       //若此时未收到通知，商户后台主动调用查询订单接口，查询订单的当前状态，并反馈给前端展示相应的界面。
	   });    
}

function ConfirmPay()
{
	var orderNum=localStorage.getItem("orderNum");
	$.ajax({
		type:"POST",
		url:"http://wetennis.cn:8883/API/PayMent.ashx?typename=ConfirmPayment",
		data:{orderNum:orderNum},
		success:function(ret)
		{
			if(ret.code==0)
			{
				//跳转回指定的路径
	           var redit=localStorage.getItem("returl");
	           var userId=localStorage.getItem("userId");	           
	           location.href=redit+'?userId='+userId;
			}
		}
	});
}



//test charity
//
function charrity()
{
	var returl=location.href;
	
	$.ajax({
		type:"POST",
		url:"http://wetennis.cn:8883/API/PayMent.ashx?typename=Charrity",
		success:function(ret)
		{
			if(ret.code==0)
			{
				//发送支付
				var url='http://wetennis.cn/WeiPayWeb/wechatpay.html?orderNum='+ret.data+'&redirectUrl='+returl+'&userId=city02';
				location.href=url;
			}
		}

	});

}