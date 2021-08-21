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
    public class SastojciController : ControllerBase
    {
        public PronadjiReceptContext Context { get; set; }
        public SastojciController(PronadjiReceptContext context)
        {
            Context = context;
        }

        [Route("PreuzmiSastojke")]
        [HttpGet]

        public async Task<List<Sastojci>> PreuzmiSveSastojke()
        {
            return await Context.Sastojci/*.Include(p=> p.Proizvod)*/.ToListAsync();
        }

        [Route("PreuzmiSastojke/{idR}")]
        [HttpGet]

        public async Task<List<Sastojci>> PreuzmiSastojke(int idR)
        {
            List<Sastojci> sas = await Context.Sastojci.ToListAsync();
            List<Sastojci> zaPrikaz = new List<Sastojci>();
            foreach (Sastojci s in sas){
                if(s.IdRecepta == idR)
                    zaPrikaz.Add(s);
            }

            return zaPrikaz;
        }

        [Route("DodajSastojke")]
        [HttpPost]
        public async Task DodajSastojke([FromBody] Sastojci sastojci){
            /*var sas = new Sastojci();

            var recept = await Context.Recepti.FindAsync(sastojci.IdRecepta);
            sas.Recept = sastojci.Recept;
            sas.IdRecepta = sas.Recept.Id;

            var proizvod = await Context.Proizvodi.FindAsync(sastojci.IdProizvoda);
            sas.Proizvod = sastojci.Proizvod;
            sas.IdProizvoda = sas.Proizvod.Id;

            Context.Sastojci.Add(sas);*/
            Context.Sastojci.Add(sastojci);
            await Context.SaveChangesAsync();
        }

       /* [Route("IzmeniSastojke")]
        [HttpPut]
        public async Task IzmeniSastojke([FromBody] Sastojci sastojci){
        }*/

        [Route("IzbrisiSastojci")]
        [HttpDelete]
        public async Task IzbrisiSastojci(int idR, int idP){
            //var Sastojci = await Context.FindAsync<Sastojci>(id)
            var sastojci = await Context.Sastojci.FindAsync(idR, idP);
            Context.Remove(sastojci);
            await Context.SaveChangesAsync();
        }

    }

}