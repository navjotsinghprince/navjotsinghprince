//My Details
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age + "Years";
}

let my = {
  Name: "Navjot singh",
  Age: getAge("1997/05/26"),
  Residence: "Punjab, India",
  Address: "Kasu Begu Ferozepur Cantt 152004",
  Email: "navjotsinghprince1@gmail.com",
  Phone: "(+91)8591373660",
  Freelance: "Unavailable",
  Download_Resume: "https://www.mediafire.com/file/kcy899kafp90pw0/Navjot's+Resume.pdf/file",
};

var nodes = document.getElementById("about-info").getElementsByTagName("li");
for (var i = 0; i < nodes.length; i++) {
  if (nodes[i].childNodes[0].innerHTML == "Name") {
    // console.log((nodes[i].childNodes[1].innerHTML = "Hello World"));
  }
}

function initialization(check) {
  switch (check) {
    case "Name":
      break;
    case "Age":
      break;
  }
}
