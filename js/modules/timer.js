function timer (id, deadline){
    
    //  ================================================================
    // ==================TIMER==========================================
    // =================================================================


   function calcData (string){
    let a = Date.parse(string) - Date.parse(new Date());
    if (a <= 0){
        const days = 0;
        const hours = 0;
        const minutes = 0;
        const seconds = 0;
        return {
            total: a,
            days : days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }else{
        const days = Math.floor ( a / (1000 * 60 * 60 * 24) );
        const hours = Math.floor( a / (1000 * 60 * 60) % 24 );
        const minutes = Math.floor (  a / (1000 * 60 ) % 60 );
        const seconds = Math.floor ( (a / 1000) % 60 );
        
        return {
            total: a,
            days : days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

   }

   function addZero (num){
    if (num >= 0 && num < 10){
        return `0${num}`;
    }else {
        return num;
    }
   }

   function setClock (selector, endtime) {
    const timer = document.querySelector(selector),
          days  = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds');
    
     let counter = setInterval (updateClocks, 1000);
     updateClocks ();

        function updateClocks () {
            let q = calcData (endtime);
            
            days.innerHTML = addZero(q.days) ;
            hours.innerHTML = addZero(q.hours);
            minutes.innerHTML = addZero(q.minutes);
            seconds.innerHTML = addZero(q.seconds);
            
            if (q.total <= 0){
                clearInterval(counter);
            }
        }
   }

   setClock (id, deadline);
}

export default timer;