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
    public class ProizvodController : ControllerBase
    {
        public PronadjiReceptContext Context { get; set; }
        public ProizvodController(PronadjiReceptContext context)
        {
            Context = context;
        }

        [Route("PreuzmiProizvode")]
        [HttpGet]

        public async Task<List<Proizvod>> PreuzmiProizvode()
        {
            return await Context.Proizvodi.Include(p => p.Sastojci).ToListAsync();
        }

        [Route("DodajProizvod")]
        [HttpPost]

        public async Task<IActionResult> DodajProizvod([FromBody] Proizvod proizvod){
            Proizvod provera = await Context.Proizvodi.FirstOrDefaultAsync(p => p.Naziv == proizvod.Naziv);
            if(provera != null){
                return StatusCode(404);
            }
            else{
                Context.Proizvodi.Add(proizvod);
                await Context.SaveChangesAsync();
                return StatusCode(204);
            }
        }

        [Route("IzmeniProizvod/{id}")]
        [HttpPut]
         public async Task<IActionResult> IzmeniProizvod(int id, [FromBody] Proizvod proizvod){
            
            var stariProizvod = await Context.Proizvodi.FindAsync(id);
            stariProizvod.Naziv = proizvod.Naziv;
           // Context.Update<Proizvod>(Proizvod);
            await Context.SaveChangesAsync();
            return StatusCode(204);
        }

        [Route("IzbrisiProizvod/{id}")]
        [HttpDelete]
        public async Task<IActionResult> IzbrisiProizvod(int id){
            Proizvod proizZaBrisanje = await Context.Proizvodi.FirstOrDefaultAsync(p => p.Id == id);
            if (proizZaBrisanje == null) return StatusCode(404);
            Context.Proizvodi.Remove(proizZaBrisanje);
            await Context.SaveChangesAsync();
            return StatusCode(204);
        }

    }

}