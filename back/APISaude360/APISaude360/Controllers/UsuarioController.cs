using Microsoft.AspNetCore.Mvc;
using Saude360.Domain.Entidades;
using Saude360.Domain.Interfaces.Servicos;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace APISaude360.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        public readonly IUsuarioServico _usuarioServico;
        
        public UsuarioController(IUsuarioServico usuarioServico)
        {
            _usuarioServico = usuarioServico;
        }

        [HttpPost("Cadastrar")]
        public async Task<IActionResult> Post(Usuario usuario)
        {
            try
            {
                var modelUsuario = await _usuarioServico.Cadastrar(usuario);
                if(modelUsuario == null) { return NoContent(); }

                return Ok(modelUsuario);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Cadastrar Usuário: {ex.Message}");
            }
        }

        [HttpGet("Recuperar")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var modelUsuario = await _usuarioServico.Recuperar(id);
                if (modelUsuario == null) { return NoContent(); }

                return Ok(new
                {
                    usuarioId = modelUsuario.Id,
                    usuarioNome = modelUsuario.Nome,
                    usuarioEmail = modelUsuario.Email,
                });
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Recuperar Usuário: {ex.Message}");
            }
        }

        [HttpPut("Alterar")]
        public async Task<IActionResult> Put(Usuario usuario)
        {
            try
            {
                var modelUsuario = await _usuarioServico.Alterar(usuario);
                if (modelUsuario == null) { return NoContent(); }

                return Ok(new
                {
                    Status = true,
                    Mensagem = "Alteração Realizada!",
                    usuarioId = modelUsuario.Id,
                    usuarioNome = modelUsuario.Nome,
                    usuarioEmail = modelUsuario.Email,
                });
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Alterar Usuário: {ex.Message}");
            }
        }


        [HttpPost("Autenticar")]
        public async Task<IActionResult> Login(Usuario usuario)
        {
            try
            {
                var modelUsuario = await _usuarioServico.Autenticar(usuario.Email, usuario.Senha);
                return Ok(new
                {
                    Status = true,
                    Mensagem = "Acesso Autorizado",
                    usuarioId = modelUsuario.Id,
                    usuarioNome = modelUsuario.Nome,
                    usuarioEmail = modelUsuario.Email,
                    Token = Seguranca.gerarToken(modelUsuario),
                });
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status401Unauthorized, $"Erro ao Autenticar Usuário: {ex.Message}");
            }
        }
    }
}
