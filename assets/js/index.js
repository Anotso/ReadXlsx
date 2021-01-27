let names;
let products;
let inputCurrent;
let price = 0;
let pricePersons = 0;
let countNames = 0;
let rest = 0;

function testValues(item){
    if(item[0].hasOwnProperty("nome") && item[0].hasOwnProperty("email") && inputCurrent != "methodOneInpTwo"){
        // console.log(item);
        names = item;
        countNames = names.length;
        addNamesList();
    }
    if(item[0].hasOwnProperty("produto") && item[0].hasOwnProperty("qtd") && item[0].hasOwnProperty("valor") && inputCurrent != "methodOneInpOne"){
        // console.log(item);
        products = item;
        addProductsList();
    }
}

function addNamesList(){
    let listNames = document.getElementById("bodyTableNames");
    listNames.innerHTML = "";
    for (const key of names) {
        listNames.insertAdjacentHTML('beforeend', 
        `<tr>
            <th scope="row">${key.nome}</th>
            <td>${key.email}</td>
            <td class="valuePrice"></td>
        </tr>`);
    }
    if(price>0 && inputCurrent != "methodSingle"){
        calcPriceAll();
    }
}

function addProductsList(){
    let listProducts = document.getElementById("bodyTableProducts");
    listProducts.innerHTML = "";
    price = 0;
    for (const key of products) {
        let qtdItem = parseFloat(key.qtd.replace(",", "."));
        // console.log(qtd);
        let val = parseFloat(key.valor.replace(",", "."));
        // console.log(val);
        let calc = qtdItem*val;
        // console.log(calc.toFixed(2));
        price = price + parseFloat(calc.toFixed(2));
        // console.log(price);
        listProducts.insertAdjacentHTML('beforeend', 
        `<tr>
            <th scope="row">${key.produto}</th>
            <td>${key.qtd.replace(".", ",")}</td>
            <td class="price">${key.valor.replace(".", ",")}</td>
        </tr>`);
    }
    calcPriceAll();
}

function calcPriceAll(){
    rest = price % countNames;
    if(countNames>1 && rest != 0){
        alert(`Ops! Parece que a divisão não será exata. Será adicionado R$ ${rest.toString().replace(".", ",")} na quota o último participante`);
    }
    pricePersons = (price-rest)/countNames;
    addPriceAll();
}

function addPriceAll(){
    let tdRecipient = document.getElementsByClassName("valuePrice");
    // let printPricePersons = 
    // for (const key of tdRecipient) {
    //     key.innerHTML = `R$ ${pricePersons}`;
    // }
    for (let index = 1; index <= countNames; index++) {
        const element = tdRecipient[index-1];
        if(index == countNames){
            pricePersons += rest;
        }
        element.innerHTML = `R$ ${pricePersons.toString().replace(".", ",")}`;
    }
}

let ExcelToJSON = function() {

    this.parseExcel = function(file) {
        let reader = new FileReader();

        reader.onload = function(e) {
            let data = e.target.result;
            let workbook = XLSX.read(data, {
                type: 'binary'
            });
            workbook.SheetNames.forEach(function(sheetName) {
                // Objeto gerado
                let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                testValues(XL_row_object);
                let json_object = JSON.stringify(XL_row_object);
                // console.log(JSON.parse(json_object));
                jQuery( '#xlx_json' ).val( json_object );
            })
        };

        reader.onerror = function(ex) {
            console.log(ex);
        };

        reader.readAsBinaryString(file);
    };
};

function loadFile(evt) {
    let files = evt.target.files; // FileList object
    inputCurrent = evt.target.id;
    let xl2json = new ExcelToJSON();    //Instancia a função para fazer o tratamento documento
    xl2json.parseExcel(files[0]);
}

document.getElementById('methodOneInpOne').addEventListener('change', loadFile, false);
document.getElementById('methodOneInpTwo').addEventListener('change', loadFile, false);
document.getElementById('methodSingle').addEventListener('change', loadFile, false);