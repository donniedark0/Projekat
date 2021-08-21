using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WEB_Programiranje_projekat.Models
{
    public class Sastojci
    {
        public Recept Recept { get; set; }
        public int IdRecepta { get; set; }
        public Proizvod Proizvod { get; set; }
        public int IdProizvoda { get; set; }
    }
}