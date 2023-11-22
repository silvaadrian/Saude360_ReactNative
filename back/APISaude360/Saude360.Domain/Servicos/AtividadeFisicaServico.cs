using Saude360.Domain.Entidades;
using Saude360.Domain.Interfaces.Repositorios;
using Saude360.Domain.Interfaces.Servicos;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Xml.Schema;

namespace Saude360.Domain.Servicos
{
    public class AtividadeFisicaServico : IAtividadeFisicaServico
    {
        private readonly IAtividadeFisicaRepo _ativFisicaRepo;

        public AtividadeFisicaServico(IAtividadeFisicaRepo ativFisicaRepo)
        {
            _ativFisicaRepo = ativFisicaRepo;
        }


        public async Task<AtividadeFisica> Cadastrar(AtividadeFisica atividadeFisica)
        {
            if (await _ativFisicaRepo.PegaPorIdAsync(atividadeFisica.Id) != null)
            {
                throw new Exception("Atividade já cadastrada!");
            }

            if (await _ativFisicaRepo.PegaPorIdAsync(atividadeFisica.Id) == null)
            {

                _ativFisicaRepo.Adicionar(atividadeFisica);
                if (await _ativFisicaRepo.SalvarMudancasAsync())
                {
                    return atividadeFisica;
                }
            }

            return null;
        }


        public async Task<AtividadeFisica> Recuperar(int id)
        {
            try
            {
                var atividadeFisica = await _ativFisicaRepo.PegaPorIdAsync(id);
                if (atividadeFisica == null)
                {
                    return null;
                }
                return atividadeFisica;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }


    }
}
