const dropArea = document.querySelector("#drag");
const dragText = document.querySelector("#drag2");
let button = document.querySelector("#choose");
let input = document.querySelector("#filed");
var copyButton = document.querySelector("#label");
var inp = document.getElementById("input");
let file;

button.onclick = () => {
  // input.click();
  
};

copyButton.click();

// when browse
input.addEventListener("change", function () {
  file = this.files[0];
  dropArea.classList.add("active");
  displayFile();
  copyButton.style.display = "flex";
  console.log("it's successful");
  inp.style.display = "flex";
  inp.innerHTML = " " + URL.createObjectURL(file) + " ";
  console.log("no problem so far")
  document.getElementById("label").addEventListener("click", function() {
    var copyText = URL.createObjectURL(file);
    navigator.clipboard.writeText(copyText)
      .then(function() {
        alert("Text copied to clipboard: " + copyText);
      })
      .catch(function(error) {
        alert("Failed to copy text: " + error);
      });
  });
});



// when file is inside drag area
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload";
  // console.log('File is inside the drag area');
});
// when file leave the drag area
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  // console.log('File left the drag area');
  dragText.textContent = "Drag & Drop";
});
// when file is dropped
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  // console.log('File is dropped in drag area');
  file = event.dataTransfer.files[0]; // grab single file even of user selects multiple files
  // console.log(file);
  displayFile();
  copyButton.style.display = "flex";
  console.log("it's successful");
  inp.style.display = "flex";
  inp.innerHTML = " " + URL.createObjectURL(file) + " ";
  console.log("no problem so far")
  document.getElementById("label").addEventListener("click", function() {
    var copyText = URL.createObjectURL(file);
  
    navigator.clipboard.writeText(copyText)
      .then(function() {
        alert("Text copied to clipboard: " + copyText);
      })
      .catch(function(error) {
        alert("Failed to copy text: " + error);
      });
  });
});
function displayFile() {
  let fileType = file.type;
  // console.log(fileType);
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (validExtensions.includes(fileType)) {
    // console.log('This is an image file');
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      // console.log(fileURL);
      let imgTag = `<style>
      #drag{
          background-image: url(${fileURL})
      }
  </style>`;
      dropArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("This is not an Image File");
    dropArea.classList.remove("active");
  }
}