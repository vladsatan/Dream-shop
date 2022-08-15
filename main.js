// const animale = {
//     name: 'dog',
//     sound: 'bark',
//     age: 1,
//     getAnimalVoice: function(){console.log(`Animale ${this.name} makes a sound ${this.sound}`)}
// }


// const elephant = {
//     name: 'elephant',
//     sound: 'uyyy',
//     age: 20,
// }

// const mouse = {
//     name: 'mouse',
//     sound: 'pipi',
//     age: 3,
// }

// animale.getAnimalVoice.call(mouse)





// let elephantSound = animale.getAnimalVoice.bind(elephant)
// elephantSound()




// function getAnimalVoice(){console.log(`Animale ${this.name} makes a sound ${this.sound}`)}


// let dogSound = getAnimalVoice.bind(animale)
// dogSound()
// let elephantSound = getAnimalVoice.bind(elephant)
// elephantSound()

//Ajax


let basket = []
let chosenMsv = []

const basketButton = document.querySelector('.basket')
const popup = document.querySelector('.popup')
const closePopup = document.querySelector('.close')

let getBasket = null
basketButton.addEventListener('click',()=>{
    getBasket =  JSON.parse(localStorage.getItem('basket')) 
    popup.classList.add('active')
    if(getBasket){
        // createPopupCard(getBasket)
        
        // getBasket.forEach(element=>{
        //     basket.push(element)
        // })
        basket=getBasket
        createPopupCard(basket)
        const add = document.createElement('div')
        add.classList.add('add')
        add.textContent = `${basket.length}`
        const basketBox = document.querySelector('.basket')
        basketBox.append(add)
    }else {
        const popupWindow = document.querySelector('.popup-window')
        const massage = document.createElement('p')
        massage.textContent = 'Корзина пуста'
        popupWindow.append(massage)
        massage.style.textAlign = 'center'
    }
})

closePopup.addEventListener('click',()=>{
    popup.classList.remove('active')
    const add = document.querySelector('.add')
    add.remove()
})


const createCard = (msv, hasSale, percent) =>{
   

    let localStorageArray = msv
    localStorage.setItem('Items', JSON.stringify(localStorageArray))
  

    msv.forEach(element => {

    //Создание карточки и ее элементы

        const root = document.getElementById('root')
        const container = document.querySelector('.container')
        const card = document.createElement('div')
        const title = document.createElement('h2')
        const photo = document.createElement('img')
        const prise = document.createElement('p')
        const articul = document.createElement('p')
        const info = document.createElement('div')
        const infoContainer = document.createElement('div')
        const color = document.createElement('p')
        const cardID = element.id
        const cardMenu = document.createElement('div')
        const buttonToAdd = document.createElement('button')
        const chosen = document.createElement('p')
     
        card.classList.add('card')
        photo.classList.add('photo')
        info.classList.add('info')
        prise.classList.add('prise')
        color.classList.add('color')
        cardMenu.classList.add('cardMenu')
        buttonToAdd.classList.add('buttonToAdd')
        chosen.classList.add('addToChosen')

 
        color.textContent = element.color
        title.textContent = element.name
        photo.src = element.url 
        prise.textContent = `$ ${element.price}`
        articul.textContent = element.articul
        buttonToAdd.textContent = 'В корзину'
        chosen.textContent = 'в избранное'

        container.append(card)
        card.append(title, photo, color, info,infoContainer,cardMenu)
        info.append(prise, articul)
        infoContainer.append(info)
        cardMenu.append(buttonToAdd,chosen)


        //Добавление товаров в корзину и избранное

        buttonToAdd.addEventListener('click',()=>{
            if(basket.includes(element)){return}else {

                basket.push(element)
                let localStorageBasket = localStorage.setItem('basket', JSON.stringify(basket))
                const basketBox = document.querySelector('.basket')
                const add = document.createElement('div')
                add.classList.add('add')
                add.textContent = basket.length
                basketBox.append(add)
                

               
                
            }
            
        })

        chosen.addEventListener('click',()=>{
            element.isChosen = true
            chosenMsv.push(element)
            const chosenMsvToLocalStorage = localStorage.setItem('chosen', JSON.stringify(chosenMsv))
            const chosenText = document.querySelector('.chosen-text')
            chosenText.textContent = `Избранное (${chosenMsv.length})`
            const star = document.createElement('img')
            star.classList.add('card-star')
            star.src = './star.svg'
            card.append(star)
            chosen.remove()
    

        })

        
        //Подсчет процента

          if(hasSale === true && percent){
            const percentSum = Number(prise.textContent.slice(1))
            let newSum =  percentSum - ((percent*percentSum)/100)
            prise.classList.add('unactive')
            const newPrise = document.createElement('p')
            newPrise.classList.add('newPrise')
            newPrise.textContent = `$ ${newSum}`
            infoContainer.append(newPrise)
            card.style.height = '500px'
          }


          //Поиск по сайту
        
         const search = document.querySelector('.search-button')
         
         search.addEventListener('click',()=>{
            const itemName = document.getElementById('name').value
            const itemPrice = document.getElementById('price').value

                if(itemName.length !== 0 && itemName !== element.name){
                card.remove()
            }

               if(itemPrice.length !== 0 && Number(itemPrice) > element.price || Number(itemPrice) === element.price){
                card.remove()
            }

})

           

    });
         
         

}

