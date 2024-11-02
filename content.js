chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "editSubmissionPage") {
    console.log("Перешли на страницу с шаблоном 'action=editsubmission'");

    const submitButton = document.getElementById("id_submitbutton");
    submitButton.addEventListener('click', function (){ 

    })
 
  } else if (message.action === "viewPage") {
    console.log("Перешли на страницу с шаблоном 'action=view'");
    
    const table = document.querySelector('.submissionstatussubmitted.cell.c1.lastcol').textContent;
  
    if (table == "Отправлено для оценивания"){
      const fileElement = document.querySelectorAll('.fileuploadsubmission a');
      
      const fileUrl = fileElement[fileElement.length-1].getAttribute("href");
      
      chrome.runtime.sendMessage({ action: "getCookies" }, async (cookieString) => {
        const response = await fetch(fileUrl, {
          method: "GET",
          headers: {
            "Cookie": cookieString
          }
        });
      
        const fileBlob = await response.blob();
        const fileElement_2 = document.querySelectorAll(".fileuploadsubmission img");
        const file_name = fileElement_2[fileElement_2.length-1].getAttribute("title");
      
        // Отправка файла на сервер
        const formData = new FormData();
        formData.append('file', new Blob([fileBlob]), file_name); // Добавляем файл в FormData
      
        try {
          const uploadResponse = await fetch('https://file-downloader-1lg9.onrender.com', {
            method: 'POST',
            body: formData
          });
          const result = await uploadResponse.json();
          console.log('Файл загружен на сервер:', result);
        } catch (error) {
          console.error('Ошибка при загрузке файла на сервер:', error);
        }
      });

  }

  sendResponse({ status: "Сообщение обработано в content.js" });
}
});