

/****************sentiment analysis***********************/

function loadmap() {

	var w = 700;
    var h = 500;
    var left = Number((screen.width/2)-(w/2));
    var tops = Number((screen.height/2)-(h/2));
	window.open("./maps.html", '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+tops+', left='+left);

}
/********************************************************/

/*****************Line highChart*************************/

function loadGraph() {
	
	var w = 900;
    var h = 500;
    var left = Number((screen.width/2)-(w/2));
    var tops = Number((screen.height/2)-(h/2));
	window.open("./Line.html", '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+tops+', left='+left);

}

/*******************************************************/

/*****************waterfall chart************************/

function loadWaterfall(){
$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});

var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    padding = 0.3;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], padding);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(function(d) { return dollarFormatter(d); });
d3.select(".popUpDiv").html('<a class="b-close">x</a>'); 
	var chart = d3.select(".popUpDiv").append("svg").attr("width", "100%")/* .attr("width", width + margin.left + margin.right)*/.attr("height", height + margin.top + margin.bottom)./*style("background", "#fff").*/append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("timeZones.txt", type, function(error, data) {

  var cumulative = 0;
  for (var i = 0; i < data.length; i++) {
    data[i].start = cumulative;
    cumulative += data[i].value;
    data[i].end = cumulative;

    data[i].class = ( data[i].value >= 0 ) ? 'positive' : 'negative'
  }
  data.push({
    name: 'Total',
    end: cumulative,
    start: 0,
    class: 'total'
  });

  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.end; })]);

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  var bar = chart.selectAll(".bar")
      .data(data)
    .enter().append("g")
      .attr("class", function(d) { return "bar " + d.class })
      .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });

  bar.append("rect")
      .attr("y", function(d) { return y( Math.max(d.start, d.end) ); })
      .attr("height", function(d) { return Math.abs( y(d.start) - y(d.end) ); })
      .attr("width", x.rangeBand());

  bar.append("text")
      .attr("x", x.rangeBand() / 2)
      .attr("y", function(d) { return y(d.end) + 5; })
      .attr("dy", function(d) { return ((d.class=='negative') ? '-' : '') + ".75em" })
      .text(function(d) { return dollarFormatter(d.end - d.start);});

  bar.filter(function(d) { return d.class != "total" }).append("line")
      .attr("class", "connector")
      .attr("x1", x.rangeBand() + 5 )
      .attr("y1", function(d) { return y(d.end) } )
      .attr("x2", x.rangeBand() / ( 1 - padding) - 5 )
      .attr("y2", function(d) { return y(d.end) } )
});

function type(d) {
  d.value = +d.value;
  return d;
}

function dollarFormatter(n) {
  n = Math.round(n);
  var result = n;
  if (Math.abs(n) > 1000) {
    result = Math.round(n/1000) + 'K';
  }
  return result;
}
}
/*************************************************************/

/***************************pie chart************************/

function loadPie(){
	$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
	var width = 1000, height = 500, radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
    .range(["#00fff0","#ec00ff","#00aaff","#d1ff00","#ff0093"]);
	

	var arc = d3.svg.arc().outerRadius(radius - 5).innerRadius(0);

	var pie = d3.layout.pie().sort(null).value(function(d) {
		return d.value;
	});
	d3.select(".popUpDiv").html('<a class="b-close">x</a>'); 
	var svg = d3.select(".popUpDiv").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	d3.csv("IPhoneTweets.txt", function(error, data) {

		data.forEach(function(d) {
			d.value = +d.value;
		});
		var g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");

		g.append("path").attr("d", arc).style("fill", function(d) {
			return color(d.data.key);
		});

		g.append("text").attr("transform", function(d) {
			return "translate(" + arc.centroid(d) + ")";
		}).attr("dy", ".35em").style("text-anchor", "end").text(function(d) {
			return d.data.key;
		});
	});



}


function loadPieWeb(){
	$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
	var width = 1000, height = 500, radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
    .range(["#00fff0","#ec00ff","#00aaff","#d1ff00","#ff0093"]);

	var arc = d3.svg.arc().outerRadius(radius - 5).innerRadius(0);

	var pie = d3.layout.pie().sort(null).value(function(d) {
		return d.value;
	});
	d3.select(".popUpDiv").html('<a class="b-close">x</a>'); 
	var svg = d3.select(".popUpDiv").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	d3.csv("webtweets.txt", function(error, data) {

		data.forEach(function(d) {
			d.value = +d.value;
		});
		var g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");

		g.append("path").attr("d", arc).style("fill", function(d) {
			return color(d.data.key);
		});

		g.append("text").attr("transform", function(d) {
			return "translate(" + arc.centroid(d) + ")";
		}).attr("dy", ".35em").style("text-anchor", "end").text(function(d) {
			return d.data.key;
		});
	});



}
/*****************************************************************/

