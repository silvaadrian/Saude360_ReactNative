using Saude360.Domain.Entidades;

namespace Saude360.Domain.Interfaces.Servicos
{
    public interface IAlimentacaoServico
    {

        Task<Alimentacao> Cadastrar(Alimentacao alimentacao);
        Task<Alimentacao> Recuperar(int id);
        Task<Alimentacao> RecuperarAtividadeUsuario(int id);    
    }
}
