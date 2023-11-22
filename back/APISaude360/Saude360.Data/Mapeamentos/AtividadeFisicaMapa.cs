using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Saude360.Domain.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Saude360.Data.Mapeamentos
{
    public class AtividadeFisicaMapa : IEntityTypeConfiguration<AtividadeFisica>
    {
        public void Configure(EntityTypeBuilder<AtividadeFisica> builder)
        {
            builder.ToTable("AtividadeFisica");
            builder.Property(u => u.Id).HasColumnName("id");
            builder.Property(u => u.TipoExercicio).HasColumnType("varchar(50)").HasColumnName("tipoExercicio");
            builder.Property(u => u.Duracao).HasColumnType("varchar(50)").HasColumnName("duracao");
            builder.Property(u => u.Intensidade).HasColumnType("int").HasColumnName("intensidade");
            builder.Property(u => u.DataCriacao).HasColumnName("dataCriacao");
        }
    }
}
