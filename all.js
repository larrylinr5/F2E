/** 下拉式選單全域變數 */
let selectUnitValue='0'
/** 下拉式選單全域變數 */
let selectCityValue='0'
/** 首頁熱門活動資料存放變數 */
let HomePageHotAction = []
/** 首頁熱門餐飲資料存放變數 */
let HomePageHotRestaurant = []
/** 熱門住宿資料存放變數 */
let HomePageHotHotel = []
/** 熱門景點(城市)資料存放區 */
let ScenicSpotCity =[]
/** 熱門景點(城市)目前所在頁面 */
let ScenicSpotCityPage = 0
/** 熱門景點(城市)最大頁面 */
let ScenicSpotCityMaxPage = 0
/** 頁面 0=>台灣景點 1=>美食住宿 2=>交通 */
let PageIndex=0
/** 下拉選單查詢後資料存放區 */
let ChangeSelect=[]
/** 拉選單查詢後資料目前所在頁面 */
let selectChangePage=0
/** 拉選單查詢後資料最大頁面 */
let selectChangeMaxPage=0

//程式啟動進入點 ===> call完第一次api才呼叫
// init('View');


// axios.get(' https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei').then(
//     response=>{
//         console.log('>>>>>',response.data)
//     }
// )



//查首頁熱門活動 X 4筆
axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity').then(
    response=>{
        response.data.forEach(HotAction=>{
            if(HomePageHotAction.length<4 && HotAction.Picture.PictureUrl1!==undefined && HotAction.Phone!==undefined ){
                const Obj={
                    Picture:HotAction.Picture.PictureUrl1,
                    Title:HotAction.Name,
                    Description:HotAction.Description,
                    Location:HotAction.Location,
                    Address:HotAction.Address,
                    Phone:HotAction.Phone,
                    StartTime:HotAction.StartTime.substr(0,10),
                    EndTime:HotAction.EndTime.substr(0,10),
                    money:HotAction.money||'免費'
                }
                HomePageHotAction.push(Obj);
            }
        })

        //查熱門餐飲 X 10筆
        axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=10&$format=JSON').then(
            response=>{
                response.data.forEach(HotRestaurant=>{
                    const Obj={
                        Picture:HotRestaurant.Picture.PictureUrl1,
                        Title:HotRestaurant.Name,
                        Description:HotRestaurant.Description,
                        Location:HotRestaurant.Address.substr(0,3),
                        Address:HotRestaurant.Address,
                        Phone:HotRestaurant.Phone,
                        OpenTime:HotRestaurant.OpenTime,
                        money:HotRestaurant.money||'免費'
                    } 
                    HomePageHotRestaurant.push(Obj);
                })
                
                init('View');
            }   
        )
    }
)

axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel').then(
            response=>{
                console.log('Hotel>>>',response.data)
                
                let HotelIndex=0
                response.data.forEach(Hotel=>{
                    if(HotelIndex<10&&Hotel.Picture.PictureUrl1!==undefined && Hotel.Phone!==undefined ){
                        const Obj={
                            Picture:Hotel.Picture.PictureUrl1,
                            Title:Hotel.Name,
                            Description:Hotel.Description,
                            Location:Hotel.Address.substr(0,3),
                            Address:Hotel.Address,
                            Phone:Hotel.Phone,
                        } 
                        HomePageHotHotel.push(Obj);
                        HotelIndex++
                    }
                })
                console.log('Hotel2>>>',HomePageHotHotel)
                // init('View');
            }   
        )






/** 全域變數初始化 */
function resetAreaVariable (){
    /** HTML每個區塊id組成的array */
    const AreaArr=['queryArea','HotCityArea','HotActionArea','HotCityArea2','HotRestaurantArea']

    selectUnitValue='0';
    selectCityValue='0';
    AreaArr.forEach(item=>{
        document.getElementById(item).innerHTML=''
    })
}

