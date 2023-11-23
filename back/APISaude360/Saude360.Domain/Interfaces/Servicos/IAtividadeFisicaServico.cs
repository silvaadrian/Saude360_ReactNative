using Saude360.Domain.Entidades;

namespace Saude360.Domain.Interfaces.Servicos
{
    public interface IAtividadeFisicaServico
    {

        Task<AtividadeFisica> Cadastrar(AtividadeFisica ativFisica);
        Task<AtividadeFisica> Recuperar(int id);
        Task<AtividadeFisica> RecuperarAtividadeUsuario(int id);
        Task<AtividadeFisica[]> RecuperarTodasAtividades(int id);
    }
}
