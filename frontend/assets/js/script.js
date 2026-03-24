const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const slider = document.querySelector(".slider");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginBtn.addEventListener("click", () => {
slider.style.left = "0%";

loginBtn.classList.add("active");
registerBtn.classList.remove("active");

loginForm.classList.add("active");
registerForm.classList.remove("active");
});

registerBtn.addEventListener("click", () => {
slider.style.left = "50%";

registerBtn.classList.add("active");
loginBtn.classList.remove("active");

registerForm.classList.add("active");
loginForm.classList.remove("active");
});




loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await res.json();

    console.log(data);

    if (data.token) {
   
      localStorage.setItem("token", data.token);

      alert("Login successful ");
    loginForm.reset(); 

    } else {
      alert(data.message || "Login failed ");
    }

  } catch (error) {
    console.log("Error:", error);
  }
});


registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  try {
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await res.json();

    console.log(data);
    alert(data.message || data);
     registerForm.reset();  

  } catch (error) {
    console.log("Error:", error);
  }
});

