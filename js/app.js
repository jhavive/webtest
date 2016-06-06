$(document).ready(function() {
	$('#fullpage').fullpage();
	$left=1;
	for($i=1;$i<666;$i++){
	    var waves = document.createElement("li");  
	    var att = document.createAttribute("class");
	    att.value = "wave"+$i;
	    waves.setAttributeNode(att);
	    document.getElementById("waves").appendChild(waves);
	    /*$(".waves:nth-child("+$i+")").css("height",($i%50)*($i%50)+"px");
	    $(".waves:nth-child("+$i+")").css("left",""+($left+3)+"px");
	    $(".waves:nth-child("+$i+")").css("animation-duration","474ms");*/
	    var wavesSpan = document.createElement("span");  
	    att = document.createAttribute("class");
	    att.value = "waveSpan"+$i;
	    wavesSpan.setAttributeNode(att);
	    document.getElementById("wave"+$i).appendChild(wavesSpan);
	    $(".waveSpan"+$i).css("height",($i%50)*($i%50)+"px");
	    $(".waveSpan"+$i).css("width","1px");
	    $(".waveSpan"+$i).css("left",""+($left+3)+"px");
	    $(".waveSpan"+$i).css("background","#ffffff");
	    //$("waves").before($("Supercharge-your-eff")); 
	}
});