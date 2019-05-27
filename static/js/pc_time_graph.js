function createPCDrawingGraph(data) {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var mobile_drawing = am4core.create("pc-drawing-time-graph", am4charts.XYChart);
    
    // Add data
    mobile_drawing.data = data;
    
    // Create axes
    var categoryAxis = mobile_drawing.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "user";
    
    // Create value axis
    var valueAxis = mobile_drawing.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var lineSeries = mobile_drawing.series.push(new am4charts.LineSeries());
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

function createPCNaverGraph(data) {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var mobile_drawing = am4core.create("pc-naver-time-graph", am4charts.XYChart);
    
    // Add data
    mobile_drawing.data = data;
    
    // Create axes
    var categoryAxis = mobile_drawing.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "user";
    
    // Create value axis
    var valueAxis = mobile_drawing.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var lineSeries = mobile_drawing.series.push(new am4charts.LineSeries());
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

function createPCGoogleGraph(data) {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var mobile_drawing = am4core.create("pc-google-time-graph", am4charts.XYChart);
    
    // Add data
    mobile_drawing.data = data;
    
    // Create axes
    var categoryAxis = mobile_drawing.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "user";
    
    // Create value axis
    var valueAxis = mobile_drawing.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var lineSeries = mobile_drawing.series.push(new am4charts.LineSeries());
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