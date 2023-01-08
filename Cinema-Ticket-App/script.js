const container = document.querySelector('.container')
const count = document.getElementById('count')
const amount = document.getElementById('amount')
const select = document.getElementById('movie')
const koltuklar = document.querySelectorAll('.koltuk') // bütün koltuklar.


getFromLocalStorage();
calculateTotal();

// Asagıda container class'ına bir click eventi ekledik ve bu click eventi tıkladıgımız elementin class'ında koltuk var ise calısacak ve reserved clası yoksa calısacak. Yanı sadece koltuk clasına sahıp elemente selected class'ını ekleyecegız. selected clasını verırken toggle metodunu kullandık yoksa ekleyecek varsa silecek (add/remove metotları).
container.addEventListener('click', function (e) {
    if (e.target.classList.contains('koltuk') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected')
        // seçili eleman sayısını almak
        calculateTotal()
    }
})

// select elementınde degısıklık oldugunda fiyat tekrardan hesaplanacak bunun ıcın change eventı kullandık.
select.addEventListener('change', function (e) {
    calculateTotal()

})




function calculateTotal() {
    const seciliKoltuk = container.querySelectorAll('.koltuk.selected') // seçili koltuklar içeren liste query selector all ıle sectıgımız ıcın nodelıst olarak gelıyor. Sectıgımız elemanların butun elemanların bulundugu lıste ıcerısınde kacıncı ındex oldugunu belırlemek ıcın map metodu kullanacagız bunun ııcnde nodelıstlerı dızı ye cevırmemız(bir diziye pushla) gerekmekte map metodunu nodelıst uzerınde kullanamayız.    
    
    const selectedSeatsArr = [...seciliKoltuk]  
    const seatsArr = [...koltuklar]
    
   

    let selectedSeatIndex = selectedSeatsArr.map(seat => { // map metodu ıle bıze secılı elemanların ındex lıstesını verecek.
        return seatsArr.indexOf(seat) // secılı koltukların tum koltuklar ıcerısınde hangı ındexte oldugunu map ıle yenı bır dızıye bastık.
    })
    console.log(selectedSeatIndex)
    let seciliKoltukSayısı = seciliKoltuk.length // seçili koltukların sayısı
    count.innerText = seciliKoltukSayısı // id si count olan span etıketının ıcerısıne koltuk sayısını yazdırdık.
    amount.innerText = seciliKoltukSayısı * select.value // fiyatı hesapladık

   saveToLocalStoroges(selectedSeatIndex) 
}

// Local storagesten verılerı alalım.
function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedItems:'))

    if(selectedSeats !=null && selectedSeats.length > 0){
        koltuklar.forEach((seat,index)=>{ // butun koltukları dolastık secmıs oldugumuz koltuk bılgılerını tum koltuklar ıcerısınde bulduk.
            if(selectedSeats.indexOf(index) > -1 ){ 
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovie =(localStorage.getItem('selectedMovieİtem'))

    if(selectedMovie !=null){
        select.selectedIndex=selectedMovie;
    }
}

function saveToLocalStoroges(index){
    localStorage.setItem('selectedItems:',JSON.stringify(index))    
    localStorage.setItem('selectedMovieİtem',select.selectedIndex) // select.selectedIndex dıyerek kacıncı elemanı sectıgımızı local storageye kayıt ettık.
    
}