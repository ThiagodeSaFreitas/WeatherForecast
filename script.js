async function getAddressByCep(){

    const cep = document.getElementById('cep').value;
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        document.getElementById('rua').innerText = data.logradouro;
        document.getElementById('bairro').innerText = data.bairro;
        document.getElementById('uf').innerText = data.localidade;

        document.getElementById('cep').value = '';

    } catch (error) {
        alert(error.message);
        
    }

}

async function getPrevisao(){


    const lat = document.getElementById('Latitude').value;
    const lon = document.getElementById('Longitude').value;

    try {
                 
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); 
        console.log('Response data:', data);

        const temperatura = data.hourly.temperature_2m[0];
        document.getElementById('inputPrevisao').value = `Previsão de tempo de acordo com a região: ${temperatura}°C`;
        

        document.getElementById('Latitude').value = '';
        document.getElementById('Longitude').value = '';

    } catch (error) {
        alert(error.message);
        
    }

}

function cepWeather() {
    getAddressByCep();  
    getPrevisao();      
}

document.querySelectorAll('.navbar button').forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-scroll-target');
      const targetSection = document.querySelector(targetId);
  
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const accessButton = document.getElementById('acess');
    
    accessButton.addEventListener('click', function() {
       
        cepWeather();
        
        const targetSection = document.querySelector('#inputPrevisao');
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
  