/*********************donut chart ********************************/

function loadDonut() {
	$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
	var width = 1000, height = 500, radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
	.range(["#00fff0","#ec00ff","#00aaff","#d1ff00","#ff0093"]);
   
	var arc = d3.svg.arc().outerRadius(radius - 5).innerRadius(100);

	var pie = d3.layout.pie().sort(null).value(function(d) {
		return d.value;
	});
	d3.select(".popUpDiv").html('<a class="b-close">x</a>'); 
	var svg = d3.select(".popUpDiv").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	d3.csv("androidtweets.txt", function(error, data) {

		data.forEach(function(d) {
			d.value = +d.value;
		});
		var g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");

		g.append("path").attr("d", arc).style("fill", function(d) {
			return color(d.data.key);
		});

		g.append("text").attr("transform", function(d) {
			return "translate(" + arc.centroid(d) + ")";
		}).attr("dy", ".35em").style("text-anchor", "end").text(function(d) {
			return d.data.key;
		});
	});
}

/********************************************************/

/******************Word Cloud ********************************/

function loadFontCloud() {
	$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
		var fill = d3.scale.category20();
		d3.csv("trends_names.txt", function(data) {
		data.forEach(function(d) {
			d.size = +d.size;
		});

		d3.layout.cloud().size([900, 600]).words(data).padding(5).rotate(function() {
			return ~~(Math.random() * 2) * 90;
		}).font("Impact").fontSize(function(d) {
			return Math.max(15, Math.min(d.size, d.size-150,60));
		}).on("end", draw).start();

		function draw(words) {
			d3.select(".popUpDiv").html('<a class="b-close">x</a>'); 
			d3.select(".popUpDiv").append("svg").attr("width", 600).attr("height", 600).append("g").attr("transform", "translate(300,300)").selectAll("text").data(data).enter().append("text").style("font-size", function(d) {
				return d.size + "px";
			}).style("font-family", "Impact").style("fill", function(d, i) {
				return fill(i);
			}).attr("text-anchor", "middle").attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			}).text(function(d) {
				return d.text;
			});
		}

	});
}

/**********************************************************/

/********************Bar Graph***************************/

function loadBarGraph(){
$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
	var margin = {
		top : 20,
		right : 20,
		bottom : 30,
		left : 50
	}, width = 960 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;

	var parseDate = d3.format("");

	var x = d3.scale.ordinal().rangeRoundBands([0, width], .3);

	var y = d3.scale.linear().range([height, 0]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	var yAxis = d3.svg.axis().scale(y).orient("left");

	
	d3.select(".popUpDiv").html('<a class="b-close">x</a>');

var svg = d3.select(".popUpDiv").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("TypesOfMovies.txt", function(error, data) {

    data.forEach(function(d) {
        d.value = +d.value;
    });
	
  x.domain(data.map(function(d) { return d.key; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
	  .attr("y", 20)
	  .attr("x", 25);
      
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)" )
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Movies");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "#29088A")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

});
}


function loadBarGraph1(){
$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
	var margin = {
		top : 20,
		right : 20,
		bottom : 30,
		left : 50
	}, width = 960 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;

	var parseDate = d3.format("");

	var x = d3.scale.ordinal().rangeRoundBands([0, width], .3);

	var y = d3.scale.linear().range([height, 0]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	var yAxis = d3.svg.axis().scale(y).orient("left");


	d3.select(".popUpDiv").html('<a class="b-close">x</a>');

var svg = d3.select(".popUpDiv").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("languages.txt", function(error, data) {

    data.forEach(function(d) {
        d.value = +d.value;
    });

  x.domain(data.map(function(d) { return d.key; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
	  .attr("y", 20)
	  .attr("x", 25);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)" )
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Movies");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "#29088A")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

});
}


/************************************************************/

/*************************User Profile*****************/



/*********************************************************/

/**********************HighMaps***************************/



/**********************************************************/

/*
-------------------------References-----------------
1.Pie Chart: http://bl.ocks.org/mbostock/3887235
2.WaterFall: http://bl.ocks.org/rsloan/7123450
3.Word Cloud: http://bl.ocks.org/ericcoopey/6382449
4.Donut: http://bl.ocks.org/mbostock/3887193
5.Line: http://www.highcharts.com/demo/line-basic/gray
6.Bubble: http://bl.ocks.org/phuonghuynh/54a2f97950feadb45b07
7.Bar: http://bl.ocks.org/mbostock/3885304
8.Map: http://www.highcharts.com/maps/demo/data-class-ranges

*/