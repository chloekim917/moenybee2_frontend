// var ctx = document.getElementById('chart').getContext('2d');
// var w = 1000, h = 800, maxR = 10, numItems = 500;

// var chart = new Chart(ctx, {
//   type: 'bubble',
//   // type: 'bar',
//   // type: 'doughnut',
//   // type: 'line',
//   options: {
//     legend: {
//       display: false
//     }
//   },
//   data: {
//     datasets: [
//       {
//         data: [],
//       }
//     ]
//   }
// });

// function getData(numItems) {
//   let data = [];
  
//   for(var i = 0; i < numItems; i++) {
//     data.push({
//       x: w * Math.random(),
//       y: h * Math.random(),
//       r: maxR * Math.random()
//     });
//   }
  
//   return data;
// }

// function updateChart(data) {
//   chart.data.datasets[0].data = data;
//   chart.update();
// }

// updateChart(getData(numItems));

// document.getElementById('num-items-input').addEventListener('change', function(e) {
//   numItems = +e.target.value;
//   updateChart(getData(numItems));
// });

// document.getElementById('update-button').addEventListener('click', function() {
//   updateChart(getData(numItems));
// });



// // For a pie chart
// var myPieChart = new Chart(ctx, {
//   type: 'pie',
//   data: data,
//   options: options
// });
// // And for a doughnut chart
// var myDoughnutChart = new Chart(ctx, {
//   type: 'doughnut',
//   data: data,
//   options: options
// });


var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

var config = {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
      ],
      backgroundColor: [
        window.chartColors.red,
        window.chartColors.orange,
        window.chartColors.yellow,
        window.chartColors.green,
        window.chartColors.blue,
      ],
      label: 'Dataset 1'
    }],
    labels: [
      'Red',
      'Orange',
      'Yellow',
      'Green',
      'Blue'
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart'
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  }
};

window.onload = function() {
  var ctx = document.getElementById('chart-area').getContext('2d');
  window.myDoughnut = new Chart(ctx, config);
};

document.getElementById('randomizeData').addEventListener('click', function() {
  config.data.datasets.forEach(function(dataset) {
    dataset.data = dataset.data.map(function() {
      return randomScalingFactor();
    });
  });

  window.myDoughnut.update();
});

var colorNames = Object.keys(window.chartColors);
document.getElementById('addDataset').addEventListener('click', function() {
  var newDataset = {
    backgroundColor: [],
    data: [],
    label: 'New dataset ' + config.data.datasets.length,
  };

  for (var index = 0; index < config.data.labels.length; ++index) {
    newDataset.data.push(randomScalingFactor());

    var colorName = colorNames[index % colorNames.length];
    var newColor = window.chartColors[colorName];
    newDataset.backgroundColor.push(newColor);
  }

  config.data.datasets.push(newDataset);
  window.myDoughnut.update();
});

document.getElementById('addData').addEventListener('click', function() {
  if (config.data.datasets.length > 0) {
    config.data.labels.push('data #' + config.data.labels.length);

    var colorName = colorNames[config.data.datasets[0].data.length % colorNames.length];
    var newColor = window.chartColors[colorName];

    config.data.datasets.forEach(function(dataset) {
      dataset.data.push(randomScalingFactor());
      dataset.backgroundColor.push(newColor);
    });

    window.myDoughnut.update();
  }
});

document.getElementById('removeDataset').addEventListener('click', function() {
  config.data.datasets.splice(0, 1);
  window.myDoughnut.update();
});

document.getElementById('removeData').addEventListener('click', function() {
  config.data.labels.splice(-1, 1); // remove the label first

  config.data.datasets.forEach(function(dataset) {
    dataset.data.pop();
    dataset.backgroundColor.pop();
  });

  window.myDoughnut.update();
});

document.getElementById('changeCircleSize').addEventListener('click', function() {
  if (window.myDoughnut.options.circumference === 180) {
    window.myDoughnut.options.circumference = 360;
    window.myDoughnut.options.rotation = -45;
  } else {
    window.myDoughnut.options.circumference = 180;
    window.myDoughnut.options.rotation = -90;
  }

  window.myDoughnut.update();
});