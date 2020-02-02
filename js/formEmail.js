// function mask(inputName, mask, evt) {
//   try {
//     let text = document.getElementById(inputName);
//     let value = text.value;
//
//     try {
//       let e = (evt.which) ? evt.which : event.keyCode;
//       if ( e == 46 || e == 8 ) {
//         text.value = "";
//         return;
//       }
//     } catch (e1) {}
//
//     let literalPattern=/[0\*]/;
//     let numberPattern=/[0-9]/;
//     let newValue = "";
//
//     for (let vId = 0, mId = 0 ; mId < mask.length ; ) {
//       if (mId >= value.length)
//         break;
//
//       // Number expected but got a different value, store only the valid portion
//       if (mask[mId] == '0' && value[vId].match(numberPattern) == null) {
//         break;
//       }
//
//       // Found a literal
//       while (mask[mId].match(literalPattern) == null) {
//         if (value[vId] == mask[mId])
//           break;
//
//         newValue += mask[mId++];
//       }
//
//       newValue += value[vId++];
//       mId++;
//     }
//
//     text.value = newValue;
//   } catch(e) {}
// }
// const form = document.querySelector('#email-form');
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   let tel = document.querySelector('#PHONE').value;
//   let email = document.querySelector('#EMAIL').value;
//   const url = new URL('https://script.google.com/macros/s/AKfycbzKBJ4yX6b8mwtzJmaPtGew0wOCthTeceoXNAidAJE53y_vsA/exec');
//   url.searchParams.append('tel', tel);
//   url.searchParams.append('mail', email);
//
//   email = '';
//   tel = '';
//
//   // document.querySelector('.app-form > .btn-extra').disabled = true;
//
//   fetch(url).then(() => {
//     let responseMessages = {
//       az: `Qeydiyyat üçün təşəkkürümüzü bildiririk. Sizin ərizəniz qəbul olunmuş və baxılmaq üçün təqdim edilmişdir. Yaxın zamanlarda əməkdaşlarımız sizinlə əlaqə saxlayacaqlar.
// Hər hansı suallarınızla bağlı +994(12)937 nömrəli Məlumat Mərkəzinə zəng edə bilərsiniz.
// Hörmətlə, IBA Tech komandası`,
//       en: `Thank you for registration. Your application has been accepted and sent for processing.
// Our manager will contact you shortly.
// If you have any questions, please call + 994 (12) 937.
// With kind regards,
// The IBA Tech Academy Team`,
//       ru: `Спасибо за регистрацию. Ваша заявка получена и отправлена на обработку.
// В ближайшее время с вами свяжется наш менеджер.
// Если у вас возникли вопросы, требующие срочного ответа, вы можете позвонить по телефону + 994 (12) 937.
// С уважением,
// команда IBA Tech Academy`
//     };
//
//     let message = responseMessages.az;
//     const applicationCopy = `name: ${name};
//     email: ${email};
//     tel: ${tel};`;
//
//     switch (true) {
//       case window.location.pathname.includes('az'):
//         message = responseMessages.az;
//         break;
//       case window.location.pathname.includes('en'):
//         message = responseMessages.en;
//         break;
//       default:
//         message = responseMessages.az;
//     }
//     // fetch("/email", {
//     //   method: 'POST',
//     //   headers: {
//     //     "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
//     //   },
//     //   body: `sendTo=${email}&message=${message}`
//     // }).then((res) => {
//     //   fetch("/email", {
//     //     method: 'POST',
//     //     headers: {
//     //       "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
//     //     },
//     //     body: `sendTo=apply@ibatech.az&message=${applicationCopy}`
//     //   })
//     // }).then((res) => {
//
//     // const modal = document.querySelector('.app-modal');
//     // modal.style.display = 'flex';
//     //
//     // document.querySelector('.app-modal__msg > .btn-extra').onclick = (e) => {
//     //   document.querySelector('.app-modal').style.display = 'none';
//     //   // }, (error) => {
//     //   //   console.dir(error)
//     //   // });
//     // }
// });});


const form = document.querySelector('#email-form');
form.addEventListener('submit', (e)=>{
  e.preventDefault();

  const phoneNumber = document.querySelector('#PHONE').value;
  const email = document.querySelector('#EMAIL').value;

  const applicationCopy = `email: ${email};
  phone number: ${phoneNumber}`;

  const url = "https://script.google.com/macros/s/AKfycbwI5kpgyr_gAvsgqYld7CDkBsK28sfuAmBuIDcNntdQfZyUf0A/exec";
  const params = `p1=${email}&p2=${phoneNumber}`;
  const http = new XMLHttpRequest();

  http.open("GET", url+"?"+params, true);
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
      alert(http.responseText);
    }
  };
  http.send(null);
  console.log(http.responseText);
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
  fetch('../php/formEmail.php', {
    method: 'POST',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: `sendTo=${email}&message=${message}`
  }).then((res) => {
    fetch("../php/formEmail.php", {
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: `sendTo=apply@ibatech.az&message=${applicationCopy}`
    })
  }).then((res)=>{
    alert('Success!');
  });
  });
