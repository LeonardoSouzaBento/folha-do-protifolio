window.onload = () => { // Ajustado: atribuição em vez de chamada
  let translations = {};
  let currentLang = "pt";

  async function loadTranslations() {
    try {
      const response = await fetch("./content.json");
      translations = await response.json();
      updateContent();
    } catch (error) {
      console.error("Erro ao carregar traduções:", error);
    }
  }

  function updateContent() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      // O uso do optional chaining ?. está ótimo aqui!
      if (translations[currentLang]?.[key]) {
        el.textContent = translations[currentLang][key];
      }
    });
  }

  // Ajustado: Selecionando todos os botões e adicionando o evento corretamente
  const langButtons = document.querySelectorAll(".btn-lang");
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      currentLang = lang;
      updateContent();
    });
  });

  loadTranslations();
};