﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WEB_Programiranje_projekat.Models;

namespace WEB_Programiranje_projekat.Migrations
{
    [DbContext(typeof(PronadjiReceptContext))]
    [Migration("20210722175011_V2")]
    partial class V2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.8")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WEB_Programiranje_projekat.Models.Kategorija", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Kategorije");
                });

            modelBuilder.Entity("WEB_Programiranje_projekat.Models.Proizvod", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IdKategorije")
                        .HasColumnType("int");

                    b.Property<int?>("KategorijaId")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("KategorijaId");

                    b.ToTable("Proizvodi");
                });

            modelBuilder.Entity("WEB_Programiranje_projekat.Models.Recept", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Opis")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Slika")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Recepti");
                });

            modelBuilder.Entity("WEB_Programiranje_projekat.Models.Sastojci", b =>
                {
                    b.Property<int>("IdRecepta")
                        .HasColumnType("int");

                    b.Property<int>("IdProizvoda")
                        .HasColumnType("int");

                    b.HasKey("IdRecepta", "IdProizvoda");

                    b.ToTable("Sastojci");
                });

            modelBuilder.Entity("WEB_Programiranje_projekat.Models.Proizvod", b =>
                {
                    b.HasOne("WEB_Programiranje_projekat.Models.Kategorija", null)
                        .WithMany("ListaProizvoda")
                        .HasForeignKey("KategorijaId");
                });

            modelBuilder.Entity("WEB_Programiranje_projekat.Models.Kategorija", b =>
                {
                    b.Navigation("ListaProizvoda");
                });
#pragma warning restore 612, 618
        }
    }
}
