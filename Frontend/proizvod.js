export class Proizvod{
    constructor(id, naziv, kategorijaId, sastojci){
        this.id = id;
        this.naziv = naziv;
        this.idKategorije = kategorijaId;
        this.sastojci = sastojci;
        this.clicked = false;
    }
   
    CrtajProizvod(host){
        var singleProiz = document.createElement("div");
        singleProiz.classList.add("single-proizvod");
        var nazivCheckbox = document.createElement("input");
        nazivCheckbox.type = "checkbox";
        nazivCheckbox.setAttribute("value", this.id);
        nazivCheckbox.classList.add("naziv-checkbox");
        var labelaNaziv = document.createElement("label");
        labelaNaziv.setAttribute("for", nazivCheckbox);
        labelaNaziv.innerHTML = this.naziv;
        labelaNaziv.classList.add("naziv-proizvoda-labela")
        singleProiz.appendChild(nazivCheckbox)
        singleProiz.appendChild(labelaNaziv)
        var br = document.createElement("br");
        singleProiz.appendChild(br);

        var dugmeIzbrisiProiz = document.createElement("button");
        dugmeIzbrisiProiz.classList.add("edit-delete");
        dugmeIzbrisiProiz.innerHTML = "&times;"
        var id = this.id;

        dugmeIzbrisiProiz.onclick = function(e) {
            e.preventDefault();
            if (confirm("Da li zaista zelite da izbrisete ovaj proizvod?")) {
                fetch("https://localhost:5001/Proizvod/IzbrisiProizvod/" + id, {
                    method: 'DELETE',
                    mode: 'cors'
                }).then(resp => {
                    if (resp.status == 204) {
                        alert("Uspesno ste izbrisali proizvod!");
                    }
                });
            }
        }
        singleProiz.appendChild(dugmeIzbrisiProiz);

        var dugmeIzmeniProiz = document.createElement("button");
        dugmeIzmeniProiz.innerHTML = "&#9998;";
        dugmeIzmeniProiz.classList.add("edit-delete");
        dugmeIzmeniProiz.onclick = function(e) {
            e.preventDefault();
            var noviNaziv = prompt("Unesite novi naziv:");
            if (noviNaziv != null) {
                fetch("https://localhost:5001/Proizvod/IzmeniProizvod/" + id, {
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
                        this.naziv = noviNaziv;
                        alert("Uspesno ste izmenili naziv proizvod!");
                    }
                });
            }
        }
        singleProiz.appendChild(dugmeIzmeniProiz);
        host.appendChild(singleProiz);
    }
}