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
    public class AlimentacaoMapa : IEntityTypeConfiguration<Alimentacao>
    {
        public void Configure(EntityTypeBuilder<Alimentacao> builder)
        {
            builder.ToTable("Alimentacao");
            builder.Property(u => u.Id).HasColumnName("id");
            builder.Property(u => u.Refeicao).HasColumnType("varchar(50)").HasColumnName("refeicao");
            builder.Property(u => u.AlimentosConsumidos).HasColumnType("varchar(200)").HasColumnName("alimentosConsumidos");
            builder.Property(u => u.UsuarioId).HasColumnType("int").HasColumnName("usuarioId");
            builder.Property(u => u.DataCriacao).HasColumnName("dataCriacao");
        }
    }
}
