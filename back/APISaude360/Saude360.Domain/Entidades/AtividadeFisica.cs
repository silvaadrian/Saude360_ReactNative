using System.ComponentModel.DataAnnotations;

namespace Saude360.Domain.Entidades
{
    public class AtividadeFisica
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Necessário informar Tipo de exercício")]
        [MaxLength(50, ErrorMessage = "O Tipo do Exercício não pode ter mais de 50 caracteres")]
        public string TipoExercicio { get; set; }
        [Required(ErrorMessage = "Necessário informar Duração do exercício")]
        [MaxLength(50, ErrorMessage = "A Duração do Exercício não pode ter mais de 50 caracteres")]
        public string Duracao { get; set; }
        [Required(ErrorMessage = "Necessário informar Intensidade do exercício")]
        public int Intensidade { get; set; }
        public Usuario Usuario { get; set; }
        public DateTime DataCriacao { get; set; }

        public AtividadeFisica()
        {
            DataCriacao = DateTime.Now;
        }

        public AtividadeFisica(int id, string tipoExercicio, string duracao, int intensidade) : this()
        {
            Id = id;
            TipoExercicio = tipoExercicio;
            Duracao = duracao;
            Intensidade = intensidade;
        }
    }
}
