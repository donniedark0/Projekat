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
    public class ReceptController : ControllerBase
    {
        public PronadjiReceptContext Context { get; set; }
        public ReceptController(PronadjiReceptContext context)
        {
            Context = context;
        }

        [Route("PreuzmiRecepte")]
        [HttpGet]

        public async Task<List<Recept>> PreuzmiRecepte()
        {
            return await Context.Recepti.Include(p => p.Sastojci).ToListAsync();
        }

        [Route("PreuzmiRecept/{id}")]
        [HttpGet]

        public async Task<Recept> PreuzmiRecept(int id)
        {
            return await Context.Recepti.Include(p => p.Sastojci).FirstOrDefaultAsync(p => p.Id == id);
        }

        [Route("DodajRecept")]
        [HttpPost]

        public async Task DodajRecept([FromBody] Recept recept){
            Context.Recepti.Add(recept);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniRecept/{id}")]
        [HttpPut]
        public async Task IzmeniRecept([FromBody] Recept recept){
            
            //var stariRecept = await Context.Recepti.FindAsync(recept.Id);
            Context.Update<Recept>(recept);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiRecept/{id}")]
        [HttpDelete]
        public async Task IzbrisiRecept(int id){
            //var recept = await Context.FindAsync<Recept>(id)
            var recept = await Context.Recepti.FindAsync(id);
            Context.Remove(recept);
            await Context.SaveChangesAsync();
        }

    }

}