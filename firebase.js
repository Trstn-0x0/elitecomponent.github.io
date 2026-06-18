import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

/* ================= FIREBASE ================= */

const firebaseConfig = {
  apiKey: "AIzaSyCeJNS0FHBz2O-lIC-1WSEl3smNsEWv27o",
  authDomain: "elitecomponent-a6772.firebaseapp.com",
  projectId: "elitecomponent-a6772",
  storageBucket: "elitecomponent-a6772.appspot.com",
  messagingSenderId: "146965348227",
  appId: "1:146965348227:web:2c295fa5b725e4d8b780b6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ================= LOGIN / REGISTER ================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= LOGIN ================= */

  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      try {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        alert("Bienvenido");

        window.location.href = "index.html";

      } catch (e) {

        alert(e.message);

      }

    });
  }

 //---------------------register-----------------------------
 //---------------------------------------------------------

  const registerBtn = document.getElementById("registerBtn");

  if (registerBtn) {

    registerBtn.addEventListener("click", async () => {

      const name =
        document.getElementById("register-name").value;

      const email =
        document.getElementById("register-email").value;

      const password =
        document.getElementById("register-password").value;

      try {

        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        await updateProfile(userCredential.user, {
          displayName: name
        });

        alert("Usuario creado");

        window.location.href = "index.html";

      } catch (e) {

        alert(e.message);

      }

    });

  }

  /* ================= LOGOUT ================= */

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

      await signOut(auth);

      window.location.href = "index.html";

    });

  }

  /* ================= CARRITO ================= */

  let carrito = [];

  function actualizarLocal() {
    localStorage.setItem(
      "carrito",
      JSON.stringify(carrito)
    );
  }

  function cargarLocal() {

    const data =
      localStorage.getItem("carrito");

    if (data) {
      carrito = JSON.parse(data);
    }

  }

  cargarLocal();

  console.log("Carrito cargado:");
  console.log(carrito);

  /* ================= AGREGAR PRODUCTOS ================= */

  document
    .querySelectorAll(".btn-add-cart")
    .forEach(btn => {

      btn.addEventListener("click", () => {

        const card =
          btn.closest(".premium-card");

        const nombre =
          card.querySelector(".product-title")
          .innerText;

        const precioText =
          card.querySelector(".price-block")
          .innerText;

        const precio =
          parseFloat(
            precioText
              .replace("S/", "")
              .replace(",", "")
              .trim()
          );

        carrito.push({
          nombre,
          precio
        });

        actualizarLocal();

        console.log("Producto agregado:");
        console.log(carrito);

     const mensaje = document.createElement("div");

mensaje.innerText = "✅ Producto agregado";

mensaje.style.position = "fixed";
mensaje.style.top = "20px";
mensaje.style.right = "20px";
mensaje.style.background = "#00e5ff";
mensaje.style.color = "#000";
mensaje.style.padding = "12px 20px";
mensaje.style.borderRadius = "10px";
mensaje.style.zIndex = "9999";

document.body.appendChild(mensaje);

setTimeout(() => {
  mensaje.remove();
}, 2000);

      });

    });

  /* ================= CHECKOUT ================= */

  const checkoutBtn =
  document.getElementById("checkout-btn");

if (checkoutBtn) {

  checkoutBtn.addEventListener("click", async () => {

    const user = auth.currentUser;

    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    if (carrito.length === 0) {
      alert("Carrito vacío");
      return;
    }

    const total =
      carrito.reduce(
        (suma, item) => suma + item.precio,
        0
      );

    try {

      await addDoc(
        collection(db, "orders"),
        {
          uid: user.uid,
          email: user.email,
          productos: carrito,
          total: total,
          fecha: new Date()
        }
      );

      alert("Compra guardada en Firebase ✔");

      carrito = [];

      actualizarLocal();

    } catch (e) {

      console.error(e);

      alert(e.message);

    }

  });

}


const buildBtn =
  document.getElementById("add-build-cart");

if (buildBtn) {

  buildBtn.addEventListener("click", async () => {

    const user = auth.currentUser;

    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    const build = {

      cpu:
        document.getElementById("build-cpu")
        .selectedOptions[0].text,

      motherboard:
        document.getElementById("build-mobo")
        .selectedOptions[0].text,

      gpu:
        document.getElementById("build-gpu")
        .selectedOptions[0].text,

      ram:
        document.getElementById("build-ram")
        .selectedOptions[0].text,

      ssd:
        document.getElementById("build-ssd")
        .selectedOptions[0].text,

      psu:
        document.getElementById("build-psu")
        .selectedOptions[0].text,

      cooler:
        document.getElementById("build-cooler")
        .selectedOptions[0].text,

      case:
        document.getElementById("build-case")
        .selectedOptions[0].text,

      monitor:
        document.getElementById("build-monitor")
        .selectedOptions[0].text,

      perifericos:
        document.getElementById("build-perif")
        .selectedOptions[0].text

    };

    try {

      await addDoc(
        collection(db, "builds"),
        {
          uid: user.uid,
          email: user.email,
          configuracion: build,
          fecha: new Date()
        }
      );

      alert("Build guardada correctamente ✔");

    } catch (e) {

      console.error(e);

      alert("Error al guardar");

    }

  });

}



  
});

onAuthStateChanged(auth, (user) => {

  const guest =
    document.getElementById("guest-buttons");

  const userMenu =
    document.getElementById("user-menu");

  const userName =
    document.getElementById("user-name");

  if (!guest || !userMenu) return;

  if (user) {

    guest.classList.add("d-none");

    userMenu.classList.remove("d-none");

    if (userName) {
      userName.textContent =
        user.displayName || user.email;
    }

  } else {

    guest.classList.remove("d-none");

    userMenu.classList.add("d-none");

  }

});


/* ================= UI LOGIN ================= */

onAuthStateChanged(auth, (user) => {

  const guest = document.getElementById("guest-buttons");
  const userMenu = document.getElementById("user-menu");
  const userName = document.getElementById("user-name");

  if (!guest || !userMenu) return;

  if (user) {
    guest.classList.add("d-none");
    userMenu.classList.remove("d-none");

    if (userName) userName.textContent = user.displayName || user.email;

  } else {
    guest.classList.remove("d-none");
    userMenu.classList.add("d-none");
  }

});
