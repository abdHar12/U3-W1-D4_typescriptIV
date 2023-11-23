var urlAPI = "https://mocki.io/v1/765b2daf-41d5-4e94-a0d5-abd918f57b8f";
var Cloth = /** @class */ (function () {
    function Cloth(_id, _codprod, _collezione, _capo, _modello, _quantita, _colore, _prezzoivaesclusa, _prezzoivainclusa, _disponibile, _saldo) {
        this.id = _id;
        this.codprod = _codprod;
        this.collezione = _collezione;
        this.capo = _capo;
        this.modello = _modello;
        this.quantita = _quantita;
        this.colore = _colore;
        this.prezzoivaesclusa = _prezzoivaesclusa;
        this.prezzoivainclusa = _prezzoivainclusa;
        this.disponibile = _disponibile;
        this.saldo = _saldo;
    }
    Cloth.prototype.getSaldoCapo = function () {
        return Math.abs((this.prezzoivainclusa - this.saldo) / 100);
    };
    Cloth.prototype.getAcquistoCapo = function () {
        return this.prezzoivainclusa - this.getSaldoCapo();
    };
    return Cloth;
}());
var clothes = [];
fetch(urlAPI)
    .then(function (response) {
    if (response)
        return response.json();
    else {
        throw new Error("Generic Fetching error");
    }
})
    .then(function (clothesObj) {
    clothesObj.forEach(function (piece) {
        var tempCloth = new Cloth(piece.id, piece.codprod, piece.collezione, piece.capo, piece.modello, piece.quantita, piece.colore, piece.prezzoivaesclusa, piece.prezzoivainclusa, piece.disponibile, piece.saldo);
        console.log(tempCloth);
        clothes.push(tempCloth);
    });
    console.log(clothes);
    clothes.forEach(function (cloth) {
        console.log("L'abito con id:".concat(cloth.id, " \u00E8 scontato del ").concat(cloth.getSaldoCapo() * 100, "% quindi costa ").concat(cloth.getAcquistoCapo(), "\u20AC"));
    });
})
    .catch(function (error) { return console.log("CATCH BLOCK", error); });
