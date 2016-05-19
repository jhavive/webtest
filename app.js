$(document).ready(function() {
	$('#fullpage').fullpage();
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
});