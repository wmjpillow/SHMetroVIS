
var currentTime=400;
time=350;
intervalTime=250;
var Activation = [];

MetroFlowData={};
LineIDs.forEach(function(id){
	d3.json('data/position/Line'+id+'.json').then(function(d) {
                MetroFlowData[id]=d;
         
        })
});

d3.json('data/connections_by_station_name.json').then(function(d) {
	connections=d;
	d3.json('data/stations_by_name.json').then(function(d){
		stations=d3.values(d);
        stationsWithIndex=d;
		geox=geoxscale(stations);
        geoy=geoyscale(stations);
        drawStationCircles(geocanvas,geox,geoy,stations);
        drawConnections(geocanvas,geox,geoy,connections,stationsWithIndex);
	})
});


function readAndRun(){              
        try{timestep.stop();
        	// geocanvas.selectAll(".metrocircle").remove();
        }catch{}
        
		timestep=d3.interval(function(){currentTime=run(currentTime)},intervalTime);
        

}

function run(i){
	try{ 
		Activation.forEach(function(lineID){
			Metro=MetroFlowData[lineID];
			mapUpdate(lineID,Metro[i],time,stationsWithIndex);
		});
	} catch{}
	d3.select("#time").node().innerHTML=minsToTime(i);
	SliderXAxis.value(i);
	i=i+1;
	if(i>1418){i=350}
 	return i;
}
