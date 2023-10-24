using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Saude360.Domain.Interfaces.Repositorios
{
    public interface IGeralRepo
    {
        public void Adicionar<T>(T entity) where T : class;
        public void Atualizar<T>(T entity) where T : class;
        public void Deletar<T>(T entity) where T : class;
        public void DeletarVarios<T>(T[] entity) where T : class;
        public Task<bool> SalvarMudancasAsync();
    }
}