/** 程式啟動進入點 */
function init(pageString) {
    /** 區域方法=>刷新下拉選單 */
    const reflashSelectUnit =(selectUnitList)=>{
        document.getElementById('selectUnit').innerHTML=getSelectUnitString(selectUnitList)
    }

    //將全域變數還原初始化
    resetAreaVariable()
    
    //將查詢欄位區塊渲染出來
    showQueryArea(pageString)

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
        //載入 查詢欄位內 城市的下拉選單
        BuildSelectCity()
        //刷新 查詢欄位內 細節的下拉選單  
        reflashSelectUnit(selectUnitList)
        //渲染熱門城市區塊
        ShowHotCityArea(true);
        //渲染熱門活動區塊
        showHotActionArea()
        //渲染熱門餐飲區塊
        showHotRestaurantArea();
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

        //載入 查詢欄位內 城市的下拉選單
        BuildSelectCity()
        //刷新 查詢欄位內 細節的下拉選單  
        reflashSelectUnit(selectUnitList)
        //渲染熱門餐飲區塊
        showHotRestaurantArea();
    }
    //製作 景點交通 頁面
    else{

    }

    
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

//#region 查詢欄位相關方法
/** 渲染查詢欄位區塊 */
function showQueryArea(pageString){
    /** 預設HTML字串 */
    let ResaultString=''

    const GetResaultString=input=>{
        return `
        <div class="queryArea" style="background-image:url(${input});">
            <div class="queryAreaRow">
                <div>
                    <img src="image/Welcome to Taiwan°.png" alt="Welcome to Taiwan">
                </div>
                <div>
                    <img src="image/台北、台中、台南、屏東、宜蘭……遊遍台灣.png" alt="台北、台中、台南、屏東、宜蘭……遊遍台灣">
                </div>
                <!-- 查詢區 -->
                <div class="queryAreaRowDetail">
                    <div>
                        <input value="搜尋關鍵字(功能還未實作)">
                    </div>
                    <div>
                        <img src="image/QueryBtn.png" alt="關鍵字查詢按鈕">
                    </div>
                </div>
                <!-- 下拉選單區 -->
                <div class="queryAreaRowDetail">
                    <div>
                        <select id="selectUnit" onchange="selectFun('selectUnit')"></select>
                    </div>
                    <div>
                        <select id="selectCity" onchange="selectFun('selectCity')"></select>
                    </div>
                    <div>
                        <img src="image/LocalBtn.png" alt="定位按鈕">
                    </div>
                </div>
            </div>
        </div>`
    }

    //製作 台灣景點 查詢區塊
    if(pageString==='View'){
        ResaultString=GetResaultString('image/queryAreaView.png')
    }
    //製作 美食住宿 查詢區塊
    else if(pageString==='Stay'){
        ResaultString=GetResaultString('image/queryAreaFood.png')
    }
    //製作 景點交通 查詢區塊
    else{
        ResaultString=''
    }

    //渲染查詢欄位區塊
    document.getElementById('queryArea').innerHTML=ResaultString
}

