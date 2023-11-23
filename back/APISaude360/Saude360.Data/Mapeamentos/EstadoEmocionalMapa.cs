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
    public class EstadoEmocionalMapa : IEntityTypeConfiguration<EstadoEmocional>
    {
        public void Configure(EntityTypeBuilder<EstadoEmocional> builder)
        {
            builder.ToTable("EstadoEmocional");
            builder.Property(u => u.Id).HasColumnName("id");
            builder.Property(u => u.Estado).HasColumnType("varchar(50)").HasColumnName("estadoEmocional");
            builder.Property(u => u.SobreEmocoes).HasColumnType("varchar(200)").HasColumnName("sobreEmocoes");
            builder.Property(u => u.UsuarioId).HasColumnType("int").HasColumnName("usuarioId");
            builder.Property(u => u.DataCriacao).HasColumnName("dataCriacao");
        }
    }
}
