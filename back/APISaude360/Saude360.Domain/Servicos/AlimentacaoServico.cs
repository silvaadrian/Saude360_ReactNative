using Saude360.Domain.Entidades;
using Saude360.Domain.Interfaces.Repositorios;
using Saude360.Domain.Interfaces.Servicos;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Xml.Schema;

namespace Saude360.Domain.Servicos
{
    public class AlimentacaoServico : IAlimentacaoServico
    {
        private readonly IAlimentacaoRepo _alimentacao;

        public AlimentacaoServico(IAlimentacaoRepo alimentacao)
        {
            _alimentacao = alimentacao;
        }


        public async Task<Alimentacao> Cadastrar(Alimentacao alimentacao)
        {
            if (await _alimentacao.PegaPorIdAsync(alimentacao.Id) != null)
            {
                throw new Exception("Atividade já cadastrada!");
            }

            if (await _alimentacao.PegaPorIdAsync(alimentacao.Id) == null)
            {

                _alimentacao.Adicionar(alimentacao);
                if (await _alimentacao.SalvarMudancasAsync())
                {
                    return alimentacao;
                }
            }

            return null;
        }


        public async Task<Alimentacao> Recuperar(int id)
        {
            try
            {
                var alimentacao = await _alimentacao.PegaPorIdAsync(id);
                if (alimentacao == null)
                {
                    return null;
                }
                return alimentacao;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public async Task<Alimentacao> RecuperarAtividadeUsuario(int id)
        {
            try
            {
                var alimentacao = await _alimentacao.PegaPorUsuarioAsync(id);
                if (alimentacao == null)
                {
                    return null;
                }
                return alimentacao;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

    }
}
