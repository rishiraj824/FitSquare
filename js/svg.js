var polys = document.querySelectorAll('polygon,polyline');
[].forEach.call(polys,convertPolyToPath);

function convertPolyToPath(poly){
  var svgNS = poly.ownerSVGElement.namespaceURI;
  var path = document.createElementNS(svgNS,'path');
  var points = poly.getAttribute('points').split(/\s+|,/);
  var x0=points.shift(), y0=points.shift();
  var pathdata = 'M'+x0+','+y0+'L'+points.join(' ');
  if (poly.tagName=='polygon') pathdata+='z';
  path.setAttribute('d',pathdata);
  poly.parentNode.replaceChild(path,poly);
}
	var initial_ts = new Date().getTime();
	var duration = 2000; // this animation should last for 2 seconds
	var path = fetchPreparedSVGPath();
	var length = path.getTotalLength();

	path.style.strokeDasharray = length + ' ' + length; 
	path.style.strokeDashoffset = length;

	var draw = function() {
	   var progress = (Date.now() - initial_ts)/duration;
	   if (progress < 1) {
	     path.style.strokeDashoffset = Math.floor(length * (1 - progress));
	     setTimeout(draw, 50);
	   }
	};
	draw();