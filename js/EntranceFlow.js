//canvas
var margin={top:25, right:35, bottom:125, left:15},
  width=1500-margin.left,
  height=2500-margin.top-margin.bottom;
var svg1=d3.select("#chart").append("svg")
  .attr("width",1500)
  .attr("height",2500)
.append("g")

//geocanvas setting
var geo = d3.select("#fixed");
geo.width=450;
geo.height=750;
geo.attr("width",geo.width).attr("height",geo.height);
// geo.margin = ({top: 5, right: 5, bottom: 5, left: 5});
var geocanvas=geo.append("svg")
   .attr("width",geo.width).attr("height",geo.height);
geocanvas.width=geo.width;
geocanvas.height=geo.height;

//station image canvas
var imgsvg=d3.select("#img").append("svg")
       .attr("width",1500-margin.right)
       .attr("height",950)

//append div for tooltip on hover:
var div=d3.select("body").append("div")
      .attr("class","tooltip")
      .style("opacity",0);
var hightlight;
var geopoint=null;


//load data
d3.json('data/connections_by_station_name.json').then(function(d) {
    connections=d;
    // console.log(connections);

d3.json('data/stations_by_name.json').then (function(data){
  stationsraw=data;
  // console.log(stationsraw);
  var data=d3.keys(data)
      .map(function(d){
        return {"STATION":d,"LINE_NO":data[d].LINE_NO,"LAT":data[d].LAT,"LNG":data[d].LNG,"SERIAL_NO":data[d].SERIAL_NO,
        "ST_HORIZONTAL":data[d].ST_HORIZONTAL,"ST_NAME":data[d].ST_NAME,"ST_NAME_EN":data[d].ST_NAME_EN,"ST_NO":data[d].ST_NO,
        "TRANSFER_TAG":data[d].TRANSFER_TAG,"X":data[d].X,"Y":data[d].Y,"img":data[d].img}
      })
  data.sort(function(x,y){
    return d3.ascending(x.LINE_NO,y.LINE_NO);
  });
  stationline=d3.keys(data)
      .map(function(d){
        return {"INDEX":d,"STATION":data[d].STATION,"LINENO":data[d].LINE_NO,"LAT":data[d].LAT,"LNG":data[d].LNG,"SERIAL_NO":data[d].SERIAL_NO,
        "ST_HORIZONTAL":data[d].ST_HORIZONTAL,"ST_NAME":data[d].ST_NAME,"ST_NAME_EN":data[d].ST_NAME_EN,"ST_NO":data[d].ST_NO,
        "TRANSFER_TAG":data[d].TRANSFER_TAG,"X":data[d].X,"Y":data[d].Y,"img":data[d].img}
      })

  Drawstationline(stationline)
  Drawstationimg(stationline)
  Drawgeocanvas(stationline)
 
  //entry data
  d3.json('data/every5minute_entry0401_list.json').then (function(data){ 
       data=d3.keys(data)
          .map(function(d){
              return {"time":d,"stations":data[d]}
                          });
        // console.log(data);
       data.forEach(function(d,i){
            stations=d.stations
            stations=d3.keys(d.stations)
           .map(function(d){
            return {"index":d,"station":stations[d][0],"pop":stations[d][1],"id":stations[d][0],"time":i}
                           })
            stations.forEach(function(d,i){
           stationline.forEach(function(x,j){
               if(d.station==x.STATION){
                    d.index=x.INDEX    }
                                            })
                                          })
     DrawHeatmapRow(stations,i);
    hightlight=svg1.append('g')
              .attr("class","hightlightline")
              .style("display",'none');
    hightlight.append("line")
              .classed('x',true);
    hightlight.append("line")
              .classed('y',true);
                                    });
});

});
});

