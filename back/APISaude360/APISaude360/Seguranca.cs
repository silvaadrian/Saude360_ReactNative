using Microsoft.IdentityModel.Tokens;
using Saude360.Domain.Entidades;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace APISaude360
{
    public class Seguranca
    {
        public static string CHAVE_SECRETA = "0x5A2BACF5B24E80DDE768CDB921B3E5E4E525226BA6C230300BB4E4C53A8C9D02";

        public static string gerarToken(Usuario usuario)
        {
            var key = Encoding.ASCII.GetBytes(CHAVE_SECRETA);

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, usuario.Nome),
                new Claim(ClaimTypes.PrimarySid, usuario.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials
                (
                     new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }
    }
}
