using Microsoft.EntityFrameworkCore;
using Saude360.Data.Contexto;
using Saude360.Domain.Entidades;
using Saude360.Domain.Interfaces.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Saude360.Data.Repositorios
{
    public class UsuarioRepo : GeralRepo, IUsuarioRepo
    {
        private readonly DataContexto _contexto;
        public UsuarioRepo(DataContexto contexto) : base(contexto)
        {
            _contexto = contexto;
        }

        public async Task<Usuario> PegaPorEmailAsync(string email)
        {
            IQueryable<Usuario> query = _contexto.Usuarios;

            query = query.AsNoTracking()
                         .OrderBy(usuario => usuario.Id)
                         .Where(u => u.Email == email);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Usuario> PegaPorIdAsync(int id)
        {
            IQueryable<Usuario> query = _contexto.Usuarios;

            query = query.AsNoTracking()
                         .OrderBy(u => u.Id)
                         .Where(u => u.Id == id);

            return await query.FirstOrDefaultAsync();
        }
    }
}