// Variables for colors and legend:
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
color1="#FFF9C4",
color2="#FFF176",
color3="#FFEB3B",
color4="#FDD835",
color5="#FFCA28",
color6="#FFB300",
color7="#FFA000",
color8="#FFA726",
color9="#FF9800",
color10="#F57C00",
color11="#EF6C00",
color12="#FF7043",
color13="#FF5722",
color14="#F4511E",
color15="#D84315",
color16="#EF5350",
color17="#F44336",
color18="#E53935",
color19="#B71C1C",
color20="#D81B60",
color21="#AD1457",
color22="#880E4F",
color23="#6A1B9A",
color24="#4A148C",
color25="#311B92",

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
  mediumaquamarine="#66DDAA",
  colors = [ "#05B89A", "#0B90B6", "#FFCE65", "#FFC039", "#FFC707", "#FF9339", "#FF6307", "#FF4739", "#FF1907", "960018" ],
  legendScale = ["0 - 3", "3 - 5.5", "5.5 - 6", "6 - 6.5", "6.5 - 7", "7 - 8.5", "8.5 - 9", "9 - 9.5", "9.5 - 10", "10+"];
//scale population to color
var colorScale=function(pop){
if(pop>=0 && pop<20){return color1;}
else if(pop>=20 && pop<40){return color2;}
else if(pop>=40 && pop<60){return color3;}
else if(pop>=60 && pop<80){return color4;}
else if(pop>=80 && pop<100){return color5;}
else if(pop>=100 && pop<125){return color6;}
else if(pop>=125 && pop<150){return color7;}
else if(pop>=150 && pop<175){return color8;}
else if(pop>=175 && pop<200){return color9;}
else if(pop>=200 && pop<225){return color10;}
else if(pop>=225 && pop<250){return color11;}
else if(pop>=250 && pop<275){return color12;}
else if(pop>=275 && pop<300){return color13;}
else if(pop>=300 && pop<400){return color14;}
else if(pop>=400 && pop<500){return color15;}
else if(pop>=500 && pop<600){return color16;}
else if(pop>=600 && pop<800){return color17;}
else if(pop>=800 && pop<1000){return color18;}
else if(pop>=1000 && pop<1200){return color19;}
else if(pop>=1200 && pop<1400){return color20;}
else if(pop>=1400 && pop<1600){return color21;}
else if(pop>=1600 && pop<1800){return color22;}
else if(pop>=1800 && pop<2000){return color23;}
else if(pop>=2000 && pop<2200){return color24;}
else if(pop>=2200 && pop<2400){return color25;}
};
//render the data in an svg
function DrawHeatmapRow(stations,i){
svg1.selectAll("svg1")
   .data(stations)
   .enter().append("rect")
   .attr("class","tile")
   .attr("x",x=i*4+300)
   .attr("y", function(d,j){ return y=d.index*8+40;})
   .attr("id",function(d){return d.id;})
   .attr("width",4)
   .attr("height",8)
   .attr("time",i)
   .attr("transform", "translate(0,-20)")
   .style("fill",function(d){return colorScale(d.pop);})
   .style("opacity",0.8)
   .attr("class","rect")
     .on("mouseover",function(d){
      mouseoverimg(stationline[+d.index]);
      mouseoverheat(d);
    var heatcover1=svg1.append("rect")
                    .attr("id","heatcover1")
                    .attr("x",400)
                    .attr("y",0)
                    .attr("width",d3.select(this).attr('x')-400)
                    .attr("height",d3.select(this).attr('y')-20)
                    .style("fill","rgb(30,30,30)")
                    .style("opacity",0.6)
    var heatcover2=svg1.append("rect")
                    .attr("id","heatcover2")
                    .attr("x",(+d3.select(this).attr('x')+4))
                    .attr("y",0)
                    .attr("width",1600-(+d3.select(this).attr('x')))
                    .attr("height",d3.select(this).attr('y')-20)
                    .style("fill","rgb(30,30,30)")
                    .style("opacity",0.6)
    var heatcover3=svg1.append("rect")
                    .attr("id","heatcover3")
                    .attr("x",400)
                    .attr("y",d3.select(this).attr('y')-12)
                    .attr("width",d3.select(this).attr('x')-400)
                    .attr("height",2388-(d3.select(this).attr('y')))
                    .style("fill","rgb(30,30,30)")
                    .style("opacity",0.6)
    var heatcover4=svg1.append("rect")
                    .attr("id","heatcover4")
                    .attr("x",(+d3.select(this).attr('x')+4))
                    .attr("y",d3.select(this).attr('y')-12)
                    .attr("width",1600-(+d3.select(this).attr('x')))
                    .attr("height",2388-(d3.select(this).attr('y')))
                    .style("fill","rgb(30,30,30)")
                    .style("opacity",0.6);
      handlemouseover(d); 
     })
     .on("mouseout",function(d){
      svg1.select("#heatcover1").remove();
      svg1.select("#heatcover2").remove();
      svg1.select("#heatcover3").remove();
      svg1.select("#heatcover4").remove();
      mouseoutimg(stationline[+d.index]);
      mouseoutheat(d);

     });

svg1.selectAll("body")
    .data(stations).enter()
    .append("text")
      .text(parseInt(i*5/60))
      .attr("x",x=156)
      .attr("y",y=-i*4+50)
      .style("text-anchor", "end")
      .style("font-family", "Avenir")
      .style("font-size",4.5)
      .style("fill","white")
      .attr("transform",function(d){return "translate(350,-150) rotate(90)"});
svg1.selectAll("body")
    .data(stations).enter()
    .append("text")
      .text(":")
      .attr("x",x=157.5)
      .attr("y",y=-i*4+50)
      .style("text-anchor", "middle")
      .style("font-family", "Avenir")
      .style("font-size",4.5)
      .style("fill","white")
      .attr("transform",function(d){return "translate(350,-150) rotate(90)"});
   svg1.selectAll("body")
    .data(stations).enter()
    .append("text")
      .text((i*5%60))
      .attr("x",x=159)
      .attr("y",y=-i*4+50)
      .style("text-anchor", "front")
      .style("font-family", "Avenir")
      .style("font-size",4.5)
      .style("fill","white")
      .attr("transform",function(d){return "translate(350,-150) rotate(90)"});
   
};
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


