using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WEB_Programiranje_projekat.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace WEB_Programiranje_projekat.Controllers{

    [ApiController]
    [Route("[controller]")]
    public class KategorijaController : ControllerBase
    {
        public PronadjiReceptContext Context { get; set; }
        public KategorijaController(PronadjiReceptContext context)
        {
            Context = context;
        }

        [Route("PreuzmiKategorije")]
        [HttpGet]

        public async Task<List<Kategorija>> Kategorije()
        {
            return await Context.Kategorije.Include(p => p.ListaProizvoda).ToListAsync();
        }

        [Route("DodajKategoriju")]
        [HttpPost]

        public async Task<int> DodajKategoriju([FromBody] Kategorija kategorija){
            Context.Kategorije.Add(kategorija);
            await Context.SaveChangesAsync();
            return kategorija.Id;
        }

        [Route("IzmeniKategoriju/{id}")]
        [HttpPut]
        public async Task<IActionResult> IzmeniKategoriju(int id, [FromBody] Kategorija kategorija){
            
            var staraKategorija = await Context.Kategorije.FindAsync(id);
            staraKategorija.Naziv = kategorija.Naziv;

           // Context.Update<Kategorija>(kategorija);
            await Context.SaveChangesAsync();
            return StatusCode(204);
        }

        [Route("IzbrisiKategoriju/{id}")]
        [HttpDelete]

        public async Task<IActionResult> IzbrisiKategoriju(int id){
            Kategorija katZaBrisanje = await Context.Kategorije.FirstOrDefaultAsync(k => k.Id == id);
            if (katZaBrisanje == null) return StatusCode(404);
            Context.Kategorije.Remove(katZaBrisanje);
            await Context.SaveChangesAsync();
            return StatusCode(204);
        }

       /* [Route("DodajProizvode")]
        [HttpPost]

        public async Task DodajProizvod([FromBody] Proizvod proizvod)*/
    }

}