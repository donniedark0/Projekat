import {Kategorija} from "./kategorija.js";
import {Recept} from "./recept.js";

var kategorijeDiv = document.createElement("div");
kategorijeDiv.classList.add("kategorije-div");

var receptiDiv = document.createElement("div");
receptiDiv.classList.add("recepti-div");
var naslovDiv = document.createElement("div");
naslovDiv.classList.add("naslov-kat-div")
var naslov = document.createElement("h1");
naslov.classList.add("naslov-kategorija");
naslov.innerHTML = "KATEGORIJE";
naslovDiv.appendChild(naslov);
kategorijeDiv.appendChild(naslovDiv);
var dodajDugmeDiv = document.createElement("div");
dodajDugmeDiv.classList.add("dodaj-pretrazi-div");
kategorijeDiv.appendChild(dodajDugmeDiv);

var popUp = document.createElement("div");
popUp.classList.add("popUp");
var popUpSadrzaj = document.createElement("div");
popUpSadrzaj.classList.add("popUp-sadrzaj");
var popUpHeader = document.createElement("div");
popUpHeader.classList.add("popUp-header");
var span = document.createElement("span");
span.classList.add("close");
span.innerHTML = "&times;"
popUpHeader.appendChild(span);
var popUpBody = document.createElement("div");
popUpBody.classList.add("popUp-body");
var popUpFooter = document.createElement("div");
popUpFooter.classList.add("popUp-footer");

popUpSadrzaj.appendChild(popUpHeader);
popUpSadrzaj.appendChild(popUpBody);
popUpSadrzaj.appendChild(popUpFooter);
popUp.appendChild(popUpSadrzaj);

var potvrdiDugmeKat = document.createElement("button");
potvrdiDugmeKat.classList.add("potvrdi-dugme-kat");
potvrdiDugmeKat.innerHTML = "Potvrdi";

var forma = document.createElement("form");
forma.classList.add("forma");
forma.appendChild(document.createElement("br"));

popUpBody.appendChild(forma);

span.onclick = function(){
    popUp.style.display = "none";
    popUpFooter.removeChild(popUpFooter.firstChild);

}
window.onclick = function(event){
    if (event.target == popUp) {
        popUp.style.display = "none";
        popUpFooter.removeChild(popUpFooter.firstChild);
   }
}

document.body.appendChild(popUp);

fetch("https://localhost:5001/Kategorija/PreuzmiKategorije").then( p => {
    p.json().then(data => {
        var dodajDugme = document.createElement("button");
        dodajDugme.classList.add("dodaj-pretrazi");
        dodajDugme.innerHTML = "Dodaj kategoriju";
        dodajDugmeDiv.appendChild(dodajDugme);
        dodajDugmeDiv.appendChild(dugmePretrazi);
        var listaKategorija = document.createElement("div");
        listaKategorija.classList.add("lista-kategorija");

        data.forEach(kategorija => {
            const kategorija1 = new Kategorija(kategorija.id, kategorija.naziv, kategorija.listaProizvoda);
            kategorija1.CrtajKategoriju(listaKategorija);
        });

        kategorijeDiv.appendChild(listaKategorija)

        var inputNaziv = document.createElement("input");
        inputNaziv.classList.add("input");
        inputNaziv.type = "text";
        var labelaUnesiNaziv = document.createElement("label");
        labelaUnesiNaziv.classList.add("unesite-naziv");
        labelaUnesiNaziv.setAttribute("for", inputNaziv);
        labelaUnesiNaziv.innerHTML = "Naziv:"

        dodajDugme.onclick = function(){
            popUp.style.display = "block";
            inputNaziv.value = "";
                        
            while (forma.firstChild) {
                forma.removeChild(forma.firstChild);
            }
            forma.appendChild(labelaUnesiNaziv);
            forma.appendChild(inputNaziv);

            popUpFooter.appendChild(potvrdiDugmeKat);
        }

        potvrdiDugmeKat.onclick = function(){
            const naziv = document.body.querySelector(".input").value;

            fetch("https://localhost:5001/Kategorija/DodajKategoriju", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    naziv: inputNaziv.value
                })
            }).then(resp => {
                if (resp.status == 200) {
                    resp.json().then(id => {
                        const kat = new Kategorija(id, naziv, []);
                        kat.CrtajKategoriju(listaKategorija);
                        alert("Uspesno dodata kategorija!");
                    })
                }
            });
        };
     });
});

