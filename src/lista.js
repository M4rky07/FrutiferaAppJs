// ---------------- Utilidades ----------------
const idadeEmMeses = (dataStr) => {
  if (!dataStr) return 0;
  const plantio = new Date(dataStr), hoje = new Date();
  return (hoje.getFullYear() - plantio.getFullYear()) * 12 +
         (hoje.getMonth() - plantio.getMonth());
};

const formatarDataBR = (dataStr) =>
  dataStr ? new Date(dataStr).toLocaleDateString("pt-BR") : "";

// ---------------- Add LocalStorage ----------------
let itensLista = JSON.parse(localStorage.getItem("fruteiras") || "[]");

// ---------------- Tabela ----------------
const addTabela = (item, tbody) => tbody.insertAdjacentHTML("beforeend", `
  <tr>
    <td>${item.id}</td>
    <td>${item.especie}</td>
    <td>${item.cientifico}</td>
    <td>${item.safra} kg</td>
    <td>${formatarDataBR(item.dataPlantio)}</td>
    <td>${idadeEmMeses(item.dataPlantio)}</td>
  </tr>
`);
//---------------- Cards ----------------
const addCard = (item, container) => container.insertAdjacentHTML("beforeend", `
  <div class="col-md-4 mb-3">
    <div class="card h-100 shadow-sm">
      <img src="${item.imagemUrl || "https://via.placeholder.com/300x200.png?text=Fruta"}"
           class="card-img-top" alt="${item.especie}">
      <div class="card-body">
        <p class="text-muted small mb-1"><strong>ID:</strong> ${item.id}</p>
        <h5 class="card-title">${item.especie}</h5>
        <p class="card-text"><strong>Científico:</strong> ${item.cientifico}</p>
        <p class="card-text"><strong>Safra:</strong> ${item.safra} kg</p>
        <p class="card-text"><strong>Plantio:</strong> ${formatarDataBR(item.dataPlantio)}</p>
        <p class="card-text"><strong>Idade:</strong> ${idadeEmMeses(item.dataPlantio)} meses</p>
      </div>
    </div>
  </div>
`);

const renderTudo = () => {
  const tbody = document.getElementById("itensListaBody");
  const cards = document.getElementById("cardsContainer");
  tbody.innerHTML = cards.innerHTML = "";
  itensLista.forEach(i => (addTabela(i, tbody), addCard(i, cards)));
};

// ---------------- Inicialização ----------------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formFruta");
  const modalEl = document.getElementById("listaModal");

  renderTudo();
//-------------------- Adicionar Fruta ----------------
  form.onsubmit = e => {
    e.preventDefault();
    itensLista.push({
      id: Date.now(),
      especie: form.nome.value.trim(),
      cientifico: form.cientifico.value.trim(),
      safra: form.safra.value.trim(),
      dataPlantio: form.plantio.value,
      imagemUrl: form.imagemUrl.value.trim()
    });
    localStorage.setItem("fruteiras", JSON.stringify(itensLista));
    renderTudo();
    form.reset();
    window.bootstrap?.Modal.getInstance(modalEl)?.hide();
  };
});
