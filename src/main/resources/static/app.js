/**
 * http://www.mydlq.club/article/86/
 */
//stomp客戶端
var stompClinet=null;
//endpoint
var SOCKET_ENDPOINT="/an";
//SUBSCRIBE
var SUBSCRIBE_PREFIX="/yin";
//訂閱消息的請求地址
var SUBSCRIBE="";
//server端點，訪問server哪個接口
var SEND_ENDPOINT="/ap/tt";

//conn方法
function connect(){
	//設置socket
	var socket=new SockJS(SOCKET_ENDPOINT);
	//配置STOMP客戶端
	stompClinet=Stomp.over(socket);
	//STOMP客戶端連接
	stompClinet.connect({},function(frame){
		alert("Conn OK!");
	});	
}

//訂閱訊息
function subscribeSocket(){
	//$("#btn").val() 取得HTML發送的input中的值""中要放#ID名
	SUBSCRIBE=SUBSCRIBE_PREFIX+$("#subscribe").val();
	//把位置秀給用戶看
	alert("訂閱位置:"+SUBSCRIBE);
	//執行訂閱位置
	stompClinet.subscribe(SUBSCRIBE,function(responseBody){
		var receiveMessage =JSON.parse(responseBody.body);
		$("#information").append("<tr><td>"+receiveMessage.content+"</td></tr>");
		//<tbody id="information"></tbody>
	})
}

//連線中斷
function disconnect(){
	stompClinet.disconnect(function(){
		alert("Conn break!")
	});
}

//發送消息並指定連線位置。(此例的目標地址設為訂閱位置。但也可以設置其他地址)
function sendMessageNoParameter(){
	//設置訊息
	var sendContent=$("#content").val();
	//設置待發送的訊息
	var message = '{"destination": "'+SUBSCRIBE+'", "content": "'+ sendContent+'"}';
	//發送訊息
	stompClinet.send(SEND_ENDPOINT,{},message);
}