using System.ComponentModel.DataAnnotations;

namespace Saude360.Domain.Entidades
{
    public class Alimentacao
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Necessário informar Refeição")]
        [MaxLength(50, ErrorMessage = "O Tipo de Refeição não pode ter mais de 50 caracteres")]
        public string Refeicao { get; set; }
        [Required(ErrorMessage = "Necessário informar Alimentos consumidos")]
        [MaxLength(200, ErrorMessage = "Alimentos consumidos não pode ter mais de 200 caracteres")]
        public string AlimentosConsumidos { get; set; }
        public int UsuarioId { get; set; }  
        public DateTime DataCriacao { get; set; }

        public Alimentacao()
        {
            DataCriacao = DateTime.Now;
        }

        public Alimentacao(int id, string refeicao, string alimentosConsumidos, int usuarioId) : this()
        {
            Id = id;
            Refeicao = refeicao;
            AlimentosConsumidos = alimentosConsumidos;
            UsuarioId = usuarioId;
        }
    }
}
