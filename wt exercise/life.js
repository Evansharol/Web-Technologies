const data = JSON.parse(localStorage.getItem("lifeData"));

if (data) {
  document.getElementById("resName").textContent = data.name;
  document.getElementById("resBirth").textContent = data.birthyear;
  document.getElementById("resFoods").textContent = data.foods;
  document.getElementById("resFavFood").textContent = data.favFood;
  document.getElementById("resLifestyle").textContent = data.lifestyle;
  document.getElementById("resGender").textContent = data.gender;

  // Set gender image
  const img = document.getElementById("genderImage");
  const imgLife = document.getElementById("lifePerson");
  if (data.gender === "Male") {
    img.src = "images/man.png"; 
    imgLife.src = "images/man.png"; 
  } else if (data.gender === "Female") {
    img.src = "images/female.png"; 
    imgLife.src = "images/female.png"; 
  } else {
    img.src = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png";
    imgLife.src = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png";
  }
}

function predictLife() {
  const birthYear = parseInt(data.birthyear);
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  let lifeExpectancy = 85; // base

  // food effect
  if (data.foods.toLowerCase().includes("junk")) {
    lifeExpectancy -= 20;
  } else if (data.foods.toLowerCase().includes("healthy") || data.foods.toLowerCase().includes("fruits")) {
    lifeExpectancy += 5;
  }

  // lifestyle effect
  if (data.lifestyle.toLowerCase().includes("smoke") || data.lifestyle.toLowerCase().includes("drink")) {
    lifeExpectancy -= 15;
  } else if (data.lifestyle.toLowerCase().includes("active")) {
    lifeExpectancy += 5;
  }

  const remaining = lifeExpectancy - age;
  const line = document.getElementById("lifeLine");
  const visual = document.getElementById("lifeVisual");
  const personImg = document.getElementById("lifePerson");
  const coffinImg = document.getElementById("coffinImg");
  const remainingTime = document.getElementById("remainingTime");

  visual.style.display = "block";

  // Calculate time left
  let timeText = "";
  if (remaining <= 0) {
    timeText = "No time left";
    line.style.width = "20px";
    personImg.style.opacity = "0.5";
    coffinImg.style.display = "block";
  } else {
    const years = Math.floor(remaining);
    const months = Math.floor((remaining - years) * 12);
    const days = Math.floor(((remaining - years) * 12 - months) * 30);
    timeText = `${years > 0 ? years + " years " : ""}${months > 0 ? months + " months " : ""}${days > 0 ? days + " days" : ""} left`;
    // Show line
    const width = Math.max(200, Math.min(664, remaining * 8));
    line.style.width = width + "px";
    personImg.style.opacity = "1";
    coffinImg.style.display = "block";
  }
  remainingTime.textContent = timeText;
}
