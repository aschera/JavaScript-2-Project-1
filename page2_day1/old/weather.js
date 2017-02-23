

         //WU-935842

         // key openweather 5d224fafcdf9102b03d9243837eb00d4

		window.addEventListener('load', function() {

			let button = document.getElementById('button');

			button.addEventListener('click', function() {

				let svar = document.getElementById('weather');

				

				// Skapa URL med querystring

			// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=5d224fafcdf9102b03d9243837eb00d4

                

				let url='http://api.openweathermap.org/data/2.5/weather?';

                url += 'q=' + result_country.city +',uk&APPID=5d224fafcdf9102b03d9243837eb00d4'

                

               

                

				// Gör en AJAX request och visa resultatet

               /* javascrip som skickade nåt till hemsidan och få tillbaka allt och vi byt de till object och sen med jax sa vi vad vi vill ha baraa, sen,,*/

                let ajax = new XMLHttpRequest();

                ajax.open("get",url);

                

                ajax.onreadystatechange=function(){

                       if(ajax.status==200 && ajax.readyState==4){

                            console.log(ajax.responseText);

                            var object=JSON.parse(ajax.responseText);

                            var data = object.weather[0]

                            var weatherIcon = data.icon;

                            var iconURL = 'http://www.openweathermap.org/img/w/'+weatherIcon+'.png';

                            console.log(iconURL);

                            let img = document.createElement('img');

                            img.src=iconURL;

                            //document.body.appendChild(img);

                           

                            svar.innerHTML=`the weather is ${data.description} `;

                             svar.appendChild(img);

                         

                        }

              };

                

                ajax.send();


			}); // button click

		}); // window load

	
     
