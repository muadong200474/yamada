$(function () {
  $('form').validate({
    rules: {
      name: 'required',
      phone: {
        required: true,
        maxlength: 10,
        minlength: 10,
        digits: true,
      },
      confirmPhone: {
        required: true,
        maxlength: 10,
        minlength: 10,
        digits: true,
        equalTo: '#phone',
      },
      email: {
        email: true,
      },
      address: {
        required: true,
      },
    },
    messages: {
      name: 'Hãy nhập họ và tên của bạn',
      address: 'Hãy nhập địa chỉ của bạn',
      phone: {
        required: 'Hãy nhập số điện thoại của bạn',
        maxlength: 'Số điện thoại chỉ có 10 số',
        minlength: 'Số điện thoại chỉ có 10 số',
        digits: 'Hãy nhập sô 1-9',
      },
      confirmPhone: {
        required: 'Hãy nhập số điện thoại của bạn',
        maxlength: 'Số điện thoại chỉ có 10 số',
        minlength: 'Số điện thoại chỉ có 10 số',
        digits: 'Hãy nhập sô 1-9',
        equalTo: 'Số điện thoại chưa trùng khớp',
      },
      email: {
        email: 'Email chưa hợp lệ',
      },
    },
  });
});
