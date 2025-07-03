document.getElementById("form-contacto").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("✅ Gracias por contactarte. Te responderemos pronto.");
  this.reset();
});
