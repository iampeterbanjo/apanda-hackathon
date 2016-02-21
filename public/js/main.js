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

    var myLine = new Chart(document.getElementById("emotions").getContext("2d")).Bar(emotionData);


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


    var myLine = new Chart(document.getElementById("language").getContext("2d")).Bar(languageData);
});