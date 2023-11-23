using Microsoft.AspNetCore.Mvc;
using Saude360.Domain.Entidades;
using Saude360.Domain.Interfaces.Servicos;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace APISaude360.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstadoEmocionalController : ControllerBase
    {
        public readonly IEstadoEmocionalServico _estadoEmocionalServico;

        public EstadoEmocionalController(IEstadoEmocionalServico estadoEmocionalServico)
        {
            _estadoEmocionalServico = estadoEmocionalServico;
        }

        [HttpPost("Cadastrar")]
        public async Task<IActionResult> Post(EstadoEmocional estadoEmocional)
        {
            try
            {
                var modelEstadoEmocional = await _estadoEmocionalServico.Cadastrar(estadoEmocional);
                if (modelEstadoEmocional == null) { return NoContent(); }

                return Ok(modelEstadoEmocional);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Cadastrar Estado Emocional: {ex.Message}");
            }
        }

        [HttpGet("Recuperar")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var modelEstadoEmocional = await _estadoEmocionalServico.Recuperar(id);
                if (modelEstadoEmocional == null) { return NoContent(); }

                return Ok(modelEstadoEmocional);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Recuperar Estado Emocional: {ex.Message}");
            }
        }

        [HttpGet("RecuperarEstadoEmocionalUsuario")]
        public async Task<IActionResult> GetAtividadeUsuario(int id)
        {
            try
            {
                var modelEstadoEmocional = await _estadoEmocionalServico.RecuperarAtividadeUsuario(id);
                if (modelEstadoEmocional == null) { return NoContent(); }

                return Ok(modelEstadoEmocional);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Recuperar Estado Emocional: {ex.Message}");
            }
        }
    }
}
