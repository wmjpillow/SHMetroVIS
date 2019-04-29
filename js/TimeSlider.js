
/*
  TimerSlider
*/

// Canvas and margin setting
var timerSVG=d3.select("#timerSVG");
	timerSVG.width=1000;
	timerSVG.height=100;
	timerSVG.attr("width",timerSVG.width).attr("height",timerSVG.height);
	timerSVG.margin = ({top: 20, right: 40, bottom: 60, left: 20});

var timerCanvas=timerSVG.append("svg").append("g").attr("id","timerCanvas");
	timerCanvas.width=timerSVG.width-timerSVG.margin.left-timerSVG.margin.right;
	timerCanvas.height=timerSVG.height-timerSVG.margin.top-timerSVG.margin.bottom;
	timerCanvas.attr("width",timerCanvas.width).attr("height",timerCanvas.height)
	           .attr("transform","translate("+timerSVG.margin.left+","+timerSVG.margin.top+")");

var sliderXscale=d3.scaleLinear()
                   .domain([300,1440])
                   .range([0,timerCanvas.width]);


//timer slider drawing
var SliderXAxis = d3.sliderBottom(sliderXscale).step(1).fill("grey")
    .on('start',function(){ if (moving==true){sliderdrag=true; timestep.stop();}  })
    .on('onchange', value => draw(value))
    .on('end',function(){
        sliderdrag=false;
        if (moving==true){
            timestep=d3.interval(function(){step()},intervalTime);
        }
        });

timerCanvas.append("g")
     .attr("transform", "translate(0," + timerCanvas.height+ ")")
     .call(SliderXAxis)
     .selectAll("line,path");

function draw(value){
     currentTime=value;
}




