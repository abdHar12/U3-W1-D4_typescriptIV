const urlAPI: string =
  "https://mocki.io/v1/765b2daf-41d5-4e94-a0d5-abd918f57b8f";

class Cloth {
  id: number;
  codprod: number;
  collezione: string;
  capo: string;
  modello: number;
  quantita: number;
  colore: string;
  prezzoivaesclusa: number;
  prezzoivainclusa: number;
  disponibile: string;
  saldo: number;

  constructor(
    _id: number,
    _codprod: number,
    _collezione: string,
    _capo: string,
    _modello: number,
    _quantita: number,
    _colore: string,
    _prezzoivaesclusa: number,
    _prezzoivainclusa: number,
    _disponibile: string,
    _saldo: number
  ) {
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

  getSaldoCapo(): number {
    return Math.abs((this.prezzoivainclusa - this.saldo) / 100);
  }
  getAcquistoCapo(): number {
    return this.prezzoivainclusa - this.getSaldoCapo();
  }
}
let clothes: Cloth[] = [];

fetch(urlAPI)
  .then((response) => {
    if (response) return response.json();
    else {
      throw new Error("Generic Fetching error");
    }
  })
  .then((clothesObj) => {
    clothesObj.forEach((piece: any) => {
      const tempCloth = new Cloth(
        piece.id,
        piece.codprod,
        piece.collezione,
        piece.capo,
        piece.modello,
        piece.quantita,
        piece.colore,
        piece.prezzoivaesclusa,
        piece.prezzoivainclusa,
        piece.disponibile,
        piece.saldo
      );
      console.log(tempCloth);
      clothes.push(tempCloth);
    });
    console.log(clothes);
    clothes.forEach((cloth) => {
      console.log(
        `L'abito con id:${cloth.id} è scontato del ${
          cloth.getSaldoCapo() * 100
        }% quindi costa ${cloth.getAcquistoCapo()}€`
      );
    });
  })
  .catch((error) => console.log("CATCH BLOCK", error));
