require([
    "esri/Map",
    "esri/views/MapView",
    "esri/config",
    "esri/layers/FeatureLayer",
	"esri/Graphic",
	"esri/layers/GraphicsLayer",
	"esri/geometry/geometryEngine"
], function (Map, MapView, config, Featurelayer,Graphic,GraphicsLayer,geometryEngine) {

    config.apiKey = "AAPK56e3ac027f044c4089d8ceec232fc05dYaOuzVRzm8tMRqvzOvDvIEevbqJ85yppn9PacU6cy4duurJrVK9wo_8BcWO8i8bi";

    const map1 = new Map({
        basemap: "gray"
    });

    const view1 = new MapView({
        container: "viewDiv",
        map: map1,
        center: [114.1, 22.3],
        zoom: 10
    });
	
	
	
	// const graphicsLayer = new GraphicsLayer();
	// const resultsLayer = new GraphicsLayer();	 
	// map1.addMany([graphicsLayer, resultsLayer]);	 
	
	const popupTrailheads = {
	       "title": "Libraries",
	       "content": "<b>名字:</b> {設施名稱}<br><b>地址:</b> {地址}<br><b>图书馆种类:</b> {圖書館種類}<br><b>开放时间:</b> {開放時間}<br><b>联络电话:</b> {聯絡電話}<br><b>网页:</b> {網頁}<br>"
	     }

	
	const popupTrailheads2 = {
	       "title": "Hong Kong School",
	       "content": "<b>类别:</b> {中文類別}<br><b>名称:</b> {中文名稱}<br><b>地址:</b> {中文地址}<br><b>就读学生性别:</b> {就讀學生性別}<br><b>学校授课时间:</b> {學校授課時間}<br><b>资助种类:</b> {資助種類}<br><b>电话:</b> {聯絡電話}<br><b>学校类型:</b> {學校類型}<br><b>网页:</b> {網頁}<br><b>宗教:</b> {宗教}<br>"
	     }		  
	// const trailheads = new FeatureLayer({
	//        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
	//        outFields: ["TRL_NAME","CITY_JUR","X_STREET","PARKING","ELEV_FT"],
	//        popupTemplate: popupTrailheads
	//      });
		
	const popupTrailheads3 = {
	       "title": "Projected population",
	       "content": "<b>类别:</b> {中文類別}<br><b>名称:</b> {中文名稱}<br><b>地址:</b> {中文地址}<br><b>就读学生性别:</b> {就讀學生性別}<br><b>学校授课时间:</b> {學校授課時間}<br><b>资助种类:</b> {資助種類}<br><b>电话:</b> {聯絡電話}<br><b>学校类型:</b> {學校類型}<br><b>网页:</b> {網頁}<br><b>宗教:</b> {宗教}<br>"
	     }
		 
		 
		 
		 
	
	const popupTrails = {
	        title: "2014—2020人口数"+"{ENAME }",
	        content: [{
	         type: "media",
	          mediaInfos: [{
	            type: "column-chart",
	            caption: "",
	            value: {
	              fields: [ "Y2014","Y2015","Y2016","Y2017","Y2017","Y2018","Y2019","Y2020" ],
	              normalizeField: null,
	              tooltipField: "Min and max elevation values"
	              }
	            }]
	        }]
	      }
		 


    view1.ui.remove("attribution");

    document.getElementById("gray").addEventListener("click", function () {
        map1.basemap = "gray";
    });

    document.getElementById("hybrid").addEventListener("click", function () {
        map1.basemap = "hybrid";
    });

    // document.getElementById("terrain").addEventListener("click", function () {
    //     map1.basemap = "terrain";
    // });

    document.getElementById("osm").addEventListener("click", function () {
        map1.basemap = "osm";
    });

    document.getElementById("streets").addEventListener("click", function () {
        map1.basemap = "streets";
    });
	



    const Hong_Kong_School = new Featurelayer({
        url: "https://services3.arcgis.com/6j1KwZfY2fZrfNMR/arcgis/rest/services/Hong_Kong_School_Location_and_Information/FeatureServer/",
		outFields: ["中文類別","中文名稱","中文地址","就讀學生性別","學校授課時間","資助種類","聯絡電話","網頁","宗教"],
		spatialReference:{wkid:102100},
		popupTemplate: popupTrailheads2
    
	});
	

	
	const Libraries = new Featurelayer({
	    url: "https://services3.arcgis.com/6j1KwZfY2fZrfNMR/arcgis/rest/services/Libraries_in_Hong_Kong/FeatureServer",
		outFields: ["設施名稱","地址","圖書館種類","開放時間","聯絡電話","網頁"],
		popupTemplate: popupTrailheads
	});

    
	const Projected_Population = new Featurelayer({
	    url: "https://services3.arcgis.com/6j1KwZfY2fZrfNMR/arcgis/rest/services/Projected_Population_of_Hong_Kong/FeatureServer",
		popupTemplate: popupTrails
	});

    document.getElementById("Add_point").addEventListener("click", function () {
        map1.add(Hong_Kong_School);
    });

    // document.getElementById("Add_line").addEventListener("click", function () {
    //     map1.add();
    // });

    document.getElementById("Add_polygon").addEventListener("click", function () {
        map1.add(Libraries);
    });
	
	document.getElementById("Add_line").addEventListener("click", function () {
	    map1.add(Projected_Population);
	});



    document.getElementById("Remove_point").addEventListener("click", function () {
        map1.remove(Hong_Kong_School);
    });

    document.getElementById("Remove_line").addEventListener("click", function () {
        map1.remove(Projected_Population);
    });

    document.getElementById("Remove_polygon").addEventListener("click", function () {
        map1.remove(Libraries);
    });
	
	
	view1.ui.add(document.getElementById("controls"), "top-right");
	document.getElementById("buffer").addEventListener("click", createBuffer);
	document.getElementById("reset").addEventListener("click", resetGraphics);
	let bufferGraphic;
	    function createBuffer() {
	              if (bufferGraphic) {
	                return;
	              }
		const buffer = geometryEngine.geodesicBuffer(
		                Hong_Kong_School.features[0].geometry,

		                1,
		                "kilometers"
		              );
		bufferGraphic = new Graphic({
		                geometry: buffer,
		                symbol: {
		                  type: "simple-fill",
		                  color: [227, 139, 79, 0.5],
		                  outline: {
		                    color: [255, 255, 255, 255],
		                  },
		                },
		              });
		              map1.add(bufferGraphic);
				};
		function resetGraphics() {
		              map1.remove(bufferGraphic);
		              bufferGraphic = null;
		            }


    view1.map.allLayers.on("change", function (event) {
        var num = event.target.length - 2;
        document.getElementById("Layers").textContent = "图层数： " + num;
    });


    //***显示经纬度、比例尺大小和尺度***//
    function showCoordinates(pt) {
        var coords = "纬度/经度 " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
            " | 比例尺: 1:" + Math.round(view1.scale * 1) / 1 +
            " | 放大倍数 " + view1.zoom;
        coordsWidget.innerHTML = coords;
    }
    //*** 添加事件显示中心的坐标（在视图停止移动之后） ***//
    view1.watch(["stationary"], function () {
        showCoordinates(view1.center);
    });

    //*** 添加显示鼠标的坐标点***//
    view1.on(["pointer-down", "pointer-move"], function (evt) {
        showCoordinates(view1.toMap({ x: evt.x, y: evt.y }));
    });
	
	

    document.getElementById("simul_button").addEventListener("click", function () {
        var basemap1 = prompt("请选择一张底图", "")
        if (basemap1 == view1.map.basemap) {
            document.write("请选择另一张地图")
        }
        if (basemap1 != null && basemap1 != "") {
            const map2 = new Map({
                basemap: basemap1
            });

            const view2 = new MapView({
                container: "div2",
                map: map2,
                center: [40, -28],
                zoom: 3
            });

            var div_2 = document.getElementById("div2");
            var div_1 = document.getElementById("viewDiv");
            div_2.style.width = "70%";
            div_2.style.height = "50%";
            div_1.style.height = "50%";
            view2.ui.remove("attribution");

            const views = [view1, view2];
            let active;

            const sync = (source) => {
                if (!active || !active.viewpoint || active !== source) {
                    return;
                }

                for (const view of views) {
                    if (view !== active) {
                        view.viewpoint = active.viewpoint;
                    }
                }
            };

            for (const view of views) {
                view.watch(["interacting", "animation"], () => {
                    active = view;
                    sync(active);
                });

                view.watch("viewpoint", () => sync(view));
            }

        }


    })
});
