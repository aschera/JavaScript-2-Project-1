
//test country



var res = document.getElementById('foursquare_box');

var result_country = {
    name: null,
    lat: 0,
    lng: 0,
    city: ''
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//foursquare needs id!
    //client id:RHPTHZQRVD1O3M0AX3SREE4QJWLPPAEIFJAOGZHTTWT12A4W
    // client secret: U4SDRN4NDPX3EZSXSIK44ZZCWIT01FGS54PE3EGF2VSYD53X

    var apiRequest = apiName => {
        result_country.name = apiName;
        console.log(apiName);
        

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
            if (ajax2.status == 200 && ajax2.readyState == 4) {
                let json2 = JSON.parse(ajax2.responseText);
                // City
                result_country.city = json2[0].capital;
                // lat/lng
                result_country.lat = json2[0].latlng[0];
                result_country.lng = json2[0].latlng[1];
                everythingElse();
                setTimeout( function() {
                    createMap(result_country.lat, result_country.lng);
                },200);

            } 
            else if (ajax2.status != 200) {}};
        ajax2.send();


    } // end API-request




function everythingElse() {

        // DOM-element to display results in.
                        
        // URL Foursquare
        let url = 'https://api.foursquare.com/v2/venues/search?';
        
        //date
        url += 'v=' + '20170221' + '&';
                
        //limit 5
        url += 'limit=' + 10 + '&';
                
        // coordinates
        //url += 'll=' + result_country.lat + ',' + result_country.lng + '&';
                
        // near city
        url += 'near=' + result_country.name + '&';

        //what
        let categoryId = 'restaurant' + '&';
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
                for (i = 0; i < json.response.venues.length; i++ ) {
                    var node = document.createElement("LI"); 
                    var textnode = document.createTextNode(" " + json.response.venues[i].name +  " ");
                    var x = document.createTextNode('- ' + json.response.venues[i].location.address);
                    var y = document.createTextNode('- ' + json.response.venues[i].url);         

                    var four_icon = (
                        json.response.venues[i].categories['0'].icon.prefix + 'bg_' + '32' +    json.response.venues[i].categories['0'].icon.suffix
                    );    

                    let image = document.createElement('img');                    
                    image.src = four_icon;
                            
                    let link = document.createElement('link');  
                    link.href = json.response.venues[i].url;
    
                    node.appendChild(image);                          
                    node.appendChild(textnode);
                    node.appendChild(x);
                    node.appendChild(link);
                            
                    document.getElementById("list").appendChild(node);     
                }     
            }
            else if( ajax.status != 200 ) {
                status.innerHTML = 'Error';
            }
        }
        ajax.send();
            
            
            
        //////////////////////////////////////////////////////////////////////////////////////////////////////////  // URL Weather API
        //WU-935842
        // key openweather 5d224fafcdf9102b03d9243837eb00d4

        let svarx = document.getElementById('weather');
        let svar1x = document.getElementById('weather1');
        let svar2x = document.getElementById('weather2');
        let svar3x = document.getElementById('weather3');
            
        let urlx='http://api.openweathermap.org/data/2.5/weather?';
        urlx += 'q=' + result_country.city +',uk&APPID=5d224fafcdf9102b03d9243837eb00d4' + '&units=metric'

        //AJAX request
        let ajaxx = new XMLHttpRequest();
        ajaxx.open("get",urlx);
        ajaxx.onreadystatechange=function(){
            if(ajaxx.status==200 && ajaxx.readyState==4){
                var object=JSON.parse(ajaxx.responseText);
                var data = object.weather[0];
                var main= object.main;

                var weatherIcon = data.icon;
                var iconURL = 'http://www.openweathermap.org/img/w/'+weatherIcon+'.png';

                let img = document.createElement('img');
                img.src=iconURL;
                //document.body.appendChild(img);
                             
                svarx.innerHTML=`<br>  ${data.description} `;
                svar1x.appendChild(img);
                svar2x.innerHTML= ` <br> Temperature: `;
                svar3x.innerHTML= ` <br> <strong> ${main.temp } C </strong>`;
            }
            else if( ajaxx.status != 200 ) {}
        }
        ajaxx.send(); 
            
        /////////////////////////////////////////////////////////////////////////////////////////////////////////// // URL WIKI API        
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
        }
        ajax3.send();
      
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Pixabay Photo API
        // needs key: 4655270-b812404bb89b76af66b5a7ba7

        // DOM-element to display results in.
                
        let pics = document.getElementById('pic1');
        // URL Pixabay
        let url5 = 'https://pixabay.com/api/?';
  
        // ID
        url5 += 'key=' + '4655270-b812404bb89b76af66b5a7ba7';
                
        // Search query
        url5 += '&q=' + result_country.city + '&image_type=photo' + '&category=travel' + '&orientation=horizontal'
                
            
        // AJAX request Pixabay
        let ajax5 = new XMLHttpRequest();
        ajax5.open('get', url5);
        ajax5.onreadystatechange = function() {
            if( ajax5.status == 200 && ajax5.readyState == 4 ) {  
                // AJAX success
                let json5 = JSON.parse(ajax5.responseText);
                for (i = 0; i < json5.hits.length; i++ ) {
                    var data1 = json5.hits[i];
                    let img5 = document.createElement('img');
                                
                    img5.src = data1.webformatURL;
                    pics.appendChild(img5); 
                }
            }
            else if( ajax5.status != 200 ) {
                pic.innerHTML = 'Error';
            }
        }
        ajax5.send(); 
    }
        