/** 下拉選單選擇後觸發的畫面渲染 */
function showselectChange(){
    console.log('selectUnitValue>>',selectUnitValue)
    console.log('selectCityValue>>',selectCityValue)

    /** 查詢用字串 */
    let QueryString='';
    switch (selectUnitValue) {
        case 'View':
            QueryString='https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot'
            break;
        case 'Active':
            QueryString='https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity'
            break;
        case 'Food':
            QueryString='https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant'
            break;
        case 'Stay':
            QueryString='https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel'
            break;
        default :
            if(PageIndex ==='0') QueryString='https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot'
            if(PageIndex ==='1') QueryString='https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant'
    }
    if(selectCityValue!=='0'){
        QueryString+='/'+selectCityValue
    }
    console.log('QueryString',QueryString)
    //若下拉式選單其中一個有選擇時，查詢並渲染
    if(selectUnitValue!='0'||selectCityValue!='0'){
        axios.get(QueryString).then( 
            response=>{
                console.log('response>>>',response.data)
                selectChangeMaxPage = response.data.length%20===0?response.data.length/20:Number((response.data.length/20).toFixed())+1

                ChangeSelect=[]

                response.data.forEach(Item=>{
                    
                    if(Item.Picture!==undefined && Item.Picture.PictureUrl1!==undefined){
                        const Obj={
                            Picture:Item.Picture.PictureUrl1,
                            Title:Item.Name,
                            Description:Item.Description,
                            Location:selectUnitValue==='View'?Item.Address:selectUnitValue==='Action'?Item.Location:selectUnitValue==='Food'?Item.Address.substr(0,3):Item.Location,
                            Address:Item.Address,
                            Phone:Item.Phone,
                        }
                        ChangeSelect.push(Obj);
                    }
                })
                // if(selectUnitValue==='View'||selectUnitValue==='Action') showQueryArea('View')
                // else showQueryArea('Stay')
                console.log('select',ChangeSelect)
                /** HTML每個區塊id組成的array */
                const AreaArr=['HotCityArea','HotActionArea','HotCityArea2','HotRestaurantArea']

    
                AreaArr.forEach(item=>{
                    document.getElementById(item).innerHTML=''
                })
                showSelectChangeArea(selectChangePage)
        })
    }
}

function showSelectChangeArea(index){
    /** 預設HTML字串 */
    let ResaultString='<div class="container">'

    if(ChangeSelect.length>19){
        for(i=index;i<index+20;i++){
            ResaultString+=BuildSelectChangeCard(ChangeSelect[i],i)
            if(i===4+index||i===9+index||i===14+index||i===19+index){
                ResaultString+='</div>'
            } 
            if(i===4+index||i===9+index||i===14+index){
                ResaultString+='<div class="container">'
            } 
        }
        ResaultString+=`
        <div class="container">
            <img src="image/LeftBtn.png" alt="" onclick="LeftselectChangePage()"><div class="HotCityAreaBtn"><p>${selectChangePage/20}/${selectChangeMaxPage}</p></div><img src="image/RigthBtn.png" alt="" onclick="RightselectChangePage()">
        </div>
        `
    }
    else{
        let index=0
        ChangeSelect.forEach(x=>{
            ResaultString+=BuildSelectChangeCard(x,index)
            if(index===4||index===9||index===14||index===19){
                ResaultString+='</div>'
            } 
            if(index===4||index===9||index===14){
                ResaultString+='<div class="container">'
            } 
            index++
        })
    }
    

    document.getElementById('HotCityArea2').innerHTML=ResaultString
}

function BuildSelectChangeCard(ChangeSelectItem,index){
    return `
    <div class="HotRestaurantCard" onclick="SelectChangeAreaEvent(event)" id="${index}">
        <img src=${ChangeSelectItem.Picture} alt="" class="HotRestaurantAreaPicture" onclick="SelectChangeAreaEvent(event)" id="${index}">
        <div class="HotRestaurantTitle" onclick="SelectChangeAreaEvent(event)" id="${index}">${ChangeSelectItem.Title}</div>
        <div class="HotRestaurantlocation" onclick="SelectChangeAreaEvent(event)" id="${index}">
            <img src="image/location.png" alt="" onclick="SelectChangeAreaEvent(event)" id="${index}"><p onclick="SelectChangeAreaEvent(event)" id="${index}">${ChangeSelectItem.Location}</p>
        </div>
    </div>`
}

function LeftselectChangePage(){
    if(selectChangePage/20>0){
        selectChangePage-=20;
        showSelectChangeArea(ScenicSpotCityPage)
    }
}

function RightselectChangePage(){
    if(selectChangePage/20<selectChangeMaxPage){
        selectChangePage+=20;
        showSelectChangeArea(selectChangePage)
    }
}

