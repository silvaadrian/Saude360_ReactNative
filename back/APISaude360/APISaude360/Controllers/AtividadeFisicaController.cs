using Microsoft.AspNetCore.Mvc;
using Saude360.Domain.Entidades;
using Saude360.Domain.Interfaces.Servicos;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace APISaude360.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeFisicaController : ControllerBase
    {
        public readonly IAtividadeFisicaServico _ativFisicaServico;

        public AtividadeFisicaController(IAtividadeFisicaServico ativFisicaServico)
        {
            _ativFisicaServico = ativFisicaServico;
        }

        [HttpPost("Cadastrar")]
        public async Task<IActionResult> Post(AtividadeFisica ativFisica)
        {
            try
            {
                var modelAtivFisica = await _ativFisicaServico.Cadastrar(ativFisica);
                if (modelAtivFisica == null) { return NoContent(); }

                return Ok(modelAtivFisica);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Cadastrar Atividade: {ex.Message}");
            }
        }

        [HttpGet("Recuperar")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var modelAtivFisica = await _ativFisicaServico.Recuperar(id);
                if (modelAtivFisica == null) { return NoContent(); }

                return Ok(modelAtivFisica);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Recuperar Atividade: {ex.Message}");
            }
        }
    }
}
