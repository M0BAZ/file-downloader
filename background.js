<<<<<<< HEAD

chrome.webNavigation.onCompleted.addListener((details) => {
  
  const url = details.url;

  // Шаблон для страницы с "action=view"
  const viewPattern = /https:\/\/online-edu\.mirea\.ru\/mod\/assign\/view\.php.*action=view.*/;
  
  // Шаблон для страницы с "action=editsubmission"
  const editPattern = /https:\/\/online-edu\.mirea\.ru\/.*action=editsubmission.*/;

  let message = null;

  if (viewPattern.test(url)) {
    console.log("Страница соответствует шаблону 'action=view'");
    message = { action: "viewPage" };
  } else if (editPattern.test(url)) {
    console.log("Страница соответствует шаблону 'action=editsubmission'");
    message = { action: "editSubmissionPage" };
  }

  if (message) {
    // Отправка сообщения в content.js
    chrome.tabs.sendMessage(details.tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Ошибка при отправке сообщения в content.js:", chrome.runtime.lastError);
      } else {
        console.log("Ответ от content.js:", response);
      }
    });
  }
}, {
  url: [{ hostContains: "online-edu.mirea.ru" }]  // Ограничиваем обработку только для сайта "online-edu.mirea.ru"
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getCookies") {
    // Обработчик для получения cookies
    chrome.cookies.getAll({ domain: "online-edu.mirea.ru" }, (cookies) => {
      const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join("; ");
      sendResponse(cookieString);
    });
    return true;  // Указание на асинхронный ответ
  }


  
  if (message.action === "downloadFile") {
    // Обработчик для загрузки файла
    chrome.downloads.download({
      url: message.url,
      filename: message.filename,
      saveAs: false
    }, () => {
      console.log("Файл успешно сохранен на диск");
    });
  }


});
=======

chrome.webNavigation.onCompleted.addListener((details) => {
  
  const url = details.url;

  // Шаблон для страницы с "action=view"
  const viewPattern = /https:\/\/online-edu\.mirea\.ru\/mod\/assign\/view\.php.*action=view.*/;
  
  // Шаблон для страницы с "action=editsubmission"
  const editPattern = /https:\/\/online-edu\.mirea\.ru\/.*action=editsubmission.*/;

  let message = null;

  if (viewPattern.test(url)) {
    console.log("Страница соответствует шаблону 'action=view'");
    message = { action: "viewPage" };
  } else if (editPattern.test(url)) {
    console.log("Страница соответствует шаблону 'action=editsubmission'");
    message = { action: "editSubmissionPage" };
  }

  if (message) {
    // Отправка сообщения в content.js
    chrome.tabs.sendMessage(details.tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Ошибка при отправке сообщения в content.js:", chrome.runtime.lastError);
      } else {
        console.log("Ответ от content.js:", response);
      }
    });
  }
}, {
  url: [{ hostContains: "online-edu.mirea.ru" }]  // Ограничиваем обработку только для сайта "online-edu.mirea.ru"
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getCookies") {
    // Обработчик для получения cookies
    chrome.cookies.getAll({ domain: "online-edu.mirea.ru" }, (cookies) => {
      const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join("; ");
      sendResponse(cookieString);
    });
    return true;  // Указание на асинхронный ответ
  }


  
  if (message.action === "downloadFile") {
    // Обработчик для загрузки файла
    chrome.downloads.download({
      url: message.url,
      filename: message.filename,
      saveAs: false
    }, () => {
      console.log("Файл успешно сохранен на диск");
    });
  }


});
>>>>>>> 969af0d76c3313bded7443e1d7cf3e07fc130265
