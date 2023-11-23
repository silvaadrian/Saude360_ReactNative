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
    public class EstadoEmocionalRepo : GeralRepo, IEstadoEmocionalRepo
    {
        private readonly DataContexto _contexto;
        public EstadoEmocionalRepo(DataContexto contexto) : base(contexto)
        {
            _contexto = contexto;
        }


        public async Task<EstadoEmocional> PegaPorIdAsync(int id)
        {
            IQueryable<EstadoEmocional> query = _contexto.EstadosEmocionais;

            query = query.AsNoTracking()
                         .OrderBy(u => u.Id)
                         .Where(u => u.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<EstadoEmocional> PegaPorUsuarioAsync(int id)
        {
            IQueryable<EstadoEmocional> query = _contexto.EstadosEmocionais;

            query = query.AsNoTracking()
                         .OrderByDescending(u => u.Id)
                         .Where(u => u.UsuarioId == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<EstadoEmocional[]> PegaTodasPorUsuarioAsync(int id)
        {
            IQueryable<EstadoEmocional> query = _contexto.EstadosEmocionais;

            query = query.AsNoTracking()
                         .OrderByDescending(u => u.Id)
                         .Where(u => u.UsuarioId == id);

            return await query.ToArrayAsync();
        }
    }
}
