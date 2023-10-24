using Saude360.Data.Contexto;
using Saude360.Domain.Interfaces.Repositorios;

namespace Saude360.Data.Repositorios
{
    public class GeralRepo : IGeralRepo
    {
        private readonly DataContexto _contexto;

        public GeralRepo(DataContexto contexto)
        {
            _contexto = contexto;
        }

        public void Adicionar<T>(T entity) where T : class
        {
            _contexto.Add(entity);
        }

        public void Atualizar<T>(T entity) where T : class
        {
            _contexto.Update(entity);
        }

        public void Deletar<T>(T entity) where T : class
        {
            _contexto.Remove(entity);
        }

        public void DeletarVarios<T>(T[] entity) where T : class
        {
            _contexto.RemoveRange(entity);
        }

        public async Task<bool> SalvarMudancasAsync()
        {
            return (await _contexto.SaveChangesAsync()) > 0;
        }
    }
}
