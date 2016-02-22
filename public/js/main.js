$(document).ready(function() {

    var emotionData = {
        labels: ["Anger", "Disgust", "Fear", "Joy", "Sadness"],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                data: [65, 59, 90, 81, 56]
            }
        ]
    }

    // var myLine = new Chart(document.getElementById("emotions").getContext("2d")).Bar(emotionData);


    var languageData = {
        labels: ["Analytical", "Confident", "Tentative"],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                data: [30,20,85]
            }
        ]
    }


    // var myLine = new Chart(document.getElementById("language").getContext("2d")).Bar(languageData);

    function $$(selector) {
      return document.querySelector(selector);
    }

    // Artists profile
    // create radar of highest traits
    function showRadar(traits, selector, label) {
      var labels = [], data = [], graph
          , traitsCanvas = $$(selector)
          , traitsCx = traitsCanvas.getContext('2d');

      traits.map(function(trait){
        labels.push(trait.name);
        data.push(trait.percentage * 100);
      });

      graph = {
        labels: labels
        , datasets: [
          {
            label: label
            , fillColor: "rgba(220,220,220,0.2)"
            , strokeColor: "rgba(220,220,220,1)"
            , pointColor: "rgba(220,220,220,1)"
            , pointStrokeColor: "#fff"
            , pointHighlightFill: "#fff"
            , pointHighlightStroke: "rgba(220,220,220,1)"
            , data: data
          }
        ]
      };

      var traitsChart = new Chart(traitsCx).Radar(graph, { responsive: true, barStrokeWidth: 2});
    }

    showRadar(highestTraits, '#highest-traits', "Highest traits");

    // 1 < value > 0
    function getColour(value) {
      var hue = ((1 - value) * 120).toString(10);
      return ['hsl(',hue,',100%,50%)'].join('');
    }

    // show polar chart of artist traits
    function showPolarArea(traits, selector) {
      var labels = [], data = [], graph = []
          , traitsCanvas = $$(selector)
          , traitsCx = traitsCanvas.getContext('2d')
          , traitsChart
          , traitsLegend = $$('.traits-legend');

      traits.map(function(trait) {
        graph.push({
          value: trait.percentage * 100
          , color: getColour(trait.percentage)
          , highlight: getColour(trait.percentage)
          , label: trait.name
        });
      });

      traitsChart = new Chart(traitsCx).PolarArea(graph, {responsive:true});

      traitsLegend.innerHTML = traitsChart.generateLegend();
    }
    showPolarArea(traits, '#traits');
});