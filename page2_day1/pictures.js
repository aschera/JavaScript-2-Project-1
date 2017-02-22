// https://api.unsplash.com/photos/?client_id=15885e6de6de3b9337d9417193aa46a9424d26adf0ec82c0239ac4702e04eb7e

// https://source.unsplash.com/


		window.addEventListener('load', function() {   // so shit loads and then runs.
            
            
			let button = document.getElementById('button');
			button.addEventListener('click', function() {
                
				// DOM-element to display results in.
				
				let res = document.getElementById('picure_box');
				
                		
			
// photos api


				let url4 = 'https://source.unsplash.com/category/buildings/?';
				//city
				url4 += result_country.city;
				
				console.log(url4);
				

                
                console.log (url4);
                
				// AJAX request photo
				let ajax4 = new XMLHttpRequest();
				ajax4.open('get', url4);
				ajax4.onreadystatechange = function() {
					if( ajax4.status == 200 && ajax4.readyState == 4 ) {
                        
						// AJAX success
						let json4= JSON.parse(ajax4.responseText);
						
						res.innerHTML = ajax4.responseText;
						
						console.log(json4);
                        
                       
					}
					else if( ajax4.status != 200 ) {
						console.log('error');
					}
				};
				ajax4.send();
});
})
