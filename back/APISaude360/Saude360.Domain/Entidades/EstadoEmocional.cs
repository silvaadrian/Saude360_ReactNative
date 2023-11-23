using System.ComponentModel.DataAnnotations;

namespace Saude360.Domain.Entidades
{
    public class EstadoEmocional
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Necessário informar 'Estado emocional'")]
        [MaxLength(50, ErrorMessage = "O Estado Emocional não pode ter mais de 50 caracteres")]
        public string Estado { get; set; }
        [Required(ErrorMessage = "Necessário informar 'Sobre as emoções'")]
        [MaxLength(200, ErrorMessage = "Sobre as emoções não pode ter mais de 200 caracteres")]
        public string SobreEmocoes { get; set; }
        public int UsuarioId { get; set; }  
        public DateTime DataCriacao { get; set; }

        public EstadoEmocional()
        {
            DataCriacao = DateTime.Now;
        }

        public EstadoEmocional(int id, string estadoEmocional, string sobreEmocoes, int usuarioId) : this()
        {
            Id = id;
            Estado = estadoEmocional;
            SobreEmocoes = sobreEmocoes;
            UsuarioId = usuarioId;
        }
    }
}
