$(function () {
  'use strict';

  $(document).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('nav').css('background-color', '#eef4f5');
      $('.navbar').addClass('fixed-top');
    } else {
      $('nav').css('background-color', 'transparent');
      $('.navbar').removeClass('fixed-top');
    }
  });

  /*  Lazy load
  ========================================================*/
  $('img.lazy').lazyload({
    effect: 'fadeIn',
    threshold: 100,
  });

  /* Countdown timer
    ========================================================*/
  var now = new Date();
  var prev = new Date(Date.now() - 24 * 60 * 60 * 1000);
  $('.days').html(
    `${prev.getFullYear()}/${
      prev.getMonth() + 1
    }/${prev.getDate()} - ${now.getFullYear()}/${
      now.getMonth() + 1
    }/${now.getDate()}`,
  );

  /* Tien ich
    ========================================================*/
  $('.figureout-btn').click(function (e) {
    e.preventDefault();
    var target = $('#formsec').offset().top - 100;
    $('html, body').animate({ scrollTop: target }, 1500);
  });

  $('.more-detail').click(function (e) {
    e.preventDefault();
    var target = $('.question-section').offset().top - 100;
    $('html, body').animate({ scrollTop: target }, 1500);
  });

  for (var i = 1; i <= 12; i++) {
    $('.slider-center').append(`
      <div>
        <img
          data-lazy="img/review-${i}.jpg"
          alt="ảnh review ${i}"
          class="img-fluid"
        />
      </div>
    `);
  }

  /*  Slick Slider
    ========================================================*/
  $('.slider-center').slick({
    lazyLoad: 'ondemand',
    infinite: true,
    centerMode: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

$(function () {
  /* Working: send email, fill in form
    ========================================================*/
  var dataURL =
    'https://script.google.com/macros/s/AKfycbw0B54kEYZEmWL3UZX6QaWgnYO1oPJFeGwZvmSf1XSK9xuARWU/exec';

  var form = $('#order-form');
  form.validate({
    rules: {
      name: 'required',
      phone: {
        required: true,
        maxlength: 10,
        minlength: 10,
        digits: true,
      },
      email: {
        email: true,
      },
      note: 'required',
    },
    messages: {
      name: 'Hãy nhập họ và tên của bạn',
      phone: {
        required: 'Hãy nhập số điện thoại của bạn',
        maxlength: 'Số điện thoại chỉ có 10 số',
        minlength: 'Số điện thoại chỉ có 10 số',
        digits: 'Hãy nhập sô 1-9',
      },
      email: {
        email: 'Email chưa hợp lệ',
      },
      note: 'Hãy nhập địa chỉ của bạn',
    },
  });
  form.on('submit', function (event) {
    event.preventDefault();

    if (form.valid()) {
      let name = $("input[name='name']").val();
      let phone = $("input[name='phone']").val();
      let address = $("textarea[name='note']").val();
      let email = $("input[name='email']").val();

      $('#confirmModal .modal-body')
        .html('')
        .append(
          `
          <h4>Thông tin cá nhân:</h4>
          <p>Họ tên: <span>${name}</span></p>
          <p>SĐT: <span>${phone}</span></p>
          <p>Địa chỉ: <span>${address}</span></p>
          <p>Email: <span>${email}</span></p>
          `,
        );
      $('#confirmModal').modal({
        backdrop: 'static',
        keyboard: false,
      });

      $('#cont-btn').on('click', function () {
        $('#cont-btn').attr('disabled', true);
        $('.caution').append('Xin chờ trong giây lát...');

        let data = {
          name,
          phone,
          address,
          email,
        };
        sendEmail(data);

        // fill in gg excel
        data = $('form#order-form').serialize();
        fillInForm(dataURL, data);
      });
    }
  });

  /* Display message
  ========================================================*/
  var arrays = [];

  $.ajax({
    type: 'GET',
    url: dataURL,
    dataType: 'json',
    crossDomain: true,
    success: function (response) {
      arrays = response.data;
    },
  });

  function randTime(data) {
    return data[Math.floor(data.length * Math.random())];
  }

  function displayMessage() {
    var timeArray = new Array(12500, 14500, 16500);

    var item = arrays[Math.floor(Math.random() * arrays.length)];
    $('.toast').show();
    $('.toast-body').html(
      `<img src="${item[0]}" class="special-img">
        Khách hàng <strong>${item[1]}</strong> có SĐT là <strong>${
        item[2].slice(0, 7) + 'xxx'
      }</strong> ở <strong>${item[3]}</strong> đã đặt hàng`,
    );
    $('.toast').delay(4000).fadeOut(800);

    clearInterval(timer);
    timer = setInterval(displayMessage, randTime(timeArray));
  }
  var timer = setInterval(displayMessage, 5000);

  $('.close').on('click', function () {
    $('.toast').hide();
  });
});

/* Send email
========================================================*/
function sendEmail(data) {
  Email.send({
    Host: 'smtp.elasticemail.com',
    Username: 'noreply200474@gmail.com',
    Password: '281171344F3555517A2432D2031290CF228A',
    To: 'sonpt91.bkhn@gmail.com',
    From: 'noreply200474@gmail.com',
    Subject: 'Customer subcriber',
    Body: `1. Tên khách hàng: ${data.name}, 2.Email: ${data.email}, 3. SĐT: ${data.phone}, 4. Địa chỉ: ${data.address}`,
  }).then((message) => console.log(message));
  Email.send({
    Host: 'smtp.elasticemail.com',
    Username: 'noreply200474@gmail.com',
    Password: '281171344F3555517A2432D2031290CF228A',
    To: 'vuvantrung21@gmail.com',
    From: 'noreply200474@gmail.com',
    Subject: 'Customer subcriber',
    Body: `1. Tên khách hàng: ${data.name}, 2.Email: ${data.email}, 3. SĐT: ${data.phone}, 4. Địa chỉ: ${data.address}`,
  }).then((message) => console.log(message));
}

/* Send data to excel
========================================================*/
function fillInForm(url, data) {
  $.ajax({
    type: 'POST',
    url: url,
    dataType: 'json',
    crossDomain: true,
    data: data,
    success: function (response) {
      location.href = 'thanks.html';
    },
  });
}
