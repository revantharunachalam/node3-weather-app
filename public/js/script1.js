const weatherform = document.querySelector('form')

weatherform.addEventListener('submit', (event) => {
    event.preventDefault()
    const search_loc = document.querySelector('input').value
    if(search_loc === ''){
        document.querySelector('#temperature').textContent = 'ERROR: Enter a valid location';
        document.querySelector('#description').textContent = ''; 
    }else{
        document.querySelector('#temperature').textContent = 'Loading...';
        document.querySelector('#description').textContent = ''; 

        fetch('/weather?location=' + search_loc).then((response) => {
        response.json().then((data) => {
            if(data.errorfound){
                document.querySelector('#temperature').textContent = 'ERROR: ' + data.errorfound;
                document.querySelector('#description').textContent = ''; 
            }
            else{
                document.querySelector('#temperature').textContent = 'TEMPERATURE: ' + data.temperature;
                document.querySelector('#description').textContent = `DESCRIPTION: The climate is ${data.climate} and this will feelslike ${data.feellike} degree Celsius in ${search_loc}`;
            }
        })
        })  
    }  
})