//Drawstationline()
function Drawstationline(stationline){

var circle= svg1.selectAll("body")
   .data(stationline)
   .enter().append("circle")
   .attr("cx",500)
   .attr("cy", function(d){ return d.INDEX*8+44;})
   .attr("id", function(d){ return d.ST_NAME_EN; })
   .attr("r",3.7)
   .attr("transform", "translate(0,-20)")
   .style("fill",function(d){return linecolor(d.LINENO);})
     .on("mouseover",function(d){
       d3.select(this).attr("r",6);
       d3.select(this).attr("opacity",1);
      
      mouseoverimg(d);
      handlemouseover(d);
     })
     .on("mouseout",function(d){
      mouseoutimg(d);
       d3.select(this).attr("r",3.7);
       d3.select(this).attr("opacity",1);
   
     });

  svg1.selectAll("body")
     .data(stationline)
       .enter().append("text")
      .text(function(d,i){return (d.LINENO+d.STATION)})
      .attr("x",495)
      .attr("y",function(d){ return (d.INDEX*8+47);})
      .attr("transform", "translate(0,-20)")
      .attr("text-anchor", "end")
      .style("font-family", "Avenir")
      .style("font-size",7)
      .style("fill","white");
}
var ImageRank=function(index){
if(index>=0 && index<41){return 1;}
else if(index>=41 && index<82){return 2;}
else if(index>=82 && index<123){return 3;}
else if(index>=123 && index<164){return 4;}
else if(index>=164 && index<205){return 5;}
else if(index>=205 && index<246){return 6;}
else if(index>=246 && index<287){return 7;}
else if(index=287){return 8;}
};

