document.addEventListener("DOMContentLoaded", function(event) {

	var url = window.location.href;

	if (url.toLowerCase().indexOf("searchmonster/job") >= 0) {
		console.log("OK");
	}


	 // Validate if image loading is enabled
	 $('#consta_e').on('change', function(event) {

        if ($('#consta_e').is(':checked')) {
         	console.log("checked");
        }else{
			console.log("not checked");
        }
	});

	$(document).ready(function(){
		$('body').on('click', '#profile__tab_1', function () {
			console.log('clicked');
			
		function downloadfile(iframe_content){
			var preHtml 	 = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
			var iframe 		 = document.getElementById('resume-frame');
			var postHtml 	 = "</body></html>";
			var name 		 = $('.candidate-profile-pane div.candidate-name div span:first-child').text();
			var contact_info = document.querySelector('.has-candidate-contact').innerHTML;
			var updated		 = document.querySelector('.candidate-resumeupdated').innerHTML;
			
				
				if (iframe!=null) {
					iframe_content = iframe.contentWindow.document.body.innerHTML;
					var html = preHtml + name + contact_info + updated + iframe_content + postHtml;

					var blob = new Blob(['\ufeff', html],{
						type: 'application/msword'
					});
					var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html)
					name = name?name+' - monster.com'+'.doc': 'document.doc';
					var downloadLink = document.createElement("a");
					document.body.appendChild(downloadLink);
					if(navigator.msSaveOrOpenBlob){
						navigator.msSaveOrOpenBlob(blob, name);
					}else{
						downloadLink.href = url;
						downloadLink.download = name;
						downloadLink.click();
					}
					document.body.removeChild(downloadLink);
				} 
				else{
					alert('PDFs Must Be Downloaded Manualy');
				}
			}

			// Download Content After Displayed
			setTimeout(function() {
				
					downloadfile();

			}, 1000);
			
		});
	});

});