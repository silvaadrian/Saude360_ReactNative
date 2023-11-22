using Saude360.Domain.Entidades;

namespace Saude360.Domain.Interfaces.Servicos
{
    public interface IUsuarioServico
    {

        Task<Usuario> Cadastrar(Usuario usuario);
        Task<Usuario> Alterar(Usuario usuario);
        Task<Usuario> Autenticar(string email, string senha);
        Task<Usuario> Recuperar(int id);
    }
}
