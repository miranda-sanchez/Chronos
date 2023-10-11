// Single Page Application
let links = document.querySelectorAll("a");
let main = document.querySelector("main");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    let id = link.id;
    let archivo = id + ".html";

    let xhr = ajax(archivo);
    xhr.addEventListener("load", () => {
      if (xhr.status == 200) {
        main.innerHTML = xhr.response;
        history.pushState(
          {
            template: xhr.response,
          },
          "",
          id
        );
      }
    });
  });
});

let homePage = ajax("home.html");
homePage.addEventListener("load", () => {
  if (homePage.status == 200) {
    main.innerHTML = homePage.response;
  }
});

function ajax(url, metodo) {
  let http_metodo = metodo || "GET";
  let xhr = new XMLHttpRequest();
  xhr.open(http_metodo, url);
  xhr.send();
  return xhr;
}

window.addEventListener("popstate", (e) => {
  console.log(e.state);
  if (e.state.template) {
    main.innerHTML = e.state.template;
  } else {
    let archivo = location.hash.split("/")[1] + ".html";
    let xhr = ajax(archivo);
    xhr.addEventListener("load", () => {
      if (xhr.status == 200) {
        main.innerHTML = xhr.response;
      }
    });
  }
});
