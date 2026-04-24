let attention = Prompt();

document
  .getElementById("colorButton")
  .addEventListener("click", function () {
    let html = `
      <form
          id="check-availability-form"
          action=""
          method="post"
          novalidate
          class="needs-validation"
      >

                  <div
                      class="row"
                      id="reservation-dates-modal"
                  >
                      <div class="col">
                          <input
                              required
                              class="form-control"
                              type="text"
                              name="start"
                              id="start"
                              placeholder="Arrival"
                          />
                      </div>
                      <div class="col">
                          <input
                              required
                              class="form-control"
                              type="text"
                              name="end"
                              id="end"
                              placeholder="Departure"
                          />
                      </div>

          </div>
      </form>
      `;

    attention.custom({
      msg: html,
      title: "Choose your dates",
    });
  });

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(
    ".needs-validation",
  );

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

const elem = document.getElementById("reservation-dates");
const rangepicker = new DateRangePicker(elem, {
  format: "dd-mm-yyyy",
});

function notify(msg, type) {
  notie.alert({
    type: type,
    text: msg,
  });
}

function notifyModal(title, text, icon, confirmButtonText) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
  });
}

function Prompt() {
  let toast = function (c) {
    const {
      msg = "",
      icon = "success",
      position = "top-end",
    } = c;

    Swal.mixin({
      toast: true,
      title: msg,
      position: position,
      showConfirmButton: false,
      timer: 3000,
      icon: icon,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    }).fire({});
  };

  let success = function (c) {
    const { msg = "", title = "", footer = "" } = c;
    Swal.fire({
      icon: "success",
      title: title,
      text: msg,
      footer: footer,
    });
  };

  let error = function (c) {
    const { msg = "", title = "", footer = "" } = c;
    Swal.fire({
      icon: "error",
      title: title,
      text: msg,
      footer: footer,
    });
  };

  async function custom(c) {
    const { msg = "", title = "" } = c;

    const { value: formValues } = await Swal.fire({
      title: title,
      html: msg,
      backdrop: false,
      focusConfirm: false,
      showCancelButton: true,
      willOpen: () => {
        const elem = document.getElementById(
          "reservation-dates-modal",
        );
        new DateRangePicker(elem, {
          format: "yyyy-mm-dd",
          showOnFocus: true,
        });
      },
      preConfirm: () => {
        return [
          document.getElementById("start").value,
          document.getElementById("end").value,
        ];
      },
    });
    if (formValues) Swal.fire(JSON.stringify(formValues));
  }

  return {
    toast: toast,
    success: success,
    error: error,
    custom: custom,
  };
}
