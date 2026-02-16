let elements = [
    { id: 1, nom: "Clavier", prix: 200, quantite: 2 },
    { id: 2, nom: "Souris", prix: 100, quantite: 3 },
    { id: 3, nom: "Écran", prix: 1200, quantite: 1 }
];

let idCounter = 4;


function ajouterElement() {

    let nom = document.getElementById("nom").value.trim();
    let prix = parseFloat(document.getElementById("prix").value);
    let quantite = parseInt(document.getElementById("quantite").value);

    if (nom === "" || isNaN(prix) || isNaN(quantite)) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    elements.push({
        id: idCounter++,
        nom: nom,
        prix: prix,
        quantite: quantite
    });

    document.getElementById("nom").value = "";
    document.getElementById("prix").value = "";
    document.getElementById("quantite").value = "";

    afficherElements();
    calculerTotal();
}


function afficherElements() {

    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    elements.forEach(function(element) {

        let row = document.createElement("tr");

        let totalProduit = element.prix * element.quantite;

        row.innerHTML = `
            <td>${element.id}</td>
            <td>${element.nom}</td>
            <td>${element.prix}</td>
            <td>${element.quantite}</td>
            <td>${totalProduit}</td>
            <td>
                <button onclick="modifierElement(${element.id})">
                    Modifier
                </button>
                <button onclick="supprimerElement(${element.id})">
                    Supprimer
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function supprimerElement(id) {

    elements = elements.filter(function(element) {
        return element.id !== id;
    });

    afficherElements();
    calculerTotal();
}


function modifierElement(id) {

    let element = elements.find(e => e.id === id);

    let tableBody = document.getElementById("tableBody");
    let rows = tableBody.getElementsByTagName("tr");

    for (let row of rows) {

        if (parseInt(row.children[0].textContent) === id) {

            row.innerHTML = `
                <td>${element.id}</td>
                <td><input type="text" value="${element.nom}" id="editNom${id}"></td>
                <td><input type="number" value="${element.prix}" id="editPrix${id}"></td>
                <td><input type="number" value="${element.quantite}" id="editQuantite${id}"></td>
                <td>-</td>
                <td>
                    <button onclick="appliquerModification(${id})">
                        Appliquer
                    </button>
                </td>
            `;
        }
    }
}






function appliquerModification(id) {

    let element = elements.find(e => e.id === id);

    let nouveauNom = document.getElementById(`editNom${id}`).value;
    let nouveauPrix = parseFloat(document.getElementById(`editPrix${id}`).value);
    let nouvelleQuantite = parseInt(document.getElementById(`editQuantite${id}`).value);

    if (nouveauNom === "" || isNaN(nouveauPrix) || isNaN(nouvelleQuantite)) {
        alert("Valeurs invalides !");
        return;
    }

    element.nom = nouveauNom;
    element.prix = nouveauPrix;
    element.quantite = nouvelleQuantite;

    afficherElements();
    calculerTotal();
}







function calculerTotal() {

    let total = 0;

    elements.forEach(function(element) {
        total += element.prix * element.quantite;
    });

    document.getElementById("totalGeneral").textContent =
        "Total Général : " + total;
}


window.onload = function() {
    afficherElements();
    calculerTotal();
};
