﻿using Microsoft.EntityFrameworkCore;
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
    public class AlimentacaoRepo : GeralRepo, IAlimentacaoRepo
    {
        private readonly DataContexto _contexto;
        public AlimentacaoRepo(DataContexto contexto) : base(contexto)
        {
            _contexto = contexto;
        }


        public async Task<Alimentacao> PegaPorIdAsync(int id)
        {
            IQueryable<Alimentacao> query = _contexto.Alimentacaos;

            query = query.AsNoTracking()
                         .OrderBy(u => u.Id)
                         .Where(u => u.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Alimentacao> PegaPorUsuarioAsync(int id)
        {
            IQueryable<Alimentacao> query = _contexto.Alimentacaos;

            query = query.AsNoTracking()
                         .OrderByDescending(u => u.Id)
                         .Where(u => u.UsuarioId == id);

            return await query.FirstOrDefaultAsync();
        }
    }
}
