import { Proizvod } from "./proizvod.js";

export class Kategorija{
    constructor(id, naziv, listaProizvoda){
        this.id = id;
        this.naziv = naziv;
        this.listaProizvoda = listaProizvoda;
    }

    CrtajKategoriju(host){
        var thisptr = this;
        const singleKat = document.createElement("div");
        singleKat.className = "single-kategorija";

        var naslovIDugmici = document.createElement("div");
        naslovIDugmici.classList.add("naslov-i-dugmici-kat");
        var nazivKategorije = document.createElement("h1");
        nazivKategorije.classList.add("naziv-kategorije")
        nazivKategorije.innerHTML = this.naziv;

        naslovIDugmici.appendChild(nazivKategorije);

        var proizvodi = document.createElement("div");
        proizvodi.classList.add("lista-proizvoda");
        var samoLista = document.createElement("div");
        samoLista.classList.add("samo-lista-proizvoda");


        this.listaProizvoda.forEach(p => {
            const proizvod = new Proizvod(p.id, p.naziv, p.kategorijaId, p.sastojci);
            proizvod.CrtajProizvod(samoLista);
        });
        proizvodi.appendChild(samoLista);

        var dugmeDodajProiz = document.createElement("button");
        dugmeDodajProiz.classList.add("dodaj-proizvod");
        dugmeDodajProiz.innerHTML = "Dodaj proizvod";

        var potvrdiDugmeProiz = document.createElement("button");
        potvrdiDugmeProiz.classList.add("potvrdi-dugme-kat");
        potvrdiDugmeProiz.innerHTML = "Potvrdi";

        dugmeDodajProiz.onclick = function(){
            var popUp = document.body.querySelector(".popUp");
            popUp.style.display = "block";
            const forma = document.body.querySelector(".forma");
            while (forma.firstChild) {
                forma.removeChild(forma.firstChild);
            }

            var inputNaziv = document.createElement("input");
            inputNaziv.classList.add("input");
            inputNaziv.type = "text";
            var labelaUnesiNaziv = document.createElement("label");
            labelaUnesiNaziv.classList.add("unesite-naziv");
            labelaUnesiNaziv.setAttribute("for", inputNaziv);
            labelaUnesiNaziv.innerHTML = "Naziv:"

            forma.appendChild(labelaUnesiNaziv);
            forma.appendChild(inputNaziv);

            var popUpFooter = document.body.querySelector(".popUp-footer");
            popUpFooter.appendChild(potvrdiDugmeProiz);
        }
        
        potvrdiDugmeProiz.onclick = function(){
            const naziv = document.body.querySelector(".input").value;
           fetch("https://localhost:5001/Proizvod/DodajProizvod", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    naziv: naziv,
                    kategorijaId: thisptr.id
                })
            }).then(resp => {
                if (resp.status == 204) {
                    alert("Uspesno dodat proizvod!");
                }
                else{
                    alert("Proizvod vec postoji!x")
                }
            });
        }
        singleKat.appendChild(naslovIDugmici);

        var dugmeIzbrisi = document.createElement("button");
        dugmeIzbrisi.classList.add("edit-delete");
        dugmeIzbrisi.classList.add("delete-kat");
        dugmeIzbrisi.innerHTML = "&times;"
        var id = this.id;

        dugmeIzbrisi.onclick = function(e) {
            e.preventDefault();
            if (confirm("Da li zaista zelite da izbrisete ovu kategoriju?")) {
                fetch("https://localhost:5001/Kategorija/IzbrisiKategoriju/" + id, {
                    method: 'DELETE',
                    mode: 'cors'
                }).then(resp => {
                    if (resp.status == 204) {
                        alert("Uspesno ste izbrisali kategoriju!");
                    }
                });
            }
        }
        naslovIDugmici.appendChild(dugmeIzbrisi);

        var dugmeIzmeni = document.createElement("button");
        dugmeIzmeni.innerHTML = "&#9998;";
        dugmeIzmeni.classList.add("edit-delete");
        dugmeIzmeni.classList.add("edit-kat");
        dugmeIzmeni.onclick = function(e) {
            e.preventDefault();
            var noviNaziv = prompt("Unesite novi naziv:");
            if (noviNaziv != null) {
                fetch("https://localhost:5001/Kategorija/IzmeniKategoriju/" + id, {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Naziv: noviNaziv
                    })
                }).then(resp => {
                    if (resp.status == 204) {
                        thisptr.naziv = noviNaziv;
                        alert("Uspesno ste izmenili naziv kategorije!");
                    }
                });
            }
        }
        naslovIDugmici.appendChild(dugmeIzmeni);

        proizvodi.appendChild(dugmeDodajProiz);
        singleKat.appendChild(proizvodi);
        host.appendChild(singleKat);
    }
}