function SelectChangeAreaEvent(e){
    /** 首頁熱門活動資料的index */
    const SelectChangeAreaIndex = e.srcElement.id
    
    /** 編輯文字敘述排版字串 */
    let EditString =''
    
    //如果沒有說明，就不幫說明文字換行
    if(ChangeSelect[SelectChangeAreaIndex].Description!==undefined)
    for(index=0;index<ChangeSelect[SelectChangeAreaIndex].Description.length;index++){
        const word=ChangeSelect[SelectChangeAreaIndex].Description[index]

        EditString+=word
        if(index%28===27) EditString+='<br>'
    }


    //圖片innerHTML
    document.getElementById('dialogPictureArea').innerHTML=`
        <img src=${ChangeSelect[SelectChangeAreaIndex].Picture} alt="" class="dialogPictureArea">
    `
    //標題innerHTML
    document.getElementById('dialogTittle').innerHTML=`
        <p>${ChangeSelect[SelectChangeAreaIndex].Title}</p>
    `
    //文字敘述innerHTML
    document.getElementById('dialogDetail').innerHTML=`
        <p>${EditString}</p>
    `

    document.getElementById('showDialog').showModal();
}
//#endregion

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
            city: '台北市',
            id:'Taipei'
        },
        {
            bgImage: 'image/NewTaipei.png',
            city: '新北市',
            id:'NewTaipei'
        },
        {
            bgImage: 'image/Taoyuan.png',
            city: '桃園市',
            id:'Taoyuan'
        },
        {
            bgImage: 'image/Hsinchu.png',
            city: '新竹市',
            id:'Hsinchu'
        },
        {
            bgImage: 'image/Taichung.png',
            city: '台中市',
            id:'Taichung'
        },
        {
            bgImage: 'image/Nantou.png',
            city: '南投',
            id:'NantouCounty'
        },
        {
            bgImage: 'image/Chiayi.png',
            city: '嘉義',
            id:'ChiayiCounty'
        }
    ]
    /** 熱門城市2 */
    const RightCityArr = [
        {
            bgImage: 'image/Tainan.png',
            city: '台南',
            id:'Tainan'
        },
        {
            bgImage: 'image/Kaohsiung.png',
            city: '高雄',
            id:'Kaohsiung'
        },
        {
            bgImage: 'image/Pingtung.png',
            city: '屏東',
            id:'PingtungCounty'
        },
        {
            bgImage: 'image/Yilan.png',
            city: '宜蘭',
            id:'YilanCounty'
        },
        {
            bgImage: 'image/Hualien.png',
            city: '花蓮',
            id:'HualienCounty'
        },
        {
            bgImage: 'image/Taitung.png',
            city: '台東',
            id:'TaitungCounty'
        },
        {
            bgImage: 'image/Penghu.png',
            city: '金門馬祖.澎湖',
            id:'PenghuCounty'
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
                <a href="#" class="container hotCityVertically" style="background-image:url(${item.bgImage})" onclick="showNewHotActionArea(event)" id="${item.id}">
                    <div class="verticallyCentered">
                        <div class="container">
                            <img src="image/LocationImg.png" alt="" onclick="showNewHotActionArea(event)" id="${item.id}">
                        </div>
                        <div class="hotCityText" onclick="showNewHotActionArea(event)" id="${item.id}">${item.city}</div>
                    </div>
                </a>`
            }
            else if ([1, 4].includes(index)) {
                ResaultString += `
                <div class="verticallyCentered">
                <div>
                    <a href="#" class="container hotCityHorizontal" style="background-image:url(${item.bgImage})" onclick="showNewHotActionArea(event)" id="${item.id}">
                        <div class="verticallyCentered">
                            <div class="container">
                                <img src="image/LocationImg.png" alt="" onclick="showNewHotActionArea(event)" id="${item.id}">
                            </div>
                            <div class="hotCityText" onclick="showNewHotActionArea(event)" id="${item.id}">${item.city}</div>
                        </div>
                    </a>
                </div>`
            }
            else {
                ResaultString += `
                <div>
                    <a href="#" class="container hotCityHorizontal" style="background-image:url(${item.bgImage})" onclick="onclick="showNewHotActionArea(event)" id="${item.id}">
                        <div class="verticallyCentered">
                            <div class="container">
                                <img src="image/LocationImg.png" alt="" onclick="showNewHotActionArea(event)" id="${item.id}">
                            </div>
                            <div class="hotCityText" onclick="showNewHotActionArea(event)" id="${item.id}">${item.city}</div>
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

    //當特色選擇改變時
    if(selectItem==='selectUnit'){
        selectUnitValue = strUser
        showselectChange()
    } 
    //當城市選擇改變時
    if(selectItem==='selectCity'){
        selectCityValue = strUser
        showselectChange()
    } 
}

//#endregion







//#region 熱門活動相關方法

function showHotActionArea(){
    /** 預設HTML字串 */
    let ResaultString=`
    <div class="verticallyCentered">
        <div class="container">
    `

    let index =0;
    HomePageHotAction.forEach(HomePageHotActionItem=>{
        if(index===2) ResaultString+='<div class="container">'
        ResaultString+=BuildHotActionCard(HomePageHotActionItem,index)
        if(index===1) ResaultString+='</div>'

        index++;
    })

    ResaultString+=`
        </div>
    </div>
    `

    document.getElementById('HotActionArea').innerHTML=ResaultString
}

function BuildHotActionCard(HomePageHotActionItem,index){
    let EditString=HomePageHotActionItem.Description.substr(0,18)+'<br>'
    EditString+=HomePageHotActionItem.Description.substr(18,18)+'<br>'
    EditString+=HomePageHotActionItem.Description.substr(36,18)+'<br>'
    EditString+=HomePageHotActionItem.Description.substr(54,18)+'<br>'
    if(HomePageHotActionItem.Description.length>72) EditString+='...'

    return `
    <div class="HotActionAreaCard">
                    <img class="HotActionAreaPicture" src=${HomePageHotActionItem.Picture} alt="">
                    <div class="HotActionAreaCarddiv">
                        <div class="HotActionAreaTittle">${HomePageHotActionItem.Title}</div>
                        <div class="HotActionAreaDetail">${EditString}</div>
                        <div style="display: flex;">
                            <img src="image/location.png" alt="" class="HotActionArealocation">
                            <span>${HomePageHotActionItem.Address.substr(3,6)}</span>
                            <div class="HotActionAreaCardButton" id=${index} onclick="HotActionAreaButton(event)">活動詳情</div>
                        </div>
                    </div>
                </div>
    `
}

function HotActionAreaButton(e){
    /** 首頁熱門活動資料的index */
    const HotActionAreaCardIndex = e.srcElement.id
    /** 編輯文字敘述排版字串 */
    let EditString =''
    

    for(index=0;index<HomePageHotAction[HotActionAreaCardIndex].Description.length;index++){
        const word=HomePageHotAction[HotActionAreaCardIndex].Description[index]

        EditString+=word
        if(index%28===27) EditString+='<br>'
    }


    //圖片innerHTML
    document.getElementById('dialogPictureArea').innerHTML=`
        <img src=${HomePageHotAction[HotActionAreaCardIndex].Picture} alt="">
    `
    //標題innerHTML
    document.getElementById('dialogTittle').innerHTML=`
        <p>${HomePageHotAction[HotActionAreaCardIndex].Title}</p>
    `
    //文字敘述innerHTML
    document.getElementById('dialogDetail').innerHTML=`
        <p>${EditString}</p>
    `

    document.getElementById('showDialog').showModal();
}

function showNewHotActionArea(e){
    //將全域變數還原初始化
    resetAreaVariable()
    /** 查詢字串 */
    let QueryString=`
    https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${e.srcElement.id}
    `
    console.log('查詢字串',QueryString)
    axios.get(QueryString).then(
        response=>{
            console.log('response熱門景點>>>',response.data)

            ScenicSpotCityMaxPage = response.data.length%20===0?response.data.length/20:Number((response.data.length/20).toFixed())+1

            response.data.forEach(ScenicSpotCityItem=>{
                if(ScenicSpotCityItem.Picture!==undefined && ScenicSpotCityItem.Picture.PictureUrl1!==undefined){
                    const Obj={
                        Picture:ScenicSpotCityItem.Picture.PictureUrl1,
                        Title:ScenicSpotCityItem.Name,
                        Description:ScenicSpotCityItem.Description,
                        Location:ScenicSpotCityItem.City,
                        Address:ScenicSpotCityItem.Address,
                        Phone:ScenicSpotCityItem.Phone,
                        OpenTime:ScenicSpotCityItem.OpenTime,
                        money:ScenicSpotCityItem.money||'免費'
                    }
                    ScenicSpotCity.push(Obj);
                }
                
            })
            console.log('response熱門景點>>>',ScenicSpotCity.length)
            showQueryArea('View')
            showNewHotCityArea(ScenicSpotCityPage)
            

        }
    )
}

function showNewHotCityArea(index){
    /** 預設HTML字串 */
    let ResaultString='<div class="container">'

    if(ScenicSpotCity.length>19){
        for(i=index;i<index+20;i++){
            ResaultString+=BuildHotCtiyAreaCard(ScenicSpotCity[i],i)
            if(i===4+index||i===9+index||i===14+index||i===19+index){
                ResaultString+='</div>'
            } 
            if(i===4+index||i===9+index||i===14+index){
                ResaultString+='<div class="container">'
            } 
        }
        ResaultString+=`
        <div class="container">
            <img src="image/LeftBtn.png" alt="" onclick="LeftScenicSpotCityPage()"><div class="HotCityAreaBtn"><p>${ScenicSpotCityPage/20}/${ScenicSpotCityMaxPage}</p></div><img src="image/RigthBtn.png" alt="" onclick="RightScenicSpotCityPage()">
        </div>
        `
    }
    else{
        let index=0
        ScenicSpotCity.forEach(x=>{
            ResaultString+=BuildHotCtiyAreaCard(x,index)
            if(index===4||index===9||index===14||index===19){
                ResaultString+='</div>'
            } 
            if(index===4||index===9||index===14){
                ResaultString+='<div class="container">'
            } 
            index++
        })
    }
    

    document.getElementById('HotCityArea2').innerHTML=ResaultString
}

function LeftScenicSpotCityPage(){
    if(ScenicSpotCityPage/20>0){
        ScenicSpotCityPage-=20;
        showNewHotCityArea(ScenicSpotCityPage)
    }
}

function RightScenicSpotCityPage(){
    if(ScenicSpotCityPage/20<ScenicSpotCityMaxPage){
        ScenicSpotCityPage+=20;
        showNewHotCityArea(ScenicSpotCityPage)
    }
}

function BuildHotCtiyAreaCard(ScenicSpotCityItem,index){
    return `
    <div class="HotRestaurantCard" onclick="NewHotCtiyAreaEvent(event)" id="${index}">
        <img src=${ScenicSpotCityItem.Picture} alt="" class="HotRestaurantAreaPicture" onclick="NewHotCtiyAreaEvent(event)" id="${index}">
        <div class="HotRestaurantTitle" onclick="NewHotCtiyAreaEvent(event)" id="${index}">${ScenicSpotCityItem.Title}</div>
        <div class="HotRestaurantlocation" onclick="NewHotCtiyAreaEvent(event)" id="${index}">
            <img src="image/location.png" alt="" onclick="NewHotCtiyAreaEvent(event)" id="${index}"><p onclick="NewHotCtiyAreaEvent(event)" id="${index}">${ScenicSpotCityItem.Location}</p>
        </div>
    </div>`
}

function NewHotCtiyAreaEvent(e){
    /** 首頁熱門活動資料的index */
    const ScenicSpotCityItemIndex = e.srcElement.id
    
    /** 編輯文字敘述排版字串 */
    let EditString =''
    
    //如果沒有說明，就不幫說明文字換行
    if(ScenicSpotCity[ScenicSpotCityItemIndex].Description!==undefined)
    for(index=0;index<ScenicSpotCity[ScenicSpotCityItemIndex].Description.length;index++){
        const word=ScenicSpotCity[ScenicSpotCityItemIndex].Description[index]

        EditString+=word
        if(index%28===27) EditString+='<br>'
    }


    //圖片innerHTML
    document.getElementById('dialogPictureArea').innerHTML=`
        <img src=${ScenicSpotCity[ScenicSpotCityItemIndex].Picture} alt="" class="dialogPictureArea">
    `
    //標題innerHTML
    document.getElementById('dialogTittle').innerHTML=`
        <p>${ScenicSpotCity[ScenicSpotCityItemIndex].Title}</p>
    `
    //文字敘述innerHTML
    document.getElementById('dialogDetail').innerHTML=`
        <p>${EditString}</p>
    `

    document.getElementById('showDialog').showModal();
}
//#endregion

//#region 熱門餐飲相關方法

function showHotRestaurantArea(){
    /** 預設HTML字串 */
    let ResaultString='<div class="container">'

    let index=0;
    HomePageHotRestaurant.forEach(HomePageHotRestaurantItem=>{ 
        ResaultString+=BuildHotRestaurantCard(HomePageHotRestaurantItem,index)
        if(index===4 || index===9) ResaultString+='</div>'
        if(index===4) ResaultString+='<div class="container">'
        index++;
    })

    document.getElementById('HotRestaurantArea').innerHTML=ResaultString
}

function BuildHotRestaurantCard(HomePageHotRestaurantItem,index){
    return `
    <div class="HotRestaurantCard" onclick="HotRestaurantEvent(event)" id="${index}">
        <img src=${HomePageHotRestaurantItem.Picture} alt="" class="HotRestaurantAreaPicture" onclick="HotRestaurantEvent(event)" id="${index}">
        <div class="HotRestaurantTitle" onclick="HotRestaurantEvent(event)" id="${index}">${HomePageHotRestaurantItem.Title}</div>
        <div class="HotRestaurantlocation" onclick="HotRestaurantEvent(event)" id="${index}">
            <img src="image/location.png" alt="" onclick="HotRestaurantEvent(event)" id="${index}"><p onclick="HotRestaurantEvent(event)" id="${index}">${HomePageHotRestaurantItem.Address.substr(0,6)}</p>
        </div>
    </div>`
}

function HotRestaurantEvent(e){
    /** 首頁熱門活動資料的index */
    const HotRestaurantCardIndex = e.srcElement.id
    
    /** 編輯文字敘述排版字串 */
    let EditString =''
    
    //如果沒有說明，就不幫說明文字換行
    if(HomePageHotRestaurant[HotRestaurantCardIndex].Description!==undefined)
    for(index=0;index<HomePageHotRestaurant[HotRestaurantCardIndex].Description.length;index++){
        const word=HomePageHotRestaurant[HotRestaurantCardIndex].Description[index]

        EditString+=word
        if(index%28===27) EditString+='<br>'
    }


    //圖片innerHTML
    document.getElementById('dialogPictureArea').innerHTML=`
        <img src=${HomePageHotRestaurant[HotRestaurantCardIndex].Picture} alt="" class="dialogPictureArea">
    `
    //標題innerHTML
    document.getElementById('dialogTittle').innerHTML=`
        <p>${HomePageHotRestaurant[HotRestaurantCardIndex].Title}</p>
    `
    //文字敘述innerHTML
    document.getElementById('dialogDetail').innerHTML=`
        <p>${EditString}</p>
    `

    document.getElementById('showDialog').showModal();
}

//#endregion




























//#region dialog方法區塊

/** 關閉dialog */
function closeDialog(){
    document.getElementById('showDialog').close();
}

//#endregion



function aaa(){
    alert('aaa')
}

