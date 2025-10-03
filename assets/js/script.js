$(document).ready(function () {
  $(".my_record_tab_content").hide();
  $(".my_record_tab_content:first").show();
  $(".my_record_tab_header a").on("click", function (e) {
    e.preventDefault();

    $(".my_record_tab_header a").removeClass("active");
    $(this).addClass("active");
    $(".my_record_tab_content").hide();
    let target = $(this).attr("data-target");
    $(".my_record_tab_content" + target).fadeIn();
  });
  $(".sidebar_hamburger").on("click", function () {
    $(this).toggleClass("active");
    $(".sidebar_content").toggleClass("active");
  });
  function balanceInput() {
    const MIN_SUM = 1000;

    function validate_topup_input($input) {
      let val = parseInt($input.val(), 10);
      let $title = $(".balance_topup-input_title");
      let $error = $(".error");

      if (isNaN(val) || val < MIN_SUM) {
        // error chiqsin
        $error.stop(true, true).show(function () {
          $(this).css("display", "flex");
        });
        $title.stop(true, true).hide();
      } else {
        $error.stop(true, true).hide();
        $title.stop(true, true).show(); // succes ko‘rinadi
      }
    }

    // sahifa yuklanganda tekshirish
    validate_topup_input($(".balance_topup-input input"));

    // input qiymati o‘zgarganda
    $(document).on("input", ".balance_topup-input input", function () {
      validate_topup_input($(this));
    });

    // tugma bosilganda ham tekshirish
    $(document).on("click", ".balance_topup-input button", function (e) {
      validate_topup_input($(".balance_topup-input input"));
      if ($(".error").is(":visible")) {
        e.preventDefault(); // error bo‘lsa tugma ishlamasin
      }
    });
  }
  balanceInput();
  function modalQuiz() {
    let $steps = $(".modal_content");
    let currentStep = 0;

    // Faqat birinchi step ko‘rinadi
    $steps.hide().eq(currentStep).show();

    // Step2 formani tekshirish
    function checkForm() {
      let $input = $("#modal_content2 .balance_topup-input input");
      let sum = parseInt($input.val(), 10);
      // Xatolikni ko‘rsatish / yashirish
      if (!isNaN(sum) && sum >= 1000) {
        $("#modal_content2 .error").hide();
      } else {
        $("#modal_content2 .error").show();
      }
    }

    // Step2 input va checkboxni kuzatamiz
    $(document).on(
      "input",
      "#modal_content2 .balance_topup-input input",
      checkForm
    );
    $(document).on("change", "#modal_content2 #checkbox", checkForm);

    // Tugma bosilganda stepni boshqarish
    $(document).on("click", ".order_hormone", function () {
      // Step3 → qaytarib step1 ga
      if (currentStep === 2) {
        $steps.eq(currentStep).hide();
        currentStep = 0;
        $steps.eq(currentStep).fadeIn();
        return;
      }

      // Keyingi stepga o'tish
      if (currentStep < $steps.length - 1) {
        $steps.eq(currentStep).hide();
        currentStep++;
        $steps.eq(currentStep).fadeIn();

        // Step2 ochilganda darrov tekshirish
        if (currentStep === 1) {
          checkForm();
        }
      }
    });

    // Modal yopilganda stepni reset qilish
    $(document).on("click", ".modal_exit", function () {
      $(".modal").fadeOut();
      currentStep = 0;
      $steps.hide().eq(currentStep).show();
    });
  }
  modalQuiz();

  $(".modal_open").on("click", function (e) {
    e.preventDefault();
    $(".modal").fadeIn();
  });
  $(document).ready(function () {
    function validateForm() {
      let amount = parseInt($("#modal_content2 input[type=number]").val());
      let isChecked = $('#modal_content2 input[name="checkbox_offerts"]').is(
        ":checked"
      );

      if (amount >= 1000 && isChecked) {
        $("#modal_content2 .order_hormone")
          .prop("disabled", false)
          .css("cursor", "pointer")
          .css("opacity", "1");
      } else {
        $("#modal_content2 .order_hormone")
          .prop("disabled", true)
          .css("cursor", "not-allowed")
          .css("opacity", ".7");
      }
    }
    validateForm();
    $(
      '#modal_content2 input[type=number], #modal_content2 input[name="checkbox_offerts"]'
    ).on("input change", function () {
      validateForm();
    });
  });
  $(document).on(
    "change",
    ".online_priem_form_item input[type='radio']",
    function () {
      // Avval hamma itemlardan active classni olib tashlaymiz
      $(".online_priem_form_item").removeClass("active");

      // Endi barcha radio inputlarni tekshiramiz
      $(".online_priem_form_item input[type='radio']").each(function () {
        if ($(this).is(":checked")) {
          $(this).closest(".online_priem_form_item").addClass("active");
        }
      });
    }
  );
  // Tugma bosilganda yuborish
  $(document).on("click", "#send_btn", function (e) {
    e.preventDefault();
    sendMessage();
  });
  $(document).on("keydown", "#my_chat_input", function (e) {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Shift + Enter -> oddiy newline
        return true;
      } else {
        // Faqat Enter -> yuborish
        e.preventDefault(); // Enter textarea ichida yangi qatordan saqlaydi
        sendMessage();
      }
    }
  });
  function sendMessage() {
    let msg = $("#my_chat_input").val().trim();

    if (msg !== "") {
      let newMsg = $(`
          <div class="online_priem_my_chat new_msg">
              <div class="online_priem_my_chat_name">Вы:</div>
              <div class="online_priem_my_chat_text">${msg.replace(
                /\n/g,
                "<br>"
              )}</div>
          </div>
      `);

      $("#chat_items").children().last().after(newMsg);

      setTimeout(() => {
        newMsg.addClass("show");
      }, 50);

      $("#my_chat_input").val(""); // Input tozalanadi

      $("#chat_items").animate(
        {
          scrollTop: $("#chat_items")[0].scrollHeight,
        },
        300
      );
    }
  }
});
