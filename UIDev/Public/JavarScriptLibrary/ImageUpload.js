// JavaScript Document
//利用js方法上传图片，并返回图片地址。
function PictureUpload(fileid,imgid,canid)
{
	//var GH= arguments.length;//所传参数的数量					
	//var Memsys=window.parent.document.getElementById('tbMemSys').value;//从父窗体获取员工编号
		var imgurl;
		var canvas=document.getElementById(canid);
		//将canvas转化成dataurl
        src = canvas.toDataURL("image/png");//将canvas内容保存为图片
		
        var start = src.indexOf('base64,');		
        var base64str = src.substr(start + 7);		
		
		//使用CORS
		var xhr=new XMLHttpRequest();
		var url="http://localhost:46755///webservice/picupload2.ashx?typename=UploadPicRtnUrl";
		xhr.open("POST",url,false);
		xhr.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
		xhr.onreadystatechange=function(){
			//alert(xhr.responseText);			
			if(xhr.readyState==4)
			{
				imgurl= xhr.responseText;
			}			
		}
		xhr.send("imgstr="+base64str);	
		return imgurl;
}

var Max_Width=200;//定义最高图片宽度为400，大于该值就进行压缩。

function setImagePreview(fileid,imgpre,canid,pressNum)
	{
		Max_Width=pressNum;
		var docObj = document.getElementById(fileid);
        var imgObjPreview = document.getElementById(imgpre);
			imgObjPreview.onload=function(){
				var newurl=DrawPictureInCanvas(imgpre,canid);				
			}	
			
            if (docObj.files && docObj.files[0]) {               
                imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
            }
				
            return true;
	}
	
	
	//将文件绘制到canvas上
	function DrawPictureInCanvas(imgid,canid)
	{
	//使用现有图片把文件转换到canvas上
		var imgpre=document.getElementById(imgid);	
		var imgnew=new Image();			
		imgnew.src=imgpre.src;
		//压缩图片		
		 if (imgnew.width > Max_Width) {
			// 宽度等比例缩放 *=
			imgnew.height *= Max_Width/imgnew.width;
			imgnew.width = Max_Width;			
        }
		var canvas=document.getElementById(canid);
		canvas.width=imgnew.width;
		canvas.height=imgnew.height;
		var can=canvas.getContext("2d");
		can.clearRect(0, 0, canvas.width, canvas.height);		
		can.drawImage(imgnew,0,0,imgnew.width,imgnew.height);	
		can.restore();
		//将canvas内容传回img对象
		var src=canvas.toDataURL("image/png");
		src=src.split(',')[1];
		return src;
		
	}
	
	