var dugmePretrazi = document.createElement("button");
dugmePretrazi.classList.add("dodaj-pretrazi");
dugmePretrazi.innerHTML="Pronadji recept";
dodajDugmeDiv.appendChild(dugmePretrazi);

dugmePretrazi.onclick = function(){
    receptiDiv.innerHTML ="";
    var cekiraniSastojci = [];

    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    for (var i = 0; i < checkboxes.length; i++) {
        cekiraniSastojci.push(checkboxes[i].value)
    }

    var stringified = JSON.stringify(cekiraniSastojci);
    console.log(stringified)

    fetch("https://localhost:5001/Recept/PosaljiSastojke", {
                    method: 'PUT',
                    mode: 'cors',
                    body: stringified,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(resp => {
                    resp.json().then(data => {
                        data.forEach(recept => {
                            const rec = new Recept(recept.id, recept.naziv, recept.opis, recept.slika, recept.sastojci);
                            rec.CrtajRecepte(receptiDiv);     
                        });
                    });
                });

   /* fetch("https://localhost:5001/Recept/PreuzmiRecepte").then( p => {
        p.json().then(data => {
            data.forEach(recept => {
                var indikator = 0;
                const rec = new Recept(recept.id, recept.naziv, recept.opis, recept.slika, recept.sastojci);
                rec.sastojci.forEach(s => {
                    for(var i = 0; i<cekiraniSastojci.length; i++){
                        if(s.idProizvoda == cekiraniSastojci[i]){
                            indikator++;
                        }
                    }
                });
                if(indikator == recept.sastojci.length){
                    rec.CrtajRecepte(receptiDiv);
                    
                }
                    
            });
        });
    });*/
}

document.body.appendChild(kategorijeDiv);
document.body.appendChild(receptiDiv);

/*var dugmeDodajRecept = document.createElement("button");
dugmeDodajRecept.classList.add("dodaj-pretrazi");
dugmeDodajRecept.innerHTML="Dodaj recept";
dodajDugmeDiv.appendChild(dugmeDodajRecept)
dugmeDodajRecept.onclick = function(){

    popUp.style.display = "block";
    popUpFooter.appendChild(potvrdiDugmeKat);

    while (forma.firstChild) {
        forma.removeChild(forma.firstChild);
    }

    var nazivR = document.createElement("input");
    var nazivRLabela = document.createElement("label");
    nazivRLabela.setAttribute("for", nazivR);
    nazivRLabela.innerHTML = "Naziv:"
    var opisR = document.createElement("input");
    var opisRLabela = document.createElement("label");
    opisRLabela.setAttribute("for", opisR);
    opisRLabela.innerHTML = "Opis:"
    var slikaR = document.createElement("input");
    var slikaRLabela = document.createElement("label");
    slikaRLabela.setAttribute("for", slikaR);
    slikaRLabela.innerHTML = "Slika:"
    
    forma.appendChild(nazivRLabela);
    forma.appendChild(nazivR);
    
    forma.appendChild(opisRLabela);
    forma.appendChild(opisR);

    forma.appendChild(slikaRLabela);
    forma.appendChild(slikaR);


    fetch("https://localhost:Recept/DodajRecept", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            naziv: nazivR.value,
            opis: opisR.value,
            slika: slikaR.value
        })
    }).then(resp => {
        if (resp.status == 200) {
            alert("Uspesno dodat recept!");
        }
    });

    var recepti = [];

    fetch("https://localhost:5001/Recept/PreuzmiRecepte").then( p => {
        p.json().then(data => {
            data.forEach(recept => {
                const rec = new Recept(recept.id, recept.naziv, recept.opis, recept.slika, recept.sastojci);
                recepti.push(rec);
            });
        });
    });

    var noviRecept = recepti[recepti.length];

    fetch("https://localhost:5001/Sastojci/DodajSastojke/" + noviRecept.id + ).then( p => {
            p.json().then(data => {
                data.forEach(sastojak => {
                })
            });
        });
}*/