const createPopupCard = (array)=> {

const popupWindow = document.querySelector('.popup-window')
const allPopupCard = document.querySelectorAll('.popupcard')
allPopupCard.forEach(item=>{
    item.remove()
})
    array.forEach(e =>{


        const popupCard = document.createElement('div')
        const titlePopupCard = document.createElement('div')
        const pricesPopup = document.createElement('div')
        const oldPopupPrice = document.createElement('div')
        const newPopupPrice = document.createElement('div')
        const popupArticul = document.createElement('div')
        const closeCard = document.createElement('div')
        const cardPhoto = document.createElement('img')
        const cardName = document.createElement('h2')
        const cardColor = document.createElement('p')
        const popupId = e.id

        
        popupCard.classList.add('popupcard')
        titlePopupCard.classList.add('title-popup-container')
        pricesPopup.classList.add('prices-popup')
        oldPopupPrice.classList.add('popup-oldPrice')
        newPopupPrice.classList.add('popup-newPrice')
        popupArticul.classList.add('popupArticul')
        closeCard.classList.add('card-close')

        cardPhoto.src = e.url
        cardName.textContent = e.name
        cardColor.textContent = e.color
        newPopupPrice.textContent = `$ ${e.price}`
        popupArticul.textContent = e.articul
        closeCard.textContent = '--'

        // const popupWindow = document.querySelector('.popup-window')
        popupWindow.append(popupCard)
        popupCard.append(cardPhoto,titlePopupCard,pricesPopup,popupArticul,closeCard)
        titlePopupCard.append(cardName,cardColor)
        pricesPopup.append(newPopupPrice)



        closeCard.addEventListener('click', ()=>{
          let newBasket =  basket.filter(e=>{ return e.id !== popupId})
          basket = newBasket
          popupCard.remove()
          
          const add = document.getElementsByClassName('add')
          if(add){
            add.remove()
          }
                const countBasketItems = document.createElement('div')
                add.classList.add('add')
                add.textContent = basket.length
                basketBox.append(add)

          

            localStorage.removeItem('basket')
            localStorage.setItem('basket', JSON.stringify(basket))
            if(basket.length === 0){
                localStorage.removeItem('basket')

            }
         
            if(basket.length === 0){
                countBasketItems.remove()

            }


        })

    })
    

}








const BASEURL = './data.json'

let cardsDate = JSON.parse(localStorage.getItem('Items')) 
if(cardsDate){
    createCard(cardsDate)
}else{


fetch(BASEURL).then(response=>{return response.json()}).then( data => {createCard(data)})

}




