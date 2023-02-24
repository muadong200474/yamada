$(function () {
  'use strict';

  $(document).scroll(function () {
    if ($(this).scrollTop() > 260) {
      $('nav').addClass('fixed-top');
    } else {
      $('nav').removeClass('fixed-top');
    }
  });

  for (var i = 1; i <= 7; i++) {
    $('.slider-center').append(`
      <div>
        <img
          data-lazy="img/review${i}.jpg"
          alt="ảnh review ${i}"
          class="img-fluid"
        />
      </div>
    `);
  }

  /* Display message
  ========================================================*/
  var dataURL =
    'https://script.google.com/macros/s/AKfycbwPu8pg27OnnmoNTB_35PvksuV_QwSXepws5M2DknSI9aoQ5rk/exec';
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
      `<img src="${item[3]}" class="special-img">Khách hàng <strong>${
        item[0]
      }</strong> có SĐT là <strong>${
        item[1].slice(0, 7) + 'xxx'
      }</strong> ở <strong>${item[2]}</strong> đã đặt hàng`,
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
