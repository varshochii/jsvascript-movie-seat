
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//way one 
/*
seats.forEach(el =>{
    el.addEventListener('click', (e) =>{

    })
})
*/


///////////////////////////////////////////////////////////////////////////
////way two
///seat click event
container.addEventListener('click', (e) =>{
     //console.log(e.target);

        if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
            //console.log(e.target);
            e.target.classList.toggle('selected');
            updateSelectedCount();
        }
});
/////////////////////////////////////////////////////////////////////////////
////movie select event
movieSelect.addEventListener('change', e =>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value); 
    updateSelectedCount();
})


////////////////////////////////////////////////
///update total and count
function updateSelectedCount(){
      
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

       //copy selected seats into array
       //map through that array
       //return a new array indexes
       ////////////////////here we convert the nodelist to array and then do the map method///////////////
       const seatsIndex = [...selectedSeats].map(function(seat){
           return [...seats].indexOf(seat) ///give us the index of the selected seat
       });

       localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
       
       

  

    const selectedSeatsCount = selectedSeats.length;
    
    count.textContent = selectedSeatsCount;
    total.textContent = selectedSeatsCount * ticketPrice;
}

/////////////////////////////////////////////////////
/////save selected movie index and price
function setMovieData(movieIndex,moviePrice){
     localStorage.setItem('selectedMovieIndex',movieIndex);
     localStorage.setItem('selectedMoviePrice',moviePrice);
}

//////////////////////////////////////////////////////
////get data from local storage and populate UI
function populateUI(){
    ////////
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); 
    if(selectedSeats !== null && selectedSeats.length > 0){
             seats.forEach((seat,index) =>{
                 if(selectedSeats.indexOf(index) > -1){
                      seat.classList.add('selected');
                 }
             })
    }
   ////////
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
      if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
      } 
}

///////////////////////////////////////////////////////////////
///initial count and total set
updateSelectedCount();
