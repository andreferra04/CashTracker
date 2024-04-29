document.getElementById("aggiungiButton").addEventListener("click", function () {
    var blocchiAggiuntivi = document.getElementById("blocchiAggiuntivi");
    if (blocchiAggiuntivi.style.display === "none") {
        blocchiAggiuntivi.style.display = "block";

    } else {
        blocchiAggiuntivi.style.display = "none";
    }
});


const list_events = document.getElementById("list-events");

const ammount_value = document.getElementById("ammount")

let ammonts = 0.00;


const list = [];


let tipo = ["Bancomat", "Cash"];

let selectTipo = document.getElementById("expenseType");
tipo.forEach(function (option) {
    let opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    selectTipo.appendChild(opt);
});

let gruppo = ["Discoteca", "Benzina", "Cena", "Svago", "Drink", "Vestiti", "Entrata"]

let selectGroup = document.getElementById("expenseGroup");
gruppo.forEach(function (option) {
    let opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    selectGroup.appendChild(opt);
});


let entrataGroup = document.getElementById("entrataGroup");
gruppo.forEach(function (option) {
    let opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    entrataGroup.appendChild(opt);
});

let entrataType = document.getElementById("entrataType");
tipo.forEach(function (option) {
    let opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    entrataType.appendChild(opt);
});

const form = document.getElementById("addExpenseForm");
form.addEventListener("submit", addNewExpense);


const form2 = document.getElementById("addEntrataForm");
form2.addEventListener("submit", addNewIncome);

function addNewIncome(event) {
    event.preventDefault();

    const newIncome = {
        "Nome": document.getElementById("entrataName").value,
        "gruppo": document.getElementById("entrataGroup").value,
        "Tipo": document.getElementById("entrataType").value,
        "Stato": "Entrata",
        "Importo": parseFloat(document.getElementById("entrataAmount").value)
    };
    list.push(newIncome);

    let row = document.createElement("tr");
    let IncomeName = document.createElement("td");
    let IncomeGroup = document.createElement("td");
    let IncomeType = document.createElement("td");
    let IncomeAmount = document.createElement("td");

    IncomeName.textContent = document.getElementById("entrataName").value;
    IncomeGroup.textContent = document.getElementById("entrataGroup").value;
    IncomeType.textContent = document.getElementById("entrataType").value;
    IncomeAmount.textContent = document.getElementById("entrataAmount").value;
    statoUscita = false;



    ammonts = ammonts + parseFloat(IncomeAmount.textContent);
    ammount_value.textContent = ammonts.toFixed(2) + " €"


    list_events.appendChild(row);

    row.appendChild(IncomeName);
    row.appendChild(IncomeGroup);
    row.appendChild(IncomeType);
    row.appendChild(IncomeAmount);

    // Pulisci i campi del form dopo l'aggiunta
    document.getElementById("IncomeName").value = "";
    document.getElementById("IncomeGroup").value = "";
    document.getElementById("IncomeType").value = "";
    document.getElementById("IncomeAmount").value = "";

    // Nascondi il modulo aggiungi
    document.getElementById("blocchiAggiuntivi").style.display = "none";
}

function addNewExpense(event) {
    console.log(event)
    event.preventDefault();

    const newExpense = {
        "Nome": document.getElementById("expenseName").value,
        "gruppo": document.getElementById("expenseGroup").value,
        "Tipo": document.getElementById("expenseType").value,
        "Stato": "Uscita",
        "Importo": parseFloat(document.getElementById("expenseAmount").value)
    };

    // Aggiunta dell'oggetto alla lista
    list.push(newExpense);

    console.log(list);

    let row = document.createElement("tr");
    let expenseName = document.createElement("td");
    let expenseGroup = document.createElement("td");
    let expenseType = document.createElement("td");
    let expenseAmount = document.createElement("td");


    expenseName.textContent = document.getElementById("expenseName").value;
    expenseGroup.textContent = document.getElementById("expenseGroup").value;
    expenseType.textContent = document.getElementById("expenseType").value;
    expenseAmount.textContent = document.getElementById("expenseAmount").value;
    statoUscita = true;



    ammonts = ammonts - expenseAmount.textContent;
    ammount_value.textContent = ammonts.toFixed(2) + " €"

    console.log(ammonts)
    console.log(ammount_value)

    list_events.appendChild(row);

    row.appendChild(expenseName);
    row.appendChild(expenseGroup);
    row.appendChild(expenseType);
    row.appendChild(expenseAmount);

    // Pulisci i campi del form dopo l'aggiunta
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseGroup").value = "";
    document.getElementById("expenseType").value = "";
    document.getElementById("expenseAmount").value = "";

    // Nascondi il modulo aggiungi
    document.getElementById("blocchiAggiuntivi").style.display = "none";
}


// Mostra la finestra modale quando l'utente clicca sul bottone "Add uscite"
document.querySelector("#blocchiAggiuntivi button:nth-of-type(1)").addEventListener("click", function () {
    document.getElementById("modal").style.display = "block";
});

// Chiudi la finestra modale quando l'utente clicca sul pulsante di chiusura
document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
});

// Gestisci l'invio del form per aggiungere una nuova uscita
document.getElementById("addExpenseForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita il comportamento predefinito di ricaricare la pagina
    // Qui gestisci l'aggiunta della nuova uscita utilizzando i valori dal form
    // Puoi accedere ai valori dei campi del form utilizzando document.getElementById("campoId").value
    // Dopo aver gestito l'aggiunta, puoi nascondere la finestra modale
    document.getElementById("modal").style.display = "none";
});





document.querySelector("#blocchiAggiuntivi button:nth-of-type(2)").addEventListener("click", function () {
    document.getElementById("modalEntrata").style.display = "block";
});

// Chiudi la finestra modale dell'entrata quando l'utente clicca sul pulsante di chiusura
document.querySelector("#modalEntrata .close").addEventListener("click", function () {
    document.getElementById("modalEntrata").style.display = "none";
});

// Gestisci l'invio del form per aggiungere una nuova entrata
document.getElementById("addEntrataForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita il comportamento predefinito di ricaricare la pagina
    // Qui gestisci l'aggiunta della nuova entrata utilizzando i valori dal form
    // Puoi accedere ai valori dei campi del form utilizzando document.getElementById("campoId").value
    // Dopo aver gestito l'aggiunta, puoi nascondere la finestra modale
    document.getElementById("modalEntrata").style.display = "none";
});