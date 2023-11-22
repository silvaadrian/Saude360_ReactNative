using Microsoft.EntityFrameworkCore;
using Saude360.Data.Mapeamentos;
using Saude360.Domain.Entidades;

namespace Saude360.Data.Contexto
{
    public class DataContexto : DbContext
    {

        public DataContexto(DbContextOptions<DataContexto> options) : base(options) { }

        public DataContexto()
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<AtividadeFisica> AtividadesFisicas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UsuarioMapa());
            modelBuilder.ApplyConfiguration(new AtividadeFisicaMapa());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySQL("Server=127.0.0.1;Database=db_saude360;Uid=root;Pwd=root;",
                    builder => builder.MigrationsAssembly("APISaude360"));
            }
        }
    }
}
