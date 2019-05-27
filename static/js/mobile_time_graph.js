function createMobileDrawingGraph(data) {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("mobile-drawing-time-graph", am4charts.XYChart);
    
    // Add data
    console.log(data)
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
    lineSeries.strokeWidth = 3;
    
    // Add simple bullet
    var bullet = lineSeries.bullets.push(new am4charts.Bullet());
    var image = bullet.createChild(am4core.Image);
    image.href = "https://www.amcharts.com/lib/images/star.svg";
    image.width = 30;
    image.height = 30;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
}

function createMobileNaverGraph(data) {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("mobile-naver-time-graph", am4charts.XYChart);
    
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
    lineSeries.strokeWidth = 3;
    
    // Add simple bullet
    var bullet = lineSeries.bullets.push(new am4charts.Bullet());
    var image = bullet.createChild(am4core.Image);
    image.href = "https://www.amcharts.com/lib/images/star.svg";
    image.width = 30;
    image.height = 30;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
}

function createMobileGoogleGraph(data) {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("mobile-google-time-graph", am4charts.XYChart);
    
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
    lineSeries.strokeWidth = 3;
    
    // Add simple bullet
    var bullet = lineSeries.bullets.push(new am4charts.Bullet());
    var image = bullet.createChild(am4core.Image);
    image.href = "https://www.amcharts.com/lib/images/star.svg";
    image.width = 30;
    image.height = 30;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
}