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
});
