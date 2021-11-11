
init()



function init(){
    BuildSelectCity()
}





//#region 標題欄相關方法

/** 選擇渲染哪一個畫面的方法 */
function choosePage (e){
    console.log('target',e.srcElement.className)
    const pageClass = e.srcElement.className

    if(pageClass==='headerRightView'){
        init('View')
    }
    else if(pageClass==='headerRightStay'){
        init('Stay')
    }
    else{
        init('Traffic')
    }
}

//#endregion

/** 縣市下拉選單組成方法 */
function BuildSelectCity (){
    const CityObj =[
        {CityName: '不分縣市', City: '0'},
        {CityName: '臺北市', City: 'Taipei'},
        {CityName: '新北市', City: 'NewTaipei'},
        {CityName: '桃園市', City: 'Taoyuan'},
        {CityName: '臺中市', City: 'Taichung'},
        {CityName: '臺南市', City: 'Tainan'},
        {CityName: '高雄市', City: 'Kaohsiung'},
        {CityName: '基隆市', City: 'Keelung'},
        {CityName: '新竹市', City: 'Hsinchu'},
        {CityName: '新竹縣', City: 'HsinchuCounty'},
        {CityName: '苗栗縣', City: 'MiaoliCounty'},
        {CityName: '彰化縣', City: 'ChanghuaCounty'},
        {CityName: '南投縣', City: 'NantouCounty'},
        {CityName: '雲林縣', City: 'YunlinCounty'},
        {CityName: '嘉義縣', City: 'ChiayiCounty'},
        {CityName: '嘉義市', City: 'Chiayi'},
        {CityName: '屏東縣', City: 'PingtungCounty'},
        {CityName: '宜蘭縣', City: 'YilanCounty'},
        {CityName: '花蓮縣', City: 'HualienCounty'},
        {CityName: '臺東縣', City: 'TaitungCounty'},
        {CityName: '金門縣', City: 'KinmenCounty'},
        {CityName: '澎湖縣', City: 'PenghuCounty'},
        {CityName: '連江縣', City: 'LienchiangCounty'}
    ]
    let ResaultString=''

    CityObj.forEach(item=>{
        ResaultString+=`
        <option value=${item.City}>${item.CityName}</option>
        `
    })

    document.getElementById('selectCity').innerHTML=ResaultString
}

function sowView(){
    ResaultString=`
    <p style="font-size: 35px;">
            抱歉！交通頁面還沒製作 (上班太累了)<br>
            很高興參與這次活動，主要志在練習Javascript、CSS、HTML<br>
            有所缺失的地方還望包涵 (感恩)
        </p>
    `
    document.getElementById('srooyArea').innerHTML=ResaultString
}