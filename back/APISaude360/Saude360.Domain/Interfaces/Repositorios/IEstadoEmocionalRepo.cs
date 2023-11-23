using Saude360.Domain.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Saude360.Domain.Interfaces.Repositorios
{
    public interface IEstadoEmocionalRepo : IGeralRepo
    {
        public Task<EstadoEmocional> PegaPorIdAsync(int id);
        public Task<EstadoEmocional> PegaPorUsuarioAsync(int id);
        public Task<EstadoEmocional[]> PegaTodasPorUsuarioAsync(int id);
    }
}
