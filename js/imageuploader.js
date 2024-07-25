const dropArea = document.querySelector("#drag");
const dragText = document.querySelector("#drag2");
const hide = document.getElementById("prog")
const overlay = document.getElementById('overlay');
const message = document.querySelector(".message");
const form = document.getElementById('form');
const bar = document.getElementById('progress-bar');
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
  hide.style.display = "flex";
  const formData = new FormData();
  file = input.files[0];
  formData.append('image', file);
  dropArea.classList.add("active");
  console.log("successful1")
  console.log("it's successful");
  inp.innerHTML = " " + URL.createObjectURL(file) + " ";
  formData.append('image', file);
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


// Axios
const config = {
  onUploadProgress: function(progressEvent) {
    const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total)*100);
   
      bar.setAttribute('value', percentCompleted);
      bar.previousElementSibling.textContent = `${percentCompleted}%`
      if (percentCompleted === 100) {
         setTimeout(() => {
        document.getElementById("prog").style.display = "none";
        displayFile();
        overlay.style.display = 'block';
        message.style.display = "grid"
      }, 100);
      inp.style.display = "flex";
      copyButton.style.display = "flex";
      }
       // adjust the delay time as needed
  }
}

axios.post('https://httpbin.org/post', formData, config)
  .then(res => console.log(res))
  .catch(err => console.log(err))

});


function func1(){
  message.style.display = "none";
  overlay.style.display = "none"
}

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
  const formData = new FormData();
  file = event.dataTransfer.files[0]; // grab single file even of user selects multiple files
  // console.log(file);
  const config = {
    onUploadProgress: function(progressEvent) {
      const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total)*100);
     
        bar.setAttribute('value', percentCompleted);
        bar.previousElementSibling.textContent = `${percentCompleted}%`
        if (percentCompleted === 100) {
           setTimeout(() => {
          document.getElementById("prog").style.display = "none";
          displayFile();
          overlay.style.display = 'block';
          message.style.display = "grid"
        }, 100);
        inp.style.display = "flex";
        copyButton.style.display = "flex";
        }
         // adjust the delay time as needed
    }
  }

  console.log("it's successful");
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

  axios.post('https://httpbin.org/post', formData, config)
  .then(res => console.log(res))
  .catch(err => console.log(err))

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