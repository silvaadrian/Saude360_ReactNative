using Saude360.Domain.Entidades;

namespace Saude360.Domain.Interfaces.Servicos
{
    public interface IEstadoEmocionalServico
    {

        Task<EstadoEmocional> Cadastrar(EstadoEmocional estadoEmocional);
        Task<EstadoEmocional> Recuperar(int id);
        Task<EstadoEmocional> RecuperarAtividadeUsuario(int id);    
    }
}
