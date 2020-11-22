
// dropdown menu

// put data into dropdown menu
function dropDown(){
    var newOption=d3.select('#selDataset');
    d3.json('../../samples.json').then(function(data){
    data['names'].forEach((name)=>{
        newOption.append('option').text(name).property('value',name);
    });
    });
};
dropDown();
// 1. Use the D3 library to read in `samples.json`.
function buildPlot() {
    // read JSON
    d3.json('../../samples.json').then(function(data){
        console.log(data);

        // create variables to use for plots
        var otu_ids = data.samples.map(d=>d.otu_ids[0]);
        var otu_labels = data.samples.map(d=>d.otu_labels[0]);
        var sample_values = data.samples.map(d=>d.sample_values[0]);
        console.log(otu_ids);
        console.log(otu_labels);
        console.log(sample_values);

// 2. Create a horizontal bar chart with a dropdown menu to 
// display the top 10 OTUs found in that individual.
        
        // input listener
        d3.selectAll("#selDataset").on("change", sliceFilter);
        // dropdown menu updates
        function sliceFilter() {
            // Use D3 to select the dropdown menu
            var dropdownMenu = d3.select("#selDataset");
            // Assign the value of the dropdown menu option to a variable
            var input = dropdownMenu.property("value");

    // filter and slice top 10
        // function to slice and filter to top 10
                return data.samples.otu_ids[0] == input;
            var filteredData = data.filter(sliceFilter);
            console.log(filteredData)

            var slicedData = filteredSamples.slice(0, 10);
            };

        // Reverse the array to accommodate Plotly's defaults
            // reversedData = slicedData.reverse();

        // data
        var trace1 = {
            type: "bar",
            height: 500,
            width: 1000,
            name: "Top 10 OTUs",
            x: sample_values,
            y: otu_ids,
            hover: otu_labels,
            orientation: "h"
        };

        var data = [trace1];

        // layout
        var layout = {
            title: `Sample Value by OTU`,
            xaxis: {title: "Sample Value"},
            yaxis: {title: "OTU ID Number"},
          };
        
        // build Plotly
        Plotly.newPlot("bar", [trace1], layout);

// * Use `sample_values` as the values for the bar chart.

// * Use `otu_ids` as the labels for the bar chart.

// * Use `otu_labels` as the hovertext for the chart.

// 3. Create a bubble chart that displays each sample.

        // data
        var trace2 = {
            type: "Bubble",
            name: "Top 10 OTUs",
            x: otu_ids,
            y: sample_values,
            height: 1000,
            width: 1000,
            marker: {
                size: sample_values,
            },
        };

        // layout
        var layout2 = {
            title: `Sample Value by OTU`,
            xaxis: {title: "Sample Value"},
            yaxis: {title: "OTU ID Number"},
        };

        // build Plotly
        Plotly.newPlot("bubble", [trace2], layout2);
    });

};
buildPlot();

// * Use `otu_ids` for the x values.

// * Use `sample_values` for the y values.

// * Use `sample_values` for the marker size.

// * Use `otu_ids` for the marker colors.

// * Use `otu_labels` for the text values.

// ![Bubble Chart](Images/bubble_chart.png)

// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// ![hw](Images/hw03.png)

// 6. Update all of the plots any time that a new sample is selected.

// Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:

// ![hw](Images/hw02.png)
