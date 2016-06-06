importScripts('decode.js');

var http = new XMLHttpRequest();
var timestamp = 0;
onmessage=function(details)
{
	timestamp = details.data.timestamp;
	console.log(details.data.timestamp);
	var strlang=details.data.language;
	var uid = generateUUID()||0; 
	var form = new FormData()||0;
	var file = blob;
	var uploader=new Uploader();
	var blob = uploader.blobToFile(details.data.data, "tmp_name.ogg");
	form.append('audio_file',blob,"tmp_name.ogg");
	form.append('app_rec_id', uid);
	form.append('user', "1");
	var s='2016-03-01T11:22:33';
	form.append('start_time',s);
	s='2016-03-01T11:22:33';
	form.append('end_time', s);
	form.append('recording_index', 1);
	form.append('language', strlang);
	
	var url = "https://app.liv.ai:7008/recordings/";
	var data = form;
	http.open("POST", url, true);
	http.setRequestHeader("Accept","*/*")
	http.setRequestHeader("Authorization", 'Token c4cc6b65648ac4f5fcb51f4662184564511d9d34');
	http.send(data);
};
var Uploader = function(){
	
};
Uploader.prototype.blobToFile=function(theBlob, fileName){
	//A Blob() is almost a File() - it's just missing the two properties below which we will add
	theBlob.lastModifiedDate = new Date();
	theBlob.name = fileName;
	return theBlob;
}
http.onreadystatechange = function() {//Call a function when the state changes.
	console.log(http.status);
	var wordCounter=0;
    if(http.readyState == 4 && http.status == 201) {
        //var txt = JSON.stringify(http.responseText);
        var response=JSON.parse(http.responseText);
		var s = response.utf_text;
		s = Base64DecodeUrl(s);
		s = Base64.decode(s);
		console.log(s);
		for(var looper=0;looper<s.length;looper++){
			if(s.charAt(looper)==' '){
				wordCounter++;
			}
		}
		var return_object={'id':response.app_rec_id,'text':s,'timestamp':timestamp,'wordCounter':wordCounter+1};
        self.postMessage(return_object);
    }
    else if(http.readyState == 4 && http.status != 201)
    {
    	self.postMessage("error");
    }
}