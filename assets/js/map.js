// 初始化地图 濮阳市区中心点坐标 缩放等级11
const map = L.map('map').setView([35.7762, 115.0186], 11);

// 加载开源OSM底图
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap | 濮阳便民地图',
    maxZoom: 18
}).addTo(map);

// 自定义点位图标
const iconScenic = L.divIcon({html:'🏞️', className:'fs-3', iconSize:[30,30]});
const iconHospital = L.divIcon({html:'🏥', className:'fs-3 text-danger', iconSize:[30,30]});
const iconGov = L.divIcon({html:'🏛️', className:'fs-3 text-primary', iconSize:[30,30]});
const iconBus = L.divIcon({html:'🚌', className:'fs-3 text-success', iconSize:[30,30]});
const iconCommunity = L.divIcon({html:'🏠', className:'fs-3', iconSize:[30,30]});

// 全部点位数据集合
const allPoints = {
    scenic: [
        {name:"戚城文物景区",lat:35.779,lng:115.007,tip:"4A景区，春秋古城遗址"},
        {name:"龙湖公园",lat:35.788,lng:115.030,tip:"城市中央湖景公园"},
        {name:"水秀国际大剧院",lat:35.792,lng:115.036,tip:"濮阳杂技演艺中心"},
        {name:"仓颉陵",lat:35.866,lng:115.102,tip:"南乐仓颉造字圣地"},
        {name:"单拐革命旧址",lat:35.841,lng:115.220,tip:"清丰红色旅游景区"},
        {name:"毛楼生态旅游区",lat:35.622,lng:115.633,tip:"范县黄河风景区"}
    ],
    hospital: [
        {name:"濮阳市人民医院",lat:35.773,lng:115.001,tip:"三甲综合医院"},
        {name:"濮阳市中医院",lat:35.781,lng:115.012,tip:"三甲中医医院"},
        {name:"华龙区人民医院",lat:35.766,lng:114.988,tip:"区级综合医院"},
        {name:"濮阳县人民医院",lat:35.702,lng:114.961,tip:"濮阳县综合医院"},
        {name:"清丰县人民医院",lat:35.901,lng:115.105,tip:"清丰县综合医院"}
    ],
    gov: [
        {name:"濮阳市政务服务大厅",lat:35.786,lng:115.028,tip:"社保、不动产一站式办理"},
        {name:"濮阳市公安局",lat:35.778,lng:115.014,tip:"市公安局本部"},
        {name:"华龙区政府",lat:35.770,lng:114.996,tip:"华龙区人民政府"},
        {name:"濮阳市车管所",lat:35.751,lng:114.942,tip:"车辆上牌年检换证"}
    ],
    bus: [
        {name:"龙湖广场公交站",lat:35.789,lng:115.031},
        {name:"戚城公园站",lat:35.778,lng:115.006},
        {name:"水秀大剧院站",lat:35.793,lng:115.037},
        {name:"市人民医院站",lat:35.772,lng:114.999},
        {name:"濮阳高铁站",lat:35.821,lng:115.103}
    ],
    community: [
        {name:"龙城新居",lat:35.7650,lng:114.9830},
        {name:"龙湖壹号",lat:35.7900,lng:115.0340},
        {name:"建业森林半岛",lat:35.7820,lng:115.0180},
        {name:"碧桂园翡翠郡",lat:35.7960,lng:115.0420},
        {name:"中央公园",lat:35.7740,lng:115.0040}
    ]
};

// 存储所有点位，用于搜索
let markerList = [];

// 批量渲染景点
allPoints.scenic.forEach(item=>{
    const m = L.marker([item.lat,item.lng],{icon:iconScenic})
        .addTo(map)
        .bindPopup(`<b>${item.name}</b><br>${item.tip}`);
    markerList.push({name:item.name, marker:m});
});
// 医院
allPoints.hospital.forEach(item=>{
    const m = L.marker([item.lat,item.lng],{icon:iconHospital})
        .addTo(map)
        .bindPopup(`<b>${item.name}</b><br>${item.tip}`);
    markerList.push({name:item.name, marker:m});
});
// 政务
allPoints.gov.forEach(item=>{
    const m = L.marker([item.lat,item.lng],{icon:iconGov})
        .addTo(map)
        .bindPopup(`<b>${item.name}</b><br>${item.tip}`);
    markerList.push({name:item.name, marker:m});
});
// 公交
allPoints.bus.forEach(item=>{
    const m = L.marker([item.lat,item.lng],{icon:iconBus})
        .addTo(map)
        .bindPopup(`<b>公交站：${item.name}</b>`);
    markerList.push({name:item.name, marker:m});
});
// 小区
allPoints.community.forEach(item=>{
    const m = L.marker([item.lat,item.lng],{icon:iconCommunity})
        .addTo(map)
        .bindPopup(`<b>小区：${item.name}</b>`);
    markerList.push({name:item.name, marker:m});
});

// 搜索定位函数
function searchPlace(){
    const inputVal = document.getElementById("searchInput").value.trim();
    if(!inputVal){
        alert("请输入地点名称，例如：龙城新居、戚城公园");
        return;
    }
    let targetMarker = null;
    for(let item of markerList){
        if(item.name.includes(inputVal)){
            targetMarker = item.marker;
            break;
        }
    }
    if(targetMarker){
        map.setView(targetMarker.getLatLng(),15);
        targetMarker.openPopup();
    }else{
        alert("未找到匹配地点，请更换关键词");
    }
}
// 绑定搜索按钮点击事件
document.getElementById("searchBtn").addEventListener("click",searchPlace);
// 回车触发搜索
document.getElementById("searchInput").addEventListener("keydown",function(e){
    if(e.key === "Enter") searchPlace();
});
