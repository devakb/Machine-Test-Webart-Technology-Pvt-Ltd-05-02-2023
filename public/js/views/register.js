let validateRegisterForm = $("#registerForm").validate({
    errorElement: "span",
    errorClass: "errored",
    errorPlacement: function (error, element) {
        if (element.hasClass("select2")) {
            error.insertAfter(element.next(".select2-container"));
        } else {
            error.insertAfter(element);
        }
    },
    highlight: function (element, errorClass, validClass) {
        if ($(element).hasClass("select2")) {
            $(element)
                .parent()
                .find("span.select2.select2-container")
                .attr("errored", true);
        } else {
            $(element).addClass(errorClass);
        }
    },
    unhighlight: function (element, errorClass, validClass) {
        if ($(element).hasClass("select2")) {
            $(element)
                .parent()
                .find("span.select2.select2-container")
                .removeAttr("errored");
        } else {
            $(element).removeClass(errorClass);
        }
    },
    rules: {
        zipcode: { required: true, maxlength: 7 },
    },
    messages: {
        zipcode: {
            maxlength:
                "The zipcode field may not be greater than 7 characters.",
        },
    },

    submitHandler: function (form, event) {
        event.preventDefault();

        $.ajax({
            url: "/register",
            type: "POST",
            data: new FormData(form),
            processData: false,
            contentType: false,
            dataType: "json",
            beforeSend: function () {
                $(form).addClass("loadingstate");
                $("#submitform").html(`
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                `);
            },
            complete: function () {
                $(form).removeClass("loadingstate");
                $("#submitform").html("Submit");
            },
            success: function (res) {
                let messageBody = `<p>You have successfully registered your child. Thank you for registering with us. We will get back to you soon.</p>`;

                document.getElementById("registerForm").reset();
                $("#registerForm .select2").change();

                Swal.fire({
                    html: messageBody,
                    icon: "success",
                    confirmButtonText: "OK",
                });
            },
            error: function (err) {
                toastr.error(err.responseJSON.message);
            },
        });
    },
});

let addedPickupPerson = -1;

const pickupPersonFields = () => {
    let uid =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

    let relations = [
        "Father",
        "Mother",
        "Brother",
        "Sister",
        "Grand Father",
        "Grand Mother",
    ];

    return `
    <div class="item">
        <div class="row align-items-center">

                ${
                    addedPickupPerson != -1
                        ? `
                    <div class="delete-icon-pickup-proson">
                        <i class="fa-solid fa-circle-minus fa-1/5x text-danger cursor-pointer" onclick="removePickupPerson(this)"></i>
                    </div>`
                        : ""
                }

            <div class="col-md-4 form-group">
                <label class="required" for="person_name">Person Name</label>
                <input type="text" class="form-control only-alpha-input single-space-only" name="pickupperson[${uid}][person_name]"  required maxlength="80">
            </div>
            <div class="col-md-4 form-group">
                <label class="required" for="relation">Relation</label>
                <select  class="form-control" name="pickupperson[${uid}][relation]" required>
                    <option value="" disabled>Choose Relation</option>
                    ${relations
                        .map((relation) => {
                            return `<option value="${relation}">${relation}</option>`;
                        })
                        .join("")}
                </select>
            </div>
            <div class="col-md-4 form-group">
                <label class="required" for="contact_no">Contact Number</label>
                <input type="text" class="form-control only-number-input no-space" name="pickupperson[${uid}][contact_no]" required maxlength="10" minlength="10">
            </div>
        </div>
        <div class="divider"></div>
    </div>
`;
};

const addPickupPerson = () => {
    const pickup = document.querySelector("#pickup");
    const items = pickup.querySelector(".items");

    if (addedPickupPerson < 5) {
        const item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = pickupPersonFields();
        items.appendChild(item);
        addedPickupPerson++;
    } else {
        toastr.error("You can add upto 6 persons who will pick up your child.");
    }
};

const removePickupPerson = (el) => {
    if (addedPickupPerson > 0) {
        $(el).parent().parent().parent().remove();
    }
};

$(document).ready(() => {
    addPickupPerson();
});

$(function () {
    $.ajax({
        url: "/api/countries",
        type: "POST",
        dataType: "json",
        success: function (res) {
            // res => countries : [country1, country2, country3, ...]

            $("#country").select2({
                placeholder: "Select Country",
                allowClear: false,
                width: "100%",
                searchInputPlaceholder: "Search",
                data: res.countries.map((country) => {
                    return {
                        id: country,
                        text: country,
                    };
                }),
            });
        },
    });
});

$("#country").on("change", function () {
    let value = $(this).val();

    if (value != null) {
        $.ajax({
            url: "/api/countries/" + value.trim(),
            type: "POST",
            dataType: "json",
            success: function (res) {
                // res => states : [state1, state2, state3, ...]

                res.states.unshift("Choose State");

                // remove all options
                $("#state").empty();

                $("#state").select2({
                    placeholder: "Select State",
                    allowClear: false,
                    width: "100%",
                    searchInputPlaceholder: "Search",
                    data: res.states.map((state) => {
                        return {
                            id: state == "Choose State" ? "" : state,
                            text: state,
                        };
                    }),
                });
            },
        });
    }
});

$("#photo").on("change", function () {
    let AllowedfileExtension = ["jpeg", "jpg", "png"];

    let maxFileSize = 1024 * 1024 * 1; // 1 MB

    let minimumDimensionX = 100;
    let minimumDimensionY = 100;

    let file = this.files[0];

    if (file) {
        let fileName = file.name;
        let fileSize = file.size;
        let fileExtension = fileName.split(".").pop().toLowerCase();
        console.log(fileExtension);

        if (fileSize >= maxFileSize) {
            toastr.error("File size must be less than 1 MB");
            validateRegisterForm.showErrors({
                photo: "File size must be less than 1 MB",
            });
            $(this).val("");
            return;
        }

        if ($.inArray(fileExtension, AllowedfileExtension) == -1) {
            toastr.error("Only jpeg, jpg and png files are allowed");
            validateRegisterForm.showErrors({
                photo: "Only jpeg, jpg and png files are allowed",
            });
            $(this).val("");
            return;
        }

        let reader = new FileReader();

        reader.onload = function (e) {
            let image = new Image();

            image.onload = function () {
                if (
                    this.width < minimumDimensionX ||
                    this.height < minimumDimensionY
                ) {
                    toastr.error(
                        "Image dimension must be greater than 100x100"
                    );
                    validateRegisterForm.showErrors({
                        photo: "Image dimension must be greater than 100x100",
                    });
                    $("#photo").val("");
                }
            };

            image.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
});
