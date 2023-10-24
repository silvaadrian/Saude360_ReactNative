using Saude360.Domain.Entidades;
using Saude360.Domain.Interfaces.Repositorios;
using Saude360.Domain.Interfaces.Servicos;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Xml.Schema;

namespace Saude360.Domain.Servicos
{
    public class UsuarioServico : IUsuarioServico
    {
        private readonly IUsuarioRepo _usuarioRepo;

        public UsuarioServico(IUsuarioRepo usuarioRepo)
        {
            _usuarioRepo = usuarioRepo;
        }


        public async Task<Usuario> Cadastrar(Usuario usuario)
        {       
            if (await _usuarioRepo.PegaPorEmailAsync(usuario.Email) != null)
            {
              throw new Exception("E-mail já cadastrado!");
            }

            if(await _usuarioRepo.PegaPorIdAsync(usuario.Id) == null) {
              

                usuario.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);

                _usuarioRepo.Adicionar(usuario);
                if(await _usuarioRepo.SalvarMudancasAsync())
                {
                    return usuario;
                }
            }

            return null;
        }

        public async Task<Usuario> Autenticar(string email, string senha)
        {
            bool valido = false;   

            var usuarioExiste = await _usuarioRepo.PegaPorEmailAsync(email);

            if (usuarioExiste != null)
            {          
                if (BCrypt.Net.BCrypt.Verify(senha, usuarioExiste.Senha))
                {
                    valido = true;
                }               
            }

            if (valido)
            {
                return usuarioExiste;
            }
            else
            {
                throw new Exception("E-mail e/ou Senha Inválidos");
            }                          
            
        }
    }
}
