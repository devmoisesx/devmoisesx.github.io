const btnMobile = document.querySelector("#btn-mobile");
const btnDownloads = document.querySelectorAll("#download");

// Função para o funcionamento do menu no mobile junto com algumas coisas de acessibilidade
btnMobile.addEventListener("click", () => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("active");
    const active = nav.classList.contains("active");
    btnMobile.setAttribute("aria-expanded", active);

    if (active) {
        btnMobile.setAttribute("aria-label", "Fechar Menu");
    } else {
        btnMobile.setAttribute("aria-label", "Abrir Menu");
    }
});

// Função para baixar o currículo

const download = function () {
    const a = document.createElement("a");
    a.style = "display: none";
    document.body.appendChild(a);
    return function () {
        const nomeArquivo = "moises-xavier-curriculo.pdf";
        fetch("/assets/moises-xavier-curriculo.pdf")
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = nomeArquivo;
                a.click();
                window.URL.revokeObjectURL(url);
            });
    };
};

btnDownloads.forEach((btn) => btn.addEventListener("click", download()));

// Função para deixar suave a animação do link ao nos redirecionar a seção
function initScrollSuave() {
    const linksInternos = document.querySelectorAll('.js-menu a[href^="#"');

    function scrollToSection(event) {
        event.preventDefault();
        const href = event.currentTarget.getAttribute("href");
        const section = document.querySelector(href);

        section.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        // Forma alternativa
        // const topo = section.offsetTop;
        // window.scrollTo({
        //   top: topo,
        //   behavior: "smooth",
        // });
    }

    linksInternos.forEach((link) => {
        link.addEventListener("click", scrollToSection);
    });
}

initScrollSuave();

// Função para mostrar na tela o botão flutuante do linkedin
const btnLinkedin = document.querySelector("#btn-linkedin-2");
const sectionSobre = document.querySelector(".sobre");
let coordenadas = sectionSobre.getBoundingClientRect();
let coordY = Number(coordenadas.y.toFixed());

window.onscroll = function () {
    var y = window.scrollY.toFixed();
    if (y > coordY - 600) {
        btnLinkedin.classList.add("active");
    } else {
        btnLinkedin.classList.remove("active");
    }
};

// Função para mostrar no menu a seção em que estou

// Seleciona todos os elementos de seção na página e links da barra de navegação do menu
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("ul li a");

// Adiciona um evento de rolagem à janela do navegador
window.addEventListener("scroll", () => {
    // Obtém a posição de rolagem atual da página
    const posicaoAtual = window.scrollY;

    // Loop através de cada seção
    sections.forEach((section, index) => {
        // Obtém a posição do topo e do fundo da seção
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        // Verifica se a posição de rolagem atual está dentro dos limites da seção
        if (posicaoAtual >= sectionTop && posicaoAtual < sectionBottom) {
            // Adiciona a classe "active" ao link da barra de navegação correspondente
            navLinks[index].classList.add("active");
        } else {
            // Remove a classe "active" do link da barra de navegação correspondente
            navLinks[index].classList.remove("active");
        }
    });
});
