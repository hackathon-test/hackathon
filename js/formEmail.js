function writeToTable(url, params){
  try{
    const http = new XMLHttpRequest();
    http.open("GET", url+"?"+params, true);
    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
      }
    };
    http.send(null);
  } catch (e) {
  }
}


const form = document.querySelector('#email-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const phoneNumber = document.querySelector('#PHONE').value;
  const email = document.querySelector('#EMAIL').value;
  const url = "https://script.google.com/macros/s/AKfycbwI5kpgyr_gAvsgqYld7CDkBsK28sfuAmBuIDcNntdQfZyUf0A/exec";
  const params = `p1=${email}&p2=${phoneNumber}`;

  writeToTable(url,params);

  const applicationCopy = `email: ${email};
  phone number: ${phoneNumber}`;

  let responseMessages = {
    az: `Qeydiyyat üçün təşəkkürümüzü bildiririk. Sizin ərizəniz qəbul olunmuş və baxılmaq üçün təqdim edilmişdir. Yaxın zamanlarda əməkdaşlarımız sizinlə əlaqə saxlayacaqlar.
Hər hansı suallarınızla bağlı +994(12)937 nömrəli Məlumat Mərkəzinə zəng edə bilərsiniz.
Hörmətlə, IBA Tech komandası`,
    en: `Thank you for registration. Your application has been accepted and sent for processing.
Our manager will contact you shortly.
If you have any questions, please call + 994 (12) 937.
With kind regards,
The IBA Tech Academy Team`
  };

  let message = responseMessages;
  switch (true) {
    case window.location.pathname.includes('az'):
      message = responseMessages.az;
      break;
    case window.location.pathname.includes('en'):
      message = responseMessages.en;
      break;
    default:
      message = responseMessages.az;
  }
  fetch("../php/formEmail.php", {
    method: 'POST',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: `sendTo=${email}&message=${message}`
  }).then((res) => res.json()).then((res) => {
    document.querySelector('.success-message').style.display = 'block';
  });
});

