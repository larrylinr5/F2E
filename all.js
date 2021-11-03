//程式啟動進入點
init();




/** 程式啟動進入點 */
function init() {
    ShowHotCityArea(true);
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
    const determine = (item, index) => {
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
    }
    /** 刷新熱門城市的方法 */
    const reflash = () => {
        document.getElementById('HotCity').innerHTML = ResaultString
    }

    //bool=true
    if (bool) {
        let index = 0;
        LeftCityArr.forEach(item => {
            determine(item, index)
            index++;
        })
        reflash();
    }
    //bool=false
    else {
        let index = 0;
        RightCityArr.forEach(item => {
            determine(item, index)
            index++;
        })
        reflash();
    }
}
//#endregion

