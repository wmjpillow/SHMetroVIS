function minsToTime(m){
    h=Math.floor(m/60);
    m=m%60;
    if(h<10){h="0"+h;}
    if(m<10){m="0"+m;}
    return h+":"+m;
}

// var timecircle=d3.select("#time")
//                 .append("circle")
//                 .attr("r",45)
//                 .attr("cx",50)
//                 .attr("cy",80)
//                 .style("stroke-width",2)
//                 .style("stroke","white");
               
