




//foursquare needs id!
    //client id:RHPTHZQRVD1O3M0AX3SREE4QJWLPPAEIFJAOGZHTTWT12A4W
    // client secret: U4SDRN4NDPX3EZSXSIK44ZZCWIT01FGS54PE3EGF2VSYD53X
window.addEventListener('load', function() {   // so shit loads and then runs.
    let button = document.getElementById('button');

        button.addEventListener('click', function() {
                
				// DOM-element to display results in.
				let res = document.getElementById('foursquare_box');
                		
			
// URL Foursquare
				let url = 'https://api.foursquare.com/v2/venues/search?';
      
                //date
                url += 'v=' + '20170221' + '&';
                
                //limit 5
                url += 'limit=' + 10 + '&';
                
                // coordinates
				//url += 'll=' + result_country.lat + ',' + result_country.lng + '&';
                
                // near city
                url += 'near=' + result_country.city + '&';

                //what
                let categoryId = 'food' + '&';
				url += 'query=' + categoryId;
                
                //identification
                url += 'client_id=RHPTHZQRVD1O3M0AX3SREE4QJWLPPAEIFJAOGZHTTWT12A4W&client_secret=U4SDRN4NDPX3EZSXSIK44ZZCWIT01FGS54PE3EGF2VSYD53X';
                
				// AJAX request Foursquare
				let ajax = new XMLHttpRequest();
				ajax.open('get', url);
				ajax.onreadystatechange = function() {
					if( ajax.status == 200 && ajax.readyState == 4 ) {
                        
						// AJAX success
						let json = JSON.parse(ajax.responseText);
                        console.log(ajax.responseText);
                            console.log(json);
                        
                        for (i = 0; i < json.response.venues.length; i++ ) {
                            
                        var node = document.createElement("LI"); 
                            
                        var textnode = document.createTextNode(json.response.venues[i].name +  " " );
                            
var four_icon = (
json.response.venues[i].categories['0'].icon.prefix +  
json.response.venues[i].categories['0'].icon.suffix  
)                     

let image = document.createElement('img');
                            
image.src = four_icon;
                            
node.appendChild(textnode);
node.appendChild(image);
document.getElementById("list").appendChild(node);     
                        }
                       
					}
					else if( ajax.status != 200 ) {
						status.innerHTML = 'Error';
					}
				};
				ajax.send();
            
// URL REST countries API
// We need this to find the capital city of the country we find.
// and also the latitude and longtitude for the google map

				let url2 = 'https://restcountries.eu/rest/v1/name/';
                
                // where?
                url2 += result_country.name;
                
				// AJAX request REST countries
				let ajax2 = new XMLHttpRequest();
				ajax2.open('get', url2);
				ajax2.onreadystatechange = function() {
					if( ajax2.status == 200 && ajax2.readyState == 4 ) {
                        
                        let json2 = JSON.parse(ajax2.responseText);
                            
                        // City
                        result_country.city = json2[0].capital;
                        
                        // lat/lng
                        result_country.lat = json2[0].latlng[0];
                        result_country.lng = json2[0].latlng[1];

					}
					else if( ajax2.status != 200 ) {
						
					}
				};
				ajax2.send();  
            
            
            
// URL Weather API
//WU-935842
// key openweather 5d224fafcdf9102b03d9243837eb00d4


				let svarx = document.getElementById('weather');
                let svar1x = document.getElementById('weather1');
                let svar2x = document.getElementById('weather2');
                let svar3x = document.getElementById('weather3');
            
            
				let urlx='http://api.openweathermap.org/data/2.5/weather?';

                urlx += 'q=' + result_country.city +',uk&APPID=5d224fafcdf9102b03d9243837eb00d4'

				//AJAX request
                let ajaxx = new XMLHttpRequest();

                ajaxx.open("get",urlx);
                ajaxx.onreadystatechange=function(){

                       if(ajaxx.status==200 && ajaxx.readyState==4){

                             console.log(ajaxx.responseText);
                            var object=JSON.parse(ajaxx.responseText);
                            var data = object.weather[0];
                            var main= object.main;
                           console.log("Object:"+object.main.temp);
                            var weatherIcon = data.icon;
                            var iconURL = 'http://www.openweathermap.org/img/w/'+weatherIcon+'.png';
                            console.log(iconURL);
                            let img = document.createElement('img');
                            img.src=iconURL;
                            //document.body.appendChild(img);
                             
                            svarx.innerHTML=`<br>  ${data.description} `;
                            svar1x.appendChild(img);
                            svar2x.innerHTML= ` <br> Temperature: `;
                            svar3x.innerHTML= ` <br> <strong> ${main.temp } F </strong>`;
                        }
					else if( ajaxx.status != 200 ) {
						
					}
				};
                ajaxx.send(); 
            
            
// URL WIKI API        
// wiki CLIENT ID : 1a4d5d1c55ad48baa5b9283de528ada8

    // DOM-element to display results in.
    let wiki = document.getElementById('wiki_box');
    let wikihead = document.getElementById('wiki_header');

    let url3 = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=';
    //https://en.wikipedia.org/w/api.php?action=opensearch&format=jsonfm&search=';


				//city
				url3 += result_country.city + '&';
				

				//rest
				url3 += 'format=json&origin=*';

                
                //identification
                //url3 += '1a4d5d1c55ad48baa5b9283de528ada8';
     
				// AJAX request Wikipedia
				let ajax3 = new XMLHttpRequest();
				ajax3.open('get', url3);
				ajax3.onreadystatechange = function() {
					if( ajax3.status == 200 && ajax3.readyState == 4 ) {
                        
						// AJAX success
						var data_array = ajax3.responseText.replace(/[u02\\`~@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/]/gi, '');
						var splitted = data_array.split(',');
						var text = splitted.slice(7,100);
					
						wiki.innerHTML = '<p>' + text + '</p><p>';
				
					}
					else if( ajax3.status != 200 ) {
						console.log('error');
					}
				};
				ajax3.send();
      
            
}); // end eventlistener
}) // end loader function

