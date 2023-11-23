using Saude360.Domain.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Saude360.Domain.Interfaces.Repositorios
{
    public interface IAtividadeFisicaRepo : IGeralRepo
    {
        public Task<AtividadeFisica> PegaPorIdAsync(int id);
        public Task<AtividadeFisica> PegaPorUsuarioAsync(int id);
    }
}
