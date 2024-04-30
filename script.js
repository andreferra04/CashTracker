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


let list = [];


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
        "Data": document.getElementById("entrataDate").value,
        "Nome": document.getElementById("entrataName").value,
        "gruppo": document.getElementById("entrataGroup").value,
        "Tipo": document.getElementById("entrataType").value,
        "Importo": parseFloat(document.getElementById("entrataAmount").value)
    };
    list.push(newIncome);

    let row = document.createElement("tr");
    let IncomeDate = document.createElement("td");
    let IncomeName = document.createElement("td");
    let IncomeGroup = document.createElement("td");
    let IncomeType = document.createElement("td");
    let IncomeAmount = document.createElement("td");

    IncomeDate.textContent = document.getElementById("entrataDate").value;
    IncomeName.textContent = document.getElementById("entrataName").value;
    IncomeGroup.textContent = document.getElementById("entrataGroup").value;
    IncomeType.textContent = document.getElementById("entrataType").value;
    IncomeAmount.textContent = document.getElementById("entrataAmount").value;
    statoUscita = false;



    ammonts = ammonts + parseFloat(IncomeAmount.textContent);
    ammount_value.textContent = ammonts.toFixed(2) + " €"


    list_events.appendChild(row);

    row.appendChild(IncomeDate);
    row.appendChild(IncomeName);
    row.appendChild(IncomeGroup);
    row.appendChild(IncomeType);
    row.appendChild(IncomeAmount);

    sessionStorage.setItem('expenses', JSON.stringify(list));

    // Pulisci i campi del form dopo l'aggiunta

    document.getElementById("entrataDate").value = "";
    document.getElementById("entrataName").value = "";
    document.getElementById("entrataGroup").value = "";
    document.getElementById("entrataType").value = "";
    document.getElementById("entrataAmount").value = "";

    // Nascondi il modulo aggiungi
    document.getElementById("blocchiAggiuntivi").style.display = "none";
}

function addNewExpense(event) {
    console.log(event)
    event.preventDefault();

    const newExpense = {
        "Data": document.getElementById("expenseDate").value,
        "Nome": document.getElementById("expenseName").value,
        "gruppo": document.getElementById("expenseGroup").value,
        "Tipo": document.getElementById("expenseType").value,
        "Importo": parseFloat(document.getElementById("expenseAmount").value)
    };

    // Aggiunta dell'oggetto alla lista
    list.push(newExpense);

    console.log(list);

    let row = document.createElement("tr");
    let expenseDate = document.createElement("td");
    let expenseName = document.createElement("td");
    let expenseGroup = document.createElement("td");
    let expenseType = document.createElement("td");
    let expenseAmount = document.createElement("td");

    expenseDate.textContent = document.getElementById("expenseDate").value;
    expenseName.textContent = document.getElementById("expenseName").value;
    expenseGroup.textContent = document.getElementById("expenseGroup").value;
    expenseType.textContent = document.getElementById("expenseType").value;
    expenseAmount.textContent = document.getElementById("expenseAmount").value;
    statoUscita = true;



    ammonts = ammonts - expenseAmount.textContent;
    ammount_value.textContent = ammonts.toFixed(2) + " €"


    list_events.appendChild(row);

    row.appendChild(expenseDate);
    row.appendChild(expenseName);
    row.appendChild(expenseGroup);
    row.appendChild(expenseType);
    row.appendChild(expenseAmount);

    sessionStorage.setItem('expenses', JSON.stringify(list));

    // Pulisci i campi del form dopo l'aggiunta
    document.getElementById("expenseDate").value = "";
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



document.querySelector("#blocchiAggiuntivi button:nth-of-type(2)").addEventListener("click", function () {
    document.getElementById("modalEntrata").style.display = "block";
});

// Chiudi la finestra modale dell'entrata quando l'utente clicca sul pulsante di chiusura
document.querySelector("#modalEntrata .close").addEventListener("click", function () {
    document.getElementById("modalEntrata").style.display = "none";
});

// Quando la pagina viene caricata
window.addEventListener('load', function () {
    // Recupera i dati dalla sessionStorage
    const savedExpenses = sessionStorage.getItem('expenses');

    if (savedExpenses) {
        // Se ci sono dati salvati, li carichi nella tabella
        list = JSON.parse(savedExpenses);
        renderTable(); // Funzione per visualizzare i dati nella tabella
    }
});

// Funzione per visualizzare i dati nella tabella
function renderTable() {
    // Pulisci la tabella
    list_events.innerHTML = '';

    

    // Itera sui dati salvati e aggiungi righe alla tabella
    list.forEach(function (item) {
        let row = document.createElement("tr");

        // Crea le celle della riga
        for (let key in item) {
            let cell = document.createElement("td");
            cell.textContent = item[key];
            row.appendChild(cell);
        }
        
        list_events.appendChild(row);
    });
}
