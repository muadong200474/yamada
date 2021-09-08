$(function () {
  var dataUrl =
    "https://script.google.com/macros/s/AKfycbxxIHKjGHJAX6HvP-ECGe8kl9OkO3cAPBi3a9KhAepXC5SPWUU/exec";

  $.validate({
    form: "#hutsua-form",
    onSuccess: function () {
      // send email for notification
      var name = $("#name-hutsua").val();
      var phone = $("#phone-hutsua").val();
      var address = $("#address-hutsua").val();
      var email = $("#email-hutsua").val();

      var total = 0;
      var products = [];
      $("input[type=checkbox]:checked").each(function () {
        total += Number($(this).data("price"));
        products.push($(this).data("name") + ", ");
      });

      // confirm modal
      $("#confirmModal .modal-body").html("").append(
        `
        <h4>Thông tin cá nhân:</h4>
        <p>Họ tên: <span>${name}</span></p>
        <p>SĐT: <span>${phone}</span></p>
        <p>Địa chỉ: <span>${address}</span></p>
        <p>Email: <span>${email}</span></p>
        <h4 class="mt-2">Đơn hàng của bạn: </h4>
        <p>${products}</p>
        <p>Tổng tiền: ${total}</p>
        <i style="font-size: 11px">*Xin vui lòng kiểm tra lại kĩ thông tin 1 lần nữa</i>
        `
      );
      $("#confirmModal").modal({
        backdrop: "static",
        keyboard: false,
      });

      $("#cont-btn").on("click", function () {
        $("#cont-btn").attr("disabled", true);
        $(".caution").append("Xin chờ trong giây lát...");

        let data = {
          name,
          phone,
          address,
          email,
          products,
          total,
        };
        sendEmail(data);

        data =
          $("form#hutsua-form").serialize() +
          "&products=" +
          products +
          "&total=" +
          total;
        // data.push({ products: products, total: total });
        fillInForm(dataUrl, data);
      });

      return false;
    },
  });
});

function sendEmail(data) {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "noreply200474@gmail.com",
    Password: "281171344F3555517A2432D2031290CF228A",
    To: "sonpt91.bkhn@gmail.com",
    From: "noreply200474@gmail.com",
    Subject: "Customer subcriber",
    Body: `1. Tên khách hàng: ${data.name}, 2.Email: ${data.email}, 3. SĐT: ${data.phone}, 4. Địa chỉ: ${data.address}, 5. Đơn hàng: ${data.products}, 6. Tổng tiền: ${data.total}`,
  }).then((message) => console.log(message));
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "noreply200474@gmail.com",
    Password: "281171344F3555517A2432D2031290CF228A",
    To: "vuvantrung21@gmail.com",
    From: "noreply200474@gmail.com",
    Subject: "Customer subcriber",
    Body: `1. Tên khách hàng: ${data.name}, 2.Email: ${data.email}, 3. SĐT: ${data.phone}, 4. Địa chỉ: ${data.address}, , 5. Đơn hàng: ${data.products}, 6. Tổng tiền: ${data.total}`,
  }).then((message) => console.log(message));
}

function fillInForm(url, data) {
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    crossDomain: true,
    data: data,
    success: function (response) {
      window.location = "thanks.html";
    },
  });
}
