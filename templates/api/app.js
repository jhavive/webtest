window.AudioContext = window.AudioContext || window.webkitAudioContext;
		console.log("Aaye");
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		recorder = new Recorder({
				monitorGain: 0,
				numberOfChannels: 1,
				bitRate: 64000,
				encoderSampleRate: 16000
			});
		var recorderAvailable=false;
		var recordingIndex=0;
		var intervalTable=[];
		var recorder;
		var recordedtext="";
		var typedtext="";
		var sessionstarttime=0;
		var sessionstoptime=0;
		var recordingstarttime=0;
		var recordingstoptime=0;
		var totalrecording=0;
		var uploader=new Worker("Uploader.js");
		var wordCounter=0;
		var blobToFile=function(theBlob, fileName){
			//A Blob() is almost a File() - it's just missing the two properties below which we will add
			theBlob.lastModifiedDate = new Date();
			theBlob.name = fileName;
			return theBlob;
		}
		document.getElementById("switcher").addEventListener( "click", function clickEventHandler(){
			console.log(1);
			if(switcher.value=='Start'){
				if(!recorderAvailable){
					//console.log("To start");
					window.AudioContext = window.AudioContext || window.webkitAudioContext;
					navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
				}
				recorder.start();
				recorderAvailable=true;
				sessionstarttime=new Date().getTime();
				recordingstarttime=new Date().getTime();
			}
			else if(switcher.value=='Pause'){
				recorderAvailable=false;
				recorder.pause();		
				sessionstoptime=new Date().getTime();
				recordingstoptime=new Date().getTime();	
				totalrecording=totalrecording+(recordingstoptime-recordingstarttime);
				var temp=Math.round(totalrecording/1000);
				var hours = ("0"+(parseInt( temp / 3600 )%24)).slice(-2);
		    	var minutes = ("0"+(parseInt( temp / 60 )%60)).slice(-2);
		    	var seconds = ("0"+(temp%60)).slice(-2);
		    	var sessionrecording=(sessionstoptime-sessionstarttime);
		    	temp=Math.round(sessionrecording/1000);
		    	var hours = ("0"+(parseInt( temp / 3600 )%24)).slice(-2);
		    	var minutes = ("0"+(parseInt( temp / 60 )%60)).slice(-2);
		    	var seconds = ("0"+((temp%60))).slice(-2);
			}
			else if(switcher.value=='Resume'){
				recorder.resume();
				recorderAvailable=true;
				recordingstarttime=new Date().getTime();
				sessionstarttime=new Date().getTime();
				var myNode = document.getElementById("id");
				while (myNode.firstChild) {
				    myNode.removeChild(myNode.firstChild);
				}
			}
		});
		window.onclose = function()
		{
			recorder.stop();
		}
		window.onload = function(){
			$(document).ready(function() {
				$('#fullpage').fullpage();
			});
			var svg = document.getElementById("graph");
		    
		    for(var idx=0;idx<115;idx++){
		    	console.log("Graph");
		    	var rect = document.createElementNS("http://www.w3.org/2000/svg",'rect');
		    	temp = ((Math.random()*100)%200);
		    	rect.setAttribute('y',temp);
			    rect.setAttribute('x',(idx*12));
			    rect.setAttribute('width',9);
			    rect.setAttribute('height',200-temp);
			    //rect.setAttribute('height',(idx-svg.style.height));
			    rect.setAttribute('fill','#ecf4f9');
			    svg.appendChild(rect);
		    }
		    
			recorder.addEventListener( "start", function(e){
				console.log("chala");
				document.getElementById("status").innerHTML="Recording...";
				document.getElementById("switcher").src="../../images/stop.svg";
				switcher.value='Pause';
				recordingIndex++;
				var interval = setInterval(function(){
					recorder.pause();
				}, 7000);
				intervalTable.push(interval);
			});

			recorder.addEventListener( "pause", function(e){
				document.getElementById("status").innerHTML="Record";
				document.getElementById("switcher").src="../../images/mic.svg";
				for(var loop=0;loop<intervalTable.length;loop++){
					clearInterval(intervalTable[loop]);
				}
				if(!recorderAvailable){
					switcher.value='Resume';
					recorder.pause();
				}
				

			});

			recorder.addEventListener( "resume", function(e){
				document.getElementById("status").innerHTML="Recording...";
				document.getElementById("switcher").src="../../images/stop.svg";
				switcher.value='Pause';
				recordingIndex++;
				var interval = setInterval(function(){
					recorder.pause();
				}, 7000);
				intervalTable.push(interval);
			});

			recorder.addEventListener( "duration", function(e){
			});

			recorder.addEventListener( "streamError", function(e){
				$(".fadeMe").show();
			});

			recorder.addEventListener( "streamReady", function(e){
				$(".fadeMe").hide();
			});

			recorder.addEventListener( "dataAvailable", function(data){
				console.log(data);
				var e = document.getElementById("language");
				var strlang = e.options[e.selectedIndex].value;	
				uploader.postMessage({"data":data.detail,"language":strlang,"timestamp":data.timeStamp});
				if(recorderAvailable){
					recorder.resume();
					console.log(1);			
				}
				else{
					console.log(2);
				}
				if(recorder.state!="recording"){
				}
				else{
				}
			});
			uploader.addEventListener('message', function(e) {
				if(e.data!="error"){
					console.log(e);
					notes.value=notes.value+" "+e.data.text;
					wordCounter+=e.data.wordCounter;
					notes.scrollTop=notes.scrollHeight;
				}
				else{
				}
			}, false);

			recorder.initStream();
		} 