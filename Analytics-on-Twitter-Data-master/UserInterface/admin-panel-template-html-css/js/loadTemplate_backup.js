/*************** for  pie chart ********************************/
function loadSVG() {
	$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
	var width = 1000, height = 500, radius = Math.min(width, height) / 2;

	var color = d3.scale.category20c();

	var arc = d3.svg.arc().outerRadius(radius - 5).innerRadius(100);

	var pie = d3.layout.pie().sort(null).value(function(d) {
		return d.count;
	});
	d3.select(".popUpDiv").html('<a class="b-close">x</a>'); 
	var svg = d3.select(".popUpDiv").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	d3.csv("language.txt", function(error, data) {

		data.forEach(function(d) {
			d.count = +d.count;
		});
		var g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");

		g.append("path").attr("d", arc).style("fill", function(d) {
			return color(d.data.language);
		});

		g.append("text").attr("transform", function(d) {
			return "translate(" + arc.centroid(d) + ")";
		}).attr("dy", ".35em").style("text-anchor", "end").text(function(d) {
			return d.data.language;
		});
	});
}

/***************  pie chart End ********************************/
/***************  Graph ********************************/
function loadGraph() {
	$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
	var margin = {
		top : 20,
		right : 20,
		bottom : 30,
		left : 50
	}, width = 960 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%H:%M:%S").parse;

	var x = d3.time.scale().range([0, width]);

	var y = d3.scale.linear().range([height, 0]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	var yAxis = d3.svg.axis().scale(y).orient("left");

	var line = d3.svg.line().x(function(d) {
		return x(d.time);
	}).y(function(d) {
		return y(d.count);
	});
	d3.select(".popUpDiv").html('<a class="b-close">x</a>'); 
	var svg = d3.select(".popUpDiv").append("svg").attr("width", "100%")/* .attr("width", width + margin.left + margin.right)*/.attr("height", height + margin.top + margin.bottom)./*style("background", "#fff").*/append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("date.txt", function(error, data) {
		data.forEach(function(d) {
			d.time = parseDate(d.time);
			d.count = +d.count;
		});

		x.domain(d3.extent(data, function(d) {
			return d.time;
		}));
		y.domain(d3.extent(data, function(d) {
			return d.count;
		}));

		svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

		svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Tweet Count");

		svg.append("path").datum(data).attr("class", "line").attr("d", line);
	});
}

/***************  Graph End ********************************/
/***************  Google Maps ********************************/
function initialize() {

	var myLatlng = new google.maps.LatLng(+16.1011, +80.49);
	var csvUrl = "location.txt";
	var mapOptions = {
		zoom : 3,
		center : myLatlng
	}
	//d3.select("#loadingVisual").html("");      /* using the same div for carousel 1,2,4 */
	//d3.select(".popUpDiv").style("display", "block"); 
	d3.select("#popUpDiv").html('<a class="b-close">x</a>'); 
	var map = new google.maps.Map(document.getElementById('popUpDiv'), mapOptions);
	var csvHttp = new JKL.ParseXML.CSV(csvUrl);
	var csvData = csvHttp.parse();
	for(var i = 0; i < csvData.length; i++) {
		var officeLocationLatLng = new google.maps.LatLng(csvData[i][1], csvData[i][0]);
		var marker = new google.maps.Marker({
			position : officeLocationLatLng,
			map : map,
			title : csvData[i][0],
			//icon: image,
			//shadow: shadow
		});
	}
	/*var marker = new google.maps.Marker({
	 position: myLatlng,
	 map: map,
	 title: 'Hello World!'
	 });*/
}

function loadMap() {
	$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
	// google.maps.event.addDomListener(window, 'load', initialize);
	initialize();
}

/***************  Google Maps End ********************************/
/***************  Fonts ********************************/
function loadFonts() {
	$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
		var fill = d3.scale.category20();
		d3.csv("data.csv", function(data) {
		data.forEach(function(d) {
			d.size = +d.size;
		});

		d3.layout.cloud().size([900, 600]).words(data).padding(5).rotate(function() {
			return ~~(Math.random() * 2) * 90;
		}).font("Impact").fontSize(function(d) {
			return Math.max(8, Math.min(d.size, d.size-300,50));
		}).on("end", draw).start();

		function draw(words) {
			d3.select(".popUpDiv").html('<a class="b-close">x</a>'); 
			//d3.select("#map-canvas").style("display", "none");   /* hiding the maps div while displaying remaining carousels */
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

/***************  Fonts End ********************************/

function loadPopUp(){
	$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
		d3.select(".popUpDiv").html('<a class="b-close">x</a><div class="carousel"><ul><li><img src="images/1.jpg" alt="Fish"/></li><li><img src="images/2.jpg" alt="Elephant"/></li><li><img src="images/3.jpg" alt="Giraffe"/></li><li><img src="images/4.jpg" alt="Penguins"/></li><li><img src="images/5.jpg" alt="Penguins"/></li><li><img src="images/6.jpg" alt="Penguins"/></li><li><img src="images/7.jpg" alt="Penguins"/></li><li><img src="images/8.jpg" alt="Penguins"/></li><li><img src="images/9.jpg" alt="Penguins"/></li><li><img src="images/10.jpg" alt="Penguins"/></li></ul></div>'); 
		$(".carousel ul").each(function(){
			// Set the interval to be 10 seconds
			var t = setInterval(function(){
				$(".carousel ul").animate({marginLeft:-480},1000,function(){
					// This code runs after the animation completes
					$(this).find("li:last").after($(this).find("li:first"));
					// Now we've taken out the left-most list item, reset the margin
					$(this).css({marginLeft:0});
				})
			},2000);
		});
}
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

d3.csv("part-00001.txt", function(error, data) {

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
	  .attr("x", 16);
      
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)" )
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Tweet Count");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "pink")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

});
}

