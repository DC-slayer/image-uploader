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


input.addEventListener("change", function (e) {
  e.preventDefault();
  hide.style.display = "flex";
  file = input.files[0];
  dropArea.classList.add("active");
  console.log("successful1")
  console.log("it's successful");
  inp.innerHTML = " " + URL.createObjectURL(file) + " ";
  console.log("no problem so far")
  console.log(URL.createObjectURL(file))
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

  
// Simulate the progress
let progress = 0;
const interval = setInterval(() => {
  progress += 25; // Increase progress by 25% per interval

  bar.setAttribute('value', progress);
  bar.previousElementSibling.textContent = `${progress}%`;

  if (progress >= 100) {
    clearInterval(interval); // Stop when progress reaches 100%

    setTimeout(() => {
      document.getElementById("prog").style.display = "none";
      displayFile();
      
      overlay.style.display = 'block';
      message.style.display = "grid";
      
      // Transform the "Choose" button to an "Upload" button
      button.textContent = "Upload"; // Change the text

      // Remove existing 'for' attribute to prevent file selection
      button.removeAttribute("for");

      // Add a new click event for the upload functionality
      button.onclick = uploadFile; 
      
    }, 500);
  }
}, 500);

// Define the uploadFile function
function uploadFile() {
  const file = input.files[0];
  if (!file) {
    alert("Please select a file first!");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  fetch("http://localhost:7777/upload", { 
    method: "POST",
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if (data && data.image) {
        console.log("File uploaded successfully:", data);
        alert("File uploaded successfully!");
        console.log("Cloudinary Image URL:", data.image.imageUrl);
        inp.style.display = "flex";
        copyButton.style.display = "flex";
        document.getElementById("choose").style.display = "none";
} else{
    console.error("Failed to upload image");
    alert("Failed to upload image");
}
})
    .catch(error => {
      console.error("Error uploading file:", error);
      alert("Error uploading file!");
    });
}


});

console.log(file);

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
        document.getElementById("choose").style.display = "none";
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
          background-image: url(${fileURL});
          background-position: center;
          background-size: cover;
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