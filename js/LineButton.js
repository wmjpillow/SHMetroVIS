
LineButtonGroup=d3.select("#LineButtonGroup")
                  .attr("width",100)
                  .attr("height",500);
LineIDs=[1,2,3,4,5,6,7,8,9,10,11,12,13,16];
LineIDs.forEach(function(id,i){
     button=LineButtonGroup.append("g").attr("active","false");
     button.append("circle")
          .attr("id", "LineButton"+id)
          .attr("r",15)
          .attr("cx",50)
          .attr("cy",20+35*i)
          //.style("fill",function(d){return linecolor(id)})
          .style("fill","grey")
          .style("fill-opacity","1");
          
     button.append("text")
          .text(id)
          .attr('x',50)
          .attr('y',27.5+35*i)
          .attr("font-size", "20px")
          .attr("text-anchor","middle")
          .attr("fill","white");

     button.on("click",function(){
               button = d3.select(this);
               circle=button.select("circle");
               active= button.attr("active");
               circle.style("fill",function(){
                    if(active=="true"){
                         button.attr("active","false"); 
                         Activation.splice(Activation.indexOf(id),1);
                         geocanvas.selectAll(".metrocircle"+id).remove();
                         return "grey"} 
                    else{
                         button.attr("active","true"); 
                         Activation.push(id); 
                         return linecolor(id)} });

               readAndRun();
             });
   
});
