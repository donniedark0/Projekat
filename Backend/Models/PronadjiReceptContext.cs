using Microsoft.EntityFrameworkCore;

namespace WEB_Programiranje_projekat.Models
{
    public class PronadjiReceptContext : DbContext
    {
        public DbSet<Proizvod> Proizvodi {get; set;}
        public DbSet<Recept> Recepti {get; set;}
        public DbSet<Kategorija> Kategorije {get; set;}
        public DbSet<Sastojci> Sastojci {get; set;}

        public PronadjiReceptContext(DbContextOptions options) : base(options){

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<Sastojci>()
                    .HasKey(s => new { s.IdRecepta, s.IdProizvoda });  
                modelBuilder.Entity<Sastojci>()
                    .HasOne(s => s.Recept)
                    .WithMany(r => r.Sastojci)
                    .HasForeignKey(s => s.IdRecepta);  
                modelBuilder.Entity<Sastojci>()
                    .HasOne(s => s.Proizvod)
                    .WithMany(p => p.Sastojci)
                    .HasForeignKey(s => s.IdProizvoda);

            /*modelBuilder.Entity<Recept>()
                .HasMany(r => r.Proizvodi)
                .WithMany(t => t.Recepti)
                .Map(m => {
                    m.ToTable("Sastojci");
                    m.MapLeftKey("Id"); //Recept
                    m.MapRightKey("Id"); //Proizvod
                });

                base.OnModelCreating(modelBuilder);*/
        }
    }
}