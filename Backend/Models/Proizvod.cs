using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace WEB_Programiranje_projekat.Models
{
    public class Proizvod
    {
        [Key]
        public int Id { get; set; }
        [StringLength(50, MinimumLength = 1)]
        public string Naziv { get; set; }
        public int KategorijaId {get; set;}
        public virtual ICollection<Sastojci> Sastojci {get; set;}

    }
}