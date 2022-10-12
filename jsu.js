(function () {
    const form = document.querySelector('form')
    const displayArea = document.querySelector('ul')
    const orderS = document.querySelector('select')
    const displayArea2 = document.querySelector('ol')
    const button = document.querySelectorAll("button")[0]
    const button2 = document.querySelectorAll("button")[1]
    const wishList = JSON.parse(localStorage.getItem('wishList')) || []
    const priceList = []
    const priceAll = JSON.parse(localStorage.getItem('priceAll')) || []
  
  
  var menu =["請選擇餐點","----想來點雞----","香酥雞腿便飯:","香酥雞排便飯:","香酥雞排飯:","香滷大雞飯:",
             "蔥油雞飯:","椒麻雞腿飯:","香烤雞腿飯:","香烤雞排飯:","三杯雞飯:","----想來點豬----","手打排骨飯:",
             "香滷排骨飯:","控肉飯:","老宅鹹豬肉:","私藏豬腳飯:","--想來點魚--","土魠魚飯:","香酥鱈魚飯:",
             "日式鯖魚飯:","椒鹽虱目魚:","蒲燒鯛魚飯:","香烤鯖魚飯:","----想來點不一樣的----","蒜泥白肉飯:",
             "叉燒雙寶飯:","香腸飯:","酥炸燒肉飯:","蝦捲飯:","花枝燒:",];
  var price =["","","105元","100元","100元","105元","105元","110元","110元","105元","110元","","90元","90元",
              "90元","90元","105元","","95元","95元","95元","95元","95元","100元","","85元","90元",
              "90元","90元","95元","90元",];
   
  console.log(priceAll);
  
    function displayWishList() {
      wishList.forEach(wish => displayWish(wish))
    }
  
    function displayWish(input) {
      displayArea.innerHTML += `
        <li>${input}<span>X</span></li>
      `
    }
  
    function displayWish2(input) {
      displayArea2.innerHTML += `
        <li>總價:${input}元 數量:${priceAll.length}<span>X</span></li>
      `
    }
  
    function updateLocalStorage() {
      //store the list back to localStorage
      localStorage.setItem('wishList', JSON.stringify(wishList))
    }
  
    function updateLocalStorage2() {
      //store the list back to localStorage
      localStorage.setItem('priceAll', JSON.stringify(priceAll))
    }
  
    function clearLocalSorage() {
      localStorage.removeItem("priceAll");
      localStorage.removeItem("wishList");
      location.reload();
    }
  
    function priceTotal(value) {
       for(i =0; i < priceList.length; i++){
        if(value == priceList[i]){
          priceAll.push(price[i]);   
          }
           }
    }
  
  
    //display all the wish on the list from localStorage
    displayWishList()
  
  
    //add event listener to form
    form.addEventListener('submit', event => {
      //prevent auto send the form
      event.preventDefault()
      //get input value
      const input = document.querySelector('input[type="text"]')
      //get name value
      const input2 = document.querySelector('select')
      const allvalue = input.value + "-"+ input2.value;
      //add new wish to the list
      displayWish(allvalue)
      //total price
      priceTotal(input2.value)
      //button.innerHTML = "總價";
     
      //add new wish to the list
      wishList.push(allvalue)
      //add the wish to localStorage
      updateLocalStorage(allvalue)
      //clear up the input
      console.log(wishList);
      console.log(input2.value);
      console.log(priceAll);
  
      input.value = ''
    })
  
    displayArea.addEventListener('click', event => {
      if (event.target.tagName !== 'SPAN') { return }
      const li = event.target.parentElement
      li.remove()
      wishList.splice(wishList.indexOf(li.textContent.slice(0, -1)), 1)
      priceAll.splice(priceAll.indexOf(li.textContent.slice(0, -1)), 1)
      updateLocalStorage()
      updateLocalStorage2()
    })
  
    displayArea2.addEventListener('click', event => {
      if (event.target.tagName !== 'SPAN') { return }
      const li = event.target.parentElement
      li.remove()
    })
  
    window.addEventListener('load', crateMenulist );
    button2.addEventListener("click",clearLocalSorage);
  
    function crateMenulist(){
     for(i = 0 ;i < menu.length; i++){
     var op = document.createElement("option");
     op.appendChild(document.createTextNode(menu[i]));
     op.appendChild(document.createTextNode(price[i]));
     orderS.appendChild(op);
     op.setAttribute("id","op" + i );
     priceList.push(op.value);
      }
      }
  
     button.addEventListener("click",function(){
         var total= 0;
         for(i = 0; i < priceAll.length; i++){
            total += parseInt(priceAll[i]);
                  
         }
          
          displayWish2(total);
          updateLocalStorage2(total);
          }
          
     )
  
     
  
  })()
  
  