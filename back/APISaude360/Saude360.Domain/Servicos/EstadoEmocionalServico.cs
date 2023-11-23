using Saude360.Domain.Entidades;
using Saude360.Domain.Interfaces.Repositorios;
using Saude360.Domain.Interfaces.Servicos;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Xml.Schema;

namespace Saude360.Domain.Servicos
{
    public class EstadoEmocionalServico : IEstadoEmocionalServico
    {
        private readonly IEstadoEmocionalRepo _estadoEmocional;

        public EstadoEmocionalServico(IEstadoEmocionalRepo estadoEmocional)
        {
            _estadoEmocional = estadoEmocional;
        }


        public async Task<EstadoEmocional> Cadastrar(EstadoEmocional estadoEmocional)
        {
            if (await _estadoEmocional.PegaPorIdAsync(estadoEmocional.Id) != null)
            {
                throw new Exception("Estado Emocional já cadastrado!");
            }

            if (await _estadoEmocional.PegaPorIdAsync(estadoEmocional.Id) == null)
            {

                _estadoEmocional.Adicionar(estadoEmocional);
                if (await _estadoEmocional.SalvarMudancasAsync())
                {
                    return estadoEmocional;
                }
            }

            return null;
        }


        public async Task<EstadoEmocional> Recuperar(int id)
        {
            try
            {
                var estadoEmocional = await _estadoEmocional.PegaPorIdAsync(id);
                if (estadoEmocional == null)
                {
                    return null;
                }
                return estadoEmocional;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public async Task<EstadoEmocional> RecuperarAtividadeUsuario(int id)
        {
            try
            {
                var estadoEmocional = await _estadoEmocional.PegaPorUsuarioAsync(id);
                if (estadoEmocional == null)
                {
                    return null;
                }
                return estadoEmocional;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
    }
}
