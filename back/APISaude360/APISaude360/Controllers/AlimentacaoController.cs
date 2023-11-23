using Microsoft.AspNetCore.Mvc;
using Saude360.Domain.Entidades;
using Saude360.Domain.Interfaces.Servicos;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace APISaude360.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlimentacaoController : ControllerBase
    {
        public readonly IAlimentacaoServico _alimentacaoServico;

        public AlimentacaoController(IAlimentacaoServico alimentacao)
        {
            _alimentacaoServico = alimentacao;
        }

        [HttpPost("Cadastrar")]
        public async Task<IActionResult> Post(Alimentacao alimentacao)
        {
            try
            {
                var modelAlimentacao = await _alimentacaoServico.Cadastrar(alimentacao);
                if (modelAlimentacao == null) { return NoContent(); }

                return Ok(modelAlimentacao);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Cadastrar Alimentação: {ex.Message}");
            }
        }

        [HttpGet("Recuperar")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var modelAlimentacao = await _alimentacaoServico.Recuperar(id);
                if (modelAlimentacao == null) { return NoContent(); }

                return Ok(modelAlimentacao);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Recuperar Alimentação: {ex.Message}");
            }
        }

        [HttpGet("RecuperarAlimentacaoUsuario")]
        public async Task<IActionResult> GetAtividadeUsuario(int id)
        {
            try
            {
                var modelAlimentacao = await _alimentacaoServico.RecuperarAtividadeUsuario(id);
                if (modelAlimentacao == null) { return NoContent(); }

                return Ok(modelAlimentacao);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Recuperar Alimentação: {ex.Message}");
            }
        }
    }
}