function  Drawstationimg(stationline){
  var imagemouse;
  var imgappend;
  var imgshadow1;
  var imgshadow2;
  var imgshadowL1;  var imgshadowL3;  var imgshadowL5;  
  var imgshadowL2;  var imgshadowL4;   var imgshadowL6;   
  var Row;
  function stationgeoxscale(d){
    return d3.scaleLinear()
             .domain([d3.min(d,function(d){return +d.LNG}),d3.max(d,function(d){return +d.LNG})])
             .range([0,400]);
   };
   function stationgeoyscale(d){
    return d3.scaleLinear()
             .domain([d3.min(d,function(d){return +d.LAT}),d3.max(d,function(d){return +d.LAT})])
             .range([400,0]);
   };
  var description= imgsvg.append("svg:text")
                          .attr('id',"description")
                          .attr('x', 30)
                          .attr('y', 635)
                          .text( "Data visualization plays an important role in urban data analysis that")
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",10)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 30)
                          .attr('dy', 20)
                          .text("has a huge impact on urban design and research. In this project,")
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",10)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 30)
                          .attr('dy', 20)
                          .text("Shanghai’s metro data is visualized and data on 2015/04/01 is chosen as an example.")
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",10)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 30)
                          .attr('dy', 20)
                          .text("Our target is to present ShangHai’s city streaming based on metros’ streaming.")
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",10)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 30)
                          .attr('dy', 20)
                          .text("And data is collected from ShangHai public transportation released from Shanghai government in 2015")
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",10)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 30)
                          .attr('dy', 20)
                          .text("We mainly focus on metro streaming and passenger streaming in different stations")
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",10)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 30)
                          .attr('dy', 20)
                          .text("along the timeline in a particular day. To provide more information for urban data analysis,")
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",10)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 30)
                          .attr('dy', 20)
                          .text("weather information at different times is added. What’s more is that the spatial division")
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",10)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 30)
                          .attr('dy', 20)
                          .text("is applied based on ShangHai administrative regions in order to reflect the relationship")
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",10)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 30)
                          .attr('dy', 20)
                          .text("between metros’ moving and regions’ functionalities.")
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",10)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 30)
                          .attr('dy', 20)
                          .text("This project aims to build a template for urban subway data visualization in China. ")
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",10)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 30)
                          .attr('dy', 20)
                          .text("We hope that citizens will have an overall understanding of metro streaming and urban")
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",10)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 30)
                          .attr('dy', 20)
                          .text("designers will get new insights from our product.")
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",10)
                          .style("fill","white")

  var images= imgsvg.selectAll("body")
   .data(stationline)
   .enter().append("svg:image")
                    .attr('id',function(d){return d.ST_NAME_EN;})
                    .attr('x', function(d){return ((d.INDEX%41)*35+30);})
                    .attr('y', function(d){return (ImageRank(d.INDEX)*70);})
                    .attr('width', 100)
                    .attr('height', 45)
                    .attr("row",function(d){return ImageRank(d.INDEX);})
                    .attr("rowNo",function(d){return (d.INDEX%41);})
                    .attr("xlink:href", function(d){return ("https://wmjpillow.github.io/SHMetroVIS/data/pic/"+d.img);})
                    .style("opacity",0.8)    
                    .on("mouseover",function(d){
                      imgRow=(d3.select(this).attr('row'));
                      imgRowNo=(d3.select(this).attr('rowNo'));
                      imgRowX=(d3.select(this).attr('x'));
                      imgappend = imgsvg.append("svg:image")
                          .attr('id',"StationImg")
                          .attr('x', (d.INDEX%41)*35-20)
                          .attr('y', ImageRank(d.INDEX)*70)
                          .attr('width', 100)
                    .attr('height', 45)
                    .attr("xlink:href","https://wmjpillow.github.io/SHMetroVIS/data/pic/"+d.img)
                    .style("pointer-events", "none");
                 
                    imgshadow1=imgsvg.append("rect")
                          .attr('id',"shadow1")
                          .attr('x', 30)
                          .attr('y', ImageRank(d.INDEX)*70)
                          .attr('class','shadow')
                          .attr('width', imgRowX-80)
                          .attr('height', 45)
                    imgshadow2= imgsvg.append("rect")
                          .attr('id',"shadow2")
                          .attr('x', (d.INDEX%41)*35+80)
                          .attr('y', ImageRank(d.INDEX)*70)
                          .attr('class','shadow')
                          .attr('width', 1435-imgRowX)
                          .attr('height', 45);
                
                  imgshadowL1=imgsvg.append("rect")
                          .attr('id',"shadowL1")
                          .attr('x', 30)
                          .attr('y', (ImageRank(d.INDEX)-1)*70)
                          .attr('class','shadowL1')
                          .attr('width', 1465)
                          .attr('height', 45);
                   imgshadowL2=imgsvg.append("rect")
                          .attr('id',"shadowL2")
                          .attr('x', 30)
                          .attr('y', (ImageRank(d.INDEX)+1)*70)
                          .attr('class','shadowL2')
                          .attr('width', 1465)
                          .attr('height', 45);
                   imgshadowL3=imgsvg.append("rect")
                          .attr('id',"shadowL3")
                          .attr('x', 30)
                          .attr('y', (ImageRank(d.INDEX)-2)*70)
                          .attr('class','shadowL3')
                          .attr('width', 1465)
                          .attr('height', 45);
                   imgshadowL4=imgsvg.append("rect")
                          .attr('id',"shadowL4")
                          .attr('x', 30)
                          .attr('y', (ImageRank(d.INDEX)+2)*70)
                          .attr('class','shadowL4')
                          .attr('width', 1465)
                          .attr('height', 45);
                  imgshadowL5=imgsvg.append("rect")
                          .attr('id',"shadowL5")
                          .attr('x', 30)
                          .attr('y', (ImageRank(d.INDEX)-3)*70)
                          .attr('class','shadowL5')
                          .attr('width', 1465)
                          .attr('height', 45);
                   imgshadowL6=imgsvg.append("rect")
                          .attr('id',"shadowL6")
                          .attr('x', 30)
                          .attr('y', (ImageRank(d.INDEX)+3)*70)
                          .attr('class','shadowL6')
                          .attr('width', 1465)
                          .attr('height', 45);

                 var  imgbig = imgsvg.append("svg:image")
                          .attr('id',"StationImgbig")
                          .attr('x', 30)
                          .attr('y', 620)
                          .attr('width', 600)
                    .attr('height', 270)
                    .attr("xlink:href","https://wmjpillow.github.io/SHMetroVIS/data/pic/"+d.img)
                    .style("pointer-events", "none");

                var  imgbigtext = imgsvg.append("svg:text")
                          .attr('id',"StationImgText")
                          .attr('x', 680)
                          .attr('y', 720)
                          .text( "Line Number:"+""+d.LINENO)
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",14)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 680)
                          .attr('dy', 20)
                          .text("Station Name:" +d.STATION)
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",14)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 680)
                          .attr('dy', 20)
                          .text("Station Name:" + d.ST_NAME_EN)
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",14)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 680)
                          .attr('dy', 20)
                          .text("Station Latitude:" + d.LAT)
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",14)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 680)
                          .attr('dy', 20)
                          .text("Station Longitude:" + d.LNG)
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",14)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x',680)
                          .attr('dy', 20)
                          .text("Transfer Tag:" + d.TRANSFER_TAG)
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",14)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 680)
                          .attr('dy', 20)
                          .text("FIRST_T_TIME:" )
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",14)
                          .style("fill","white")
                          .append('svg:tspan')
                          .attr('x', 680)
                          .attr('dy', 20)
                          .text("LAST_T_TIME:" )
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",14)
                          .style("fill","white")
                    .style("pointer-events", "none");
            var  imgbigline = imgsvg.append("line")
                          .attr('id',"StationImgbigline")
                          .attr('x1', 680)
                          .attr('y1', 680)
                          .attr('x2', 780)
                          .attr('y2', 680)
                          .attr("stroke",linecolor(d.LINENO))
                          .attr("stroke-width",5)
                          .attr("stroke-linecap", "round");
            var  imgbigcircle = imgsvg.append("circle")
                          .attr('id',"StationImgbigcircle")
                          .attr('r',7)
                          .attr('cx', 730)
                          .attr('cy', 680)
                          .style("fill",linecolor(d.LINENO));
               imgsvg.selectAll(".geostationcircle").style("opacity",0.2);
            var cover=imgsvg.append("rect")
                    .attr("id","cover")
                    .attr("x",1000)
                    .attr("y",570)
                    .attr("width",500)
                    .attr("height",500)
                    .style("fill","rgb(30,30,30)")
                    .style("opacity",0.7)
               var changeline= imgsvg.selectAll("body")
                .data(connections)
                .enter().append("line")
                .attr("id","changestationline")
                .attr("stroke",function(x,j){return linecolor(+x[2])})
                .attr("stroke-width",2.5)
                .attr("stroke-linecap", "round")
                .attr("x1", function(x,j) { if(x[2]==d.LINENO)
                {return stationgeox(+(stationsraw[x[0]].LNG))+1000; }})
                .attr("y1", function(x,j) { if(x[2]==d.LINENO)
                {return stationgeoy(+(stationsraw[x[0]].LAT))+570; }})
                .attr("x2", function(x,j) { if(x[2]==d.LINENO)
                {return stationgeox(+(stationsraw[x[1]].LNG))+1000; }})
                .attr("y2", function(x,j) { if(x[2]==d.LINENO)
                {return stationgeoy(+(stationsraw[x[1]].LAT))+570; }})
            var changecircle=imgsvg.append("circle")
                    .attr("id","changecircle")
                    .attr("r",7)
                    .attr("cx", stationgeox(+d.LNG)+1000)
                    .attr("cy", stationgeoy(+d.LAT)+570)
                    .style("fill", linecolor(d.LINENO))
                    })
                    .on("mouseout",imgmouseout)
  function imgmouseout(){
    imgsvg.select("#StationImg").remove();
    imgsvg.select("#StationImgbig").remove();
    imgsvg.select("#StationImgbigline").remove();
    imgsvg.select("#StationImgbigcircle").remove();
    imgsvg.select("#StationImgText").remove();
    imgsvg.select("#shadow1").remove();
    imgsvg.select("#shadow2").remove();
    imgsvg.select("#shadowL1").remove();
    imgsvg.select("#shadowL2").remove();
    imgsvg.select("#shadowL3").remove();
    imgsvg.select("#shadowL4").remove();
    imgsvg.select("#shadowL5").remove();
    imgsvg.select("#shadowL6").remove();
    imgsvg.selectAll(".geostationcircle").style("opacity",1);
    imgsvg.select("#changecircle").remove();
    imgsvg.select("#cover").remove();
    imgsvg.selectAll("#changestationline").remove();
  };

  //Railway Line
  var imgline= imgsvg.selectAll("body")
                       .data(stationline)
                       .enter().append("line")
                       .attr("x1",function(d){return ((d.INDEX%41)*35+30);})
                       .attr("y1",function(d){return (ImageRank(d.INDEX)*70+50);})
                       .attr("x2",function(d){return ((d.INDEX%41)*35+65);})
                       .attr("y2",function(d){return (ImageRank(d.INDEX)*70+50);})
                       .attr("id",function(d){return d.ST_NAME_EN;})
                       .attr("stroke",function(d){return linecolor(d.LINENO);})
                       .attr("stroke-width",2)
                       .attr("stroke-linecap", "round");
  imgsvg.selectAll("body")
     .data(stationline)
       .enter().append("text")
      .text(function(d){return d.STATION;})
      .attr("x",function(d){return ((d.INDEX%41)*35+40);})
      .attr("y",function(d){return (ImageRank(d.INDEX)*70+57);})
      .attr("text-anchor", "middle")
      .style("font-family", "Avenir")
      .style("font-size",5)
      .style("fill","white");

//stationGeoMap
   stationgeox=stationgeoxscale(stationline);
   stationgeoy=stationgeoyscale(stationline);
           imgsvg.selectAll("body")
                    .data(stationline)
                    .enter().append("circle")
                    .attr("id",function(d){return d.ST_NAME_EN;})
                    .attr("class","geostationcircle")
                    .attr("r",1.5)
                    .attr("cx",function(d){return stationgeox(+d.LNG)+1000})
                    .attr("cy",function(d){return stationgeoy(+d.LAT)+570})
                    .style("fill",function(d){return linecolor(d.LINENO)})
                    .style("opacity",1)
                    .on("mouseover",function(d){console.log(d);
                    console.log(this);})
          imgsvg.selectAll(".connection")
                .data(connections)
                .enter().append("line")
                .attr("class","stationconnect")
                .attr("id","geostationline")
                .attr("stroke",function(d){return linecolor(+d[2])})
                .attr("stroke-width",1)
                .attr("stroke-linecap", "round")
                .attr("x1", function(d) { return stationgeox(+(stationsraw[d[0]].LNG))+1000; })
                .attr("y1", function(d) { return stationgeoy(+(stationsraw[d[0]].LAT))+570; })
                .attr("x2", function(d) { return stationgeox(+(stationsraw[d[1]].LNG))+1000; })
                .attr("y2", function(d) { return stationgeoy(+(stationsraw[d[1]].LAT))+570; })
                .style("opacity",1)

                var metrotitle= imgsvg.append("svg:text")
                          .attr('id',"metrotitle")
                          .attr('x', 1300)
                          .attr('y', 620)
                          .text( "Shanghai Metro")
                          .attr("text-anchor", "front")
                          .style("font-family", "Avenir")
                          .style("font-size",12)
                          .style("fill","white")
};

