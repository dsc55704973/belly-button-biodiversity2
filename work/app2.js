// dropdown
function dropDown() {
    d3.json("data/samples.json").then(data => {
        data.names.forEach(x => {
            d3.select("#selDataset").append("option").text(x).attr("value", function() {
            return x;
            });
        });
    });
}
dropDown();


// grab json data
d3.json("data/samples.json").then((data) => {
    console.log(data);
    dropDown(data);
})

// plot function
function plotFunction(sampleID) {
    d3.json("data/samples.json").then((data) => {
        var filterData = data.samples.filter((sample) => sample.id==sampleID)[0];
        var value = (filterData.sample_values.reduce((a,b)=> a+b)/filterData.sample_values.length)/10;
        console.log(value);
        
        // bar graph
        barGraph = {
            x: filterData.sample_values.slice(0,10).reverse(),
            y: filterData.otu_ids.map((id) => `OTU ${id}`).slice(0,10).reverse(),
            text: filterData.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }
        Plotly.newPlot("bar", [barGraph])

        // bubble graph
        bubbleGraph = {
            type: "scatter",
            x: filterData.otu_ids,
            y: filterData.sample_values,
            mode: "markers",
            text: filterData.otu_labels,
            marker: {
                colorscale: "Earth",
                color: filterData.otu_ids,
                size: filterData.sample_values.map((sample) => sample/1.5)
            }
}
Plotly.newPlot("bubble", [bubbleGraph])


var gaugeVisual = [
    {
      domain: {x: [0, 1], y: [0, 1] },
      value: value,
      title: {text: "Belly Button Washing Frequency" },
      title: {text: "Scrubs per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: {range: [null, 10]},
        steps: [
          {range: [0, 1], color: "#ccffff"},
          {range: [1, 2], color: "#c4f7d9"},
          {range: [2, 3], color: "#bdf0b2"},
          {range: [3, 4], color: "#b5e88c"},
          {range: [4, 5], color: "#b0e373"},
          {range: [5, 6], color: "#abde59"},
          {range: [6, 7], color: "#a6d940"},
          {range: [7, 8], color: "#a1d426"},
          {range: [8, 9], color: "#9ed119"},
          {range: [9, 10], color: "#669900"}
        ],
      }
    }
  ];
var layout = {
    margin: {t: 0, b: 0}
};
Plotly.newPlot("gauge", gaugeVisual, layout);
})
};

function buildTable(sampleID) {
var table = d3.select("#sample-metadata")

d3.json("data/samples.json").then((data) => {
var filterData = data.metadata.filter((meta) => meta.id==sampleID)[0];
Object.entries(filterData).forEach(([meta_key, meta_value]) => {
    table.append("h5").text(`${meta_key}: ${meta_value}`);
})
})
};

function deleteCurrent() {
d3.select("#sample-metadata").selectAll("h5").remove();
}


plotFunction(940);
buildTable(940);
