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
    public class UsuarioMapa : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("Usuarios");
            builder.Property(u => u.Id).HasColumnName("id");
            builder.Property(u => u.Nome).HasColumnType("varchar(50)").HasColumnName("nome");
            builder.Property(u => u.Email).HasColumnType("varchar(100)").HasColumnName("email");
            builder.Property(u => u.Senha).HasColumnType("varchar(255)").HasColumnName("senha");
            builder.Property(u => u.DataCriacao).HasColumnName("dataCriacao");
        }
    }
}