function Drawgeocanvas(stationline){
  function geoxscale(d){
    return d3.scaleLinear()
             .domain([d3.min(d,function(d){return +d.LNG}),d3.max(d,function(d){return +d.LNG})])
             .range([0,350]);
   };
function geoyscale(d){
    return d3.scaleLinear()
             .domain([d3.min(d,function(d){return +d.LAT}),d3.max(d,function(d){return +d.LAT})])
             .range([350,0]);
   };
  geox=geoxscale(stationline);
  geoy=geoyscale(stationline);

          // console.log(connections)
           geocanvas.selectAll(".connection")
                .data(connections)
                .enter().append("line")
                .attr("class","fixedconnection")
                .attr("id",function(d){return d[0]+'-'+d[1]+"line"+d[2];})
                .attr("stroke",function(d){return linecolor(+d[2])})
                // .attr("stroke","white")
                .attr("stroke-width",0.9)
                .attr("stroke-linecap", "round")
                .style("opacity",1)
                .attr("x1", function(d) { return geox(+(stationsraw[d[0]].LNG))+30; })
                .attr("y1", function(d) { return geoy(+(stationsraw[d[0]].LAT))+50; })
                .attr("x2", function(d) { return geox(+(stationsraw[d[1]].LNG))+30; })
                .attr("y2", function(d) { return geoy(+(stationsraw[d[1]].LAT))+50; })
                .on("mouseover",function(d){
                      console.log(d);
                      console.log(this);
                      console.log(d3.select(this).attr('id'));
                      d3.select(this).attr('id')
                         .attr("stroke-width",3); 
                  
                      handlemouseover(d);
                        //  d3.select(this).attr("stroke-width",3);
                         d3.select(this).attr("opacity",1);})
                    .on("mouseout",function(d){
                        d3.select(this).attr("stroke-width",0.9);});

           geocanvas.selectAll(".GeoStationDot")
                    .data(stationline)
                    .enter().append("circle")
                    .attr("class","fixedGeoStationDot")
                    .attr("id", function(d){ return d.ST_NAME_EN; })
                    .attr("r",1.5)
                    .attr("cx",function(d){return geox(+d.LNG)+30})
                    .attr("cy",function(d){return geoy(+d.LAT)+50})
                    .style("fill",function(d){return linecolor(d.LINENO)})
                    .style("opacity",1)
                    .on("mouseover",function(d){
                      mouse=(d3.select(this).attr('id'));   
                      handlemouseover(d);
                         d3.select(this).attr("r",3);
                         d3.select(this).attr("opacity",1);
                     div.transition()
                        .duration(200)
                        .style("opacity",0.9);
                     div.html(d.ST_NAME+"<div>"+d.ST_NAME_EN+"<div>"+"Line:"+d.LINENO)
                        .style("left",(d3.event.pageX+7)+"px")
                        .style("top",(d3.event.pageY+18)+"px");      
                           })
                    .on("mouseout",function(d){
                        d3.select(this).attr("r",1.2);
                        d3.select(this).attr("opacity",0.5);
                         div.transition()
                            .duration(1000)
                            .style("opacity",0)});
};

