document.addEventListener("DOMContentLoaded", function(event) {

    var url = window.location.href;

    if (url.toLowerCase().indexOf("searchmonster/job") >= 0) {
        console.log("OK");
    }

    $(document).ready(function() {


        $('body').on('click', '#profile__tab_1', function() {
            console.log('clicked');


            function saveDoc() {

                if (!window.Blob) {
                    alert('Your legacy browser does not support this action.');
                    return;
                }

                var html, link, blob, url, css;

                var iframe = document.getElementById('resume-frame');
                var postHtml = "</body></html>";
                var name = $('.candidate-profile-pane div.candidate-name div span:first-child').text();
                var contact_info = document.querySelector('.has-candidate-contact').innerHTML;
                var updated = document.querySelector('.candidate-resumeupdated').innerHTML;

                if(iframe != null){

                    iframe_content = iframe.contentWindow.document.body.innerHTML;
                    html = name + contact_info + updated + iframe_content;

                    if (contact_info.indexOf('.com') === -1) {
                        alert('Invalid Email Found');
                    }



                    // EU A4 use: size: 841.95pt 595.35pt;
                    // US Letter use: size:11.0in 8.5in;

                    css = ('\
                     <style>\
                     @page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: portrait;}\
                     div.WordSection1 {page: WordSection1;}\
                     h1 {font-family: "Times New Roman", Georgia, Serif; font-size: 16pt;}\
                     p {font-family: "Times New Roman", Georgia, Serif; font-size: 14pt;}\
                     </style>\
                    ');

                    var rightAligned = document.getElementsByClassName("sm-align-right");
                    for (var i = 0, max = rightAligned.length; i < max; i++) {
                        rightAligned[i].style = "text-align: right;"
                    }

                    var centerAligned = document.getElementsByClassName("sm-align-center");
                    for (var i = 0, max = centerAligned.length; i < max; i++) {
                        centerAligned[i].style = "text-align: center;"
                    }

                    // html = document.getElementById('text').innerHTML;
                    html = '\
                    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">\
                    <head>\
                      <title>Document Title</title>\
                      <xml>\
                        <w:worddocument xmlns:w="#unknown">\
                          <w:view>Print</w:view>\
                          <w:zoom>90</w:zoom>\
                          <w:donotoptimizeforbrowser />\
                        </w:worddocument>\
                      </xml>\
                    </head>\
                    <body lang=RU-ru style="tab-interval:.5in">\
                      <div class="Section1">' + html + '</div>\
                    </body>\
                    </html>'

                    blob = new Blob(['\ufeff', css + html], {
                        type: 'application/msword'
                    });

                    url = URL.createObjectURL(blob);
                    link = document.createElement('A');
                    link.href = url;

                    filename = name ? name + ' - monster.com' + '.doc' : 'document.doc';

                    // Set default file name.
                    // Word will append file extension - do not add an extension here.
                    link.download = filename;

                    document.body.appendChild(link);

                    if (navigator.msSaveOrOpenBlob) {
                        navigator.msSaveOrOpenBlob(blob, filename + '.doc'); // IE10-11
                    } else {
                        link.click(); // other browsers
                    }

                    document.body.removeChild(link);
                 } else {
                    $( ".svg-icon.svg-icon--sm.svg-icon__download.svg-icon__download--" ).trigger( "click" );
                    alert('PDFs Must Be Downloaded Manualy');
                }
            };

            // Doc File Download Function
            function downloadfile(iframe_content) {



                var preHtml = '\
                <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">\
                <head>\
                    <title>Document Title</title>\
                    <xml>\
                    <w:worddocument xmlns:w="#unknown">\
                        <w:view>Print</w:view>\
                        <w:zoom>90</w:zoom>\
                        <w:donotoptimizeforbrowser />\
                    </w:worddocument>\
                    </xml>\
                </head>\
                <body lang=RU-ru style="tab-interval:.5in">';


                var iframe = document.getElementById('resume-frame');
                var postHtml = "</body></html>";
                var name = $('.candidate-profile-pane div.candidate-name div span:first-child').text();
                var contact_info = document.querySelector('.has-candidate-contact').innerHTML;
                var updated = document.querySelector('.candidate-resumeupdated').innerHTML;


                if (iframe != null) {
                    iframe_content = iframe.contentWindow.document.body.innerHTML;
                    var html = preHtml + name + contact_info + updated + iframe_content + postHtml;


                    blob = new Blob(['\ufeff', html], {
                        type: 'application/msword'
                    });

                    if (contact_info.indexOf('.com') === -1) {
                        alert('Invalid Email');
                    }

                    // Specify link url
                    // var url = 'data:application/vnd.ms-word;charset=iso-8859-1,' + encodeURIComponent(html);
                    url = URL.createObjectURL(blob);
                    // Specify file name
                    name = name ? name + ' - monster.com' + '.docx' : 'document.docx';

                    // Create download link element
                    var downloadLink = document.createElement("a");
                    document.body.appendChild(downloadLink);
                    if (navigator.msSaveOrOpenBlob) {
                        navigator.msSaveOrOpenBlob(blob, name);
                    } else {
                        // Create a link to the file
                        downloadLink.href = url;

                        // Setting the file name
                        downloadLink.download = name;

                        //triggering the function
                        downloadLink.click();

                    }
                    document.body.removeChild(downloadLink);
                } else {
			$( ".svg-icon.svg-icon--sm svg-icon__download.svg-icon__download--" ).trigger( "click" );
                    alert('PDFs Must Be Downloaded Manualy');
                }
            }

            // Download Content After Displayed
            setTimeout(function() {
                saveDoc();
            }, 1000);


        });
    });

});