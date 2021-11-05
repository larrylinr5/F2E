/** 下拉式選單全域變數 */
let selectUnitValue='0'
/** 下拉式選單全域變數 */
let selectCityValue='0'


//程式啟動進入點
init('View');



/** 全域變數初始化 */
function resetAreaVariable (){
    selectUnitValue='0';
    selectCityValue='0';
}

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

axios.get('https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City').then(
    response=>{
        console.log('response>>>',response.data)
    }
)



/** 程式啟動進入點 */
function init(pageString) {
    const reflashSelectUnit =(selectUnitList)=>{
        document.getElementById('selectUnit').innerHTML=getSelectUnitString(selectUnitList)
    }

    //將全域變數還原初始化
    resetAreaVariable()

    //製作 台灣景點 頁面
    if(pageString==='View'){
        const selectUnitList = [
            {
                name:'類別',
                value:'0'
            },
            {
                name:'景點',
                value:'View'
            },
            {
                name:'活動',
                value:'Active'
            },
        ]

        BuildSelectCity()
        reflashSelectUnit(selectUnitList)
        ShowHotCityArea(true);
    }
    //製作 美食住宿 頁面
    else if(pageString==='Stay'){
        const selectUnitList = [
            {
                name:'類別',
                value:'0'
            },
            {
                name:'美食',
                value:'Food'
            },
            {
                name:'住宿',
                value:'Stay'
            },
        ]

        BuildSelectCity()
        reflashSelectUnit(selectUnitList)
    }
    //製作 景點交通 頁面
    else{

    }
}

//#region 熱門城市相關方法
/** 選擇熱門城市區塊呈現畫面\
 *  傳入參數 true => 顯示右邊按鈕(預設)\
 *  傳入參數 false =>顯示左邊按鈕
*/
function ShowHotCityArea(bool) {
    /** innerHTML變更用字串 */
    let ResaultString = ''
    /** 刷新熱門城市區塊的方法 */
    const reflash = () => {
        document.getElementById('HotCityArea').innerHTML = ResaultString
    }

    if (bool) {
        ResaultString = `
        <div style="width: 38px;"></div>
        <div class="container" id="HotCity"></div>
        <div class="verticallyCentered">
            <img src="image/RigthBtn.png" alt="向右按鈕" onclick="ShowHotCityArea(false)">
        </div>`
        reflash()
        ChooseHotCity(bool)
    }
    else {
        ResaultString = `
        <div class="verticallyCentered">
            <img src="image/LeftBtn.png" alt="向左按鈕" onclick="ShowHotCityArea(true)">
        </div>
        <div class="container" id="HotCity"></div>
        <div style="width: 38px;"></div>`
        reflash()
        ChooseHotCity(bool)
    }
}

/** 選擇熱門城市區塊中間呈現畫面\
 * 傳入參數 true => 台北市、新北市、桃園市、新竹市、台中市、南投、嘉義\
 * 傳入參數 false => 台南、高雄、屏東、宜蘭、花蓮、台東、金門馬祖.澎湖
 */
function ChooseHotCity(bool) {
    /** 熱門城市1 */
    const LeftCityArr = [
        {
            bgImage: 'image/Taipei.png',
            city: '台北市'
        },
        {
            bgImage: 'image/NewTaipei.png',
            city: '新北市'
        },
        {
            bgImage: 'image/Taoyuan.png',
            city: '桃園市'
        },
        {
            bgImage: 'image/Hsinchu.png',
            city: '新竹市'
        },
        {
            bgImage: 'image/Taichung.png',
            city: '台中市'
        },
        {
            bgImage: 'image/Nantou.png',
            city: '南投'
        },
        {
            bgImage: 'image/Chiayi.png',
            city: '嘉義'
        }
    ]
    /** 熱門城市2 */
    const RightCityArr = [
        {
            bgImage: 'image/Tainan.png',
            city: '台南'
        },
        {
            bgImage: 'image/Kaohsiung.png',
            city: '高雄'
        },
        {
            bgImage: 'image/Pingtung.png',
            city: '屏東'
        },
        {
            bgImage: 'image/Yilan.png',
            city: '宜蘭'
        },
        {
            bgImage: 'image/Hualien.png',
            city: '花蓮'
        },
        {
            bgImage: 'image/Taitung.png',
            city: '台東'
        },
        {
            bgImage: 'image/Penghu.png',
            city: '金門馬祖.澎湖'
        }
    ]
    /** innerHTML變更用字串 */
    let ResaultString = ''
    /** 決定字串組成的區域方法 */
    const determine = (Array)=>{
        let index = 0;
        Array.forEach(item => {
            if ([0, 3, 6].includes(index)) {
                ResaultString += `
                <a href="#" class="container hotCityVertically" style="background-image:url(${item.bgImage})">
                    <div class="verticallyCentered">
                        <div class="container">
                            <img src="image/LocationImg.png" alt="">
                        </div>
                        <div class="hotCityText">${item.city}</div>
                    </div>
                </a>`
            }
            else if ([1, 4].includes(index)) {
                ResaultString += `
                <div class="verticallyCentered">
                <div>
                    <a href="#" class="container hotCityHorizontal" style="background-image:url(${item.bgImage})">
                        <div class="verticallyCentered">
                            <div class="container">
                                <img src="image/LocationImg.png" alt="">
                            </div>
                            <div class="hotCityText">${item.city}</div>
                        </div>
                    </a>
                </div>`
            }
            else {
                ResaultString += `
                <div>
                    <a href="#" class="container hotCityHorizontal" style="background-image:url(${item.bgImage})">
                        <div class="verticallyCentered">
                            <div class="container">
                                <img src="image/LocationImg.png" alt="">
                            </div>
                            <div class="hotCityText">${item.city}</div>
                        </div>
                    </a>
                </div>
                </div>`
            }
            index++;
        })
    }
    /** 刷新熱門城市的方法 */
    const reflash = () => {
        document.getElementById('HotCity').innerHTML = ResaultString
    }

    //bool=true
    if (bool) {
        determine(LeftCityArr)
        reflash();
    }
    //bool=false
    else {
        determine(RightCityArr)
        reflash();
    }
}
//#endregion

//#region 下拉式選單相關方法

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

/** 組下拉式選單的字串 */
function getSelectUnitString(selectUnitList){
    let ResaultString=''
    selectUnitList.forEach(item=>{
        ResaultString+=`<option value=${item.value}>${item.name}</option>`
    })
    return ResaultString
}

/** 將下拉選單的值存放至全域變數 */
function selectFun(selectItem){
    const e = document.getElementById(selectItem);
    const strUser = e.options[e.selectedIndex].value;
    if(selectItem==='selectUnit') selectUnitValue = strUser
    if(selectItem==='selectCity') selectCityValue = strUser
}

//#endregion




