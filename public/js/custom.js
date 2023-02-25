const CURR_YEAR = new Date().getFullYear();

$(".date").datepicker({
    dayNamesMin: ["SU", "MO", "TUE", "WE", "TH", "FR", "SA"],
    format: "yyyy-mm-dd",
    dateFormat: "dd-MM-yy",
    autoclose: true,
    todayHighlight: true,
    maxDate: "0d",
    changeMonth: true,
    changeYear: true,
    yearRange: `${CURR_YEAR - 50}:${CURR_YEAR}`,
});

$("body").on("keyup", ".only-alpha-input", function () {
    let _v = $(this).val();

    let _nv = _v.replace(/[^a-zA-Z. ]/g, "");

    $(this).val(_nv);
});

$("body").on("keyup", ".only-number-input", function () {
    let _v = $(this).val();

    let _nv = _v.replace(/[^0-9]/g, "");

    $(this).val(_nv);
});

$("body").on("keyup", ".only-alphanum-input", function () {
    let _v = $(this).val();

    let _nv = _v.replace(/[^a-zA-Z. 0-9]/g, "");

    $(this).val(_nv);
});

$("body").on("keyup", ".single-space-only", function () {
    let _v = $(this).val();

    let _nv = _v.replace(/\s\s+/g, " ");

    $(this).val(_nv);
});

$("body").on("keyup", ".no-space", function () {
    let _v = $(this).val();

    let _nv = _v.replace(/[ ]/g, "");

    $(this).val(_nv);
});

$(".select2").each(function () {
    $(this).select2({
        placeholder: $(this).attr("data-placeholder"),
        allowClear: false,
        width: "100%",
        searchInputPlaceholder: $(this).data("search-placeholder") ?? "Search",
    });
});

toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-bottom-center",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
};

$.validator.addClassRules("only-number-input", {
    number: true,
});
