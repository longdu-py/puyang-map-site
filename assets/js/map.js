// 初始化地图，中心点：濮阳市区 坐标
const map = L.map('map').setView([35.7762, 115.0186], 11);

// OSM底图图层
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap 濮阳便民地图',
    maxZoom:18
}).addTo(map);

// 濮阳基础点位数据
const puyangPoints = {
    scenic:[
        {name:"戚城文物景区",lat:35.779,lng:115.007,tip:"4A景区，春秋古城遗址"},
        {name:"龙湖公园",lat:35.788,lng:115.030,tip:"城市中央湖景公园"},
        {name:"水秀国际大剧院",lat:35.792,lng:115.036,tip:"杂技演艺中心"},
        {name:"仓颉陵",lat:35.866,lng:115.102,tip："南乐仓颉造字圣地"},
        {name:"单拐革命旧址",lat:35.841,lng:115.220,tip:"清丰红色旅游景区"},
        {name:"毛楼生态旅游区",lat:35.622,lng:115.633,tip:"范县黄河风景区"}
    ],
    hospital:[
        {name:"濮阳市人民医院",lat:35.773,lng:115.001},
        {name:"濮阳市中医院",lat:35.781,lng:115.012},
        {name:"华龙区人民医院",lat:35.766,lng:114.988},
        {name:"濮阳县人民医院",lat:35.702,lng:114.961}
    ],
    gov:[
        {name:"濮阳市政务服务大厅",lat:35.786,lng:115.028},
        {name:"濮阳市公安局",lat:35.778,lng:115.014},
        {name:"华龙区政府",lat:35.770,lng:114.996}
    ]
};

// 自定义图标
const iconScenic = L.divIcon({html:'🏞️',className:'fs-3',iconSize:[30,30]});
const iconHospital = L.divIcon({html:'🏥',className:'fs-3',iconSize:[30,30]});
const iconGov = L.divIcon({html:'🏛️',className:'fs-3',iconSize:[30,30]});

// 批量渲染景点标记
puyangPoints.scenic.forEach(item=>{
    L.marker([item.lat,item.lng],{icon:iconScenic})
    .addTo(map)
    .bindPopup(`<b>${item.name}</b><br>${item.tip}`);
});
// 医院
puyangPoints.hospital.forEach(item=>{
    L.marker([item.lat,item.lng],{icon:iconHospital})
    .addTo(map)
    .bindPopup(`<b>${item.name}</b>`);
});
// 政务
puyangPoints.gov.forEach(item=>{
    L.marker([item.lat,item.lng],{icon:iconGov})
    .addTo(map)
    .bindPopup(`<b>${item.name}</b>`);
});

// 搜索定位功能
function searchLocation(){
    const key = document.getElementById('searchInput').value.trim();
    if(!key) return alert("请输入景点/医院/小区名称");
    let target = null;
    // 遍历景点
    puyangPoints.scenic.forEach(p=>{
        if(p.name.includes(key)) target = p;
    })
    puyangPoints.hospital.forEach(p=>{
        if(p.name.includes(key)) target = p;
    })
    puyangPoints.gov.forEach(p=>{
        if(p.name.includes(key)) target = p;
    })
    if(target){
        map.setView([target.lat,target.lng],15);
    }else{
        alert("未找到该地点");
    }
}
document.getElementById('searchBtn').addEventListener('click',searchLocation);
