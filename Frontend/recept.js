import { Proizvod } from "./proizvod.js";

export class Recept{
    constructor(id, naziv, opis, slika, sastojci){
        this.id = id;
        this.naziv = naziv;
        this.opis = opis;
        this.slika = slika;
        this.sastojci = sastojci;
    }

    CrtajRecepte(host){
        var recepti = document.createElement("div");
        const singleRec = document.createElement("div");
        singleRec.className = "single-recept";

        var nazivRecepta = document.createElement("h2");
        nazivRecepta.innerHTML = this.naziv;

        var slikaa = document.createElement("img");
        slikaa.classList.add("slika-recept");
        slikaa.src = 'slike/' + this.slika;
        var sastojci = document.createElement("div");
        sastojci.classList.add("sastojci");

        var opisRecepta = document.createElement("h5");
        opisRecepta.classList.add("opis-recepta");
        opisRecepta.innerHTML = this.opis;
        singleRec.appendChild(slikaa)
        singleRec.appendChild(nazivRecepta);
        singleRec.appendChild(opisRecepta);

        fetch("https://localhost:5001/Proizvod/PreuzmiProizvode").then( p => {
            p.json().then(data => {
                data.forEach(proizvod => {
                    const proiz = new Proizvod(proizvod.id, proizvod.naziv);
                    this.sastojci.forEach(sastojak => {
                        if(sastojak.idProizvoda == proiz.id){
                            var sastojakDiv = document.createElement("div")
                            sastojakDiv.classList.add("sastojak")
                            var nazivSastojka = document.createElement("h5");
                            nazivSastojka.innerHTML = proiz.naziv;
                            sastojakDiv.appendChild(nazivSastojka);
                            sastojci.appendChild(sastojakDiv);
                        }
                    })
                });
            });
        });
        singleRec.appendChild(sastojci);
        recepti.appendChild(singleRec);
        host.appendChild(recepti);
    }

}