function handlemouseover(d){
       geopoint=d.ST_NAME
      //  console.log(geopoint);
        stationline.forEach (function(x,j){
      if(x.ST_NAME==geopoint){
        console.log(x); 
      }
      });
}
function mouseoverheat(d){
  geocanvas.append("text")
             .attr('id',"heatappendtext")
             .attr('x',150)
             .attr('y',400)
             .style("fill","white")
             .style("font-size",13)
             .text("Entrance:")
  geocanvas.append("text")
             .attr('id',"heatappendtext")
             .attr('x',150)
             .attr('y',420)
             .style("fill","white")
             .style("font-size",13)
             .text("Number of People:"+d.pop)
  geocanvas.append("text")
             .attr('id',"heatappendtext")
             .attr('x',150)
             .attr('y',440)
             .style("fill","white")
             .style("font-size",13)
             .text("Time of the day:")
 geocanvas.append("text")
             .attr('id',"heatappendtext")
             .attr('x',245)
             .attr('y',440)
             .style("fill","white")
             .style("font-size",13)
             .text(parseInt(d.time*5/60))
  geocanvas.append("text")
             .attr('id',"heatappendtext")
             .attr('x',260)
             .attr('y',440)
             .style("fill","white")
             .style("font-size",13)
             .text(":")
 geocanvas.append("text")
             .attr('id',"heatappendtext")
             .attr('x',266)
             .attr('y',440)
             .style("fill","white")
             .style("font-size",13)
             .text((d.time*5%60))
}
function mouseoutheat(d){
  geocanvas.selectAll("#heatappendtext").remove();
}
function mouseoverimg(d){
  function geoxscale(d){
    return d3.scaleLinear()
             .domain([d3.min(d,function(d){return +d.LNG}),d3.max(d,function(d){return +d.LNG})])
             .range([0,350]);
   };
  function geoyscale(d){
    return d3.scaleLinear()
             .domain([d3.min(d,function(d){return +d.LAT}),d3.max(d,function(d){return +d.LAT})])
             .range([350,0]);
   };
  geox=geoxscale(stationline);
  geoy=geoyscale(stationline);
   var geocover=geocanvas.append("rect")
                    .attr("id","geocover")
                    .attr("x",0)
                    .attr("y",0)
                    .attr("width",450)
                    .attr("height",450)
                    .style("fill","rgb(30,30,30)")
                    .style("opacity",0.7)
    var geochangeline= geocanvas.selectAll(".connection")
                .data(connections)
                .enter().append("line")
                // .attr("class","stationconnect")
                .attr("id","geochangeline")
                .attr("stroke",function(x,j){return linecolor(+x[2])})
                .attr("stroke-width",1.8)
                .attr("stroke-linecap", "round")
                .attr("x1", function(x,j) { if(x[2]==d.LINENO)
                {return geox(+(stationsraw[x[0]].LNG))+30; }})
                .attr("y1", function(x,j) { if(x[2]==d.LINENO)
                {return geoy(+(stationsraw[x[0]].LAT))+50; }})
                .attr("x2", function(x,j) { if(x[2]==d.LINENO)
                {return geox(+(stationsraw[x[1]].LNG))+30; }})
                .attr("y2", function(x,j) { if(x[2]==d.LINENO)
                {return geoy(+(stationsraw[x[1]].LAT))+50; }})
    var geochangecircle=geocanvas.append("circle")
                    .attr("id","geochangecircle")
                    .attr("r",5)
                    .attr("cx", geox(+d.LNG)+30)
                    .attr("cy", geoy(+d.LAT)+50)
                    .style("fill", linecolor(d.LINENO))
   geocanvas.append("svg:image")
                    .attr('id',"stationIMG")
                    .attr('x', 25)
                    .attr('y',468)
                    .attr('width', 400)
                    .attr('height', 300)
                    .attr("xlink:href", "https://wmjpillow.github.io/SHMetroVIS/data/pic/"+d.img)
    geocanvas.append("text")
             .attr('id',"appendtext")
             .attr('x',25)
             .attr('y',720)
             .style("fill","white")
             .style("font-size",13)
             .text("Line"+d.LINENO+". "+d.ST_NAME_EN);
                   
}
function mouseoutimg(d){
  geocanvas.select("#stationIMG").remove();
  geocanvas.select("#appendtext").remove();
  geocanvas.select("#geocover").remove(); 
  geocanvas.select("#geochangecircle").remove();
  geocanvas.selectAll("#geochangeline").remove();
}