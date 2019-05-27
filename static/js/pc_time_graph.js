function createPCDrawingGraph(data) {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("pc-drawing-time-graph", am4charts.XYChart);
    
    // Add data
    chart.data = data;
    
    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "user";
    
    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = "value";
    lineSeries.dataFields.categoryX = "user";
    lineSeries.name = "Sales";
    lineSeries.strokeWidth = 2;
    
    // Add simple bullet
    var bullet = lineSeries.bullets.push(new am4charts.Bullet());
    var image = bullet.createChild(am4core.Image);
    image.href = "https://www.amcharts.com/lib/images/star.svg";
    image.width = 10;
    image.height = 10;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
}

function createPCNaverGraph(data) {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("pc-naver-time-graph", am4charts.XYChart);
    
    // Add data
    chart.data = data;
    
    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "user";
    
    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = "value";
    lineSeries.dataFields.categoryX = "user";
    lineSeries.name = "Sales";
    lineSeries.strokeWidth = 2;
    
    // Add simple bullet
    var bullet = lineSeries.bullets.push(new am4charts.Bullet());
    var image = bullet.createChild(am4core.Image);
    image.href = "https://www.amcharts.com/lib/images/star.svg";
    image.width = 10;
    image.height = 10;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
}

function createPCGoogleGraph(data) {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("pc-google-time-graph", am4charts.XYChart);
    
    // Add data
    chart.data = data;
    
    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "user";
    
    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = "value";
    lineSeries.dataFields.categoryX = "user";
    lineSeries.name = "Sales";
    lineSeries.strokeWidth = 2;
    
    // Add simple bullet
    var bullet = lineSeries.bullets.push(new am4charts.Bullet());
    var image = bullet.createChild(am4core.Image);
    image.href = "https://www.amcharts.com/lib/images/star.svg";
    image.width = 10;
    image.height = 10;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
}