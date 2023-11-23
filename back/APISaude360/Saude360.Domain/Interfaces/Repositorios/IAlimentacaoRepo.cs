using Saude360.Domain.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Saude360.Domain.Interfaces.Repositorios
{
    public interface IAlimentacaoRepo : IGeralRepo
    {
        public Task<Alimentacao> PegaPorIdAsync(int id);
        public Task<Alimentacao> PegaPorUsuarioAsync(int id);
        public Task<Alimentacao[]> PegaTodasPorUsuarioAsync(int id);
    }
}
