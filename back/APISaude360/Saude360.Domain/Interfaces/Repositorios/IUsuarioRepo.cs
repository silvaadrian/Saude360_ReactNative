using Saude360.Domain.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Saude360.Domain.Interfaces.Repositorios
{
    public interface IUsuarioRepo : IGeralRepo
    {
        public Task<Usuario> PegaPorEmailAsync(string email);
        public Task<Usuario> PegaPorIdAsync(int id);
    }
}
