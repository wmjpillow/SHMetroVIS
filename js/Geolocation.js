
/*
  Geolocation
*/
//Canvas and margin setting
var geo = d3.select("#geo");
	geo.width=950;
	geo.height=850;
	geo.attr("width",geo.width).attr("height",geo.height);
	geo.margin = ({top: 5, right: 5, bottom: 5, left: 5});

var geocanvas=geo.append("svg").append("g");
	geocanvas.width=geo.width-geo.margin.left-geo.margin.right;
	geocanvas.height=geo.height-geo.margin.top-geo.margin.bottom;
	geocanvas.attr("width", geocanvas.width)
	         .attr("height", geocanvas.height)
	         .attr("transform","translate("+geo.margin.left+","+geo.margin.top+")");

//Color Setting
var mint = "#05B89A",
  teal = "#0B90B6",
  corn = "#FFCE65",
  yellow = "#FFC039",
  gold = "#FFC707",
  orange = "#DC7633",
  sun = "#FF6307",
  heart = "#FF4739",
  red = "#F44336",
  hot = "960018",
  lawngreen="#D4E157",
  rebeccapurple="#663399",
  mediumslateblue="#7b68ee",
  orchid="#F06292",
  blue="#4169E1",
  lightskyblue="#87cefa",
  mediumpurple="#9370db",
  saddlebrown="#5D4037",
  green="#388E3C",
  lightpink="#FFCDD2",
  mediumaquamarine="#66DDAA";

var linecolor=function(LINENO){
 if(LINENO==1){return red;}
 else if(LINENO==2){return lawngreen;}
 else if(LINENO==3){return yellow;}
 else if(LINENO==4){return rebeccapurple;}
 else if(LINENO==5){return mediumslateblue;}
 else if(LINENO==6){return orchid;}
 else if(LINENO==7){return orange;}
 else if(LINENO==8){return blue;}
 else if(LINENO==9){return lightskyblue;}
 else if(LINENO==10){return mediumpurple;}
 else if(LINENO==11){return saddlebrown;}
 else if(LINENO==12){return green;}
 else if(LINENO==13){return lightpink;}
 else if(LINENO==16){return mediumaquamarine;}
};

// X and Y scale setting
function geoxscale(d){
    return d3.scaleLinear()
             .domain([d3.min(d,function(d){return +d.LNG}),d3.max(d,function(d){return +d.LNG})])
             .range([0,geocanvas.width]);
}
function geoyscale(d){
    return d3.scaleLinear()
             .domain([d3.min(d,function(d){return +d.LAT}),d3.max(d,function(d){return +d.LAT})])
             .range([geocanvas.height,0]);
}
//Draw basic circles indicating stations
function drawStationCircles(canvas,xscale,yscale,data){
	canvas.selectAll(".StationCircle")
	         .data(data)
	         .enter().append("circle")
	         .attr("class","StationCircle")
	         .attr("id", function(d){ return d.ST_NAME_EN; })
	         .attr("r",1)
	         .attr("cx",function(d){return xscale(+d.LNG)})
	         .attr("cy",function(d){return yscale(+d.LAT)})
	          // .style("fill",function(d){return cscale(d.LINE_NO)})
	         .style("fill","grey")
	         .style("fill-opacity","0.5")
	         // .style("stroke",function(d){return cscale(d.LINE_NO)})
	         .style("stroke","grey")
	         .style("stroke-opacity","1")
}

//Draw basic connections between stations
function drawConnections(canvas,xscale,yscale,ConnectionData,StationData){
	canvas.selectAll(".ConnectionLine")
		.data(ConnectionData)
		.enter().append("line")
		.attr("class","ConnectionLine")
		.attr("id",function(d){return d[0]+'-'+d[1]+"line"+d[2];})
		// .attr("stroke",function(d){return cscale(+d[2])})
		.attr("stroke","grey")
		.attr("stroke-width", "0.7")
		.attr("stroke-linecap", "round")
		.attr("x1", function(d) { return xscale(+(StationData[d[0]].LNG)); })
		.attr("y1", function(d) { return yscale(+(StationData[d[0]].LAT)); })
		.attr("x2", function(d) { return xscale(+(StationData[d[1]].LNG)); })
		.attr("y2", function(d) { return yscale(+(StationData[d[1]].LAT)); });


}

function mapUpdate(lineID,d,time,stationsWithIndex){
    /*
    Input data: Array(n), n denotes the # of metro on the line at this moment.
    Element in Array(n): [nowTime, startTime, [[station i, station i+1], position] ,people#] 
    */
    var size=1.5
    var t = d3.transition().duration(time);
    //Here, d[1] denotes the start time in second.
    var circle= geocanvas.selectAll(".metrocircle"+lineID)
              .data(d,function(d){a=[d[1],d[3],d[4],d[5]]; return a});
    //Exit and remove old elements
    circle.exit().transition(t)
        .attr("class","exit")
        .attr("r",0)
        .style('fill-opacity', 1e-6)
        .remove();
    //Enter new elements as needed
    circle.enter().append("circle")
                .attr("id",function(d){return "circle"+d[1]})
                .attr("class","metroCircle"+lineID + " metroCircle")
                .attr("cx",function(d){return metroCircleX(d[2],d[5],stationsWithIndex)} )
                .attr("cy",function(d){return metroCircleY(d[2],stationsWithIndex)} )
                .attr("r",size)
                .style("fill",function(d){return linecolor(d[3])});

    //Update old elements as needed
    circle.transition(t)
        .attr("cx",function(d){return metroCircleX(d[2],d[5],stationsWithIndex)} )
        .attr("cy",function(d){return metroCircleY(d[2],stationsWithIndex)} )
        .attr("r",size);

}

var metroCircleScale=d3.scaleLinear()
     .domain([0,1600])
     .range([2,8]);

function metroCircleX(d,direction,stationsraw){
    startStation=d[0][0];
    endStation=d[0][1];
    p=+d[1];
    start=geox(+(stationsraw[startStation].LNG));
    end=geox(+(stationsraw[endStation].LNG));
    result = start+p*(end-start);
    if (direction=='f'){return result-0.5}
    else{return result+0.5};
    // return start+p*(end-start);
}
function metroCircleY(d,stationsraw){
    startStation=d[0][0];
    endStation=d[0][1];
    p=+d[1];
    start=geoy(+(stationsraw[startStation].LAT));
    end=geoy(+(stationsraw[endStation].LAT));
    return start+p*(end-start);
}








