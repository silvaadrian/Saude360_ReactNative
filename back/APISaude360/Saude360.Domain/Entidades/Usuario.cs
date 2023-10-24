using System.ComponentModel.DataAnnotations;

namespace Saude360.Domain.Entidades
{
    public class Usuario
    {
        public int Id { get; set; }
        [MaxLength(50, ErrorMessage = "o Nome não pode ter mais de 50 caracteres")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "O campo Email é obrigatório.")]
        [EmailAddress(ErrorMessage = "O campo Email não está em um formato de e-mail válido.")]
        public string Email { get; set; }
        [Required]
        [MinLength(8, ErrorMessage = "A senha deve ter pelo menos 8 caracteres")]
        [MaxLength(50, ErrorMessage = "A senha não pode ter mais de 50 caracteres")]
        public string Senha { get; set; }
        public DateTime DataCriacao { get; set; }

        public Usuario()
        {
            DataCriacao = DateTime.Now;
        }

        public Usuario(int id, string nome, string email, string senha, DateTime dataCriacao) : this()
        {
            Id = id;
            Nome = nome;
            Email = email;
            Senha = senha;
        }
    }
}
